import app from './app'
import { sequelize } from './infrastructure/database/sequelize'
import logger from './infrastructure/helpers/winston'
import dotenv from 'dotenv'

dotenv.config()
const log = logger({ context: 'Server' })

log.info('conecting to dialect: ' + process.env.DB_DIALECT)
sequelize.authenticate().then(() => {
  log.info('database connected')
  sequelize.sync()
    .then(() => {
      const port = process.env.PORT || 3000
      log.info('database synced, starting server on port: ' + port)
      app.listen(port)
    })
    .catch((error) => log.error('Sequelize did not sync: ', error))
}).catch((error) => log.error('Sequelize did not authenticate: ', error))
