import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  // checking if admin or not
  if (!req.user.isAdmin) {
    //checking cookie for admin property
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

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Constructing the query object based on request parameters
    const query = {};
    if (req.query.userId) query.userId = req.query.userId;
    if (req.query.category) query.category = req.query.category;
    if (req.query.slug) query.slug = req.query.slug;
    if (req.query.postId) query._id = req.query.postId;
    if (req.query.searchItem) {
      query.$or = [
        { title: { $regex: req.query.searchItem, $options: "i" } },
        { content: { $regex: req.query.searchItem, $options: "i" } },
      ];
    }

    const posts = await Post.find(query) // Pass the query object to the find method
      .sort({ updatedAt: sortDirection }) // Moved sort after find
      .skip(startIndex)
      .limit(limit);

    // Total posts
    const totalPosts = await Post.countDocuments(query); // Pass the same query to countDocuments

    // Total posts in the last month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      ...query,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  // only an admin who made this post can delete that
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to do that"));
  }
  try {
    // logic to delete post
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to do that"));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
