import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { Landing } from "@/components/site/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier — Websites, SEO & AIO for small businesses" },
      {
        name: "description",
        content:
          "A digital studio crafting refined, SEO- and AI-optimized websites for small businesses, solopreneurs, freelancers and creatives.",
      },
      { property: "og:title", content: "Atelier — Websites, SEO & AIO" },
      {
        property: "og:description",
        content:
          "Refined websites, classic SEO and AIO (AI Optimization) for small businesses and creatives.",
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
