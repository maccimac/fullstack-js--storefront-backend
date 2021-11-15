import axios from 'axios';

describe('User handler test:', ()=>{
    it('User index returns ', async ()=>{
      const {data} = await axios.get('http://localhost:3000/users');
      expect(data.length).toBeGreaterThan(0)
    })

    it('User auth returns token', async ()=> {
      const {data} = await axios.get('http://localhost:3000/auth?username=maccimac&password=pw123');
      token = data.token
      expect(Boolean(data.token)).toEqual(true)
    })

    const userCred = {
      username: "sample_user_2",
      firstname : "Coquitlam",
      lastname: "Vancouver",
      password: "canada647"
    }
    let token: string
    let userId: string | number

    it('User create can add user', async ()=> {
      const {data} = await axios({
          method: "POST",
          url: `http://localhost:3000/user/`,
          data: userCred,
        })
      expect(Boolean(data)).toEqual(true)
    })

    it('User update can edit', async()=>{
      const {data} = await axios({
          method: "PUT",
          url:  `http://localhost:3000/user/${userCred.username}`,
          data: {
            ...userCred,
            password: "manila45"
          }
        })
      expect(Boolean(data)).toEqual(true)
    })


    it('User delete can remove user', async ()=> {
      const {data} = await axios({
          method: "DELETE",
          url: "http://localhost:3000/user",
          data: {
            username: userCred.username
          },
        })
      expect(data.status).toEqual('success')
    })


})

/*axios({
  method: "POST",
  url: "https://URL.com/api/services/fetchQuizList",
  headers: {
    "x-access-key": data,
    "x-access-token": token,
  },
  data: {
    quiz_name: quizname,
  },
})
.then(res => {
  console.log("res", res.data.message);
})
.catch(err => {
  console.log("error in request", err);
});
*/
