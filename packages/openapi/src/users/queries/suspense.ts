// generated with @7nohe/openapi-react-query-codegen@1.6.1 

import { type UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { UsersService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @param data The data for the request.
* @param data.id
* @returns GetUserResponse Success
* @throws ApiError
*/
export const useUsersServiceGetApiV1UsersByIdSuspense = <TData = Common.UsersServiceGetApiV1UsersByIdDefaultResponse, TError = unknown, TQueryKey extends unknown[] = unknown[]>({ id }: {
  id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiV1UsersByIdKeyFn({ id }, queryKey), queryFn: () => UsersService.getApiV1UsersById({ id }) as TData, ...options });
