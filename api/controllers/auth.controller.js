import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashed_password = bcryptjs.hashSync(password, 10);
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
        res.status(200).json({ 'message': 'User alread Exist!!' });
    }
    else {
        try {
            const newUser = new User({ username, email, password: hashed_password });
            await newUser.save();
            res.status(201).json({ 'message': 'User Successfully Created' });
        } catch (error) {
            next(error);
        }
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    const  username = email;
    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return next(errorHandler(404, "User not found!"))
        }
        else {
            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return next(errorHandler(401, 'Invalid Credentials!'));
            }
            else {
                console.log(user);
                const token = jwt.sign({name: user.username }, process.env.JWT_SECRET);
                const { password, updatedAt, __v, createdAt, ...rest } = user._doc;
                res.cookie('client_access_token', "token", { maxAge: 10 * 24 * 60 * 60 * 1000 });
                res.cookie('access_token', token, { httpOnly: true, maxAge: 10 * 24 * 60 * 60 * 1000 }).status(200).json(rest);
            }
        }
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.clearCookie('client_access_token');
        res.status(200).json({ 'message': 'User has been logged out!' });
    } catch (error) {
        next(error);
    }
};