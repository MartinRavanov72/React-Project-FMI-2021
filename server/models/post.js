import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    message: String,
    name: String,
    creator: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Post = mongoose.model('Post', postSchema);

export default Post;