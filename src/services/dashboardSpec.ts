import { OrderSummary, DashboardQueries } from './dashboard';
const store = new DashboardQueries()

describe("Dashboad model tests", () => {
  it('Fetch products should return rows', async () => {
    const results = await store.fetchProduct(1);
    expect(results.length).toBeGreaterThan(0)
  });

  function noResult(result: any){
    const hasResults = Boolean(result)
    expect(hasResults).toEqual(true)
  }

  it('Fetch products by price should return five expensive items', async () => {
    const results = await store.productsByPrice();
    expect(results.length).toEqual(5)
  });

  it('Fetch products in orders should return rows', async () => {
    const results = await store.productsInOrders();
    expect(results.length).toBeGreaterThan(0)
  });

});
