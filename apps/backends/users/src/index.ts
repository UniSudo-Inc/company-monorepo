import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { logger } from 'hono/logger';
import { handleError, handleNotFound, handleValidation } from '@/helpers/handlers';
import routes from '@/routes';
import { service } from '@/middleware';

const app = new OpenAPIHono<Environment>({ defaultHook: handleValidation })
  .doc31('/doc', {
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'Users API',
    },
  })
  .get('/ui', swaggerUI({ url: '/doc' }))
  .get('/health', (c) => c.text('OK'))
  .onError(handleError)
  .notFound(handleNotFound);

const api = app.use('/api/*', logger(), service).route('/api/v1', routes);

export default api;

export type ApiType = typeof api;
