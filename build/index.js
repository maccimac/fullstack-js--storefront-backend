"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./handler/products"));
exports.app = (0, express_1.default)();
exports.port = 3000;
exports.app.listen(exports.port, function () {
    console.log("Example app listening at http://localhost:" + exports.port);
});
exports.app.get('/', function (req, res) {
    res.send('Hello World');
});
(0, products_1.default)(exports.app);
exports.app.get('/articles', function (req, res) {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
