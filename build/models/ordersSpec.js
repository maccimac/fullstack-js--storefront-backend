"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("./orders");
const store = new orders_1.OrderStore();
describe("Order model tests", () => {
    it('Order index method should return rows', async () => {
        const results = await store.index();
        expect(results.length).toBeGreaterThan(0);
    });
    function noResult(result) {
        const hasResults = Boolean(result);
        expect(hasResults).toEqual(true);
    }
    it('Order show should return details', async () => {
        const result = await store.show(1);
        if (result) {
            const expectedKeyArrs = ['id', 'user_id', 'status'].sort();
            const keyArrs = await Object.keys(result).sort();
            expect(keyArrs).toEqual(expectedKeyArrs);
        }
        else {
            noResult(result);
        }
    });
    const orderCred = {
        user_id: 4,
        status: 'pending'
    };
    let orderId;
    it('Order create should add order', async () => {
        const result = await store.create(orderCred);
        orderId = result.id;
        if (result) {
            expect(result.status).toEqual(orderCred.status);
        }
        else {
            noResult(result);
        }
    });
    it('Order update can edit quantity', async () => {
        const newOrderCred = {
            ...orderCred,
            id: orderId,
            status: 'complete'
        };
        const result = await store.update(newOrderCred);
        if (result) {
            expect(result.status).toEqual(newOrderCred.status);
        }
        else {
            noResult(result);
        }
    });
});
