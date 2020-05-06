import { sequelize } from '../src/infrastructure/database/sequelize'

export const syncDatabase = async () => {
  return sequelize.authenticate()
    .then(async () => {
      try {
        await sequelize.sync({ force: true })
      } catch (error) {
        console.error(error)
      }
    })
    .catch((error: Error) => {
      console.error(error)
    })
}
