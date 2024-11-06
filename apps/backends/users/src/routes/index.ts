import { OpenAPIHono } from '@hono/zod-openapi';
import getUser from './get-user';

export default new OpenAPIHono<Environment>().route('/users', getUser);
