"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const auth_1 = require("./auth");
const dashboard = new dashboard_1.DashboardQueries();
const productsInOrders = async (req, res) => {
    const orderId = req.params.id;
    const products = await dashboard.productsInOrders(orderId);
    res.json(products);
};
const userInOrder = async (req, res) => {
    const userId = req.params.id;
    const products = await dashboard.orderUser(userId);
    res.json(products);
};
const productsByPrice = async (_req, res) => {
    const products = await dashboard.productsByPrice();
    res.json(products);
};
const dashboardRoutes = (app) => {
    app.get('/order/:id/products', auth_1.verifyAuth, productsInOrders);
    app.get('/order/:id/user', auth_1.verifyAuth, userInOrder);
    app.get('/products/byPrice', productsByPrice);
};
exports.default = dashboardRoutes;
