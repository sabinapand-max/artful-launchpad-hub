import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/leads.functions";



export function ChatWidget() {
  const { t, lang } = useI18n();
  const submit = useServerFn(submitLead);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState("");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const valid = emailOk && services.trim().length >= 2;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    setErrorMsg(null);
    try {
      const res = await submit({
        data: {
          email: email.trim(),
          phone: phone.trim(),
          services: services.trim(),
          lang,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        },
      });
      if (!res.ok) {
        setErrorMsg(res.error);
        return;
      }

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setEmail("");
        setPhone("");

        setServices("");
        setOpen(false);
      }, 2400);
    } catch (err) {
      console.error(err);
      setErrorMsg(t("chat.error"));
    } finally {
      setSending(false);
    }
  }


  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-[60] flex h-14 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-xl shadow-foreground/20 transition-transform hover:scale-105",
        )}
        aria-label={t("chat.open")}
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        <span className="hidden sm:inline">{open ? "" : t("chat.open")}</span>
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-6 z-[60] w-[calc(100vw-3rem)] max-w-sm origin-bottom-right overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10 transition-all duration-300",
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 120))}
                placeholder={t("chat.emailPh")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("chat.phone")}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 40))}
                placeholder={t("chat.phonePh")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
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
            {errorMsg && (
              <p className="text-xs text-destructive" role="alert">
                {errorMsg}
              </p>
            )}
            <button
              type="submit"
              disabled={!valid || sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {sending ? (
                <>
                  {t("chat.sending")} <Loader2 className="size-4 animate-spin" />
                </>
              ) : (
                <>
                  {t("chat.send")} <Send className="size-4" />
                </>
              )}
            </button>

          </form>
        )}
      </div>
    </>
  );
}
