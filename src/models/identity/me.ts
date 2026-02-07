/*
 * /me response models.
 */

import * as z from "zod/v4";
import { Admin, Admin$inboundSchema } from "./admin.js";
import { ApiKey, ApiKey$inboundSchema } from "./api-key.js";
import { User, User$inboundSchema } from "./users/user.js";

export type MeResponse = User | Admin | ApiKey;

/** @internal */
export const MeResponse$inboundSchema: z.ZodType<MeResponse> = z.union([
  User$inboundSchema,
  Admin$inboundSchema,
  ApiKey$inboundSchema,
]);
