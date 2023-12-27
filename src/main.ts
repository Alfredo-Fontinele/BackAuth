import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { APIDocs } from './docs/config'
import { CONSTANTS } from './infra/CONSTANTS'

async function bootstrap() {
  const PORT = CONSTANTS.PORT

  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  APIDocs.init(app)

  await app.listen(PORT, () => {
    console.log(`\nApp is running on http://localhost:${PORT}\n`)
  })
}
bootstrap()
