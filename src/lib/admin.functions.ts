import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const listSchema = z.object({
  password: z.string().min(1).max(200),
  search: z.string().max(200).optional(),
  lang: z.string().max(8).optional(),
  limit: z.number().int().min(1).max(1000).optional(),
});

const oneSchema = z.object({
  password: z.string().min(1).max(200),
  id: z.string().uuid(),
});

export type LeadRow = {
  id: string;
  contact: string;
  services: string;
  lang: string | null;
  user_agent: string | null;
  created_at: string;
};

function checkPassword(pw: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && pw === expected;
}

export const fetchLeads = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => listSchema.parse(input))
  .handler(async ({ data }) => {
    if (!checkPassword(data.password)) {
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

export const fetchLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => oneSchema.parse(input))
  .handler(async ({ data }) => {
    if (!checkPassword(data.password)) {
      return { ok: false as const, error: "Unauthorized" };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .select("id, contact, services, lang, user_agent, created_at")
      .eq("id", data.id)
      .maybeSingle();
    if (error) {
      console.error("[fetchLead]", error);
      return { ok: false as const, error: "Failed to fetch lead" };
    }
    if (!row) return { ok: false as const, error: "Not found" };
    return { ok: true as const, row: row as LeadRow };
  });
