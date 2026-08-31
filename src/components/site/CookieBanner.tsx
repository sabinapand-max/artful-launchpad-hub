import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const KEY = "atelier.cookies";

const copy = {
  ro: {
    text: "Folosim doar cookie-uri esențiale și stocăm local preferința de limbă. Fără urmărire publicitară.",
    accept: "Am înțeles",
    link: "Politica de confidențialitate",
  },
  en: {
    text: "We use only essential cookies and store your language preference locally. No ad tracking.",
    accept: "Got it",
    link: "Privacy policy",
  },
  fr: {
    text: "Nous utilisons uniquement des cookies essentiels et stockons votre préférence de langue localement. Aucun suivi publicitaire.",
    accept: "J'ai compris",
    link: "Politique de confidentialité",
  },
} as const;

export function CookieBanner() {
  const { lang } = useI18n();
  const [visible, setVisible] = useState(false);
  const c = copy[lang];

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:gap-5">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {c.text}{" "}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
            {c.link}
          </Link>
        </p>
        <button
          onClick={() => {
            try {
              localStorage.setItem(KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
          className="shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90"
        >
          {c.accept}
        </button>
      </div>
    </div>
  );
}
