import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//routes
import authRoute from './routes/auth.route.js'

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(`Error occured during connection: ${err}`);
    });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running");
})

app.use('/api/auth', authRoute);

app.get('*', (req, res) => {
    res.send("This is the backend")
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
