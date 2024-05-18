import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  // checking if admin or not
  if (!req.user.isAdmin) {          //checking cookie for admin property
    return next(errorHandler(403, "Only admins are allowed to post. "));
  }
  // processing good kind of posts only to be posted
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide title and content. "));
  }
  // creating post
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  //   error handling
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
