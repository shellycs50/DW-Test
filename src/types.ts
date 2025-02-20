import z from "zod";

export const SurveySchema = z.object({
  id: z.string(),
  notes: z.string(),
  createdAt: z.string(),
});

export type Survey = z.infer<typeof SurveySchema>;
