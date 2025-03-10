import { ApiError } from '../middlewares/errorHandler.js';
import Book from "../model/book.model.js";

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        next(error);
    }
};

export const addBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            success: true,
            data: book
        });
    } catch (error) {
        next(error);
    }
};