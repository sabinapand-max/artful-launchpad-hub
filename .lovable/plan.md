## Add Pricing section to landing page

Add a new "Pricing" section between **Process** and **For whom** on the landing page, with 4 tiers.

### Tiers
1. **Start — €99** · One page, Google Business setup, basic SEO
2. **Prezență — €299** · 3-5 pages, full SEO, AIO, booking integration
3. **Studio — €599** · Full site + automation + monthly support
4. **Automatizare — €800–1000** · Custom automation workflows, Make/Zapier, lead systems

The **Studio** tier will be highlighted as "Most popular" (accent border).
Each card has: tier name, price, short description, and a CTA button that opens the chat widget (same behavior as the hero CTA).

### Files to change
- **`src/components/site/Landing.tsx`** — add a `<section id="pricing">` matching existing typographic style (font-display headlines, eyebrow label, grid of bordered cards like Services).
- **`src/lib/i18n.tsx`** — add `pricing.*` keys in both `ro` and `en` dictionaries (eyebrow, title, tier names/prices/descriptions, CTA label). Romanian copy stays as provided; English mirrors meaning (e.g. "Presence", "Automation").
- **`src/components/site/Landing.tsx` nav** — add a "Prețuri / Pricing" link in the header nav pointing to `#pricing`.

### Out of scope
No checkout/Stripe wiring — the CTA only opens the existing chat widget so leads still flow to your database + Notion. Let me know if you want real checkout later.
