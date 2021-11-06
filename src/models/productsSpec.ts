import { Product, ProductStore } from './products';
const store = new ProductStore()

describe("Product Model", () => {
  it('should have an index method', async () => {
    // expect(store.index).toBeDefined();
    const result = await store.index();
    console.log(result)
    expect(result).toBeDefined()
  });

//   it('should have a show method', () => {
//     expect(store.show).toBeDefined();
//   });
//
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
