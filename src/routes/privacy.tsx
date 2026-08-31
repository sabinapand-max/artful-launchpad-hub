import { createFileRoute, Link } from "@tanstack/react-router";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { LangToggle } from "@/components/site/LangToggle";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Politica de confidențialitate — Atelier" },
      {
        name: "description",
        content:
          "Cum colectăm, folosim și protejăm datele trimise prin formularul de chat: email, telefon și serviciile solicitate.",
      },
      { property: "og:title", content: "Politica de confidențialitate — Atelier" },
      {
        property: "og:description",
        content: "Date colectate, scop, păstrare și drepturile tale conform GDPR.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://artful-launchpad-hub.lovable.app/privacy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://artful-launchpad-hub.lovable.app/privacy" }],
  }),
  component: () => (
    <I18nProvider>
      <PrivacyPage />
    </I18nProvider>
  ),
});

const copy = {
  ro: {
    title: "Politica de confidențialitate",
    updated: "Actualizat",
    back: "Înapoi la pagina principală",
    sections: [
      {
        h: "Ce date colectăm",
        p: "Prin widgetul de chat colectăm doar datele pe care le trimiți voluntar: adresa de email sau numărul de telefon, serviciile care te interesează, limba selectată și informații tehnice minime despre browser (user agent).",
      },
      {
        h: "De ce le folosim",
        p: "Exclusiv pentru a răspunde solicitării tale și a-ți pregăti o ofertă. Nu vindem datele și nu le folosim pentru publicitate.",
      },
      {
        h: "Unde sunt stocate",
        p: "Datele sunt salvate în baza noastră de date securizată și oglindite într-un spațiu de lucru Notion privat, folosit doar pentru gestionarea cererilor.",
      },
      {
        h: "Cât timp",
        p: "Păstrăm mesajele de contact maximum 24 de luni, apoi le ștergem, dacă nu devenim colaboratori.",
      },
      {
        h: "Cookie-uri",
        p: "Nu folosim cookie-uri de urmărire sau analytics publicitar. Preferința de limbă și confirmarea acestei notificări sunt salvate local în browserul tău.",
      },
      {
        h: "Drepturile tale (GDPR)",
        p: "Poți cere oricând accesul, corectarea, exportul sau ștergerea datelor tale scriind la indigoatelier@zohomail.eu. Răspundem în cel mult 30 de zile.",
      },
    ],
  },
  en: {
    title: "Privacy policy",
    updated: "Updated",
    back: "Back to home",
    sections: [
      {
        h: "What we collect",
        p: "Through the chat widget we only collect what you send voluntarily: your email address or phone number, the services you're interested in, your selected language, and minimal technical browser information (user agent).",
      },
      {
        h: "Why we use it",
        p: "Solely to reply to your request and prepare a proposal. We never sell your data or use it for advertising.",
      },
      {
        h: "Where it's stored",
        p: "Your data is stored in our secure database and mirrored to a private Notion workspace used only to manage incoming requests.",
      },
      {
        h: "How long",
        p: "We keep contact messages for a maximum of 24 months, then delete them if no collaboration begins.",
      },
      {
        h: "Cookies",
        p: "We use no tracking cookies or advertising analytics. Your language preference and this notice's dismissal are stored locally in your browser.",
      },
      {
        h: "Your rights (GDPR)",
        p: "You can request access, correction, export, or deletion of your data at any time by writing to indigoatelier@zohomail.eu. We reply within 30 days.",
      },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    updated: "Mis à jour",
    back: "Retour à l'accueil",
    sections: [
      {
        h: "Données collectées",
        p: "Via le widget de chat, nous collectons uniquement ce que vous envoyez volontairement : votre email ou numéro de téléphone, les services souhaités, la langue choisie et des informations techniques minimales sur le navigateur (user agent).",
      },
      {
        h: "Pourquoi",
        p: "Uniquement pour répondre à votre demande et préparer une proposition. Nous ne vendons jamais vos données et ne les utilisons pas à des fins publicitaires.",
      },
      {
        h: "Où sont-elles stockées",
        p: "Dans notre base de données sécurisée et copiées dans un espace Notion privé servant uniquement au suivi des demandes.",
      },
      {
        h: "Durée de conservation",
        p: "Les messages de contact sont conservés 24 mois au maximum, puis supprimés si aucune collaboration ne débute.",
      },
      {
        h: "Cookies",
        p: "Aucun cookie de suivi ni analytics publicitaire. Votre préférence de langue et la fermeture de cette bannière sont stockées localement dans votre navigateur.",
      },
      {
        h: "Vos droits (RGPD)",
        p: "Vous pouvez demander à tout moment l'accès, la correction, l'export ou la suppression de vos données à indigoatelier@zohomail.eu. Réponse sous 30 jours.",
      },
    ],
  },
} as const;

function PrivacyPage() {
  const { lang } = useI18n();
  const c = copy[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link to="/" className="font-display text-xl">
          Atelier
        </Link>
        <LangToggle />
      </header>
      <main className="mx-auto max-w-3xl px-6 pb-28 pt-8">
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">{c.title}</h1>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {c.updated} 2026
        </p>
        <div className="mt-14 space-y-10">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-2xl">{s.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>
        <Link
          to="/"
          className="mt-16 inline-flex rounded-full border border-border px-5 py-3 text-sm hover:bg-secondary"
        >
          {c.back}
        </Link>
      </main>
    </div>
  );
}
