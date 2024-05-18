import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://wallpapers.com/images/high/l-death-note-cover-a91b4tix2nkz8pfw.webp",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// post model
const Post = mongoose.model("Post", postSchema);

// export model
export default Post;
