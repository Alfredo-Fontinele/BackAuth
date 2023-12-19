import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Constants } from './infra/constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const PORT = Constants.PORT

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  await app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
  })
}
bootstrap()
