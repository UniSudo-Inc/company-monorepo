import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { errorResponseSchema, getUserParams, getUserResponse } from '@/schema/openapi';

const route = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    params: getUserParams,
  },
  tags: ['users'],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: getUserResponse,
        },
      },
      description: 'Success',
    },
    404: {
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
      description: 'Not found',
    },
    500: {
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
      description: 'Internal server error',
    },
  },
});

const getUser = new OpenAPIHono<Environment>().openapi(route, async (c) => {
  const params = c.req.valid('param');

  const result = await c.var.service.getUser(params);

  if (result.isErr) {
    return c.json(result.error.toResponse(), result.error.statusCode);
  }

  return c.json(result.value, 200);
});

export default getUser;
