import express from 'express'
import restfulRoutes from './interfaces/restful/routes'
import morgan from './infrastructure/helpers/morgan'
import graphqlHTTP from 'express-graphql'
import schema from './interfaces/graphql/schema'

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
      this.express.use(restfulRoutes)
      this.express.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
    }
}

export default new App().express
