/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { DownloadLink } from "@/components/watch/DownloadLink";
import { ShareButton } from "@/components/watch/ShareButton";
import { clinicVideosPage, shareTarget, situationsWithVideos } from "@/content/clinicVideos";
import { alpha, brandV2Theme } from "@/lib/themes";

const { colors, fonts } = brandV2Theme;
const page = clinicVideosPage;

export const metadata = page.metadata;

export default function ClinicVideosPage() {
  const groups = situationsWithVideos();

  return (
    <main className="clinic-page">
      <header className="clinic-header">
        <img
          src="/assets/mindspan-wordmark-white.png"
          srcSet="/assets/mindspan-wordmark-white.png 1x, /assets/mindspan-wordmark-white@2x.png 2x"
          alt="Mindspan"
          width={140}
          height={22}
        />
      </header>

      <div className="clinic-intro">
        <Eyebrow color={alpha(colors.cream, 0.7)}>{page.eyebrow}</Eyebrow>
        <Heading
          as="h1"
          variant="h2"
          color={colors.cream}
          fontFamily={fonts.body}
          style={{ fontWeight: 500 }}
        >
          {page.title}
        </Heading>
        <Lead size="md" color={alpha(colors.cream, 0.78)} maxWidth="62ch">
          {page.lead}
        </Lead>
      </div>

      {groups.length > 1 && (
        <nav aria-label={page.situationsLabel} className="clinic-chips">
          {groups.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.label}
              <span>{s.videos.length}</span>
            </a>
          ))}
        </nav>
      )}

      {groups.map((s) => (
        <section key={s.id} id={s.id} className="clinic-section" aria-labelledby={`${s.id}-heading`}>
          <div className="clinic-section-head">
            <h2 id={`${s.id}-heading`}>{s.label}</h2>
            <p>{page.videoCount(s.videos.length)}</p>
          </div>
          <ul className="clinic-grid">
            {s.videos.map((v) => (
              <li key={v.slug}>
                <Link href={`/clinic-videos/${v.slug}`} className="clinic-card">
                  <span className="clinic-thumb">
                    <img src={v.video.poster} alt="" width={1600} height={900} loading="lazy" />
                    <span className="clinic-thumb-play" aria-hidden="true">
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
                        <path d="M15 7.27a2 2 0 0 1 0 3.46L3 17.66A2 2 0 0 1 0 15.93V2.07A2 2 0 0 1 3 .34z" />
                      </svg>
                    </span>
                    <span className="clinic-duration">{v.video.durationLabel}</span>
                  </span>
                  <span className="clinic-card-title">{v.title}</span>
                  <span className="clinic-card-summary">{v.summary}</span>
                </Link>
                <div className="video-actions clinic-card-actions">
                  <ShareButton {...shareTarget(v)} slug={v.slug} label={page.shareLabel} />
                  <DownloadLink video={v.video} slug={v.slug} label={page.downloadLabel} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
