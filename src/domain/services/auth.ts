import Login from '../../infrastructure/database/models/login'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class Auth {
  private generateToken (model: any) {
    if (process.env.JWT_SECRET_KEY) {
      const { id, loginName } = model
      const loginTime = new Date()
      return jwt.sign(JSON.stringify({ id, loginName, loginTime }), process.env.JWT_SECRET_KEY)
    }
  }

  public async login (loginName: string, password: string) {
    const model = await Login.findOne({ where: { loginName } })
    let token = null
    if (model && await bcrypt.compare(password, model.passwordHash)) {
      token = this.generateToken(model)
    }
    return token
  }

  public decodeToken (token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const secretKey = process.env.JWT_SECRET_KEY
      if (!secretKey) {
        return Promise.reject(new Error('JWT secret key not found'))
      }
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(err)
        }
        resolve(decoded)
      })
    })
  }
}

export default new Auth()
