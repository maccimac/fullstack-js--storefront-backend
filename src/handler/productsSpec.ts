import axios from 'axios';

describe('Product handler test:', ()=>{

    async function fetchToken(){
      const res = await axios.get('http://localhost:3000/auth?username=maccimac&password=pw123')
      return res.data.token
    }

    let authToken: string
    let productId: string | number
    const newProduct = {
      name: 'dalisay',
      price: 8,
      brand: 'simoy ng haraya'
    }

    it('Product index returns', async ()=>{
      authToken = await fetchToken()

      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/products",
          headers: {
            Authorization: authToken
          },
        })
      expect(data.length).toBeGreaterThan(0)
    })

    it('Product show returns', async ()=>{
      const {data} = await axios({
          method: "GET",
          url: "http://localhost:3000/product/1",
        })
      expect(Boolean(data)).toEqual(true)
    })

    it('Product create adds product', async ()=>{
      const {data} = await axios({
          method: "POST",
          url: "http://localhost:3000/product/",
          headers: {
            Authorization: authToken
          },
          data: newProduct
        })

        productId = data.id
        expect(data.name).toEqual(newProduct.name)
    })

    it('Product update edits product', async ()=>{
      const {data} = await axios({
          method: "PUT",
          url: `http://localhost:3000/product/${productId}`,
          headers: {
            Authorization: authToken
          },
          data: {
            ... newProduct,
            price: 9
          }
        })
        expect(data.price).toEqual(9)
    })

})
