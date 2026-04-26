"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const routes_1 = __importDefault(require("./routes"));
async function main() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: env_1.env.clientOrigin,
        credentials: true,
    }));
    app.use(express_1.default.json({ limit: '1mb' }));
    app.get('/', (_req, res) => {
        res.type('text').send('API running');
    });
    app.use('/api', routes_1.default);
    // Basic error handler (ready for API errors)
    app.use((err, _req, res, _next) => {
        const message = err instanceof Error ? err.message : 'Internal server error';
        res.status(500).json({ message });
    });
    try {
        await (0, db_1.connectDb)();
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.warn('MongoDB not connected:', e instanceof Error ? e.message : e);
    }
    app.listen(env_1.env.port, () => {
        // eslint-disable-next-line no-console
        console.log(`API listening on http://localhost:${env_1.env.port}`);
    });
}
void main();
