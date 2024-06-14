"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Create storage for file upload
let storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/images/${req.baseUrl.split('/')[3]}`);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    }
});
// Check file type
// function checkFileUpLoad(req: unknown, file: Express.Multer.File, cb: Function) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('You can only upload image files.'));
//     }
//     cb(null, true);
// }
//Upload file 
exports.default = (0, multer_1.default)({ storage: storage });
