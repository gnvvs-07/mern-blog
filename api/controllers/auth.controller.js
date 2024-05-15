import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; //accessing user details
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "all fields are required" });
    next(errorHandler(400, "all fields must be filled / required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("signup-success");
  } catch (error) {
    next(error); //middle ware
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body; // Accessing user details
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields must be filled / required"));
  }
  try {
    // Finding a user
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found")); // No valid user exists
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password and email combination"));
    }
    // Separating sensitive fields from user data
    const { password: pass, ...others } = validUser._doc;
    dotenv.config();
    // Generating a JWT token with an expiration time (e.g., 1 hour)
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    // Setting the token as an HttpOnly cookie
    res.cookie("userToken", token, { httpOnly: true }).json(others);
  } catch (error) {
    next(error); // Middleware to handle errors
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("Access token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // hashed password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        // email,name,password:hashedPassword,googlePhotoUrl
        username:
          name.toLowerCase().split("").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      // cookie setting
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res.status(200).cookie("Cookie", token, { http: true }).json(rest);
    }
  } catch (error) {
    console.log(error);
  }
};
