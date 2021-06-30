import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRouter from './routes/postRouter.js';
import userRouter from "./routes/userRouter.js";
import albumRouter from './routes/albumRouter.js';
import eventRouter from "./routes/eventRouter.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRouter);
app.use("/users", userRouter);
app.use('/events', eventRouter);
app.use("/albums", albumRouter);

const CONNECTION_URL = 'mongodb+srv://interband:interband123@cluster0.jkfna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);