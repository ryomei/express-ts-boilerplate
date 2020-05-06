import express from 'express'
import authService from './../application/auth'

const routes = express.Router()

routes.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(401).send('no credentials provided')

  const login = await authService.login(username, password)
  login.token ? res.send(login) : res.status(401).send({ message: 'invalid login' })
})

export default routes
