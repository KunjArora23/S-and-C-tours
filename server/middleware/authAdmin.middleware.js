// middleware/adminAuth.js
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js'; // Adjust the path as necessary
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    console.log("token", token);
    if (!token) {
      return res.status(401).json({
        message: "Admin not authenticated",
        success: false,
      });
    }
    const decode = jwt.verify(token, JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode._id;
    console.log("decode", decode);
    next();
  } catch (error) {
    console.log("error in adminAuth middleware", error);
    return res.status(401).json({
      message: "Admin not authenticated",
      success: false,
    });
  }
};

