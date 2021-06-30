import express from 'express';
import mongoose from 'mongoose';

import Event from '../models/event.js';

const router = express.Router();

export const getEvents = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = LIMIT * (Number(page) - 1);  
    
        const total = await Event.countDocuments({});
        const events = await Event.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: events, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getEvent = async (req, res) => { 
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createEvent = async (req, res) => {
    const event = req.body;

    const newEvent = new Event({ ...event, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { eventName, venue, date, goings } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No event with id: ${id}`);
    }

    let updatedEvent = { eventName, venue, date, goings };

    updatedEvent = await Event.findByIdAndUpdate(id, updatedEvent);

    res.json(updatedEvent);
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No event with id: ${id}`);
    } 

    await Event.findByIdAndRemove(id);

    res.json({ message: "Event deleted successfully." });
}

export const goToEvent = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No event with id: ${id}`);
    } 
    
    const event = await Event.findById(id);

    const index = event.goings.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        event.goings.push(req.userId);
    } else {
        event.goings = event.goings.filter((id) => id !== String(req.userId));
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
    res.status(200).json(updatedEvent);
}

export default router;