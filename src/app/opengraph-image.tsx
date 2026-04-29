import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "Mindspan — Cognitive care & dementia specialists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(
  family: string,
  weight: number,
  italic = false,
  text = "MindspanCogntiveard&measpcilstABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
) {
  const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${axis}&text=${encodeURIComponent(text)}`;
  const css = await fetch(cssUrl).then((r) => r.text());
  const match = css.match(/src:\s*url\((https:[^)]+)\)\s+format\('(?:truetype|opentype)'\)/);
  if (!match) throw new Error(`Could not resolve font URL for ${family} ${weight}${italic ? " italic" : ""}`);
  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`);
  return await res.arrayBuffer();
}

export default async function OpengraphImage() {
  const markPath = join(process.cwd(), "public", "brand", "mark.png");
  const markBytes = readFileSync(markPath);
  const markDataUrl = `data:image/png;base64,${markBytes.toString("base64")}`;

  const [ptSerifBold, ptSerifItalic] = await Promise.all([
    loadGoogleFont("PT Serif", 700),
    loadGoogleFont("PT Serif", 400, true),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FBF7F0",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "48px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUrl} alt="" width={260} height={162} />
          <div
            style={{
              fontFamily: "PT Serif",
              fontWeight: 700,
              fontSize: 140,
              color: "#201E17",
              lineHeight: 1,
            }}
          >
            Mindspan
          </div>
        </div>
        <div
          style={{
            marginTop: "56px",
            fontFamily: "PT Serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 44,
            color: "#201E17",
            opacity: 0.78,
            textAlign: "center",
          }}
        >
          Cognitive care &amp; dementia specialists
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "PT Serif", data: ptSerifBold, weight: 700, style: "normal" },
        { name: "PT Serif", data: ptSerifItalic, weight: 400, style: "italic" },
      ],
    },
  );
}
