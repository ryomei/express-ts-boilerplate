import Login from '../../infrastructure/database/models/login'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class Auth {
  private generateToken (model: any) {
    if (process.env.JWT_SECRET_KEY) {
      return jwt.sign(JSON.stringify(model), process.env.JWT_SECRET_KEY)
    }
  }

  public async login (loginName: string, password: string) {
    const model = await Login.findOne({ where: { loginName } })
    if (model && await bcrypt.compare(password, model.passwordHash)) {
      var token = this.generateToken(model)
      return token
    }
  }
}

export default new Auth()
