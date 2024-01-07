import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { ClientModule } from './modules/clients/client.module'
import { ProductModule } from './modules/products/product.module'

@Module({
  imports: [DatabaseModule, AuthModule, ClientModule, ProductModule],
})
export class HTTPModule {}
