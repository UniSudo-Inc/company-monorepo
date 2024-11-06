// generated with @7nohe/openapi-react-query-codegen@1.6.1 

import { type QueryClient } from "@tanstack/react-query";
import { UsersService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @param data The data for the request.
* @param data.id
* @returns GetUserResponse Success
* @throws ApiError
*/
export const prefetchUseUsersServiceGetApiV1UsersById = (queryClient: QueryClient, { id }: {
  id: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiV1UsersByIdKeyFn({ id }), queryFn: () => UsersService.getApiV1UsersById({ id }) });
