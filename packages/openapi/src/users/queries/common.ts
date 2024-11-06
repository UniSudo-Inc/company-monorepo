// generated with @7nohe/openapi-react-query-codegen@1.6.1 

import { type UseQueryResult } from "@tanstack/react-query";
import { type UsersService } from "../requests/services.gen";

export type UsersServiceGetApiV1UsersByIdDefaultResponse = Awaited<ReturnType<typeof UsersService.getApiV1UsersById>>;
export type UsersServiceGetApiV1UsersByIdQueryResult<TData = UsersServiceGetApiV1UsersByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetApiV1UsersByIdKey = "UsersServiceGetApiV1UsersById";
export const UseUsersServiceGetApiV1UsersByIdKeyFn = ({ id }: {
  id: string;
}, queryKey?: unknown[]) => [useUsersServiceGetApiV1UsersByIdKey, ...(queryKey ?? [{ id }])];
