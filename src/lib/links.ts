export function externalLinkProps(href: string) {
  return /^https?:\/\//i.test(href)
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}
