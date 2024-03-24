import { type InferSchemaType, Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

type TCategory = InferSchemaType<typeof categorySchema>;

export default model<TCategory>("Category", categorySchema);