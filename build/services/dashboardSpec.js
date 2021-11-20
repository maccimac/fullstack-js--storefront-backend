"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("./dashboard");
const store = new dashboard_1.DashboardQueries();
describe("Dashboad model tests", () => {
    it('Fetch products in single order should return rows', async () => {
        const results = await store.productsInOrders('1');
        expect(results.length).toBeGreaterThan(0);
    });
    it('Fetch user of a single order should return rows', async () => {
        const results = await store.orderUser('1');
        expect(results.length).toBeGreaterThan(0);
    });
    function noResult(result) {
        const hasResults = Boolean(result);
        expect(hasResults).toEqual(true);
    }
    it('Fetch products by price should return five expensive items', async () => {
        const results = await store.productsByPrice();
        expect(results.length).toEqual(5);
    });
});
