import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RedocModule, RedocOptions } from 'nestjs-redoc'

export const APIDocs = {
  async init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('BackAuth')
      .setDescription('BackAuth - The Backend API Authentication')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)

    const redocOptions: RedocOptions = {
      favicon:
        'https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png',
      title: 'BackAuth',
      logo: {
        url: 'https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png',
        altText: 'Backend Auth - Logo',
      },
      sortPropsAlphabetically: true,
      hideDownloadButton: false,
      hideHostname: false,
      auth: {
        enabled: true,
        user: 'admin',
        password: '123',
      },
      tagGroups: [
        {
          name: 'Clients',
          tags: ['client'],
        },
        {
          name: 'Authentication',
          tags: ['auth'],
        },
        {
          name: 'Products',
          tags: ['product'],
        },
      ],
    }

    await RedocModule.setup('/docs', app as any, document, redocOptions)
  },
}
