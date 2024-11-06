import { createMiddleware } from 'hono/factory';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import dbSchema from '@/schema/db';
import { UserStore } from '@/store';
import { UserService } from '@/services';

export const service = createMiddleware<Environment>(async (c, next) => {
  const sql = neon(c.var.NEON_DATABASE_URL);
  const db = drizzleNeon(sql, { schema: dbSchema });
  const store = new UserStore(db);
  c.set('service', new UserService(store));

  await next();
});
