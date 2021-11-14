"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
const productsInOrders = async (_req, res) => {
    const products = await dashboard.productsInOrders();
    res.json(products);
};
const productsByPrice = async (_req, res) => {
    const products = await dashboard.productsByPrice();
    res.json(products);
};
const fetchProductOrder = async (req, res) => {
    console.log(req.params);
    const resolvedOrderStatus = req.params.orderStatus ? req.params.orderStatus : false;
    const orders = await dashboard.fetchProduct(req.params.productId, resolvedOrderStatus);
    res.json(orders);
};
const dashboardRoutes = (app) => {
    app.get('/orders/products', productsInOrders);
    app.get('/orders/product/:productId', fetchProductOrder);
    app.get('/orders/product/:productId/:orderStatus', fetchProductOrder);
    app.get('/products/byPrice', productsByPrice);
};
exports.default = dashboardRoutes;
