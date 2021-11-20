import axios from 'axios';

describe('Orders handler test:', ()=>{

    async function fetchToken(){
      const res = await axios.get('http://localhost:3000/auth?username=maccimac&password=pw123')
      return res.data.token
    }

    let authToken: string
    const orderCred = {
      user_id: 3,
      status: 'pending'
    }

    let orderId: number

    it('Order index returns', async ()=>{
      authToken = await fetchToken()

      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/orders",
          headers: {
            Authorization: authToken
          },
        })
      expect(data.length).toBeGreaterThan(0)
    })

    it('Order show returns', async ()=>{
      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/order/1",
          headers: {
            Authorization: authToken
          },
        })
      expect(Boolean(data)).toEqual(true)
    })

    it('Order create adds order', async ()=>{
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
            status: 'complete'
          }
        })
        expect(data.status).toEqual('complete')
    })

})
