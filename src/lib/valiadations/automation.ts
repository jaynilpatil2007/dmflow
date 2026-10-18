import { z } from "zod";

export const createAutomationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  triggeredKeyword: z.string().trim().min(1).max(100),
  replyMessage: z.string().trim().min(1).max(2000),
  instagramAccountId: z.number().min(1),
});

export const updateAutomationSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    triggeredKeyword: z.string().trim().min(1).max(100).optional(),
    replyMessage: z.string().trim().min(1).max(2000).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });
