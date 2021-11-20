import axios from 'axios';

describe('Dashboard handler test:', ()=>{

    async function fetchToken(){
      const res = await axios.get('http://localhost:3000/auth?username=maccimac&password=pw123')
      return res.data.token
    }

    let authToken: string
    let orderId: number

    it('All products ordered', async ()=>{
      authToken = await fetchToken()

      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/orders/products",
          headers: {
            Authorization: authToken
          },
        })
      expect(data.length).toBeGreaterThan(0)
    })

    it('Fetch product in single order that is complete', async ()=>{
      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/orders/product/1/complete",
        })
      expect(data[0].status).toEqual('complete')
    })

    it('Fetch five most expensive products', async ()=>{
      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/products/byPrice",
        })
      expect(data.length).toEqual(5)
    })

})
