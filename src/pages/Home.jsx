import Hero from "../components/Hero";
import { useSEO } from "../hooks/useSEO.jsx";

export default function Home() {
  useSEO({
    title: "Awadh Info Solution - Innovative Technology Solutions",
    description: "Discover innovative technology solutions tailored to transform your business. Awadh Info Solution provides cutting-edge web development, software services, and digital transformation expertise.",
    keywords: "technology solutions, web development, software services, digital transformation, IT services",
    url: "https://www.awadhinfosolution.in/",
  });

  return (
    <>
      <Hero />
    </>
  );
}