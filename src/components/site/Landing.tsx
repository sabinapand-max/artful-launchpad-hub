import { useI18n } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";
import { ChatWidget } from "./ChatWidget";
import { ArrowUpRight, Sparkles, Globe, ShoppingBag, Search, Bot, Palette, Wrench } from "lucide-react";

export function Landing() {
  const { t } = useI18n();

  const services = [
    { icon: Globe, k: "s1" },
    { icon: ShoppingBag, k: "s2" },
    { icon: Search, k: "s3" },
    { icon: Bot, k: "s4" },
    { icon: Palette, k: "s5" },
    { icon: Wrench, k: "s6" },
  ];

  const steps = ["p1", "p2", "p3", "p4"];
  const audiences = ["1", "2", "3", "4", "5", "6"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-40 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-background">
            <Sparkles className="size-4" />
          </span>
          <span className="font-display text-xl">Atelier</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <a href="#services" className="text-muted-foreground hover:text-foreground">{t("nav.services")}</a>
          <a href="#process" className="text-muted-foreground hover:text-foreground">{t("nav.process")}</a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground">{t("nav.contact")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href="#contact"
            className="hidden rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 md:inline-flex"
          >
            {t("nav.cta")}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="grain relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="grain-overlay" />
        {/* Decorative arc */}
        <div className="pointer-events-none absolute -right-40 -top-20 size-[640px] rounded-full border border-foreground/10" />
        <div className="pointer-events-none absolute -right-20 top-40 size-[420px] rounded-full border border-accent/30" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="animate-rise mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-accent" />
            {t("hero.eyebrow")}
          </p>
          <h1 className="animate-rise font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] tracking-tight">
            {t("hero.title1")}
            <br />
            <span className="italic text-accent">{t("hero.title2")}</span>{" "}
            {t("hero.title3")}
          </h1>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <p className="animate-rise text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
              {t("hero.subtitle")}
            </p>
          </div>
          <div className="animate-rise mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:gap-3"
            >
              {t("hero.cta")}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium hover:bg-secondary"
            >
              {t("hero.secondary")}
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border bg-card py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee font-display text-3xl md:text-4xl">
          <span className="px-6">{t("marquee").repeat(4)}</span>
          <span className="px-6" aria-hidden>
            {t("marquee").repeat(4)}
          </span>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="mb-16 grid items-end gap-6 md:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
            {t("services.eyebrow")}
          </p>
          <h2 className="font-display text-5xl leading-[1.05] tracking-tight md:col-span-9 md:text-7xl">
            {t("services.title")}
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {services.map(({ icon: Icon, k }) => (
            <div
              key={k}
              className="group relative flex flex-col gap-6 bg-card p-8 transition-colors hover:bg-secondary"
            >
              <Icon className="size-6 text-accent" />
              <div>
                <h3 className="font-display text-2xl">{t(`services.${k}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`services.${k}.desc`)}
                </p>
              </div>
              <ArrowUpRight className="absolute right-6 top-6 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="mb-16 grid items-end gap-6 md:grid-cols-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
              {t("process.eyebrow")}
            </p>
            <h2 className="font-display text-5xl leading-[1.05] tracking-tight md:col-span-9 md:text-7xl">
              {t("process.title")}
            </h2>
          </div>

          <ol className="grid gap-10 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s} className="border-t border-foreground/20 pt-5">
                <span className="font-display text-3xl text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl">{t(`process.${s}.t`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`process.${s}.d`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOR WHOM */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="mb-12 grid items-end gap-6 md:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
            {t("for.eyebrow")}
          </p>
          <h2 className="font-display text-5xl leading-[1.05] tracking-tight md:col-span-9 md:text-6xl">
            {t("for.title")}
          </h2>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {audiences.map((a) => (
            <li
              key={a}
              className="group flex items-center justify-between py-6 text-2xl font-display transition-colors hover:text-accent md:text-3xl"
            >
              <span>{t(`for.${a}`)}</span>
              <ArrowUpRight className="size-5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section id="contact" className="grain relative overflow-hidden bg-foreground text-background">
        <div className="grain-overlay" style={{ mixBlendMode: "screen", opacity: 0.06 }} />
        <div className="pointer-events-none absolute -left-32 -bottom-32 size-[500px] rounded-full border border-background/10" />
        <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
          <h2 className="font-display text-5xl leading-[1.05] tracking-tight md:text-8xl">
            {t("cta.title")}
          </h2>
          <p className="mt-8 max-w-lg text-base text-background/70">{t("cta.desc")}</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector<HTMLButtonElement>("[aria-label]")?.click();
            }}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            {t("cta.button")} <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-full bg-foreground text-background">
              <Sparkles className="size-3" />
            </span>
            <span className="font-display text-base text-foreground">Atelier</span>
            <span className="ml-3">© {new Date().getFullYear()}. {t("footer.rights")}</span>
          </div>
          <p>{t("footer.made")}</p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
