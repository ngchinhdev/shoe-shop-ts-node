import { RequestHandler } from "express";

import OrderModel from "../models/Order";
import { IOrder } from "../types/orders";
import createHttpError from "http-errors";

export const getAllOrders: RequestHandler = async (req, res, next) => {
    try {
        const orders = await OrderModel.find();
        if (orders.length === 0) {
            return res.status(200).json({ message: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

export const getOrder: RequestHandler = async (req, res, next) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const createOrder: RequestHandler<unknown, unknown, IOrder, unknown> = async (req, res, next) => {
    const { customerName, customerEmail, customerPhone, customerAddress, paymentMethod, note, items, userId } = req.body;

    try {
        if (!customerName || !customerEmail || !customerPhone || !customerAddress || !paymentMethod || !items?.length) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const itemParse = JSON.parse(items);
        const newOrder = await OrderModel.create({
            userId,
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            paymentMethod,
            note,
            items: itemParse
        });

        res.status(201).json({ order: newOrder });
    } catch (error) {
        next(error);
    };
};

export const updateOrder: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await OrderModel.findByIdAndUpdate(userId, req.body).exec();

        if (!user) {
            throw createHttpError(404, 'Order not found.');
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};