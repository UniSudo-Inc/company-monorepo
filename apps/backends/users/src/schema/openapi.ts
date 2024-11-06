import { z } from '@hono/zod-openapi';
import { insertUserSchema, selectUserSchema } from './db';

export const errorResponseSchema = z
  .object({
    code: z
      .string()
      .optional()
      .openapi({
        examples: ['0123'],
        description: 'The code of the error',
      }),
    status: z.number().openapi({
      examples: [500, 409, 404, 422],
      description: 'The status code of the error',
    }),
    title: z.string().openapi({
      examples: ['NotFoundError', 'ConflictError', 'InternalServerError', 'UnprocessableEntityError'],
      description: 'The title of the error',
    }),
    detail: z.string().openapi({
      examples: ['The user with the id 1 was not found', 'The user with the email john.doe@example.com already exists'],
      description: 'The detail of the error',
    }),
    source: z
      .object({
        pointer: z.string().optional(),
        parameter: z.string().optional(),
        header: z.string().optional(),
      })
      .optional()
      .openapi({
        examples: [{ pointer: '/data/attributes/name' }, { parameter: 'email' }, { header: 'Authorization' }],
        description: 'The source of the error',
      }),
  })
  .openapi('ErrorResponse');
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const getUserParams = z.object({
  id: z.string().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    examples: ['1'],
  }),
});
export type GetUserParams = z.infer<typeof getUserParams>;

export const getUserResponse = z
  .object({
    id: selectUserSchema.shape.id.openapi({
      examples: ['1'],
      description: 'The ID of the user',
    }),
    name: selectUserSchema.shape.name.openapi({
      examples: ['John Doe'],
      description: 'The name of the user',
    }),
    email: selectUserSchema.shape.email.openapi({
      examples: ['john.doe@example.com'],
      description: 'The email of the user',
    }),
    role: selectUserSchema.shape.role.openapi({
      examples: ['admin'],
      description: 'The role of the user',
    }),
    createdAt: selectUserSchema.shape.createdAt.openapi({
      examples: ['2021-01-01T00:00:00Z'],
      description: 'The created at date of the user',
    }),
    updatedAt: selectUserSchema.shape.updatedAt.openapi({
      examples: ['2021-01-01T00:00:00Z'],
      description: 'The updated at date of the user',
    }),
  })
  .openapi('GetUserResponse');
export type GetUserResponse = z.infer<typeof getUserResponse>;

export const createUserRequest = z
  .object({
    name: insertUserSchema.shape.name.openapi({
      examples: ['John Doe'],
      description: 'The name of the user',
    }),
    email: insertUserSchema.shape.email.openapi({
      examples: ['john.doe@example.com'],
      description: 'The email of the user',
    }),
    role: insertUserSchema.shape.role.openapi({
      examples: ['admin'],
      description: 'The role of the user',
    }),
    password: insertUserSchema.shape.password.openapi({
      examples: ['password'],
      description: 'The password of the user',
    }),
  })
  .openapi('CreateUserRequest');
export type CreateUserRequest = z.infer<typeof createUserRequest>;

export const createUserResponse = z
  .object({
    id: selectUserSchema.shape.id.openapi({
      examples: ['1'],
      description: 'The ID of the user',
    }),
  })
  .openapi('CreateUserResponse');
export type CreateUserResponse = z.infer<typeof createUserResponse>;
