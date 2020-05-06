import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const database = process.env.DB_NAME || ''
const username = process.env.DB_USER || ''
const password = process.env.DB_PASS || ''
const dialect = process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres'

export const sequelize = new Sequelize(database, username, password, {
  dialect,
  storage: ':memory:',
  models: [path.resolve('src', 'infrastructure', 'database', 'models') + '/*.ts'],
  define: {
    underscored: true,
    timestamps: true
  },
  logging: false
})
