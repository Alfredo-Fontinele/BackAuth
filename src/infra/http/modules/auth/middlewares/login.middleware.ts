import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { signInDTOSchema } from '../dtos/sign-in.dto'

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    await signInDTOSchema.validate(req.body)
    next()
  }
}
