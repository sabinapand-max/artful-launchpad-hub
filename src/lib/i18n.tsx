import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "ro" | "en" | "fr";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  ro: {
    "nav.services": "Servicii",
    "nav.work": "Proiecte",
    "nav.process": "Proces",
    "nav.pricing": "Prețuri",
    "nav.contact": "Contact",
    "nav.cta": "Începe proiectul",

    "hero.eyebrow": "Studio digital · 2026",
    "hero.title1": "Site-uri care",
    "hero.title2": "vorbesc",
    "hero.title3": "pentru tine.",
    "hero.subtitle":
      "Construim experiențe web rafinate pentru antreprenori, freelanceri și creativi — optimizate pentru oameni, Google și inteligența artificială.",
    "hero.cta": "Spune-ne despre proiect",
    "hero.secondary": "Vezi serviciile",

    "marquee": "Branding · Web Design · Dezvoltare · SEO · AIO · Copywriting · Mentenanță · ",

    "services.eyebrow": "— Servicii",
    "services.title": "Ce construim împreună.",
    "services.s1.title": "Site-uri de prezentare",
    "services.s1.desc": "Design croit pe identitatea ta, livrat rapid, fără șabloane.",
    "services.s2.title": "Magazine online",
    "services.s2.desc": "Platforme e-commerce ușor de administrat, gata să vândă.",
    "services.s3.title": "SEO clasic",
    "services.s3.desc": "Apari acolo unde te caută clienții — în Google, organic.",
    "services.s4.title": "AIO — AI Optimization",
    "services.s4.desc": "Fii citat de ChatGPT, Perplexity și asistenții AI ai viitorului.",
    "services.s5.title": "Identitate vizuală",
    "services.s5.desc": "Logo, paletă, tipografie — o voce vizuală consistentă.",
    "services.s6.title": "Mentenanță & suport",
    "services.s6.desc": "Site-ul tău rămâne rapid, sigur și actualizat. Noi avem grijă.",

    "process.eyebrow": "— Proces",
    "process.title": "Patru pași. Zero birocrație.",
    "process.p1.t": "Conversație",
    "process.p1.d": "Ne spui ce vrei să construiești. Ascultăm.",
    "process.p2.t": "Strategie",
    "process.p2.d": "Definim audiența, mesajul, arhitectura.",
    "process.p3.t": "Design & cod",
    "process.p3.d": "Construim cu atenție la fiecare detaliu.",
    "process.p4.t": "Lansare & creștere",
    "process.p4.d": "Te ajutăm să crești după lansare.",

    "pricing.eyebrow": "— Prețuri",
    "pricing.title": "Pachete clare. Fără surprize.",
    "pricing.popular": "Cel mai ales",
    "pricing.cta": "Alege pachetul",
    "pricing.paypal": "Plătește cu PayPal",
    "pricing.contact": "Cere o ofertă",
    "pricing.t1.name": "Start",
    "pricing.t1.price": "€99",
    "pricing.t1.desc": "O pagină, configurare Google Business, SEO de bază.",
    "pricing.t2.name": "Prezență",
    "pricing.t2.price": "€299",
    "pricing.t2.desc": "3–5 pagini, SEO complet, AIO, integrare rezervări.",
    "pricing.t3.name": "Studio",
    "pricing.t3.price": "€599",
    "pricing.t3.desc": "Site complet + automatizări + suport lunar.",
    "pricing.t4.name": "Automatizare",
    "pricing.t4.price": "de la €800",
    "pricing.t4.desc": "Fluxuri custom, Make/Zapier, sisteme de lead-uri.",

    "for.eyebrow": "— Pentru cine",
    "for.title": "Lucrăm cu oameni care construiesc lucruri reale.",
    "for.1": "Antreprenori la început de drum",
    "for.2": "Freelanceri & consultanți",
    "for.3": "Cabinete & cliniche",
    "for.4": "Artiști, fotografi, arhitecți",
    "for.5": "Restaurante & cafenele",
    "for.6": "Magazine locale",

    "cta.title": "Hai să facem ceva memorabil.",
    "cta.desc": "Răspundem în 24 de ore. Prima conversație e gratuită.",
    "cta.button": "Deschide chat-ul",

    "footer.rights": "Toate drepturile rezervate.",

    "chat.title": "Salut! 👋",
    "chat.subtitle": "Spune-ne cum te putem ajuta.",
    "chat.email": "Email",
    "chat.emailPh": "nume@exemplu.ro",
    "chat.phone": "Telefon (opțional)",
    "chat.phonePh": "+40 7xx xxx xxx",
    "chat.services": "Ce servicii te interesează?",
    "chat.servicesPh": "Ex: site de prezentare + SEO",
    "chat.send": "Trimite mesajul",
    "chat.sent": "Mulțumim! Revenim în cel mai scurt timp.",
    "chat.open": "Discută cu noi",
    "chat.sending": "Se trimite…",
    "chat.error": "Nu am putut trimite mesajul. Încearcă din nou.",

  },
  en: {
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.process": "Process",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.cta": "Start a project",

    "hero.eyebrow": "Digital studio · 2026",
    "hero.title1": "Websites that",
    "hero.title2": "speak",
    "hero.title3": "for you.",
    "hero.subtitle":
      "We craft refined web experiences for entrepreneurs, freelancers and creatives — tuned for people, Google and AI.",
    "hero.cta": "Tell us about your project",
    "hero.secondary": "See services",

    "marquee": "Branding · Web Design · Development · SEO · AIO · Copywriting · Maintenance · ",

    "services.eyebrow": "— Services",
    "services.title": "What we build together.",
    "services.s1.title": "Showcase websites",
    "services.s1.desc": "Designed around your identity, shipped fast, no templates.",
    "services.s2.title": "Online stores",
    "services.s2.desc": "E-commerce platforms easy to manage, ready to sell.",
    "services.s3.title": "Classic SEO",
    "services.s3.desc": "Show up where your clients search — organically.",
    "services.s4.title": "AIO — AI Optimization",
    "services.s4.desc": "Get cited by ChatGPT, Perplexity and tomorrow's assistants.",
    "services.s5.title": "Visual identity",
    "services.s5.desc": "Logo, palette, typography — a consistent visual voice.",
    "services.s6.title": "Care & support",
    "services.s6.desc": "Your site stays fast, safe and up to date. We handle it.",

    "process.eyebrow": "— Process",
    "process.title": "Four steps. Zero bureaucracy.",
    "process.p1.t": "Conversation",
    "process.p1.d": "Tell us what you want to build. We listen.",
    "process.p2.t": "Strategy",
    "process.p2.d": "We define audience, message, architecture.",
    "process.p3.t": "Design & code",
    "process.p3.d": "We craft with attention to every detail.",
    "process.p4.t": "Launch & grow",
    "process.p4.d": "We help you grow after launch.",

    "pricing.eyebrow": "— Pricing",
    "pricing.title": "Clear packages. No surprises.",
    "pricing.popular": "Most popular",
    "pricing.cta": "Choose plan",
    "pricing.paypal": "Pay with PayPal",
    "pricing.contact": "Request a quote",
    "pricing.t1.name": "Start",
    "pricing.t1.price": "€99",
    "pricing.t1.desc": "One page, Google Business setup, basic SEO.",
    "pricing.t2.name": "Presence",
    "pricing.t2.price": "€299",
    "pricing.t2.desc": "3–5 pages, full SEO, AIO, booking integration.",
    "pricing.t3.name": "Studio",
    "pricing.t3.price": "€599",
    "pricing.t3.desc": "Full site + automation + monthly support.",
    "pricing.t4.name": "Automation",
    "pricing.t4.price": "from €800",
    "pricing.t4.desc": "Custom workflows, Make/Zapier, lead systems.",

    "for.eyebrow": "— For whom",
    "for.title": "We work with people building real things.",
    "for.1": "Early-stage founders",
    "for.2": "Freelancers & consultants",
    "for.3": "Clinics & practices",
    "for.4": "Artists, photographers, architects",
    "for.5": "Restaurants & cafés",
    "for.6": "Local shops",

    "cta.title": "Let's make something memorable.",
    "cta.desc": "We reply within 24 hours. First call is free.",
    "cta.button": "Open the chat",

    "footer.rights": "All rights reserved.",

    "chat.title": "Hi there! 👋",
    "chat.subtitle": "Tell us how we can help.",
    "chat.email": "Email",
    "chat.emailPh": "name@example.com",
    "chat.phone": "Phone (optional)",
    "chat.phonePh": "+40 7xx xxx xxx",
    "chat.services": "Which services interest you?",
    "chat.servicesPh": "E.g. showcase site + SEO",
    "chat.send": "Send message",
    "chat.sent": "Thanks! We'll get back to you shortly.",
    "chat.open": "Chat with us",
    "chat.sending": "Sending…",
    "chat.error": "Couldn't send your message. Please try again.",

  },
  fr: {
    "nav.services": "Services",
    "nav.work": "Projets",
    "nav.process": "Processus",
    "nav.pricing": "Tarifs",
    "nav.contact": "Contact",
    "nav.cta": "Démarrer un projet",

    "hero.eyebrow": "Studio digital · 2026",
    "hero.title1": "Des sites qui",
    "hero.title2": "parlent",
    "hero.title3": "pour vous.",
    "hero.subtitle":
      "Nous créons des expériences web raffinées pour entrepreneurs, freelances et créatifs — pensées pour les humains, Google et l'IA.",
    "hero.cta": "Parlez-nous de votre projet",
    "hero.secondary": "Voir les services",

    "marquee": "Branding · Web Design · Développement · SEO · AIO · Copywriting · Maintenance · ",

    "services.eyebrow": "— Services",
    "services.title": "Ce que nous construisons ensemble.",
    "services.s1.title": "Sites vitrines",
    "services.s1.desc": "Conçus autour de votre identité, livrés vite, sans templates.",
    "services.s2.title": "Boutiques en ligne",
    "services.s2.desc": "Plateformes e-commerce simples à gérer, prêtes à vendre.",
    "services.s3.title": "SEO classique",
    "services.s3.desc": "Apparaissez là où vos clients cherchent — naturellement.",
    "services.s4.title": "AIO — Optimisation IA",
    "services.s4.desc": "Soyez cité par ChatGPT, Perplexity et les assistants de demain.",
    "services.s5.title": "Identité visuelle",
    "services.s5.desc": "Logo, palette, typographie — une voix visuelle cohérente.",
    "services.s6.title": "Maintenance & support",
    "services.s6.desc": "Votre site reste rapide, sûr et à jour. On s'en occupe.",

    "process.eyebrow": "— Processus",
    "process.title": "Quatre étapes. Zéro bureaucratie.",
    "process.p1.t": "Conversation",
    "process.p1.d": "Dites-nous ce que vous voulez construire. On écoute.",
    "process.p2.t": "Stratégie",
    "process.p2.d": "On définit audience, message et architecture.",
    "process.p3.t": "Design & code",
    "process.p3.d": "On construit avec soin, jusqu'au moindre détail.",
    "process.p4.t": "Lancement & croissance",
    "process.p4.d": "On vous aide à grandir après le lancement.",

    "pricing.eyebrow": "— Tarifs",
    "pricing.title": "Forfaits clairs. Aucune surprise.",
    "pricing.popular": "Le plus choisi",
    "pricing.cta": "Choisir le forfait",
    "pricing.paypal": "Payer avec PayPal",
    "pricing.contact": "Demander un devis",
    "pricing.t1.name": "Start",
    "pricing.t1.price": "€99",
    "pricing.t1.desc": "Une page, configuration Google Business, SEO de base.",
    "pricing.t2.name": "Présence",
    "pricing.t2.price": "€299",
    "pricing.t2.desc": "3–5 pages, SEO complet, AIO, intégration réservations.",
    "pricing.t3.name": "Studio",
    "pricing.t3.price": "€599",
    "pricing.t3.desc": "Site complet + automatisations + support mensuel.",
    "pricing.t4.name": "Automatisation",
    "pricing.t4.price": "à partir de €800",
    "pricing.t4.desc": "Flux sur mesure, Make/Zapier, systèmes de leads.",

    "for.eyebrow": "— Pour qui",
    "for.title": "Nous travaillons avec des gens qui construisent du concret.",
    "for.1": "Entrepreneurs en démarrage",
    "for.2": "Freelances & consultants",
    "for.3": "Cabinets & cliniques",
    "for.4": "Artistes, photographes, architectes",
    "for.5": "Restaurants & cafés",
    "for.6": "Commerces locaux",

    "cta.title": "Créons quelque chose de mémorable.",
    "cta.desc": "Réponse sous 24h. Le premier échange est gratuit.",
    "cta.button": "Ouvrir le chat",

    "footer.rights": "Tous droits réservés.",

    "chat.title": "Bonjour ! 👋",
    "chat.subtitle": "Dites-nous comment on peut aider.",
    "chat.email": "Email",
    "chat.emailPh": "nom@exemple.fr",
    "chat.phone": "Téléphone (facultatif)",
    "chat.phonePh": "+33 6 xx xx xx xx",
    "chat.services": "Quels services vous intéressent ?",
    "chat.servicesPh": "Ex : site vitrine + SEO",
    "chat.send": "Envoyer le message",
    "chat.sent": "Merci ! On revient vers vous très vite.",
    "chat.open": "Discuter avec nous",
    "chat.sending": "Envoi…",
    "chat.error": "Impossible d'envoyer le message. Réessayez.",
  },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nCtx | null>(null);

const STORAGE_KEY = "atelier.lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ro" || stored === "en" || stored === "fr") return stored;
  } catch {}
  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("ro")) return "ro";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch {}
  };
  const t = (key: string) => dictionaries[lang][key] ?? key;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
