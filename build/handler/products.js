"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const auth_1 = require("./auth");
const store = new products_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    try {
        const product = {
            // id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const resolvedId = parseInt(req.params.id);
        const product = {
            id: resolvedId,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
        };
        const newProduct = await store.update(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', auth_1.verifyAuth, index);
    app.get('/product/:id', show);
    app.post('/product', auth_1.verifyAuth, create);
    app.put('/product/:id', auth_1.verifyAuth, update);
};
exports.default = productRoutes;
