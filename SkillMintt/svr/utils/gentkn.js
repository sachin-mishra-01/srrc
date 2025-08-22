import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const gentkn = (uid , usnm)=>{
    return jwt.sign({id:uid , username: usnm },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
};