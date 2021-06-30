import mongoose from 'mongoose';

const albumSchema = mongoose.Schema({
    albumName: String,
    name: String,
    songs: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    comments: { type: [String], default: [] },
})

var Album = mongoose.model('Album', albumSchema);

export default Album;