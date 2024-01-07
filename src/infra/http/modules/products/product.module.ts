import { CreateProduct } from '@application/usecases/products/create-product'
import { FindAllProducts } from '@application/usecases/products/find-all-products'
import { FindProductById } from '@application/usecases/products/find-product-by-id'
import { FindProductByName } from '@application/usecases/products/find-product-by-name'
import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ProductController } from './controllers/product.controller'

@Module({
  imports: [JwtModule, DatabaseModule],
  controllers: [ProductController],
  providers: [
    CreateProduct,
    FindProductByName,
    FindProductById,
    FindAllProducts,
  ],
})
export class ProductModule {}
