import request from 'supertest'
import app from './../../src/app'
import { syncDatabase } from '../sync-database'
import factory from './../factories'

describe('integration: Login', () => {
  beforeAll(async () => {
    try {
      await syncDatabase()
    } catch (e) {
      console.log(e)
    }
  })

  it('should return 401 when no username and password are provided', async () => {
    const response = await request(app).post('/login').send({})
    expect(response.status).toBe(401)
    expect(response.text).toBe('no credentials provided')
  })

  it('should return a jwt token when valid credentials are provided', async () => {
    const model = await factory.login.create({ loginName: 'test-user', password: 'test-password' })
    const response = await request(app).post('/login').send({ username: model.loginName, password: 'test-password' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should return status 401 when invalid credentials are provided', async () => {
    const model = await factory.login.create({ loginName: 'test-user', password: 'test-password' })
    const response = await request(app).post('/login').send({ username: model.loginName, password: 'wrong-password' })
    expect(response.status).toBe(401)
  })
})
