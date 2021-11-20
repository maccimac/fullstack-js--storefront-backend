"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
describe('Orders handler test:', () => {
    async function fetchToken() {
        const res = await axios_1.default.get('http://localhost:3000/auth?username=maccimac&password=pw123');
        return res.data.token;
    }
    let authToken;
    const orderCred = {
        user_id: 3,
        status: 'pending'
    };
    let orderId;
    it('Order index returns', async () => {
        authToken = await fetchToken();
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/orders",
            headers: {
                Authorization: authToken
            },
        });
        expect(data.length).toBeGreaterThan(0);
    });
    it('Order show returns', async () => {
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/order/1",
            headers: {
                Authorization: authToken
            },
        });
        expect(Boolean(data)).toEqual(true);
    });
    it('Order create adds order', async () => {
        const { data } = await (0, axios_1.default)({
            method: "POST",
            url: "http://localhost:3000/order/",
            headers: {
                Authorization: authToken
            },
            data: orderCred
        });
        orderId = data.id;
        expect(data.user_id).toEqual(orderCred.user_id);
    });
    it('Order update edits order', async () => {
        const { data } = await (0, axios_1.default)({
            method: "PUT",
            url: `http://localhost:3000/order/${orderId}`,
            headers: {
                Authorization: authToken
            },
            data: {
                ...orderCred,
                status: 'complete'
            }
        });
        expect(data.status).toEqual('complete');
    });
});
