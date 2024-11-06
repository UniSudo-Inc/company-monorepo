import { type NotFoundHandler, type ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { type Hook } from '@hono/zod-openapi';
import { InternalServerError, NotFoundError, UnprocessableEntityError } from './errors';

export const handleError: ErrorHandler<Environment> = (err, c) => {
  if (err instanceof HTTPException) {
    if (err.status === 500) {
      return c.json(InternalServerError.toResponse(), 500);
    }
  }

  return c.json(InternalServerError.toResponse(), 500);
};

export const handleNotFound: NotFoundHandler<Environment> = (c) => {
  return c.json(NotFoundError.withDetail('The requested resource was not found.').toResponse(), 404);
};

export const handleValidation: Hook<unknown, Environment, '/', unknown> = (result, c) => {
  if (!result.success) {
    return c.json(UnprocessableEntityError.withDetail(result.error.message).toResponse(), 422);
  }
};
