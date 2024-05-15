// user schema and models
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture:{
      type: String,
      default: "https://th.bing.com/th/id/OIP.SuIGrDNBSwD3CNorD0OzjgAAAA?rs=1&pid=ImgDetMain"
    }
  },
  { timestamps: true }
);

// creating a model

const User = mongoose.model("User", userSchema);

export default User;
