"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("./products");
const store = new products_1.ProductStore();
describe("Product Model", () => {
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
    //   it('should have a show method', () => {
    //   expect(store.show).toBeDefined();
    // });
    //   it('should have a create method', () => {
    //     expect(store.create).toBeDefined();
    //   });
    //
    // /*//   it('should have a update method', () => {
    // //     expect(store.update).toBeDefined();
    // //   });*/
    //
    //   it('should have a delete method', () => {
    //     expect(store.delete).toBeDefined();
    //   });
    //
    //     const bookInitData = {
    //       title: 'Bridge to Terabithia',
    //       total_pages: 250,
    //       author: 'Katherine Paterson',
    //       type: 'Childrens',
    //     summary: 'About a bridge'
    //     }
    //
    //     const bookData = {
    //         id:1,
    //         ...bookInitData
    //     }
    //
    //   it('create method should add a book', async () => {
    //     const result = await store.create(bookInitData);
    //     console.log('create', result)
    //     expect(result).toEqual(bookData);
    //   });
    //
    //   it('index method should return a list of books', async () => {
    //     const result = await store.index();
    //     console.log('index', result);
    //     // expect(result).toEqual([bookData]);
    //     expect(result).toContain(jasmine.objectContaining(bookData));
    //   });
    //
    //   it('show method should return the correct book', async () => {
    //     const result = await store.show("1");
    //     console.log('show', result)
    //     expect(result).toEqual(bookData);
    //   });
    //
    //   it('delete method should remove the book', async () => {
    //     store.delete("1");
    //     const result = await store.index()
    //     console.log('delete', result)
    //     expect(result).toEqual([]);
    //   });
});
