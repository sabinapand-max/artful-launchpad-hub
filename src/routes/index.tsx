import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { Landing } from "@/components/site/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier — Site-uri, SEO & AIO pentru afaceri mici" },
      {
        name: "description",
        content:
          "Studio digital care construiește site-uri rafinate și optimizate pentru SEO și AI, pentru antreprenori, freelanceri și creativi.",
      },
      { property: "og:title", content: "Atelier — Site-uri, SEO & AIO" },
      {
        property: "og:description",
        content:
          "Site-uri rafinate, SEO clasic și AIO (AI Optimization) pentru afaceri mici și creativi.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <Landing />
    </I18nProvider>
  );
}
