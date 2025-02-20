import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { SurveySchema } from "~/types";

export const postRouter = createTRPCRouter({
  getSurvey: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const key = process.env.API_KEY;
        if (!key) {
          throw new Error("API_KEY is not set");
        }
        const res = await fetch(
          `https://mmyaxhazugbcfqmjryjz.supabase.co/rest/v1/survey?id=eq.${input.id}`,
          {
            method: "GET",
            headers: {
              apikey: process.env.API_KEY!,
            },
          },
        );
        switch (res.status) {
          case 200:
            const json: unknown = await res.json();
            const survey = SurveySchema.parse(json);
            return { message: "Success!", survey };
          case 400:
            return { message: "Invalid request.", error: "NOT_FOUND" };
          case 500:
            return { message: "Internal server error.", error: "SERVER_ERROR" };
          default:
            return { message: "Unexpected Error", error: "UNKNOWN_ERROR" };
        }
      } catch (error) {
        console.error(error);
        return { message: "Unexpected Error", error: "UNKNOWN_ERROR" };
      }
    }),
  updateSurvey: publicProcedure
    .input(z.object({ id: z.string(), notes: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const key = process.env.API_KEY;
        if (!key) {
          throw new Error("API_KEY is not set");
        }
        const res = await fetch(
          `https://mmyaxhazugbcfqmjryjz.supabase.co/rest/v1/survey?id=eq.${input.id}`,
          {
            method: "PUT",
            headers: {
              apikey: process.env.API_KEY!,
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ notes: input.notes }),
          },
        );
        switch (res.status) {
          case 200:
            const json: unknown = await res.json();
            const survey = SurveySchema.parse(json);
            return { message: "Success!", survey };
          case 400:
            return { message: "Invalid request.", error: "NOT_FOUND" };
          case 500:
            return { message: "Internal server error.", error: "SERVER_ERROR" };
          default:
            return { message: "Unexpected Error", error: "UNKNOWN_ERROR" };
        }
      } catch (error) {
        console.error(error);
        return { message: "Unexpected Error", error: "UNKNOWN_ERROR" };
      }
    }),
});
