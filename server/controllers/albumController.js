import express from 'express';
import mongoose from 'mongoose';

import Album from '../models/album.js';
import User from '../models/user.js';

const router = express.Router();

export const getAlbums = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = LIMIT * (Number(page) - 1);  
    
        const total = await Album.countDocuments({});
        const albums = await Album.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: albums, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getAlbum = async (req, res) => { 
    const { id } = req.params;

    try {
        const album = await Album.findById(id);
        
        res.status(200).json(album);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createAlbum = async (req, res) => {
    const album = req.body;

    const newAlbum = new Album({ ...album, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newAlbum.save();

        let user = await User.findOne({ _id: req.userId });

        let albums = user.albums;
        albums.push(newAlbum);

        await User.findOneAndUpdate({ _id: req.userId }, { albums: albums });

        res.status(201).json(newAlbum);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateAlbum = async (req, res) => {
    const { id } = req.params;
    const { albumName, songs, creator, comments } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No album with id: ${id}`);
    }

    const updatedAlbum = { creator, albumName, songs, comments, _id: id };

    updatedAlbum = await Album.findByIdAndUpdate(id, updatedAlbum, { new: true });

    let user = await User.findOne({ _id: req.userId });

    let albums = user.albums;
    albums = albums.filter(album => album._id != id);
    albums.push(updatedAlbum);

    await User.findOneAndUpdate({ _id: req.userId }, { albums: albums });

    res.json(updatedAlbum);
}

export const deleteAlbum = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No album with id: ${id}`);
    } 

    await Album.findByIdAndRemove(id);

    let user = await User.findOne({ _id: req.userId });

    let albums = user.albums;
    albums = albums.filter(album => album._id != id);

    await User.findOneAndUpdate({ _id: creator }, { albums: albums });

    res.json({ message: "Album deleted successfully." });
}

export const commentAlbum = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No album with id: ${id}`);
    } 
    
    const album = await Album.findById(id);

    album.comments.push(req.body.comment);

    const updatedAlbum = await Album.findByIdAndUpdate(id, album, { new: true });

    let user = await User.findOne({ _id: req.userId });
    
    let albums = user.albums;
    albums = albums.filter(album => album._id != id);
    albums.push(updatedAlbum);

    await User.findOneAndUpdate({ _id: req.userId }, { albums: albums });
    res.status(200).json(updatedAlbum);
}

export default router;