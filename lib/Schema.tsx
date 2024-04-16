"use client";

import { z } from "zod";

export const DbMockFormSchema = z.object({
  flow: z.string().min(2).max(50),
  mock: z.boolean(),
  databaseUser: z.string().min(2, { message: "Username is required" }).max(50, {
    message: "Username must be less than 50 characters",
  }),
  databasePassword: z
    .string()
    .min(6, { message: "Password is required" })
    .max(50, {
      message: "Password must be less than 50 characters",
    }),
  databaseHostname: z
    .string()
    .min(6, { message: "Password is required" })
    .max(50, {
      message: "Hostname must be less than 50 characters",
    }),
  dependency: z.array(z.string(), { required_error: "Dependency is required" }),
  port: z.string().optional(),
});
