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
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://artful-launchpad-hub.lovable.app/" },
      { property: "og:image", content: "https://artful-launchpad-hub.lovable.app/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://artful-launchpad-hub.lovable.app/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://artful-launchpad-hub.lovable.app/" }],
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
