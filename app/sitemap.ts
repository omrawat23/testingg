import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const routes = [""].map((route) => ({
    url: `https://omrawat.xyz${route}`,
  }));

  return [...routes];
}