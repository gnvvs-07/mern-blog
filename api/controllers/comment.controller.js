import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    // collecting comment details
    const { content, postId, userId } = req.body;
    // user verification
    if (userId !== req.user.id) {
      return next(errorHandler(403, "Only users can post a comment"));
    }
    // new comment
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    // comments
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    // sending comments to console
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
