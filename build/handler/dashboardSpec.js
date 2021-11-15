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
    it('Products in all orders', async () => {
        authToken = await fetchToken();
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/orders/products",
            headers: {
                Authorization: authToken
            },
        });
        console.log(data);
        expect(data.length).toBeGreaterThan(0);
    });
    it('Fetch product in single order that is complete', async () => {
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/orders/product/1/complete",
        });
        console.log(data);
        expect(data[0].status).toEqual('complete');
    });
    it('Fetch five most expensive products', async () => {
        const { data } = await (0, axios_1.default)({
            method: "GET",
            url: "http://localhost:3000/products/byPrice",
        });
        expect(data.length).toEqual(5);
    });
    /*it('Order create adds order', async ()=>{
      const {data} = await axios({
          method: "POST",
          url: "http://localhost:3000/order/",
          headers: {
            Authorization: authToken
          },
          data: orderCred
        })
        orderId = data.id
        expect(data.user_id).toEqual(orderCred.user_id)
    })

    it('Order update edits order', async ()=>{
      const {data} = await axios({
          method: "PUT",
          url: `http://localhost:3000/order/${orderId}`,
          headers: {
            Authorization: authToken
          },
          data: {
            ... orderCred,
            quantity: 3
          }
        })
        expect(data.quantity).toEqual(3)
    })*/
});
