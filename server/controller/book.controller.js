import { ApiError } from '../middlewares/errorHandler.js';
import Book from "../model/book.model.js";

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        if (books.length === 0) {
            throw new ApiError(404, 'No books found');
        }
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
        console.log(req.body);
        
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new ApiError(400, 'Book data is required');
        }
        const book = await Book.create(req.body);
        res.status(201).json({
            success: true,
            data: book
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return next(new ApiError(400, Object.values(error.errors).map(err => err.message).join(', ')));
        }
        next(error);
    }
};