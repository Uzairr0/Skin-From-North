"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 5000),
    mongoUri: process.env.MONGO_URI ?? '',
    clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
    adminEmail: process.env.ADMIN_EMAIL ?? 'admin@skinfromnorth.com',
    adminPassword: process.env.ADMIN_PASSWORD ?? 'admin123',
    adminToken: process.env.ADMIN_TOKEN ?? 'admin123',
    emailUser: process.env.EMAIL_USER ?? '',
    emailPass: process.env.EMAIL_PASS ?? '',
};
