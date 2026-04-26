"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
}, { _id: false });
const itemSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true, trim: true },
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    customer: { type: customerSchema, required: true },
    items: { type: [itemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Confirmed', 'Delivered'],
        default: 'Pending',
    },
}, { timestamps: true });
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
