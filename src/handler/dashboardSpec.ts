import axios from 'axios';

describe('Dashboard handler test:', ()=>{

    async function fetchToken(){
      const res = await axios.get('http://localhost:3000/auth?username=maccimac&password=pw123')
      return res.data.token
    }

    let authToken: string
    let orderId: number

    it('Get products from single order', async ()=>{
      authToken = await fetchToken()

      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/order/1/products",
          headers: {
            Authorization: authToken
          },
        })
      expect(data.length).toBeGreaterThan(0)
    })

    it('Get user of single order', async ()=>{
      authToken = await fetchToken()

      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/order/1/user",
          headers: {
            Authorization: authToken
          },
        })
      expect(data.length).toBeGreaterThan(0)
    })

    it('Fetch five most expensive products', async ()=>{
      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/products/byPrice",
        })
      expect(data.length).toEqual(5)
    })

})
