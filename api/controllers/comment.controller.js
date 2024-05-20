import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async(req,res,next)=>{
    try {
        // collecting comment details
        const {content,postId,userId} = req.body;
        // user verification
        if (userId !== req.user.id){
            return next(errorHandler(403,"Only users can post a comment"))
        }
        // new comment
        const newComment = new Comment({
            content,
            postId,
            userId
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        next(error)
    }
}