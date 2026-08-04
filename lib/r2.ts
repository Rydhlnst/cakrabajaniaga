import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.R2_PUBLIC_URL!; // e.g. https://blog.cakrabajaniaga.com

/**
 * Upload a buffer to R2 under blog/<slug>/<filename>.
 * Returns the public URL of the uploaded object.
 */
export async function uploadToR2(
  slug: string,
  filename: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  const key = `blog/${slug}/${filename}`;

  await R2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  return `${PUBLIC_URL}/${key}`;
}

/**
 * Generate a presigned GET URL (useful for private buckets or temporary access).
 */
export async function getPresignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(R2, command, { expiresIn: 3600 });
}

/**
 * Build the public R2 URL for a blog image without uploading.
 */
export function getR2PublicUrl(slug: string, filename: string): string {
  return `${PUBLIC_URL}/blog/${slug}/${filename}`;
}
