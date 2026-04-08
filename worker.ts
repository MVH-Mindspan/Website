// Cloudflare Worker — serves static Next.js export from ./out
// Future: add /api/book-a-visit form handler here.

interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
