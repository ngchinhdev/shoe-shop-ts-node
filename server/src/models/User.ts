import { InferSchemaType, Schema, model } from "mongoose";
import { IUser } from "../types/users";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

type TUser = InferSchemaType<typeof userSchema>;

export default model<TUser>("User", userSchema);