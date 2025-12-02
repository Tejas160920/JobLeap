const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const {
  signup,
  login,
  updateProfile,
  getProfile,
  oauthSuccess,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  getSettings,
  updateSettings,
  deleteAccount
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { validateSignup, validateLogin, validateProfileUpdate } = require("../middleware/validation");

// Traditional auth routes
router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.put("/profile", verifyToken, validateProfileUpdate, updateProfile);
router.get("/profile", verifyToken, getProfile);

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

// Google OAuth routes
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

// Apple OAuth routes (if configured)
if (process.env.APPLE_CLIENT_ID) {
  router.get("/apple", 
    passport.authenticate("apple", { scope: ["name", "email"] })
  );

  router.post("/apple/callback", 
    passport.authenticate("apple", { 
      failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=apple_auth_failed`,
      session: false
    }),
    oauthSuccess
  );
}

module.exports = router;
