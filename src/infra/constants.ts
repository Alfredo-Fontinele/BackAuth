import * as dotenv from 'dotenv'

dotenv.config()

export const Constants = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET_KEY,
}
