"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
const Product_1 = require("../models/Product");
async function listProducts(_req, res) {
    try {
        const products = await Product_1.ProductModel.find().sort({ createdAt: -1 }).lean();
        return res.status(200).json({ ok: true, products });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch products';
        return res.status(500).json({ ok: false, message });
    }
}
