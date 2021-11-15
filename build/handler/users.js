"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = require("../models/users");
dotenv_1.default.config();
const store = new users_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = req.body;
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.JWT_TOKEN_SECRET);
        res.json({
            user: newUser,
            token,
        });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const username = req.params.username;
        const newUserCred = req.body;
        const updatedUser = await store.update(username, newUserCred);
        const token = jsonwebtoken_1.default.sign({ user: updatedUser }, process.env.JWT_TOKEN_SECRET);
        if (Boolean(updatedUser)) {
            res.json({
                user: updatedUser,
                token,
            });
        }
        else {
            res.json(`cannot update user ${username}`);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    const user = await store.authenticate(req.query.username, req.query.password);
    if (user) {
        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_TOKEN_SECRET);
        res.json({
            token,
            user,
        });
    }
    else {
        res.json(null);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.username);
    res.json(deleted);
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/user/:username', show);
    app.put('/user/:username', update);
    app.post('/user', create);
    app.delete('/user', destroy);
    app.get('/auth', authenticate);
};
exports.default = userRoutes;
