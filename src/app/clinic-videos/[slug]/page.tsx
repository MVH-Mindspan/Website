import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { DownloadLink } from "@/components/watch/DownloadLink";
import { FilmPlayer } from "@/components/watch/FilmPlayer";
import {
  clinicVideoFilm,
  clinicVideos,
  clinicVideosPage,
  getClinicVideo,
} from "@/content/clinicVideos";
import { alpha, brandV2Theme } from "@/lib/themes";

const { colors, fonts } = brandV2Theme;

export const dynamicParams = false;

export function generateStaticParams() {
  return clinicVideos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = getClinicVideo(slug);
  return video ? clinicVideoFilm(video).metadata : {};
}

export default async function ClinicVideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = getClinicVideo(slug);
  if (!video) notFound();
  const film = clinicVideoFilm(video);

  return (
    <main className="watch-page">
      <header className="watch-header">
        <Link href="/clinic-videos" className="clinic-back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M10 3 5 8l5 5" />
          </svg>
          {clinicVideosPage.backLabel}
        </Link>
        <DownloadLink video={film.video} slug={film.slug} label={film.downloadLabel} />
      </header>

      <div className="watch-intro">
        <Eyebrow color={alpha(colors.cream, 0.7)}>{film.eyebrow}</Eyebrow>
        <Heading
          as="h1"
          variant="h2"
          color={colors.cream}
          fontFamily={fonts.body}
          style={{ fontWeight: 500 }}
        >
          {film.title}
        </Heading>
        <Lead size="md" color={alpha(colors.cream, 0.78)} maxWidth="90ch">
          {film.lead}
        </Lead>
      </div>

      <FilmPlayer film={film} />
    </main>
  );
}
