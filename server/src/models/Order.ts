import { InferSchemaType, Schema, model } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'banking'],
        required: true
    },
    note: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            _id: false
        }
    ],
}, {
    timestamps: true
});

type TOrder = InferSchemaType<typeof orderSchema>;

export default model<TOrder>('Order', orderSchema);
