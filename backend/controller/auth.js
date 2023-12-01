const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const JWT_SECRET = process.env.JWT_SECRET;
router.use(cookieParser());
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    //Check if the username already exist
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    // Create a new user with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({
      info: newUser._doc,
      message: `User registered successfully: ${newUser.username}`,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const passwordMatch = await bcrypt.compare(
      password.toString(),
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    console.log(JSON.stringify(req.cookies), "cookies");
    return res.status(200).json({
      token,
      info: user._doc,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/refetch", async (req, res) => {
  res.cookie("refetch", "refetch");
  const token = req.cookies.token;
  console.log(token, "token");
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    console.log(data);
    res.status(200).json(data);
  });
});

module.exports = router;
