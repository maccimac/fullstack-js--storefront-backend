"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./handler/products"));
const users_1 = __importDefault(require("./handler/users"));
const orders_1 = __importDefault(require("./handler/orders"));
const dashboard_1 = __importDefault(require("./handler/dashboard"));
exports.app = (0, express_1.default)();
exports.port = 3000;
exports.app.use(express_1.default.json());
exports.app.listen(exports.port, () => {
    console.log(`Example app listening at http://localhost:${exports.port}`);
});
exports.app.get('/', (req, res) => {
    res.send('Hello World');
});
(0, products_1.default)(exports.app);
(0, users_1.default)(exports.app);
(0, orders_1.default)(exports.app);
(0, dashboard_1.default)(exports.app);
