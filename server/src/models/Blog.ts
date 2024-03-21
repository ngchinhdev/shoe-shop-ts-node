import { InferSchemaType, Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

type TBlog = InferSchemaType<typeof blogSchema>;

export default model<TBlog>("Blog", blogSchema);