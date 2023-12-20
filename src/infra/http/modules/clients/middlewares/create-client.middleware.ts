import { NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { createClientDTOSchema } from '../dtos/create-client.dto'

export class CreateClientMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    await createClientDTOSchema.validate(req.body)
    next()
  }
}
