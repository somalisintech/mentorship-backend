import { Response, Request, NextFunction } from 'express'

// TODO: Add error handling so we can throw errors and forget, letting this middleware handle the response.
export const handleApiErrors = (err: any, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  })
  next()
}
