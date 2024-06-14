"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.createOrder = exports.getOrder = exports.getAllOrders = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const http_errors_1 = __importDefault(require("http-errors"));
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find();
        if (orders.length === 0) {
            return res.status(200).json({ message: 'No orders found' });
        }
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllOrders = getAllOrders;
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrder = getOrder;
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerName, customerEmail, customerPhone, customerAddress, paymentMethod, note, items, userId } = req.body;
    try {
        if (!customerName || !customerEmail || !customerPhone || !customerAddress || !paymentMethod || !(items === null || items === void 0 ? void 0 : items.length)) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const itemParse = JSON.parse(items);
        const newOrder = yield Order_1.default.create({
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
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.createOrder = createOrder;
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield Order_1.default.findByIdAndUpdate(userId, req.body).exec();
        if (!user) {
            throw (0, http_errors_1.default)(404, 'Order not found.');
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrder = updateOrder;
