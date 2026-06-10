## Goal
1. Mirror every chat-widget submission into your Notion leads database (keep saving to the Cloud DB as backup).
2. Make the admin leads page discoverable so you can actually open it.

## What I'll do

### 1. Link your Notion connection to this project
Your workspace already has "sabina's Notion" connected, but it isn't linked to this project yet. I'll link it so `NOTION_API_KEY` becomes available to the server. (You'll get a one-click confirm prompt.)

### 2. Detect your Notion database
Your link is `…/p/3781f59434ad80f89b60c249a36b5ec0?v=…` — that's a page-embedded database. After the connector is linked, I'll call the Notion API through Lovable's gateway to:
- Resolve the database ID (`3781f59434ad80f89b60c249a36b5ec0` reformatted as a UUID).
- Read its schema (property names + types) so I map fields correctly to whatever columns you created (Title/Contact/Services/Language/Source/Date), without guessing.

**Important on your side:** in Notion, open the database → `•••` menu → "Connections" → add the same Notion integration that's connected to Lovable. Without this the API returns 404 on the database. If the integration isn't shared, the next step will fail and I'll surface a clear error telling you to share it.

### 3. Add a Notion sync helper
New file `src/lib/notion.server.ts` (server-only, never bundled to client):
- `createLeadPage({ contact, services, lang, userAgent, createdAt })`
- Calls `POST /v1/pages` via the connector gateway with `parent.database_id` and a `properties` payload built from the schema discovered in step 2.
- Wrapped in try/catch — Notion failures are logged but do NOT block the database insert (your leads are never lost if Notion is down).

### 4. Hook it into the existing submit flow
Edit `src/lib/leads.functions.ts`:
- After the successful `supabaseAdmin.from("leads").insert(...)`, fire-and-await `createLeadPage(...)`.
- Same return shape; user still sees the "sent" confirmation.

### 5. Fix admin discoverability
You said "I don't see it at all, not sure of the location" — the admin page does exist at `/admin` but there's no link to it anywhere. I'll:
- Add a small, unobtrusive "Admin" link in the site footer (or a `/admin` reminder note in this reply if you'd rather keep it hidden).
- The page is already password-protected with the `ADMIN_PASSWORD` secret you set, so exposing the link is safe.

### 6. Verify end-to-end
- Submit a test lead from the chat widget on the preview.
- Confirm: row in the `leads` table (Cloud) AND new page in your Notion database.
- Confirm `/admin` shows the new row and CSV export works.

## Files touched
- `src/lib/notion.server.ts` *(new)*
- `src/lib/leads.functions.ts` *(call Notion after insert)*
- `src/components/site/Landing.tsx` *(footer admin link — optional, ask first)*

## Open question
Want the small "Admin" link in the footer, or keep `/admin` unlinked and just remember the URL?
