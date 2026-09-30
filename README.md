https://website.mvh-9c9.workers.dev/

## After deploying: `npm run indexnow`

Run this once a production deploy is live on mindspan.co. It reads the live
`https://mindspan.co/sitemap.xml`, adds every old path in
`legacy-redirects.json`, and submits the list to IndexNow (Bing, Yandex, Seznam,
Naver and others) so new pages, edits and redirects get recrawled promptly.
The key is the `public/<key>.txt` file, which must be deployed for the ping to
be accepted (a `403` means it is not live yet).

Add `-- --dry-run` to print the payload without sending it.
