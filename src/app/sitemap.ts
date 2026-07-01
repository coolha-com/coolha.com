import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://coolha.com";
  const locales = ["en", "zh-Hans", "zh-Hant"];
  const routes = ["", "/company", "/ai", "/rwa"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate URLs for each locale and route combination
  locales.forEach((locale) => {
    routes.forEach((route) => {
      const path = `/${locale}${route}`;

      // Determine change frequency based on route
      let changeFrequency:
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never" = "weekly";
      let priority = 0.7;

      if (route === "") {
        changeFrequency = "daily";
        priority = 1;
      } else if (route === "/company") {
        changeFrequency = "weekly";
        priority = 0.8;
      } else if (route === "/ai" || route === "/rwa") {
        changeFrequency = "weekly";
        priority = 0.8;
      }

      sitemapEntries.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            "zh-Hans": `${baseUrl}/zh-Hans${route}`,
            "zh-Hant": `${baseUrl}/zh-Hant${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
