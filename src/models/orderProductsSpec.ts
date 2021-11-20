import { OrderProduct, OrderProductsStore } from './order-products';
const store = new OrderProductsStore()

describe("OrderProducts model tests", () => {
  it('OrderProduct index method should return rows', async () => {
    const results = await store.index();
    expect(results.length).toBeGreaterThan(0)
  });

  function noResult(result: any){
    const hasResults = Boolean(result)
    expect(hasResults).toEqual(true)
  }

  it('Order show should return details', async () => {
    const result = await store.show(1);
    if(result){
      const expectedKeyArrs = ['id', 'product_id', 'order_id', 'quantity'].sort();
      const keyArrs = await Object.keys(result).sort();
      expect(keyArrs).toEqual(expectedKeyArrs);
    }else{
      noResult(result)
    }
  });

  const orderProdCred = {
    order_id: 3,
    product_id: 10,
    quantity: 5
  }

  let orderProdId: number

  it('OrderProduct create should add order', async()=>{
    const result = await store.create(orderProdCred);
    orderProdId = result.id as number
    if(result){
      expect(result.order_id).toEqual(orderProdCred.order_id);
    }else{
      noResult(result)
    }
  })


  it('OrderProduct update can edit quantity', async()=>{
    const newOrderCred = {
      ...orderProdCred,
      id: orderProdId,
      quantity: 6
    }
    const result = await store.update(newOrderCred);
    if(result){
      expect(result.quantity).toEqual(newOrderCred.quantity);
    }else{
      noResult(result)
    }
  })

  it('OrderProduct update can delete product order', async()=>{
    const result = await store.delete(orderProdId);
    if(result){
      expect(result.status).toEqual('success');
    }else{
      noResult(result)
    }
  })


});
