"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthController_1 = require("../controllers/healthController");
const orders_1 = __importDefault(require("./orders"));
const admin_1 = __importDefault(require("./admin"));
const products_1 = __importDefault(require("./products"));
const router = (0, express_1.Router)();
router.get('/health', healthController_1.healthCheck);
router.use('/products', products_1.default);
router.use('/orders', orders_1.default);
router.use('/admin', admin_1.default);
exports.default = router;
