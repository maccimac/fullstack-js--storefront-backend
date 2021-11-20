"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
describe('Dashboard handler test:', () => {
    async function fetchToken() {
        const res = await axios_1.default.get('http://localhost:3000/auth?username=maccimac&password=pw123');
        return res.data.token;
    }
    let authToken;
    let orderId;
    it('Get products from single order', async () => {
        authToken = await fetchToken();
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/order/1/products",
            headers: {
                Authorization: authToken
            },
        });
        expect(data.length).toBeGreaterThan(0);
    });
    it('Get user of single order', async () => {
        authToken = await fetchToken();
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/order/1/user",
            headers: {
                Authorization: authToken
            },
        });
        expect(data.length).toBeGreaterThan(0);
    });
    it('Fetch five most expensive products', async () => {
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/products/byPrice",
        });
        expect(data.length).toEqual(5);
    });
});
