"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.listOrders = listOrders;
exports.updateOrderStatus = updateOrderStatus;
const Order_1 = require("../models/Order");
const sendEmail_1 = require("../utils/sendEmail");
const orderConfirmationEmail_1 = require("../utils/orderConfirmationEmail");
async function createOrder(req, res) {
    try {
        const { customer, items, total } = req.body;
        // Minimal runtime validation (keeps it API-ready without adding a validation library yet)
        if (!customer || typeof customer !== 'object') {
            return res.status(400).json({ ok: false, message: 'Invalid customer' });
        }
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ ok: false, message: 'Items are required' });
        }
        const totalNumber = Number(total);
        if (!Number.isFinite(totalNumber) || totalNumber < 0) {
            return res.status(400).json({ ok: false, message: 'Invalid total' });
        }
        const created = await Order_1.OrderModel.create({
            customer: customer,
            items: items,
            total: totalNumber,
        });
        // Send order confirmation email (do not fail the order if email fails)
        try {
            const c = created.customer;
            const orderItems = created.items.map((i) => {
                const name = String(i?.name ?? '');
                const qty = Number(i?.quantity ?? 0);
                const price = Number(i?.price ?? 0);
                return { name, qty, price };
            });
            const html = (0, orderConfirmationEmail_1.orderConfirmationEmail)({
                customerName: String(c?.name ?? 'Customer'),
                items: orderItems.map((i) => ({ name: i.name, quantity: i.qty, price: i.price })),
                total: totalNumber,
                contactEmail: 'admin@skinfromnorth.com',
            });
            if (typeof c?.email === 'string' && c.email.trim()) {
                await (0, sendEmail_1.sendEmail)({
                    to: c.email.trim(),
                    subject: 'Order Confirmation - Skin From North',
                    html,
                });
            }
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.warn('Order email failed:', e instanceof Error ? e.message : e);
        }
        return res.status(201).json({
            ok: true,
            order: created,
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create order';
        return res.status(400).json({ ok: false, message });
    }
}
async function listOrders(_req, res) {
    try {
        const orders = await Order_1.OrderModel.find().sort({ createdAt: -1 }).lean();
        return res.status(200).json({ ok: true, orders });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch orders';
        return res.status(500).json({ ok: false, message });
    }
}
async function updateOrderStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = (req.body ?? {});
        const next = typeof status === 'string' ? status : '';
        if (!['Pending', 'Confirmed', 'Delivered'].includes(next)) {
            return res.status(400).json({ ok: false, message: 'Invalid status' });
        }
        const updated = await Order_1.OrderModel.findByIdAndUpdate(id, { status: next }, { new: true }).lean();
        if (!updated)
            return res.status(404).json({ ok: false, message: 'Order not found' });
        return res.status(200).json({ ok: true, order: updated });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update order';
        return res.status(500).json({ ok: false, message });
    }
}
