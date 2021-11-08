"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./handler/products"));
var users_1 = __importDefault(require("./handler/users"));
exports.app = (0, express_1.default)();
exports.port = 3000;
// app.configure(function(){
//
// });
// app.use(bodyParser());
exports.app.use(express_1.default.json());
exports.app.listen(exports.port, function () {
    console.log("Example app listening at http://localhost:" + exports.port);
});
exports.app.get('/', function (req, res) {
    res.send('Hello World');
});
(0, products_1.default)(exports.app);
exports.app.get('/products', function (req, res) {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
(0, users_1.default)(exports.app);
exports.app.get('/user/:id', function (req, res) {
    try {
        res.send('this is the SHOW route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// app.get('/users', (req: express.Request, res: express.Response) => {
//     try {
//         res.send('this is the INDEX route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })
