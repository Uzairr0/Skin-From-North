"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
const env_1 = require("../config/env");
function requireAdmin(req, res, next) {
    const raw = req.header('authorization') ?? '';
    const token = raw.toLowerCase().startsWith('bearer ') ? raw.slice(7).trim() : '';
    if (!token || token !== env_1.env.adminToken) {
        return res.status(401).json({ ok: false, message: 'Unauthorized' });
    }
    return next();
}
