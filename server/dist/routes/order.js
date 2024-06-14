"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const uploadFiles_1 = __importDefault(require("../utils/uploadFiles"));
const helpers_1 = require("../middlewares/helpers");
const router = (0, express_1.Router)();
router.get('/', order_1.getAllOrders);
router.get('/:id', helpers_1.checkValidID, order_1.getOrder);
router.post('/', uploadFiles_1.default.none(), order_1.createOrder);
router.put('/:id', helpers_1.checkValidID, order_1.updateOrder);
exports.default = router;
