import jwt from 'jsonwebtoken';
import User from "../model/user.model.js";
import { ApiError } from "../middlewares/errorHandler.js";

export const addUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone_number, password } = req.body;

        const isUser = await User.findOne({ email });
        if (isUser) {
            throw new ApiError(400, "User already exists");
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            phone_number,
            password
        });
        if (!user) {
            throw new ApiError(400, "Failed to create user");
        }

        return res.status(201).json({
            success: true,
            message: "User created successfully"
        });
    } catch (error) {
        if (error instanceof ApiError) {
            return next(error);
        }
        return next(new ApiError(500, error.message));
    }
};

export const login = async (req, res, next) => {
    try {
        const { firstName, password } = req.body;

        const user = await User.findOne({ firstName });
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid password");
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token
        });
    } catch (error) {
        if (error instanceof ApiError) {
            return next(error);
        }
        return next(new ApiError(500, error.message));
    }
};