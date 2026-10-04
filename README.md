# Trade With Badami — Website

Static website (HTML + Bootstrap 5 + one CSS + one JS). Upload the whole folder to your hosting root (public_html).

## Folder structure
```
index.html, about.html, services.html, results.html, moments.html, blog.html, contact.html, 404.html
blog/                     10 article pages
assets/css/style.css      the only stylesheet (all old CSS files merged/replaced)
assets/js/main.js         the only script (all old JS files merged/replaced)
assets/images/brand/      favicon, app icons, og-image (social share image)
assets/images/platform/   Deriv MT5 app image
assets/images/waseem/     photos of Waseem
assets/images/markets/    market card images
assets/images/results/    SIGNAL RESULT screenshots
assets/images/moments/    special moments photos
assets/images/blog/       blog cover images (1200x630)
assets/videos/            special moments videos (.mp4)
sitemap.xml, robots.txt, site.webmanifest, .htaccess
```

## 1. Connect the contact form (2 minutes)
1. Go to https://web3forms.com, enter `mwaseembadami63@gmail.com`, copy the Access Key from the email.
2. Open `contact.html`, find `YOUR_WEB3FORMS_ACCESS_KEY` and paste your key there.
Every submission now arrives directly in the email inbox.
(Formspree instead? Put your Formspree URL in the form `action` and delete the `access_key` line.)

## 2. Signal results
10 result screenshots are already added (`assets/images/results/`).
To add more: save the image in that folder, then in `results.html` copy one `<div class="... result-item" ...>` block
and change the image name, title, text and `data-category` (boom-crash / volatility / gold).

## 3. Special Moments page (moments.html)
Videos -> `assets/videos/` with exactly these names (MP4; portrait or landscape both play without cropping):
- opening-ceremony.mp4       Office Opening Ceremony   (also on Home)
- deriv-award.mp4            Deriv Award               (also on Home)
- interview-news.mp4         News Interview            (also on Home)
- deriv-seminar.mp4          Deriv Seminar
- cake-cutting-ceremony.mp4  Cake Cutting Ceremony
- work-in-office.mp4         Work in Office
Photos -> `assets/images/moments/`: openinig-ceremony.jpeg, friends.jpeg, interview.jpeg, cake-cutting.jpeg, office.jpeg
Files appear automatically. To change a title, edit the text inside the matching block in moments.html / index.html.
Tip: keep each video under ~15 MB for fast loading.

## 3b. About page video
Put Waseem's introduction video at `assets/videos/about_video.mp4` (MP4, H.264, portrait or landscape).
The "Hear It From Waseem Badami" section on about.html appears automatically once the file is there.

## 4. Deriv partner link
Already set everywhere: https://t.deriv.link?t=VQLH73WYR4HD

## 5. SEO
- Domain is set to https://tradewithbadami.com (canonical, sitemap, Open Graph, schema).
- After going live: submit https://tradewithbadami.com/sitemap.xml in Google Search Console.
