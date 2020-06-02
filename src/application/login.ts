import loginService from './../domain/services/login'

const create = async (username: string, password: string) => {
  return loginService.create(username, password)
}

export default {
  create
}
