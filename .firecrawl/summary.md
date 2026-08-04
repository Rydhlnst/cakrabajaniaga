# Ringkasan: cakrabajaniaga.com — Konten & Tujuan Situs

Dibuat: 2026-08-03  
Berdasarkan scrape via Firecrawl

---

## Tentang Bisnis

**PT Cakra Baja Niaga (CBN)** adalah perusahaan trading Indonesia yang mengekspor **ubi jalar premium** ke pasar internasional.

- **Kantor:** Jakarta Timur (Ruko Puri Sentra Niaga)
- **Kontak:** admin@cakrabajaniaga.com · WhatsApp +62 815-8432-1861
- **Scale:** 40+ export markets, Grade A quality, year-round supply

---

## Produk Utama

| Varietas | Keunggulan | Target Pasar |
|----------|-----------|--------------|
| **Cilembu Sweet Potato** | "Honey sweet potato" — caramel syrup alami saat dipanggang, single-origin West Java | Premium retail, gourmet |
| **Purple Sweet Potato** | Tinggi antioksidan/anthocyanin, warna violet alami, versatile untuk processing | Health food, food industry |
| **Murasaki Sweet Potato** | Japanese heritage cultivar, rasa chestnut-nutty, shelf stable | Retail, gourmet foodservice |

Ukuran tersedia: **80g — 500g** per unit.

---

## Target Audience

Situs ini **bukan B2C** — target utamanya adalah:
- Importers (pembeli volume besar)
- Distributors
- Retailers (supermarket, specialty stores)
- Foodservice & wholesale buyers
- Private label brands

CTA utama selalu "Request a Quote" → form leads capture.

---

## Struktur Halaman

| Halaman | Fungsi |
|---------|--------|
| / (Homepage) | One-page landing: produk, nilai jual, supply chain, quote form, about |
| /blog | Blog dengan 29 artikel SEO, terbit hampir harian |
| /galleries | 3 video YouTube kebun + foto sizing produk |

---

## Blog Strategy (RankPill/Autopill)

Blog bernama **"The CBN Export Journal"** dengan tagline tentang export trade knowledge.

- **Sumber konten:** RankPill (autopilot SEO publishing tool)
- **Frekuensi:** ~1 artikel per hari
- **Topik:** nutrisi ubi jalar, panduan varietas, panduan ekspor, sejarah, cooking guides
- **Target keyword:** importers, exporters, buyers — long-tail SEO
- **Tujuan:** organic traffic dari Google untuk kata kunci terkait sweet potato export
- **Gambar:** disimpan di Supabase CDN (RankPill's infrastructure)

Artikel contoh:
- "Colors of Sweet Potatoes: A Complete Guide for Importers"
- "Japanese Sweet Potato Baked: Complete Guide for 2026"
- "Purple Yams Near Me: A Sourcing Guide for Importers"

---

## Integrasi RankPill Webhook

RankPill mengirim artikel via **HTTP POST webhook** setiap kali artikel dipublish.

**Payload utama yang diterima:**
- 	itle, slug, meta_description
- content_html, content_markdown
- eatured_image (URL dari Supabase)
- published_at (ISO 8601 timestamp)
- is_republish (true = update, false = baru)
- 	est (true = test payload)

**Authentication:** HMAC SHA-256 via header X-RankPill-Signature

**Endpoint yang perlu dibuat:** POST /api/rankpill-webhook

---

## Implikasi untuk Build (Next.js)

Berdasarkan konten situs yang sudah live, halaman yang perlu dibangun:

### Priority 1 — Core Pages
1. **Homepage** (/) — One-page dengan sections: hero, products, why indonesia, supply chain, quote form, about, contact
2. **Blog Index** (/blog) — Grid artikel dengan pagination
3. **Blog Detail** (/blog/[slug]) — Single article page
4. **Galleries** (/galleries) — Video embeds + product photos

### Priority 2 — Infrastructure
5. **Webhook API route** (/api/rankpill-webhook) — Menerima artikel dari RankPill, simpan ke database
6. **Database schema** untuk artikel: slug (PK), title, content_html, content_markdown, meta_description, featured_image, published_at

### Keputusan Teknis yang Perlu Dibuat
- Database: Supabase / PlanetScale / Vercel Postgres?
- Blog rendering: dari database (dynamic) atau static generation (ISR)?
- Quote form backend: email via Resend/Nodemailer, atau form service (Formspree/Netlify)?
- Deployment: Vercel (sesuai stack Next.js)?
- Domain: cakrabajaniaga.com sudah ada (di Hostinger)

---

## File Referensi

- [.firecrawl/homepage.md](homepage.md) — Konten homepage lengkap
- [.firecrawl/blog.md](blog.md) — Daftar artikel & pola konten
- [.firecrawl/galleries.md](galleries.md) — Video & foto produk
- [.firecrawl/rankpill-webhooks.md](rankpill-webhooks.md) — Dokumentasi webhook + implementasi Next.js
- [.firecrawl/sitemap.md](sitemap.md) — Struktur URL
