# RankPill Webhook Documentation

Sumber: https://rankpill.com/help/webhooks  
Scraped: 2026-08-03

---

## Gambaran Umum

Webhooks memungkinkan RankPill mengirim real-time article data ke URL pilihan Anda setiap kali artikel dipublish.  
Method: **HTTP POST** dengan JSON payload.

**Use cases yang relevan untuk proyek ini:**
- Custom-built Next.js (App Router)
- Serverless functions (Vercel Functions)

---

## Setup

1. Buka **Settings → Integrations → Webhooks** di dashboard RankPill
2. Masukkan public URL endpoint (misal: https://cakrabajaniaga.com/api/rankpill-webhook)
3. Pilih authentication type:
   - **Signature-based (Recommended)** — HMAC SHA-256
   - **Bearer Token** — simpler, Bearer <token>
4. Klik Connect → RankPill generate **Secret Key**
5. Simpan secret key ke environment variable: RANKPILL_WEBHOOK_SECRET
6. Klik "Send Test" untuk verifikasi endpoint

---

## Authentication Headers

### Signature-based (Default/Recommended)
`
X-RankPill-Signature: <hmac-sha256-hex>
Authorization: sha256=<hmac-sha256-hex>
`

### Bearer Token
`
Authorization: Bearer <secret-key>
`

---

## Payload JSON Structure

`json
{
  "title": "Article Title",
  "content_html": "<h1>...</h1><p>...</p>",
  "content_markdown": "# Article Title\n\nContent...",
  "slug": "article-slug",
  "meta_description": "SEO meta description...",
  "status": "published",
  "featured_image": "https://images.example.com/photo.jpg",
  "published_url": "https://yourblog.com/blog/article-slug",
  "scheduled_date": null,
  "published_at": "2024-03-15T10:30:00Z",
  "is_republish": false,
  "test": false
}
`

### Field Descriptions

| Field | Tipe | Keterangan |
|-------|------|------------|
| 	itle | string | Judul artikel |
| content_html | string | Konten HTML lengkap |
| content_markdown | string | Konten Markdown lengkap |
| slug | string | URL slug (tidak berubah saat update) |
| meta_description | string | SEO meta description |
| status | string | Selalu "published" saat webhook trigger |
| eatured_image | string | URL gambar featured |
| published_url | string | URL live artikel |
| published_at | string (ISO 8601) | Timestamp webhook dikirim |
| is_republish | boolean | 	rue = update artikel, alse = artikel baru |
| 	est | boolean | 	rue = test payload, alse = artikel real |

---

## Implementasi Next.js (App Router)

### Verifikasi Signature (Recommended)

`javascript
// app/api/rankpill-webhook/route.js
import crypto from 'crypto';

export async function POST(request) {
  const rawBody = await request.text();
  const secret = process.env.RANKPILL_WEBHOOK_SECRET;

  const signature = request.headers.get('x-rankpill-signature');
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    return Response.json({ message: 'Invalid signature' }, { status: 401 });
  }

  const article = JSON.parse(rawBody);

  if (article.test) {
    return Response.json({ message: 'Test webhook received successfully' });
  }

  // Simpan artikel ke database / trigger revalidation
  // await saveArticle(article);

  return Response.json({ message: 'Webhook received successfully' });
}
`

### Menangani Update (is_republish)

Gunakan upsert dengan slug sebagai unique key:

`javascript
// Contoh dengan Prisma
await prisma.article.upsert({
  where: { slug: article.slug },
  update: {
    title: article.title,
    content_html: article.content_html,
    content_markdown: article.content_markdown,
    meta_description: article.meta_description,
    featured_image: article.featured_image,
    published_at: article.published_at,
  },
  create: {
    slug: article.slug,
    title: article.title,
    content_html: article.content_html,
    content_markdown: article.content_markdown,
    meta_description: article.meta_description,
    featured_image: article.featured_image,
    published_at: article.published_at,
  },
});
`

---

## Catatan Penting

- Slug **tidak berubah** setelah artikel dipublish — gunakan sebagai primary key
- is_republish: true ketika "Update Article" diklik di dashboard RankPill
- Test payload bisa dibedakan via 	est: true
- Endpoint harus return HTTP 200 agar RankPill menganggap delivery berhasil
