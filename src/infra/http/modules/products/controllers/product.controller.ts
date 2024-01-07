import { CreateProduct } from '@application/usecases/products/create-product'
import { FindAllProducts } from '@application/usecases/products/find-all-products'
import { FindProductById } from '@application/usecases/products/find-product-by-id'
import { FindProductByName } from '@application/usecases/products/find-product-by-name'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateProducRequest_DTO } from '../dtos/create-product-request.dto'
import { CreateProducResponse201_DTO } from '../dtos/create-product-response.dto'
import { FindAllProducts200_DTO } from '../dtos/find-all-products.response.dto'
import {
  FindProductByIdResponse200_DTO,
  FindProductByIdResponse404_DTO,
} from '../dtos/find-product-by-id.response.dto'
import { FindProductByNameRequest_DTO } from '../dtos/find-product-by-name.request'
import {
  FindProductByNameResponse200_DTO,
  FindProductByNameResponse404_DTO,
} from '../dtos/find-product-by-name.response.dto'
import { ProductMapper } from '../mappers/product.mapper'

@Controller('products')
@ApiTags('product')
export class ProductController {
  constructor(
    private createProductCase: CreateProduct,
    private findProductByName: FindProductByName,
    private findProductById: FindProductById,
    private findAllProducts: FindAllProducts,
  ) {}

  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({
    status: 201,
    type: CreateProducResponse201_DTO,
  })
  @Post()
  async create(@Body() payload: CreateProducRequest_DTO) {
    const response = await this.createProductCase.execute(payload)
    return ProductMapper.toHTTP(response)
  }

  @ApiOperation({ summary: 'Find All Products' })
  @ApiResponse({
    description: 'found',
    status: 200,
    type: FindAllProducts200_DTO,
    isArray: true,
  })
  @Get()
  async findAll() {
    const response = await this.findAllProducts.execute()
    return response.map(ProductMapper.toHTTP)
  }

  @ApiOperation({ summary: 'Find a Product By Id' })
  @ApiResponse({
    description: 'found',
    status: 200,
    type: FindProductByIdResponse200_DTO,
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: FindProductByIdResponse404_DTO,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    const response = await this.findProductById.execute({
      productId: id,
    })
    return ProductMapper.toHTTP(response)
  }

  @ApiOperation({ summary: 'Find a Product By Name' })
  @ApiResponse({
    description: 'found',
    status: 200,
    type: FindProductByNameResponse200_DTO,
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: FindProductByNameResponse404_DTO,
  })
  @Get('by/name')
  async findByName(@Body() payload: FindProductByNameRequest_DTO) {
    const response = await this.findProductByName.execute({
      productName: payload.name,
    })
    return ProductMapper.toHTTP(response)
  }
}
