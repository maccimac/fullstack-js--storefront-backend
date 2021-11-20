"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_products_1 = require("../models/order-products");
const auth_1 = require("./auth");
const store = new order_products_1.OrderProductsStore();
const index = async (_req, res) => {
    const orderProducts = await store.index();
    res.json(orderProducts);
};
const show = async (req, res) => {
    const orderProduct = await store.show(req.params.id);
    res.json(orderProduct);
};
const create = async (req, res) => {
    try {
        const orderProduct = {
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        const newOrderProducts = await store.create(orderProduct);
        res.json(newOrderProducts);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const resolvedId = parseInt(req.params.id);
        const orderProduct = {
            id: resolvedId,
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        const newOrderProducts = await store.update(orderProduct);
        res.json(newOrderProducts);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const orderProductsRoutes = (app) => {
    app.get('/orderProducts', index);
    app.get('/orderProduct/:id', auth_1.verifyAuth, show);
    app.post('/orderProduct', auth_1.verifyAuth, create);
    app.put('/orderProduct/:id', auth_1.verifyAuth, update);
    app.delete('/orderProduct', auth_1.verifyAuth, destroy);
};
exports.default = orderProductsRoutes;
