// Custom error class
export class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: Object.values(err.errors).map(error => error.message)
        });
    }

    // Handle mongoose duplicate key errors
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value entered'
        });
    }

    // Default error
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
}; 