import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  contact: z.string().trim().min(5).max(200),
  services: z.string().trim().min(2).max(2000),
  lang: z.string().trim().max(8).optional(),
  userAgent: z.string().trim().max(500).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({
      contact: data.contact,
      services: data.services,
      lang: data.lang ?? null,
      user_agent: data.userAgent ?? null,
    });
    if (error) {
      console.error("[submitLead] insert failed:", error);
      return { ok: false as const, error: "Failed to save your message. Please try again." };
    }
    return { ok: true as const };
  });
