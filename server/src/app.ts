import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';

import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import userRoutes from './routes/user';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/shoe/products', productRoutes);
app.use('/api/shoe/categories', categoryRoutes);
app.use('/api/shoe/users', userRoutes);

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