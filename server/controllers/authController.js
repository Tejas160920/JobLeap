const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // add this to .env in production

exports.signup = async (req, res) => {
  const { email, password, role } = req.body;

  console.log("Signup request received:", { email, role });

  try {
    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password, and role are required" });
    }

    // Check if user already exists
    console.log("Checking if user exists...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    console.log("Creating user...");
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    console.log("User created successfully:", user._id);

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ 
      message: "User created successfully",
      token, 
      user: { id: user._id, email: user.email, role: user.role } 
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};







exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  
      res.status(200).json({ token, user: { email: user.email, role: user.role } });
    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err.message });
    }
  };
  