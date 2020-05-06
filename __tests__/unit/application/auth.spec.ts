import auth from './../../../src/application/auth'
import { syncDatabase } from '../../sync-database'
import factory from './../../factories'

describe('unit: Authentication application', () => {
  beforeAll(async () => {
    await syncDatabase()
  })
  it('should have a function named login', () => {
    expect(auth.login).toBeDefined()
  })
  it('should successfuly resolve when valid credentials are provided', async () => {
    const loginName = 'test-user'
    const password = 'test-password'
    await factory.login.create({ loginName, password })
    const result = await auth.login(loginName, password)
    expect(result.token).toBeTruthy()
  })

  it('should return empty token when invalid credentials are provided', async () => {
    const loginName = 'test-user'
    const password = 'test-password'
    await factory.login.create({ loginName, password })
    const result = await auth.login(loginName, 'wrong-password')
    expect(result.token).toBeFalsy()
  })
})
