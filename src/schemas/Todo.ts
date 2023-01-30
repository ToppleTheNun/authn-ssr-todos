import { z } from "zod";

export const createSchema = z.object({
  title: z.string().min(1),
});

export const updateSchema = createSchema.extend({
  completed: z.boolean(),
});
