const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const {
  signup,
  login,
  updateProfile,
  getProfile,
  updateRole,
  oauthSuccess,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  getSettings,
  updateSettings,
  deleteAccount,
  getAutofillProfile,
  updateAutofillProfile
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { validateSignup, validateLogin, validateProfileUpdate } = require("../middleware/validation");

// Traditional auth routes
router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.put("/profile", verifyToken, validateProfileUpdate, updateProfile);
router.get("/profile", verifyToken, getProfile);
router.put("/role", verifyToken, updateRole);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Email verification routes
router.post("/send-verification", verifyToken, sendVerificationEmail);
router.post("/verify-email", verifyEmail);

// Settings routes
router.get("/settings", verifyToken, getSettings);
router.put("/settings", verifyToken, updateSettings);
router.delete("/account", verifyToken, deleteAccount);

// Autofill Profile routes (for Chrome extension)
router.get("/autofill-profile", verifyToken, getAutofillProfile);
router.put("/autofill-profile", verifyToken, updateAutofillProfile);

// Google OAuth routes (only if configured)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get("/google/callback",
    passport.authenticate("google", {
      failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google_auth_failed`,
      session: false
    }),
    oauthSuccess
  );
} else {
  // Provide fallback routes that return appropriate error
  router.get("/google", (req, res) => {
    res.status(503).json({ success: false, message: "Google OAuth not configured" });
  });
  router.get("/google/callback", (req, res) => {
    res.status(503).json({ success: false, message: "Google OAuth not configured" });
  });
}

module.exports = router;
