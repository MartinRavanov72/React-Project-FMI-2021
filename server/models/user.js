import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  img: { type: String, required: true },
  genre: { type: String, required: true },
  id: { type: String },
  albums: [{
    type: mongoose.Types.ObjectId,
    ref: "Album",
  }]
});

export default mongoose.model("User", userSchema);