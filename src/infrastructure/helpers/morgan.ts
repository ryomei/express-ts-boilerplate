import morgan from 'morgan'
import logger from './winston'

const log = logger({ context: 'morgan' })

const logStream = {
  write: (message: string) => log.info(message)
}

export default morgan('combined', { stream: logStream, skip: () => process.env.NODE_ENV === 'test' })
