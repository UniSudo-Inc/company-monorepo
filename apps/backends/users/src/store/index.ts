import { eq } from 'drizzle-orm';
import { type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { Maybe, Result } from 'true-myth';
import { DatabaseError } from '@neondatabase/serverless';
import { type InsertUser, type SelectUser, type UpdateUser, type UserId, usersTable } from '@/schema/db';
import type dbSchema from '@/schema/db';

export class UserStore {
  constructor(private readonly db: NeonHttpDatabase<typeof dbSchema>) {}

  public async getUsers(): Promise<Result<SelectUser[], DatabaseError>> {
    try {
      const users = await this.db.query.users.findMany();
      return Result.ok(users);
    } catch (e: unknown) {
      if (e instanceof DatabaseError) {
        return Result.err(e);
      }
      throw e;
    }
  }

  public async getUser(id: UserId): Promise<Result<Maybe<SelectUser>, DatabaseError>> {
    try {
      const user = await this.db.query.users.findFirst({ where: eq(usersTable.id, id) });
      return Result.ok(Maybe.of(user));
    } catch (e: unknown) {
      if (e instanceof DatabaseError) {
        return Result.err(e);
      }
      throw e;
    }
  }

  public async createUser(user: InsertUser): Promise<Result<Maybe<UserId>, DatabaseError>> {
    try {
      const result = await this.db.insert(usersTable).values(user).returning({ id: usersTable.id });
      return Result.ok(Maybe.of(result[0]?.id));
    } catch (e: unknown) {
      if (e instanceof DatabaseError) {
        return Result.err(e);
      }
      throw e;
    }
  }

  public async updateUser(id: UserId, user: UpdateUser): Promise<Result<Maybe<UserId>, DatabaseError>> {
    try {
      const result = await this.db
        .update(usersTable)
        .set(user)
        .where(eq(usersTable.id, id))
        .returning({ id: usersTable.id });
      return Result.ok(Maybe.of(result[0]?.id));
    } catch (e: unknown) {
      if (e instanceof DatabaseError) {
        return Result.err(e);
      }
      throw e;
    }
  }

  public async deleteUser(id: UserId): Promise<Result<Maybe<UserId>, DatabaseError>> {
    try {
      const result = await this.db.delete(usersTable).where(eq(usersTable.id, id)).returning({ id: usersTable.id });
      return Result.ok(Maybe.of(result[0]?.id));
    } catch (e: unknown) {
      if (e instanceof DatabaseError) {
        return Result.err(e);
      }
      throw e;
    }
  }
}
