"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQueryParams = exports.checkValidID = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const checkValidID = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose_1.default.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID.' });
    }
    next();
};
exports.checkValidID = checkValidID;
const checkQueryParams = (req, res, next) => {
    const { page, limit } = req.query;
    const sortQuery = req.query.sort || '';
    try {
        let sortOption = {};
        let pageNumber;
        let limitNumber;
        if (sortQuery && typeof sortQuery === 'string') {
            if (sortQuery.startsWith('-')) {
                sortOption[sortQuery.substring(1)] = -1;
            }
            else {
                sortOption[sortQuery] = 1;
            }
        }
        if (page && limit) {
            pageNumber = +page;
            limitNumber = +limit;
        }
        else {
            pageNumber = 1;
            limitNumber = 10;
        }
        const skip = (pageNumber - 1) * limitNumber;
        // req.query = { ...req.query, skip, limitNumber, JSON.stringify(sortOption) };
        next();
    }
    catch (error) {
        throw error;
    }
};
exports.checkQueryParams = checkQueryParams;
