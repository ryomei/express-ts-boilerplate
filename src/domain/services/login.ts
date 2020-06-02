import Login from '../../infrastructure/database/models/login'

class LoginService {
  public async create (loginName: string, password: string) {
    return Login.create({ loginName, password })
      .then((login) => ({ username: login.loginName }))
      .catch(
        (err) => {
          return new Error(err)
        }
      )
  }
}

export default new LoginService()
