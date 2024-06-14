"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadFiles_1 = __importDefault(require("../utils/uploadFiles"));
const productController = __importStar(require("../controllers/products"));
const helperMiddlewares = __importStar(require("../middlewares/helpers"));
const router = (0, express_1.Router)();
router.get('/', productController.getProducts);
router.get('/hot', productController.getHotProducts);
router.get('/categoryId/:id', helperMiddlewares.checkValidID, productController.getProductsByCategoryId);
router.get('/categoryName/:name', productController.getProductsByCategoryName);
router.get('/search/:name', productController.getProductBySearchName);
router.get('/:id', helperMiddlewares.checkValidID, productController.getProductById);
router.post('/', uploadFiles_1.default.array('images', 4), productController.createProduct);
router.put('/:id', uploadFiles_1.default.array('images', 4), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
exports.default = router;
