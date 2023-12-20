import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Constants } from './infra/constants'

async function bootstrap() {
  const PORT = Constants.PORT

  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  await app.listen(PORT, () => {
    console.log(`\nApp is running on http://localhost:${PORT}\n`)
  })
}
bootstrap()
