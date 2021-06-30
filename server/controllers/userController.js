import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import mongoose from 'mongoose';

import UserModel from "../models/user.js";

const secret = 'fmicourse';

export const getUsers = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = LIMIT * (Number(page) - 1);  
    
        const total = await UserModel.countDocuments({});
        const users = await UserModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);;

        res.json({ data: users, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
      let user = await UserModel.findById(id);

      let userWithAlbums = await UserModel.findById(id).populate('albums');

      res.status(200).json({albums: JSON.stringify(userWithAlbums.albums), user});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, img, genre } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No user with id: ${id}`);
    }

    let updatedUser = { name, img, genre };

    updatedUser = await UserModel.findByIdAndUpdate(id, updatedUser);

    res.json(updatedUser);
}

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) {
      console.log("user");
      return res.status(404).json({ message: "User doesn't exist" });
    } 

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { name, email, password, img, genre } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ name, email, password: hashedPassword, img, genre });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
