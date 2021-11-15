"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("./products");
const store = new products_1.ProductStore();
describe("Product model tests: ", () => {
    it('Product index method should return rows', async () => {
        const results = await store.index();
        expect(results.length).toBeGreaterThan(0);
    });
    function noResult(result) {
        const hasResults = Boolean(result);
        expect(hasResults).toEqual(true);
    }
    it('Product show should return details', async () => {
        const result = await store.show(1);
        if (result) {
            const expectedKeyArrs = ['id', 'name', 'price', 'brand'].sort();
            const keyArrs = await Object.keys(result).sort();
            expect(keyArrs).toEqual(expectedKeyArrs);
        }
        else {
            noResult(result);
        }
    });
    it('Product create should add product', async () => {
        const newProduct = {
            name: 'double-ended liner',
            price: 3,
            brand: 'issy and co'
        };
        const result = await store.create(newProduct);
        if (result) {
            expect(result.name).toEqual(newProduct.name);
        }
        else {
            noResult(result);
        }
    });
    it('Product update should edit product', async () => {
        const updatedProduct = {
            id: 1,
            name: 'haloscope',
            price: 27,
            brand: 'glossier by into the gloss'
        };
        const result = await store.update(updatedProduct);
        if (result) {
            expect(result.price).toEqual(updatedProduct.price);
        }
        else {
            noResult(result);
        }
    });
});
