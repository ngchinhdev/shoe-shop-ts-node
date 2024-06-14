"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const uploadFiles_1 = __importDefault(require("../utils/uploadFiles"));
const router = express_1.default.Router();
router.post('/register', uploadFiles_1.default.none(), auth_1.registerUser);
router.post('/login', uploadFiles_1.default.none(), auth_1.loginUser);
router.post('/sendmail', uploadFiles_1.default.none(), auth_1.sendEmail);
router.post('/confirmEmailCode', uploadFiles_1.default.none(), auth_1.confirmEmailCode);
router.post('/update-password', uploadFiles_1.default.none(), auth_1.updatePassword);
router.post('/refresh-token', uploadFiles_1.default.none(), auth_1.newAccessToken);
exports.default = router;
