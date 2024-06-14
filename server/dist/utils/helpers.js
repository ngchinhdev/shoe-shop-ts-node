"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCodeForEmail = void 0;
function generateCodeForEmail() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}
exports.generateCodeForEmail = generateCodeForEmail;
