"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const env = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_CONNECTION_STRING: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)()
});
exports.default = env;
