import * as dotenv from 'dotenv'

dotenv.config()

export const CONSTANTS = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
}
