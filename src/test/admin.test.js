const request = require('supertest')
const app = require('../app')

describe('get best profession between specific time', () => {
  it('should get best profession between specific time', async () => {
    const res = await request(app)
      .get('/admin/best-profession?start=2000-08-14T19:11:26.737Z&end=2022-12-15T19:11:26.737Z')
      expect(res.body[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          fullName: expect.any(String),
          earned: expect.any(Number),
        })
      );
  })
})

describe('get best clients between specific time', () => {
    it('should get best clients between specific time', async () => {
      const res = await request(app)
        .get('/admin/best-clients?start=2000-08-14T19:11:26.737Z&end=2022-12-15T19:11:26.737Z')
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            fullName: expect.any(String),
            paid: expect.any(Number),
          })
        );
    })
})