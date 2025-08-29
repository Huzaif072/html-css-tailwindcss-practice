export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = { message, statusCode: 404 };
    }

    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = { message, statusCode: 400 };
    }

    if (err.name === 'MongooseServerSelectionError' || err.name === 'MongoNetworkError') {
        const message = 'Database connection error';
        error = { message, statusCode: 503 };
    }

    if (err.type === 'entity.parse.failed') {
        const message = 'Invalid JSON format';
        error = { message, statusCode: 400 };
    }

    if (err.statusCode === 429) {
        const message = 'Too many requests, please try again later';
        error = { message, statusCode: 429 };
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};