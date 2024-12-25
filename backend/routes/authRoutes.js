// import express from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import bcrypt from "bcryptjs"; // Use bcryptjs for Node.js
// const router = express.Router();

// // Signup
// router.post("/signup", async (req, res) => {
//     const { username, password } = req.body;
//     try {
//       // Check for existing user
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ message: "User already exists" });
//       }
  
//       // Hash password and save user
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ username, password: hashedPassword });
//       await newUser.save();
  
//       res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   });
  
  

// // Signin
// // router.post("/signin", async (req, res) => {
// //   const { username, password } = req.body;
// //   try {
// //     const user = await User.findOne({ username });
// //     if (!user) throw new Error("User not found");

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) throw new Error("Invalid credentials");

// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
// //     res.json({ token });
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //     console.log("back:"+req.body);
// //     console.log(process.env.JWT_SECRET)
// //   }
// // });
// router.post("/signin", async (req, res) => {
//     console.log("Signin Request Body:", req.body); // Debug username and password
//     const { username, password } = req.body;
  
//     try {
//       const user = await User.findOne({ username });
//       if (!user) throw new Error("User not found");
  
//       console.log("User Found:", user); // Debug user details
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) throw new Error("Invalid credentials");
//       console.log(password);
//       console.log(user.password);
  
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//       res.json({ token });
//     } catch (err) {
//         const user = await User.findOne({ username });
//       console.error("Signin Error:", err.message);
//       console.log(password);
//       console.log(user.password);
//       res.status(400).json({ error: err.message });
//     }
//   });
  

// export default router;



import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs"; // Use bcryptjs for Node.js
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log("User created with username:", newUser.username);
    console.log("User created with username:", newUser.password);

    res.status(201).json({ message: "User created successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  console.log("Signin Request Body:", req.body); // Debugging the request body

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Signin Error: User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      console.log("Signin Error: Invalid password");
      console.log(user.password);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token if credentials are valid
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });

  } catch (err) {
    console.error("Signin Error:", err.message); // Log the error message
    res.status(400).json({ error: "Invalid credentials" }); // Provide generic error message
  }
});

export default router;
