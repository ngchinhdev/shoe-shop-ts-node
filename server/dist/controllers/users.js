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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({ isDeleted: false }).exec();
        if (users.length === 0) {
            throw (0, http_errors_1.default)(404, 'No users found.');
        }
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(userId)) {
            throw (0, http_errors_1.default)(400, 'Invalid user ID.');
        }
        const user = yield User_1.default.findById(userId).exec();
        if (!user) {
            throw (0, http_errors_1.default)(404, 'User not found.');
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.email;
    try {
        const user = yield User_1.default.find({ email: userEmail }).exec();
        if (!user) {
            throw (0, http_errors_1.default)(404, 'User not found.');
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByEmail = getUserByEmail;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, phone, address, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            throw (0, http_errors_1.default)(400, 'Missing required fields.');
        }
        const user = yield User_1.default.create({ fullName, email, phone, address, password });
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(userId)) {
            throw (0, http_errors_1.default)(400, 'Invalid user ID.');
        }
        const user = yield User_1.default.findByIdAndUpdate(userId, req.body).exec();
        if (!user) {
            throw (0, http_errors_1.default)(404, 'User not found.');
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(userId)) {
            throw (0, http_errors_1.default)(400, 'Invalid user ID.');
        }
        const user = yield User_1.default.findByIdAndUpdate(userId, { isDeleted: true }).exec();
        if (!user) {
            throw (0, http_errors_1.default)(404, 'User not found.');
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
