"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    orgPrice: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: [
        {
            type: String,
            require: true
        }
    ],
    hot: {
        type: Boolean,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    types: [
        {
            size: String,
            quantity: Number
        }
    ],
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Product", productSchema);
