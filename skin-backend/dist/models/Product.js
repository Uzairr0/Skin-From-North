"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    skinType: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
