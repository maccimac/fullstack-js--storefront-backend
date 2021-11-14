"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const auth_1 = require("./auth");
const store = new orders_1.OrderStore();
const index = async (_req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const show = async (req, res) => {
    const order = await store.show(req.params.id);
    res.json(order);
};
const create = async (req, res) => {
    try {
        const order = {
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            quantity: req.body.quantity,
            status: req.body.status
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const resolvedId = parseInt(req.params.id);
        console.log(resolvedId);
        const order = {
            id: resolvedId,
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            quantity: req.body.quantity,
            status: req.body.status
        };
        const newOrder = await store.update(order);
        res.json(newOrder);
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
const orderRoutes = (app) => {
    app.get('/orders', auth_1.verifyAuth, index);
    app.get('/order/:id', auth_1.verifyAuth, show);
    app.post('/order', auth_1.verifyAuth, create);
    app.put('/order/:id', auth_1.verifyAuth, update);
    app.delete('/order', auth_1.verifyAuth, destroy);
};
exports.default = orderRoutes;
