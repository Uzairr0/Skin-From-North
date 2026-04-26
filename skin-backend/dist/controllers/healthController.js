"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = healthCheck;
function healthCheck(_req, res) {
    res.status(200).json({ ok: true, service: 'skin-backend', time: new Date().toISOString() });
}
