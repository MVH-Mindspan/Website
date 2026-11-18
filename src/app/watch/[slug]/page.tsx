/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { DownloadLink } from "@/components/watch/DownloadLink";
import { FilmPlayer } from "@/components/watch/FilmPlayer";
import { films, getFilm } from "@/content/watch";
import { alpha, brandV2Theme } from "@/lib/themes";

const { colors, fonts } = brandV2Theme;

export const dynamicParams = false;

export function generateStaticParams() {
  return films.map((film) => ({ slug: film.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return getFilm(slug)?.metadata ?? {};
}

export default async function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) notFound();

  return (
    <main className="watch-page">
      <header className="watch-header">
        <a href={`/?from=watch-${film.slug}`} aria-label="Mindspan home">
          <img
            src="/assets/mindspan-wordmark-white.png"
            srcSet="/assets/mindspan-wordmark-white.png 1x, /assets/mindspan-wordmark-white@2x.png 2x"
            alt="Mindspan"
            width={140}
            height={22}
          />
        </a>
        <DownloadLink video={film.video} slug={film.slug} label={film.downloadLabel} />
      </header>

      <div className="watch-intro">
        <Eyebrow color={alpha(colors.cream, 0.7)}>{film.eyebrow}</Eyebrow>
        <Heading
          as="h1"
          variant="h2"
          color={colors.cream}
          fontFamily={fonts.body}
          className="watch-title"
          style={{ fontWeight: 500 }}
        >
          {film.title}
          {film.titleEmphasis && (
            <>
              {" "}
              <em style={{ fontFamily: fonts.accent, fontWeight: 400 }}>{film.titleEmphasis}</em>
            </>
          )}
        </Heading>
        <Lead size="md" color={alpha(colors.cream, 0.78)} maxWidth="62ch">
          {film.lead}
        </Lead>
      </div>

      <FilmPlayer film={film} />
    </main>
  );
}
