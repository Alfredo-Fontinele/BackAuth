declare module NodeJS {
  interface ProcessEnv {
    PORT: number
    SECRET_KEY: string
    DATABASE_URL: string
  }
}
