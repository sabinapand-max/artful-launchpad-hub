## Add PayPal as secondary payment option on pricing tiers

Keep the existing chat CTA as the primary action on each pricing card (so leads still flow to database + Notion), and add a small **"Pay via PayPal"** link underneath each one.

### Behavior per tier
- **Start (€99)** → PayPal link with amount 99
- **Prezență (€299)** → PayPal link with amount 299
- **Studio (€599)** → PayPal link with amount 599
- **Automatizare (€800+)** → PayPal link with amount 800; tier description/price updated to show "de la €800" / "from €800" so the range still reads correctly

### Files to change
- **`src/components/site/Landing.tsx`** — under each tier's existing chat button, add a small secondary `<a>` to `https://paypal.me/PLACEHOLDER/{amount}EUR` opening in a new tab. Styled as a muted text link (not a button) so the chat CTA stays primary.
- **`src/lib/i18n.tsx`** — add `pricing.paypal` key ("Plătește cu PayPal" / "Pay with PayPal"). Update `pricing.t4.price` to "de la €800" / "from €800".

### Placeholder handle
I'll use `https://paypal.me/PLACEHOLDER/{amount}EUR` as a stand-in. After you test the layout, send me your PayPal.me handle (or a different PayPal URL — hosted button, invoice link, etc.) and I'll swap it in one line.

### Out of scope
No real checkout integration (Stripe/Paddle) — PayPal.me is a plain redirect, so there's no automatic confirmation back to your database. The chat path remains the source of truth for leads.
