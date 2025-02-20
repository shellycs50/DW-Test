import z from "zod";

export const SurveySchema = z.object({
  id: z.string(),
  notes: z.string(),
  createdAt: z.string(),
});
