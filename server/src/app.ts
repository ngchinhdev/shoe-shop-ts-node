import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import userRoutes from './routes/user';
import blogRoutes from './routes/blog';
import orderRoutes from './routes/order';
import authRoutes from './routes/auth';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/shoe/products', productRoutes);
app.use('/api/shoe/categories', categoryRoutes);
app.use('/api/shoe/users', userRoutes);
app.use('/api/shoe/blogs', blogRoutes);
app.use('/api/shoe/orders', orderRoutes);
app.use('/api/shoe/auth', authRoutes);

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