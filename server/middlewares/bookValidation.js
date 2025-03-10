import { body, validationResult } from 'express-validator';

export const validateBook = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('author')
        .trim()
        .notEmpty()
        .withMessage('Author is required'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required'),
    
    // Validation middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]; 