import { User, UserStore } from './users';
const store = new UserStore()

describe("User model tests", () => {
  it('User index method should return rows', async () => {
    const results = await store.index();
    expect(results.length).toBeGreaterThan(0)
  });

  function noResult(result: any){
    const hasResults = Boolean(result)
    expect(hasResults).toEqual(true)
  }

  it('User show should return details', async () => {
    const result = await store.show(1);
    if(result){
      const expectedKeyArrs = [ 'id', 'username', 'firstname', 'lastname', 'password_digest'].sort();
      const keyArrs = await Object.keys(result).sort();
      expect(keyArrs).toEqual(expectedKeyArrs);
    }else{
      noResult(result)
    }
  });
  const userCred = {
    username: 'user_test',
    firstname: 'Udacity',
    lastname: 'NanoDegree',
    password: 'fullstackJs'
  }

  it('User create should add user', async()=>{

    const result = await store.create(userCred);
    if(result){
      expect(result.username).toEqual(userCred.username);
    }else{
      noResult(result)
    }
  })


  it('User auth should include password_digest', async()=>{
    const result = await store.authenticate(userCred.username, userCred.password);
    if(result){
      const hasPwDigest = Boolean(result.password_digest)
      expect(hasPwDigest).toEqual(true);
    }else{
      noResult(result)
    }
  })

  /*it('User update can edit password', async()=>{
    const newUserCred = {
      ...userCred,
      password: 'javascrtipt'
    }

    const result = await store.update(newUserCred);
    if(result){
      expect(result.price).toEqual(updatedProduct.price);
    }else{
      noResult(result)
    }
  })*/

  it('User delete can remove user', async()=>{
    const result = await store.delete(userCred.username);

    if(result){
      expect(result.status).toEqual('success');
    }else{
      noResult(result)
    }
  })



});
