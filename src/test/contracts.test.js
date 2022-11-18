const request = require('supertest')
const app = require('../app')

describe('get specific contracts of user', () => {
  it('should not get the contract of another user', async () => {
    const res = await request(app)
      .get('/contracts/2')
      .set('profile_id', '2')
    expect(res.statusCode).toEqual(404)
    expect(res.type).toEqual('')
    expect(res.text).toEqual('You can only get your contracts')
  })
})

describe('get specific contracts of user', () => {
  it('should get specific contract', async () => {
    const res = await request(app)
      .get('/contracts/2')
      .set('profile_id', '1')
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body.ClientId).toEqual(1)
    expect(res.body.id).toEqual(2)
  })
})

describe('get contracts of user with id 2', () => {
  it('should get all contracts', async () => {
    const res = await request(app)
      .get('/contracts')
      .set('profile_id', '2')
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    const unExpectedContracts = res.body.filter(c => c.ContractorId !== 2 && c.ClientId !== 2);
    expect(unExpectedContracts.length).toEqual(0)    
  })
})