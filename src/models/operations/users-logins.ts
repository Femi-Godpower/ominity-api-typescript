/*
 * User logins operations.
 */

import * as z from "zod/v4";
import {
  UserLogin,
  UserLoginsListResponse,
} from "../identity/users/user-login.js";

export type UserLoginsListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type ListUserLoginsRequest = UserLoginsListParams & {
  userId: number | string;
};
export type ListUserLoginsResponse = UserLoginsListResponse;

export type GetUserLoginRequest = {
  userId: number | string;
  loginId: number | string;
};
export type GetUserLoginResponse = UserLogin;

export type UserLoginCreateInput = {
  ipAddress: string;
  userAgent: string;
};

export type CreateUserLoginRequest = {
  userId: number | string;
  body: UserLoginCreateInput;
};
export type CreateUserLoginResponse = UserLogin;

/** @internal */
export const UserLoginsListParams$outboundSchema: z.ZodType<
  UserLoginsListParams
> = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const ListUserLoginsRequest$outboundSchema: z.ZodType<
  ListUserLoginsRequest
> = z.object({
  userId: z.union([z.string(), z.number()]),
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const GetUserLoginRequest$outboundSchema: z.ZodType<
  GetUserLoginRequest
> = z.object({
  userId: z.union([z.string(), z.number()]),
  loginId: z.union([z.string(), z.number()]),
}).loose();

/** @internal */
const UserLoginCreateInput$outboundSchema: z.ZodType<UserLoginCreateInput> = z
  .object({
    ipAddress: z.string(),
    userAgent: z.string(),
  })
  .loose();

/** @internal */
export const CreateUserLoginRequest$outboundSchema: z.ZodType<
  CreateUserLoginRequest
> = z.object({
  userId: z.union([z.string(), z.number()]),
  body: UserLoginCreateInput$outboundSchema,
}).transform((v) => v as CreateUserLoginRequest);
