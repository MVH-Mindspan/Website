import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "Mindspan — Cognitive care & dementia specialists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const heroPath = join(process.cwd(), "public", "assets", "hero-poster.png");
  const logoPath = join(
    process.cwd(),
    "public",
    "assets",
    "mindspan-logo-with-slogan-black@2x.png",
  );

  const heroDataUrl = `data:image/png;base64,${readFileSync(heroPath).toString("base64")}`;
  const logoDataUrl = `data:image/png;base64,${readFileSync(logoPath).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FBF7F0",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroDataUrl}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(251, 247, 240, 0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 95,
            left: 80,
            width: 1040,
            height: 440,
            background:
              "radial-gradient(ellipse at center, rgba(251, 247, 240, 0.92) 0%, rgba(251, 247, 240, 0.78) 28%, rgba(251, 247, 240, 0.45) 55%, rgba(251, 247, 240, 0) 78%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUrl}
          alt=""
          width={760}
          style={{ position: "relative" }}
        />
      </div>
    ),
    { ...size },
  );
}
