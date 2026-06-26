## Add French localization + payment provider recommendation

### 1. French language support
- **`src/lib/i18n.tsx`** — extend `Lang` type to `"ro" | "en" | "fr"`, add a full `fr` dictionary mirroring every key in `ro`/`en` (nav, hero, marquee, services, process, pricing incl. `pricing.paypal` and `pricing.t4.price` = "à partir de €800", for, cta, footer, chat).
- **`src/components/site/LangToggle.tsx`** — add `"fr"` to the toggle list so users can switch RO / EN / FR.
- **`src/routes/__root.tsx`** — quick check: if `<html lang>` is hardcoded, leave as-is (already RO default). No SSR locale routing — language stays client-state like today.
- No new routes, no URL prefix (`/fr`). Same single-page Landing, just a third translation.

Optional polish (only if you want it): auto-detect browser language on first visit (`navigator.language.startsWith("fr")` → set FR) with `localStorage` persistence. Tell me if you want this — otherwise default stays RO.

### 2. Payment provider — recommendation

Right now each tier links to `paypal.me/PLACEHOLDER/{amount}EUR`. PayPal.me works but has real limits for a studio selling €99–€800 service packages to RO/EN/FR clients:

- No invoice, no VAT line, no automatic receipt
- No confirmation back to your database (lead stays "chat-only")
- No subscription support (Studio tier's "monthly support" can't auto-bill)
- Currency conversion fees for FR clients paying in EUR from non-EUR cards

**My recommendation: Stripe via Lovable's built-in payments** (no Stripe account/API key needed up front, test mode immediately):

- One-time Checkout links for Start / Prezență / Studio (fixed prices)
- Subscription product for Studio's monthly support add-on
- "Request a quote" stays as chat for Automatizare (€800+ is custom anyway)
- Webhook → write paid order into your existing leads table, so chat leads and paid orders live in one place
- Multi-currency + RO/EN/FR-localized Checkout out of the box
- Keep PayPal.me as a secondary link for clients who insist on PayPal

Alternative — **Paddle** (also built-in): Paddle acts as merchant of record and handles EU VAT filing for you automatically. Good fit if you don't want to deal with VAT registration yourself as a RO studio selling cross-border. Trade-off: flat 5% + €0.50 per transaction, and product types need a quick eligibility check.

### What I need from you before building
1. **French**: confirm "add FR, default stays RO, no auto-detect" — or say if you want browser auto-detect.
2. **Payments**: pick one
   - (a) Stripe built-in (you handle VAT, lower fees, more flexible)
   - (b) Paddle built-in (VAT handled for you, simpler, higher fees)
   - (c) Keep PayPal.me only for now, revisit later
3. If (a) or (b): I'll run the eligibility check, then enable the provider, then wire each tier's CTA to a real Checkout session (replacing the PayPal links, but keeping chat as the primary CTA as you decided earlier).

### Out of scope for this plan
- No backend/DB schema changes yet (those come after you pick a provider)
- No new routes, no SEO metadata changes
- Automatizare tier stays chat-only (custom pricing)
