import faker from 'faker'
import Login from './../src/infrastructure/database/models/login'
import bcrypt from 'bcrypt'

const buildLogin = async (buildOptions = {
  loginName: faker.internet.userName(),
  password: faker.internet.password()
}) => {
  const passwordHash = await bcrypt.hash(buildOptions.password, 8)
  return Login.build({ loginName: buildOptions.loginName, passwordHash, password: buildOptions.password })
}

export default {
  login: {
    build: buildLogin,
    create: (buildOptions: { loginName: string; password: string } | undefined) => buildLogin(buildOptions).then(model => model.save())
  }
}
