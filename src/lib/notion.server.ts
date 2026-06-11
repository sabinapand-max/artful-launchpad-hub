// Server-only Notion sync helper. The `.server.ts` suffix prevents bundling
// into the client.

const GATEWAY_URL = "https://connector-gateway.lovable.dev/notion/v1";
const LEADS_DATABASE_ID = "3781f594-34ad-80f8-9b60-c249a36b5ec0";

type LeadPayload = {
  contact: string;
  services: string;
  lang?: string | null;
  userAgent?: string | null;
  createdAt?: string; // ISO
};

function rt(text: string) {
  return [{ type: "text", text: { content: text.slice(0, 1900) } }];
}

export async function createNotionLeadPage(lead: LeadPayload): Promise<void> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const notionKey = process.env.NOTION_API_KEY;
  if (!lovableKey || !notionKey) {
    console.warn("[notion] missing LOVABLE_API_KEY or NOTION_API_KEY; skipping");
    return;
  }

  const properties: Record<string, unknown> = {
    Name: { title: rt(lead.contact) },
    Services: { rich_text: rt(lead.services) },
    Submitted: {
      date: { start: lead.createdAt ?? new Date().toISOString() },
    },
  };
  if (lead.lang) {
    properties.Language = { select: { name: lead.lang } };
  }
  if (lead.userAgent) {
    properties["User Agent"] = { rich_text: rt(lead.userAgent) };
  }

  const res = await fetch(`${GATEWAY_URL}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": notionKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: LEADS_DATABASE_ID },
      properties,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Notion createPage failed [${res.status}]: ${body.slice(0, 500)}`);
  }
}
