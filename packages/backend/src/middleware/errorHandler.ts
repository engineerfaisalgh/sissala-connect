import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Log the error
  if (statusCode >= 500) {
    logger.error({
      error: error,
      statusCode,
      path: req.path,
      method: req.method,
    });
  } else {
    logger.warn({
      message,
      statusCode,
      path: req.path,
    });
  }

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
};

export class AppError extends Error implements ApiError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
