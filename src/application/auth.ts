import authService from './../domain/services/auth'

class Authentication {
  public async login (username: string, password: string): Promise<{token: string | undefined}> {
    return Promise.resolve({ token: await authService.login(username, password) })
  }
}

export default new Authentication()
