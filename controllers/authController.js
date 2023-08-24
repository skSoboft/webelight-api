const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User"); 


exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, config.secretKey);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;


    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    
    const token = jwt.sign({ userId: user._id }, config.secretKey);
    console.log("TOken::", token);
    res.status(200).json({ token });
  } catch (error) {
    console.log("error::", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
