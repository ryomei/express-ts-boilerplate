import { createLogger, format, transports } from 'winston'
import path from 'path'

const { combine, printf, label, colorize } = format

const msgTemplate = printf(info => {
  const d = new Date()
  const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`

  return `=> ${time} [${info.level}] ${info.label}: ${info.message}`
})

type LoggerConfig = {
  context: string
}

const options = {
  file: {
    level: 'info',
    filename: path.resolve('logs', 'app.log'),
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    silent: process.env.NODE_ENV === 'test'
  },
  console: {
    level: 'debug',
    format: combine(colorize(), msgTemplate),
    silent: process.env.NODE_ENV === 'test'
  }
}

const logger = (config:LoggerConfig) => createLogger({
  format: combine(
    label({ label: config.context }),
    msgTemplate
  ),
  transports: [
    new transports.Console(options.console),
    new transports.File(options.file)
  ]
})

export default logger
