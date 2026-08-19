import { Helmet } from "react-helmet-async";

export function useSEO({
  title = "Zingerr (Zinger) App by Awadh Info Solution",
  description = "Zingerr, also searched as Zinger, by Awadh Info Solution is a powerful app for streamlining orders, organizing workflows, and helping modern teams work faster.",
  keywords = "Zingerr, Zinger, Zingerr app, Zinger app, Awadh Info Solution, order management app, workflow management app",
  image = "https://www.awadhinfosolution.in/og-image.png",
  url = "https://www.awadhinfosolution.in/",
  type = "website",
  author = "Awadh Info Solution",
} = {}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Awadh Info Solution" />
      
      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

// Schema.org JSON-LD helper
export function useSchemaMarkup(schema) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
