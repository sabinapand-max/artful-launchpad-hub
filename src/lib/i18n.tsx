import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "ro" | "en";

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
    "pricing.t4.price": "€800–1000",
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
    "footer.made": "Realizat cu grijă în România.",

    "chat.title": "Salut! 👋",
    "chat.subtitle": "Spune-ne cum te putem ajuta.",
    "chat.email": "Email sau telefon",
    "chat.emailPh": "nume@exemplu.ro",
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
    "footer.made": "Made with care in Romania.",

    "chat.title": "Hi there! 👋",
    "chat.subtitle": "Tell us how we can help.",
    "chat.email": "Email or phone",
    "chat.emailPh": "name@example.com",
    "chat.services": "Which services interest you?",
    "chat.servicesPh": "E.g. showcase site + SEO",
    "chat.send": "Send message",
    "chat.sent": "Thanks! We'll get back to you shortly.",
    "chat.open": "Chat with us",
    "chat.sending": "Sending…",
    "chat.error": "Couldn't send your message. Please try again.",

  },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ro");
  const t = (key: string) => dictionaries[lang][key] ?? key;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
