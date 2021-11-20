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
            user_id: req.body.user_id,
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
        const order = {
            id: resolvedId,
            user_id: req.body.user_id,
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
const orderRoutes = (app) => {
    app.get('/orders', auth_1.verifyAuth, index);
    app.get('/order/:id', auth_1.verifyAuth, show);
    app.post('/order', auth_1.verifyAuth, create);
    app.put('/order/:id', auth_1.verifyAuth, update);
};
exports.default = orderRoutes;
