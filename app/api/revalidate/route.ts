import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand ISR revalidation.
 *
 * POST /api/revalidate?secret=xxx&path=/sitemap.xml
 *
 * Set REVALIDATION_SECRET in .env.local (same value used here and on Vercel).
 * If no secret is configured on the server, the check is skipped (dev convenience).
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const path = url.searchParams.get("path");

  const expected = process.env.REVALIDATION_SECRET;
  if (expected && secret !== expected) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: "Missing ?path= param" }, { status: 400 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}
