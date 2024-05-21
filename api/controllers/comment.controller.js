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

export const likeComment = async (req, res, next) => {
  // like comment
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      // add like
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      // if already liked
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    // save comment
    await comment.save();
    res.status(200).json(comment); // Send updated comment back
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};
