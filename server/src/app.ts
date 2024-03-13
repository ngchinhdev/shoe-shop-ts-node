import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';

import productRoutes from './routes/product';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/shoe/products', productRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, 'Endpoint not found.'));
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;
    if (isHttpError(err)) {
        statusCode = err.status;
        errorMessage = err.message;
    };
    res.status(statusCode).json({ error: errorMessage });
});

export default app;