import { type Result } from 'true-myth';
import { err, ok } from 'true-myth/result';
import { PostgresError } from 'pg-error-enum';
import { ConflictError, InternalServerError, NotFoundError } from '../helpers/errors';
import { type UserId } from '@/schema/db';
import { type UserStore } from '@/store';
import {
  type CreateUserResponse,
  type CreateUserRequest,
  type GetUserParams,
  type GetUserResponse,
} from '@/schema/openapi';

export class UserService {
  constructor(private readonly userStore: UserStore) {}

  public async getUser(params: GetUserParams): Promise<Result<GetUserResponse, InternalServerError | NotFoundError>> {
    const result = await this.userStore.getUser(params.id as UserId);
    if (result.isErr) {
      return err(InternalServerError);
    }

    const user = result.value;
    if (user.isNothing) {
      return err(NotFoundError);
    }

    return ok(user.value);
  }

  public async createUser(
    req: CreateUserRequest,
  ): Promise<Result<CreateUserResponse, InternalServerError | NotFoundError | ConflictError>> {
    const result = await this.userStore.createUser(req);
    if (result.isErr) {
      if (result.error.code === PostgresError.UNIQUE_VIOLATION) {
        return err(ConflictError);
      }

      return err(InternalServerError);
    }

    const userId = result.value;
    if (userId.isNothing) {
      return err(NotFoundError);
    }

    return ok({ id: userId.value });
  }
}
