import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs"; // corrected import statement

export const test = (req, res) => {
  //testin route
  res.json({ message: "API routing is working-success" });
};

// update user controller
export const updateUser = async (req, res, next) => {
  // controlling the user update functionality
  // error handling
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You cannot update the user details"));
  }
  // update the password
  if (req.body.password) {
    // minimum of 6 characters
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long")
      );
    }
    // hash the new password
    req.body.password = bcryptjs.hashSync(req.body.password, 10); // corrected bcryptjs to bcrypt
  }
  // updating the username
  if (req.body.username) {
    // minimum and maximum characters
    if (req.body.username.length < 1 || req.body.username.length > 26) {
      return next(
        errorHandler(
          400,
          "username must be at least 1 characters long and max of 26 characters only"
        )
      );
    }
    // username mustnot have any spaces
    // username must not have any spaces
    if (/\s/.test(req.body.username)) {
      return next(errorHandler(400, "Username should not contain any spaces"));
    }

    // lower case or not
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "username must be in lower case only"));
    }
    // username must be compatible in this format [a-zA-Z0-9] ...regular expression
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "username must contain only alphabets and numbers")
      );
    }
  }
  try {
    // updating the username
    // updating the username
    // Fetch the current user document
    const currentUser = await User.findById(req.params.userId);

    // Update the user document with the new values, including the existing profile picture
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          // updates user given new values
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture || currentUser.profilePicture, // Retain the existing profile picture
          password: req.body.password,
        },
      },
      { new: true }
    );

    // sending the updated userdata to the backend
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // user finding
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User Signed Out successfully");
  } catch (error) {
    next(error);
  }
};
