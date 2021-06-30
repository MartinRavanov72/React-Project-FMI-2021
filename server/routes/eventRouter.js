import express from 'express';

import { getEvents, getEvent, createEvent, updateEvent, goToEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getEvents);
router.get('/:id', getEvent);

router.post('/', auth, createEvent);
router.patch('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.patch('/:id/goTo', auth, goToEvent);

export default router;