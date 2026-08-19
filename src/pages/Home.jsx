import Hero from "../components/Hero";
import { useSEO, useSchemaMarkup } from "../hooks/useSEO.jsx";

export default function Home() {
  useSEO({
    title: "Zingerr (Zinger) App by Awadh Info Solution",
    description: "Zingerr, also searched as Zinger, by Awadh Info Solution is a powerful app for streamlining orders, organizing workflows, and helping modern teams work faster.",
    keywords: "Zingerr, Zinger, Zingerr app, Zinger app, Awadh Info Solution, order management app, workflow management app",
    url: "https://www.awadhinfosolution.in/",
  });

  useSchemaMarkup({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zingerr",
    alternateName: "Zinger",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android",
    description: "Zingerr, also known as Zinger, helps modern teams streamline orders, organize workflows, and work faster.",
    url: "https://www.awadhinfosolution.in/",
    downloadUrl: "https://play.google.com/store/apps/details?id=com.awadhinfosolution",
    publisher: {
      "@type": "Organization",
      name: "Awadh Info Solution Pvt Ltd",
      url: "https://www.awadhinfosolution.in/",
    },
  });

  return (
    <>
      <Hero />
    </>
  );
}