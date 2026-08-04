import { Resend } from "resend";

let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export interface SendArticleNotificationParams {
  to: string;
  articleTitle: string;
  articleSlug: string;
  articleDescription?: string | null;
}

export async function sendArticleNotification({
  to,
  articleTitle,
  articleSlug,
  articleDescription,
}: SendArticleNotificationParams) {
  const client = getResendClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cakrabajaniaga.com";
  const articleUrl = `${siteUrl}/blog/${articleSlug}`;

  const { data, error } = await client.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "CBN Export Journal <newsletter@cakrabajaniaga.com>",
    to: [to],
    subject: `New Article: ${articleTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px;">
            <a href="${articleUrl}" style="color: inherit; text-decoration: none;">${articleTitle}</a>
          </h1>
          ${articleDescription ? `<p style="color: #666; font-size: 16px; line-height: 1.6;">${articleDescription}</p>` : ""}
          <a href="${articleUrl}" style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #1a1a1a; color: #fff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">Read Article →</a>
          <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #999;">The CBN Export Journal — PT Cakra Baja Niaga</p>
        </body>
      </html>
    `,
  });

  if (error) {
    console.error("[resend] send failed:", error);
    throw error;
  }

  return data;
}
