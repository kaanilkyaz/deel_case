const request = require('supertest')
const app = require('../app')

describe('get unpaid jobs of user', () => {
  it('should get unpaid jobs of user', async () => {
    const res = await request(app)
      .get('/jobs/unpaid')
      .set('profile_id', '2')
    const paidJobs = res.body.filter(j => j.paid);
    expect(paidJobs.length).toEqual(0)
  })
})

// describe('paying job', () => {
//     it('should pay job', async () => {
//       const res = await request(app)
//         .post('/jobs/6/pay')
//         .set('profile_id', '4')
//       expect(res.text).toEqual("You have already paid your job!")
//     })
// })