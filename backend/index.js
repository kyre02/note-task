import express from 'express';
import env from 'dotenv';
import { connectDb } from './database/connectDb.js';
import cookieParser from 'cookie-parser';
import router from './routes/route.js';
import cors from 'cors';
import path from 'path'

env.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
const __dirname = path.resolve();

const port = process.env.PORT;



app.use('/', router);

// for deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}



app.listen(port, () => {
    connectDb();
    console.log(`Server is running at http://localhost:${port}`);
});

