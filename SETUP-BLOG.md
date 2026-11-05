# Dynamic Blog + Admin Login — Setup Guide

**Kya bana hai**

- `blog.html` aur home page ke "Latest Insights" ab database se dynamic aate hain.
- `post.html?slug=...` ek article kholta hai (design bilkul purane articles jaisa).
- `admin.html` — login ke baad article likho, image upload karo, draft save karo, publish/schedule karo, edit ya delete karo.
- Purane 10 articles bhi database mein chale jate hain (`supabase/02-seed-existing-posts.sql`), is liye admin se unhein edit/delete kar sakte ho.
- Hosting free: **GitHub Pages** (jahan abhi hai, custom domain `tradewithbadami.com` wese hi chalega) + **Supabase** free plan (database, login, images).

---

## Step 1 — Supabase project banao (5 min)

1. https://supabase.com par jao → Sign in (GitHub se) → **New project**.
2. Name: `tradewithbadami`, ek strong database password dalo (kahin save kar lo), region apne nazdeek (e.g. Singapore / Mumbai), Free plan.
3. Project ready hone ka intezar karo.

## Step 2 — Database tables banao

1. Left menu → **SQL Editor** → New query.
2. `supabase/01-schema.sql` kholo, usmein `CHANGE_ME@gmail.com` ki jagah **admin ki email** likho (jis se login karna hai) → copy-paste → **Run**.
3. Naya query kholo → `supabase/02-seed-existing-posts.sql` ka poora content paste → **Run**. (Purane 10 articles aa jayenge.)

## Step 3 — Admin user banao

1. **Authentication → Users → Add user → Create new user**.
2. Wahi email (jo Step 2 mein SQL mein likhi) + password. **Auto Confirm User** tick karo → Create.
3. **Authentication → Sign In / Providers** (ya *Sign In / Up*) mein **"Allow new users to sign up" ko OFF** kar do. (Extra safety — waise bhi database sirf admin email ko likhne deta hai.)

## Step 4 — Keys website mein lagao

1. **Project Settings → API Keys** → **Publishable key** (`sb_publishable_...`) copy karo. (Agar "Create new API keys" ka button dikhe to pehle woh dabao.)
2. **Project URL** (`https://xxxx.supabase.co`) bhi copy karo (Project Settings → Data API ya project ki home page par milega).
3. `assets/js/config.js` kholo aur dono values paste karo:
   ```js
   SUPABASE_URL: "https://xxxx.supabase.co",
   SUPABASE_KEY: "sb_publishable_xxxxxxxx",
   ```
   ⚠️ Sirf **publishable** key. `secret` / `service_role` key kabhi website mein mat dalna.

## Step 5 — Website upload (GitHub Pages)

Project folder se changes GitHub repo par push karo (jese pehle karte the). 1–2 minute baad:

- Blog: `https://tradewithbadami.com/blog.html`
- Admin: `https://tradewithbadami.com/admin.html`

## Roz ka use

1. `admin.html` → login → **New article**.
2. Title likho (link/slug khud ban jata hai), category chuno, cover image upload karo, article likho.
   - **Visual** tab: normal editor (heading, bold, list, link, image).
   - **HTML** tab: tables, callout box, key takeaways ke buttons milte hain. (Purane articles jinmein table/FAQ hai woh isi tab mein khulte hain.)
3. **Save draft** (sirf aap ko dikhega) ya **Publish** (live). Future ki date daloge to article us waqt khud live ho jayega (Scheduled).
4. Edit ke liye list mein **Edit** → **Update**. `Ctrl+S` bhi chalta hai.

## Optional but recommended — sitemap + Supabase "sleep" se bachao

Supabase free project 1 hafta bilkul activity na ho to pause ho jata hai. Repo mein ek daily GitHub Action hai (`.github/workflows/sitemap.yml`) jo sitemap bhi update karta hai aur Supabase ko roz ping bhi karta hai.

GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:
- `SUPABASE_URL` = project URL
- `SUPABASE_KEY` = publishable key

Phir **Actions** tab → *Update sitemap* → **Run workflow** (ek dafa test ke liye). Search Console mein `https://tradewithbadami.com/sitemap.xml` submit rakhna.

## Zaroori baatein

- **Purane links** `blog/xyz.html` ab naye page par redirect hote hain (title/image ke sath), Google/WhatsApp purane links par bhi theek chalenge.
- **Nayi article ka link WhatsApp/Facebook par share** karoge to preview mein generic site title/image aayegi (kyunke page browser mein load hota hai). Google ko article theek se dikh jata hai. Agar per-article preview chahiye to hosting ko Cloudflare Pages (free) par move karke ek chhota function lagana hota hai — chaho to baad mein kar denge.
- **Nayi category** chahiye to `assets/js/config.js` ke `CATEGORIES` mein ek line add karo.
- **Password bhoolo** to Supabase → Authentication → Users → user → reset/change password.
- **Admin badalna** ho to Supabase → Table Editor → `admins` table mein email add/change karo (aur Authentication mein us email ka user banao).
- Images automatically compress ho kar WebP ban jati hain, cover 1200×630 mein crop hota hai.
