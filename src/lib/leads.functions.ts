import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  services: z.string().trim().min(2).max(2000),
  lang: z.string().trim().max(8).optional(),
  userAgent: z.string().trim().max(500).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const phone = data.phone?.trim() ? data.phone.trim() : null;
    const contact = phone ? `${data.email} · ${phone}` : data.email;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({
      contact,
      email: data.email,
      phone,
      services: data.services,
      lang: data.lang ?? null,
      user_agent: data.userAgent ?? null,
    });
    if (error) {
      console.error("[submitLead] insert failed:", error);
      return { ok: false as const, error: "Failed to save your message. Please try again." };
    }

    // Mirror to Notion. Failures are logged but do not block the user — the
    // lead is already safely stored in the database.
    try {
      const { createNotionLeadPage } = await import("./notion.server");
      await createNotionLeadPage({
        contact,
        services: data.services,
        lang: data.lang,
        userAgent: data.userAgent,
        createdAt: new Date().toISOString(),
      });
    } catch (notionErr) {
      console.error("[submitLead] notion sync failed:", notionErr);
    }

    return { ok: true as const };
  });
