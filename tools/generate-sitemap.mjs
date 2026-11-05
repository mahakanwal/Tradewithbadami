// Rebuilds the article entries in sitemap.xml from the published posts in Supabase.
// Usage:  SUPABASE_URL=... SUPABASE_KEY=<publishable key> node tools/generate-sitemap.mjs
// (Also runs automatically every day via .github/workflows/sitemap.yml)
import { readFileSync, writeFileSync } from "node:fs";

const URL_ = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_KEY;
const SITE = "https://tradewithbadami.com";
if (!URL_ || !KEY) { console.error("Set SUPABASE_URL and SUPABASE_KEY first."); process.exit(1); }

const res = await fetch(`${URL_}/rest/v1/posts?select=slug,published_at,updated_at&order=published_at.desc`, { headers: { apikey: KEY } });
if (!res.ok) { console.error("Supabase error", res.status, await res.text()); process.exit(1); }
const posts = await res.json();

const file = new URL("../sitemap.xml", import.meta.url);
const xml = readFileSync(file, "utf8");
const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
const keep = blocks.filter((b) => !/\/blog\/|post\.html/.test(b));   // static pages stay as they are
const day = (iso) => String(iso || "").slice(0, 10);
const entries = posts.map((p) =>
  `  <url><loc>${SITE}/post.html?slug=${encodeURIComponent(p.slug)}</loc><lastmod>${day(p.updated_at || p.published_at)}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);

const out = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  keep.map((b) => "  " + b.trim()).join("\n") + "\n" + entries.join("\n") + "\n</urlset>\n";
if (out !== xml) { writeFileSync(file, out); console.log(`sitemap.xml updated (${posts.length} articles).`); }
else console.log("sitemap.xml already up to date.");
