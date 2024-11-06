import { text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { randomId } from '@/helpers/id';
import { now } from '@/helpers/datetime';

export const userIdSchema = z.string().brand('users');
export type UserId = z.infer<typeof userIdSchema>;

export const userRoleSchema = z.enum(['admin', 'customer']);
export type UserRole = z.infer<typeof userRoleSchema>;

export const usersTable = pgTable('users', {
  id: text('id').primaryKey().$type<UserId>().$defaultFn(randomId),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('role').notNull().$type<UserRole>(),
  createdAt: timestamp('created_at').notNull().$defaultFn(now),
  updatedAt: timestamp('updated_at').notNull().$defaultFn(now),
});

export const insertUserSchema = createInsertSchema(usersTable, {
  role: userRoleSchema,
}).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;

export const selectUserSchema = createSelectSchema(usersTable, {
  id: userIdSchema,
  role: userRoleSchema,
}).omit({ password: true });
export type SelectUser = z.infer<typeof selectUserSchema>;

export const updateUserSchema = insertUserSchema.partial();
export type UpdateUser = z.infer<typeof updateUserSchema>;

export default { users: usersTable };
