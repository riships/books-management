import express from 'express';
import dbconnection from './config/dbConfig.js';
import userRouter from './routes/user.routes.js';
import booksRouter from './routes/books.routes.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express()
const port = 3000;



app.use(express.json());

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
dbconnection();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'library-auth-token'],
    credentials: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);



// Error handling middleware should be last
app.use(errorHandler);

app.listen(port, (err) => {
    if (!err) {
        console.log(`Example app listening on port ${port}!`)
    }
})