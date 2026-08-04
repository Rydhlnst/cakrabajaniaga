// scripts/fetch-assets.mjs — download brand assets to public/assets/
import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(process.cwd(), "public", "assets");

const assets = {
  "logo.png":
    "https://horizons-cdn.hostinger.com/0e53f9d7-da72-4e60-9ba9-a95ca65b4a99/cdfdf5c55fffed2da99a9d07de5bcf30.png",
  "hero-harvest.png": "https://images.hostinger.com/57bf0083-6f02-4018-8bef-cd7fb8a41432.png",
  "product-cilembu.png": "https://images.hostinger.com/5ccc5d7a-db9e-43ba-8167-2e24891fa1e7.png",
  "product-purple.png": "https://images.hostinger.com/2710794c-c900-491a-bed1-7f327fc02bd3.png",
  "product-murasaki.png": "https://images.hostinger.com/bdac3e6d-8dc8-4021-bc72-b7f657a0b766.png",
  "farm-terraces.png": "https://images.hostinger.com/237544ed-b4ae-43c6-96ea-f7c529e36e44.png",
  "facility-packing.png": "https://images.hostinger.com/d88b6f23-b116-4777-9f80-7c1d1eec6ef2.png",
  "sizing-purple.jpg":
    "https://horizons-cdn.hostinger.com/0e53f9d7-da72-4e60-9ba9-a95ca65b4a99/cbc2acf459c74acc58aaf9719eb4433f.jpg",
  "sizing-cilembu.jpg":
    "https://horizons-cdn.hostinger.com/0e53f9d7-da72-4e60-9ba9-a95ca65b4a99/9b47782f2ea442d43254d448cf79feec.jpg",
};

await fs.mkdir(OUT, { recursive: true });
for (const [name, url] of Object.entries(assets)) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(path.join(OUT, name), buf);
    console.log(`✓ ${name} (${Math.round(buf.length / 1024)} KB)`);
  } catch (err) {
    console.warn(`! ${name} failed: ${err.message}`);
  }
}
