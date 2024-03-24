import { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    orgPrice: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: [
        {
            type: String,
            require: true
        }
    ],
    hot: {
        type: Boolean,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    types: [
        {
            size: String,
            quantity: Number
        }
    ],
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

type TProduct = InferSchemaType<typeof productSchema>;

export default model<TProduct>("Product", productSchema);