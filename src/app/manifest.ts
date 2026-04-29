import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mindspan",
    short_name: "Mindspan",
    description: "Cognitive care and dementia specialists.",
    start_url: "/",
    display: "standalone",
    theme_color: "#083630",
    background_color: "#FBF7F0",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
