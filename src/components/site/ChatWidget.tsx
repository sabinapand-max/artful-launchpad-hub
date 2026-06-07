import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [contact, setContact] = useState("");
  const [services, setServices] = useState("");

  const valid = contact.trim().length >= 5 && services.trim().length >= 2;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    // Persistence not requested — store locally as a friendly fallback.
    try {
      const prev = JSON.parse(localStorage.getItem("leads") ?? "[]");
      prev.push({ contact, services, at: new Date().toISOString() });
      localStorage.setItem("leads", JSON.stringify(prev));
    } catch {
      /* ignore */
    }
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setContact("");
      setServices("");
      setOpen(false);
    }, 2400);
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-xl shadow-foreground/20 transition-transform hover:scale-105",
        )}
        aria-label={t("chat.open")}
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        <span className="hidden sm:inline">{open ? "" : t("chat.open")}</span>
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm origin-bottom-right overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10 transition-all duration-300",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="bg-foreground px-5 py-4 text-background">
          <p className="font-display text-xl">{t("chat.title")}</p>
          <p className="text-xs text-background/70">{t("chat.subtitle")}</p>
        </div>

        {sent ? (
          <div className="px-5 py-10 text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
              ✓
            </div>
            <p className="font-display text-lg">{t("chat.sent")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 p-5">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("chat.email")}
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value.slice(0, 120))}
                placeholder={t("chat.emailPh")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("chat.services")}
              </label>
              <textarea
                value={services}
                onChange={(e) => setServices(e.target.value.slice(0, 500))}
                placeholder={t("chat.servicesPh")}
                rows={3}
                className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!valid}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {t("chat.send")} <Send className="size-4" />
            </button>
          </form>
        )}
      </div>
    </>
  );
}
