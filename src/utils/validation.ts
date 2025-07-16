import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, { message: "Title must be required" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" }),
  image: z.string().url("Image must be a valid URL"),
  createdAt: z.string().optional(),
});
