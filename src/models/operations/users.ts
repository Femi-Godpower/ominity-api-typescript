/*
 * Users operations.
 */

import * as z from "zod/v4";
import { User, UsersListResponse } from "../identity/users/user.js";

export type UsersListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type ListUsersRequest = UsersListParams;
export type ListUsersResponse = UsersListResponse;

export type GetUserRequest = {
  id: number | string;
};

export type GetUserResponse = User;

export type UserCreateInput = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  avatar?: string | null | undefined;
  language?: string | null | undefined;
  password?: string | undefined;
};

export type UserUpdateInput = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  avatar?: string | null | undefined;
  language?: string | null | undefined;
  password?: string | undefined;
};

export type CreateUserRequest = UserCreateInput;
export type CreateUserResponse = User;

export type UpdateUserRequest = {
  id: number | string;
  body: UserUpdateInput;
};

export type UpdateUserResponse = User;

/** @internal */
export const UsersListParams$outboundSchema: z.ZodType<UsersListParams> = z
  .object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    include: z.union([z.string(), z.array(z.string())]).optional(),
    filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
    sort: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const GetUserRequest$outboundSchema: z.ZodType<GetUserRequest> = z
  .object({
    id: z.union([z.string(), z.number()]),
  })
  .loose();

/** @internal */
export const CreateUserRequest$outboundSchema: z.ZodType<CreateUserRequest> = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    avatar: z.string().nullable().optional(),
    language: z.string().nullable().optional(),
    password: z.string().optional(),
  })
  .loose()
  .transform((v) => v as CreateUserRequest);

/** @internal */
export const UpdateUserRequest$outboundSchema: z.ZodType<UpdateUserRequest> = z
  .object({
    id: z.union([z.string(), z.number()]),
    body: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
      avatar: z.string().nullable().optional(),
      language: z.string().nullable().optional(),
      password: z.string().optional(),
    }).loose(),
  }).transform((v) => v as UpdateUserRequest);
