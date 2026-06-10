import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  password: z.string().min(1).max(200),
  search: z.string().max(200).optional(),
  lang: z.string().max(8).optional(),
  limit: z.number().int().min(1).max(1000).optional(),
});

export type LeadRow = {
  id: string;
  contact: string;
  services: string;
  lang: string | null;
  user_agent: string | null;
  created_at: string;
};

export const fetchLeads = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || data.password !== expected) {
      return { ok: false as const, error: "Unauthorized" };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin
      .from("leads")
      .select("id, contact, services, lang, user_agent, created_at")
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 500);

    if (data.lang && data.lang !== "all") q = q.eq("lang", data.lang);
    if (data.search && data.search.trim()) {
      const s = data.search.trim().replace(/[%,]/g, "");
      q = q.or(`contact.ilike.%${s}%,services.ilike.%${s}%`);
    }
    const { data: rows, error } = await q;
    if (error) {
      console.error("[fetchLeads]", error);
      return { ok: false as const, error: "Failed to fetch leads" };
    }
    return { ok: true as const, rows: (rows ?? []) as LeadRow[] };
  });
