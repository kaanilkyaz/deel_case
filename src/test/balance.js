const request = require('supertest')
const app = require('../app')

describe('deposit money the account', () => {
  it('should deposit money someone else account', async () => {
    const res = await request(app)
      .post('/balance/deposit/1')
      .set('profile_id', '2')
      .send({ amount: 100 })
      expect(res.statusCode).toEqual(404)
      expect(res.type).toEqual('')
      expect(res.text).toEqual("You can only deposit money to your account!")
  })
})

describe('deposit money the account', () => {
    it('should deposit money someone else account', async () => {
      const res = await request(app)
        .post('/balance/deposit/2')
        .set('profile_id', '2')
        .send({ amount: 100 })
        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual('application/json')
        expect(res.text).toEqual('deposit is successful')
    })
})