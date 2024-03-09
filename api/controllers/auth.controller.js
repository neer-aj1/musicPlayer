import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async(req, res, next) => {
    const {username, email, password} = req.body;
    const hashed_password = bcryptjs.hashSync(password, 10);
    const user = await User.findOne({$or: [{username}, {email}]});
    if(user){
        res.status(200).json('User alread Exist!!');
    }
    else{
        try {
            const newUser = new User({username, email, password: hashed_password});
            await newUser.save();
            res.status(201).json('User Successfully Created');
        } catch (error) {
            next(error);
        }
    }
}