import express from 'express'
import routes from './interfaces/routes'
import morgan from './infrastructure/helpers/morgan'

class App {
    public express: express.Application

    constructor () {
      // app instance
      this.express = express()
      // logging
      this.express.use(morgan)
      // global middlewares, before any route.
      this.express.use(express.json())
      // routes
      this.express.use(routes)
    }
}

export default new App().express
