import axios from 'axios';

describe('User handler test:', ()=>{
    it('User index returns ', async ()=>{
      const {data} = await axios.get('http://localhost:3000/users');
      expect(data.length).toBeGreaterThan(0)
    })

    it('User auth returns token', async ()=> {
      const {data} = await axios.get('http://localhost:3000/auth?username=maccimac&password=pw123');
      expect(Boolean(data.token)).toEqual(true)

    })

    /*it('User index', async ()=>{
      axios.get('https://example.com/getSomething', {
       headers: {
         Authorization: 'Bearer ' + token //the token is a variable which holds the token
       }
      })
      expect(Boolean(response)).toEqual(true)
    })*/
})
