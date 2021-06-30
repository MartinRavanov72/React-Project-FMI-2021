import express from 'express';

import { getAlbums, getAlbum, createAlbum, updateAlbum, commentAlbum, deleteAlbum } from '../controllers/albumController.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getAlbums);
router.get('/:id', getAlbum);

router.post('/', auth, createAlbum);
router.patch('/:id', auth, updateAlbum);
router.delete('/:id', auth, deleteAlbum);
router.patch('/:id/comment', auth, commentAlbum);

export default router;