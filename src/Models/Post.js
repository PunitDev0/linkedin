import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the author
    text: { type: String, required: true },
    image: { type: String }, // Optional post image URL
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now },
      }
    ],
    createdAt: { type: Date, default: Date.now },
  });
  
  const Post = mongoose.models?.Post || mongoose.model('Post', PostSchema)

  export default Post

  