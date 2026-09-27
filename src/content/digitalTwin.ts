// Links into the Digital Twin: the /digital-twin page on this site and the
// introduction to the Digital Twin hosted at twin.mindspan.co.
//
// Internal links carry `?from=<entry>` instead of UTMs. Every site link is a
// full page load, and posthog-js re-registers any utm_* it finds in the URL,
// which would overwrite the visitor's real campaign (and null gclid) for the
// rest of the session. `from` is not a campaign param, so it is safe.
// Only the cross-domain links to the tool carry UTMs.

export const DIGITAL_TWIN_PATH = "/digital-twin";
export const TWIN_TOOL_URL = "https://twin.mindspan.co/";

/** Where a link to /digital-twin lives on the site. */
export type DigitalTwinEntry =
  | "home-who-we-see-caregiver"
  | "home-who-we-see-self"
  | "home-step-03"
  | "home-faq"
  | "science-feature"
  | "assist-feature"
  | "how-it-works-step-03"
  | "location-danvers"
  | "location-bay-area"
  | "footer";

/** Where a link to the tool lives on /digital-twin. */
export type TwinToolEntry = "dt-hero" | "dt-card-self" | "dt-card-loved-one";

export function digitalTwinHref(entry: DigitalTwinEntry): string {
  return `${DIGITAL_TWIN_PATH}?from=${entry}`;
}

export function twinToolHref(entry: TwinToolEntry): string {
  const params = new URLSearchParams({
    utm_source: "mindspan.co",
    utm_medium: "site",
    utm_campaign: "digital-twin",
    utm_content: entry,
  });
  return `${TWIN_TOOL_URL}?${params.toString()}`;
}
