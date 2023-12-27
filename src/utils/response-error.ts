import { Response } from 'express'

export const responseError = (
  res: Response,
  error: any,
  status: number = 400,
) => {
  return res.status(status).json({
    message: error.message,
  })
}
