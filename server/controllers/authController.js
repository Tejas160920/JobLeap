const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

if (!JWT_SECRET) {
  console.error('CRITICAL: JWT_SECRET environment variable is not set!');
  // Don't exit on Vercel - just throw error
  if (!isVercel) {
    process.exit(1);
  }
}

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email, 
      role: user.role 
    }, 
    JWT_SECRET, 
    { expiresIn: "7d" }
  );
};

// Helper function to format user response
const formatUserResponse = (user) => {
  return {
    id: user._id,
    email: user.email,
    role: user.role,
    profileCompleted: user.profileCompleted,
    emailVerified: user.emailVerified,
    needsRoleSelection: user.needsRoleSelection || false,
    isOAuthUser: !!(user.googleId || user.appleId)
  };
};

exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists with this email" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      emailVerified: false
    });

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({ 
      success: true,
      message: "Account created successfully",
      token, 
      user: formatUserResponse(user)
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ 
      success: false,
      message: "Account creation failed", 
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};







exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and is active
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Check if user is OAuth user trying to login with password
    if (user.googleId || user.appleId) {
      return res.status(400).json({
        success: false,
        message: "Please use Google or Apple sign in for this account"
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(200).json({ 
      success: true,
      token, 
      user: formatUserResponse(user)
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ 
      success: false,
      message: "Login failed", 
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body.profile || req.body;

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profile: profileData,
        profileCompleted: true
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Profile updated successfully",
      user: formatUserResponse(updatedUser),
      profile: updatedUser.profile 
    });
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ 
      success: false,
      message: "Profile update failed", 
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user: formatUserResponse(user),
      profile: user.profile
    });
  } catch (err) {
    console.error("Get profile error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to get profile",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Update user role (for OAuth users who need to select role)
exports.updateRole = async (req, res) => {
  try {
    const userId = req.user.id;
    const { role } = req.body;

    if (!role || !['seeking', 'hiring'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'seeking' or 'hiring'"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.role = role;
    user.needsRoleSelection = false;
    await user.save();

    // Generate new token with updated role
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      token,
      user: formatUserResponse(user)
    });
  } catch (err) {
    console.error("Update role error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to update role",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// OAuth success callback
exports.oauthSuccess = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user);

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(formatUserResponse(user)))}`);
  } catch (err) {
    console.error("OAuth success error:", err.message);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=oauth_failed`);
  }
};

// Generate password reset token
const generateResetToken = () => {
  return require('crypto').randomBytes(32).toString('hex');
};

// Forgot password - request reset
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase(), isActive: true });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If an account exists with this email, a password reset link will be sent."
      });
    }

    // Check if user is OAuth user
    if (user.googleId || user.appleId) {
      return res.status(400).json({
        success: false,
        message: "This account uses social login. Please sign in with Google or Apple."
      });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const resetTokenHash = require('crypto').createHash('sha256').update(resetToken).digest('hex');

    // Save hashed token and expiry (1 hour)
    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // In production, send email with reset link
    // For now, log the token (in production, use nodemailer or similar)
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    console.log(`Password reset requested for ${email}`);
    console.log(`Reset URL: ${resetUrl}`);

    // TODO: Send email with resetUrl using nodemailer
    // await sendEmail({ to: email, subject: 'Password Reset', html: `...${resetUrl}...` });

    res.status(200).json({
      success: true,
      message: "If an account exists with this email, a password reset link will be sent.",
      // Only include in development for testing
      ...(process.env.NODE_ENV === 'development' && { resetToken, resetUrl })
    });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to process password reset request",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Reset password with token
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required"
      });
    }

    // Hash the provided token to compare with stored hash
    const resetTokenHash = require('crypto').createHash('sha256').update(token).digest('hex');

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: resetTokenHash,
      passwordResetExpires: { $gt: Date.now() },
      isActive: true
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully. You can now log in with your new password."
    });
  } catch (err) {
    console.error("Reset password error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Request email verification
exports.sendVerificationEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified"
      });
    }

    // Generate verification token
    const verificationToken = generateResetToken();
    user.emailVerificationToken = require('crypto').createHash('sha256').update(verificationToken).digest('hex');
    await user.save();

    // In production, send email
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;
    console.log(`Email verification requested for ${user.email}`);
    console.log(`Verify URL: ${verifyUrl}`);

    res.status(200).json({
      success: true,
      message: "Verification email sent",
      ...(process.env.NODE_ENV === 'development' && { verificationToken, verifyUrl })
    });
  } catch (err) {
    console.error("Send verification email error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to send verification email",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Verify email with token
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required"
      });
    }

    const tokenHash = require('crypto').createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      emailVerificationToken: tokenHash,
      isActive: true
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification token"
      });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });
  } catch (err) {
    console.error("Verify email error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to verify email",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Get user settings
exports.getSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('settings');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      settings: user.settings || {
        emailNotifications: true,
        jobAlerts: true,
        marketingEmails: false,
        profileVisibility: 'public',
        twoFactorAuth: false
      }
    });
  } catch (err) {
    console.error("Get settings error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to get settings",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Update user settings
exports.updateSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { emailNotifications, jobAlerts, marketingEmails, profileVisibility, twoFactorAuth } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Update settings
    user.settings = {
      emailNotifications: emailNotifications ?? user.settings?.emailNotifications ?? true,
      jobAlerts: jobAlerts ?? user.settings?.jobAlerts ?? true,
      marketingEmails: marketingEmails ?? user.settings?.marketingEmails ?? false,
      profileVisibility: profileVisibility ?? user.settings?.profileVisibility ?? 'public',
      twoFactorAuth: twoFactorAuth ?? user.settings?.twoFactorAuth ?? false
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings: user.settings
    });
  } catch (err) {
    console.error("Update settings error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to update settings",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // For non-OAuth users, verify password
    if (!user.googleId && !user.appleId) {
      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Password is required to delete account"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password"
        });
      }
    }

    // Soft delete - mark as inactive instead of actually deleting
    user.isActive = false;
    user.email = `deleted_${Date.now()}_${user.email}`;
    await user.save();

    // Optionally: Clean up related data
    // await Bookmark.deleteMany({ user: userId });
    // await Application.deleteMany({ applicant: userId });

    res.status(200).json({
      success: true,
      message: "Account deleted successfully"
    });
  } catch (err) {
    console.error("Delete account error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};