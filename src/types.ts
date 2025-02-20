import z from "zod";

export const SurveyBaseSchema = z.object({
  id: z.string(),
  notes: z.string(),
  created_at: z.string(),
});

export const SurveySchema = z.array(SurveyBaseSchema);
export type Survey = z.infer<typeof SurveyBaseSchema>;
