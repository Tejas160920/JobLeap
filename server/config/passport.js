const passport = require('passport');
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Only require Google Strategy if we have credentials
let GoogleStrategy = null;
try {
  GoogleStrategy = require('passport-google-oauth20').Strategy;
} catch (err) {
  console.log('passport-google-oauth20 not available');
}

// Generate a secure random password hash for OAuth users
const generateOAuthPasswordHash = async () => {
  const randomPassword = crypto.randomBytes(32).toString('hex');
  return await bcrypt.hash(randomPassword, 12);
};

// Only configure Google OAuth if credentials and strategy are available
if (GoogleStrategy && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let existingUser = await User.findOne({
        $or: [
          { googleId: profile.id },
          { email: profile.emails[0].value }
        ]
      });

      if (existingUser) {
        if (!existingUser.googleId) {
          existingUser.googleId = profile.id;
          await existingUser.save();
        }
        return done(null, existingUser);
      }

      const securePassword = await generateOAuthPasswordHash();
      const newUser = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        password: securePassword,
        role: 'seeking',
        profile: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          avatar: profile.photos[0]?.value
        },
        profileCompleted: false
      });

      done(null, newUser);
    } catch (error) {
      console.error('Google OAuth error:', error);
      done(error, null);
    }
  }));
} else {
  console.log('Google OAuth not configured - missing strategy or credentials');
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
