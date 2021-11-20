"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
describe('OrderProducts handler test:', () => {
    async function fetchToken() {
        const res = await axios_1.default.get('http://localhost:3000/auth?username=maccimac&password=pw123');
        return res.data.token;
    }
    let authToken;
    const orderProductCred = {
        order_id: 3,
        product_id: 10,
        quantity: 5
    };
    let orderProductId;
    it('OrderProduct index returns all product orders', async () => {
        authToken = await fetchToken();
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/orderProducts",
            headers: {
                Authorization: authToken
            },
        });
        expect(data.length).toBeGreaterThan(0);
    });
    it('OrderProduct show returns details', async () => {
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/orderProduct/1",
            headers: {
                Authorization: authToken
            },
        });
        expect(Boolean(data)).toEqual(true);
    });
    it('OrderProduct create order products', async () => {
        const { data } = await (0, axios_1.default)({
            method: "POST",
            url: "http://localhost:3000/orderProduct/",
            headers: {
                Authorization: authToken
            },
            data: orderProductCred
        });
        orderProductId = data.id;
        expect(data.product_id).toEqual(orderProductCred.product_id);
    });
    it('OrderProduct update edits order', async () => {
        const { data } = await (0, axios_1.default)({
            method: "PUT",
            url: `http://localhost:3000/orderProduct/${orderProductId}`,
            headers: {
                Authorization: authToken
            },
            data: {
                ...orderProductCred,
                quantity: 3
            }
        });
        expect(data.quantity).toEqual(3);
    });
    it('OrderProduct deletes order', async () => {
        const { data } = await (0, axios_1.default)({
            method: "DELETE",
            url: `http://localhost:3000/orderProduct`,
            headers: {
                Authorization: authToken
            },
            data: {
                id: orderProductId
            }
        });
        expect(data.status).toEqual('success');
    });
});
