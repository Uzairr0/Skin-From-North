"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = adminLogin;
const env_1 = require("../config/env");
function adminLogin(req, res) {
    const { email, password } = (req.body ?? {});
    const e = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const p = typeof password === 'string' ? password.trim() : '';
    if (!e || !p)
        return res.status(400).json({ ok: false, message: 'Email and password are required' });
    if (e !== env_1.env.adminEmail.toLowerCase() || p !== env_1.env.adminPassword) {
        return res.status(401).json({ ok: false, message: 'Invalid credentials' });
    }
    return res.status(200).json({ ok: true, token: env_1.env.adminToken });
}
