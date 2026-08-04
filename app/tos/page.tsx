import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for cakrabajaniaga.com — terms and conditions governing the use of PT Cakra Baja Niaga's website.",
};

const sections = [
  {
    title: "1. Introduction",
    body: `Welcome to cakrabajaniaga.com (the "Website"), owned and operated by PT Cakra Baja Niaga ("Company", "we", "us", or "our"), a company registered in Indonesia and engaged in the export of sweet potatoes (Cilembu, Purple, and Murasaki varieties) and related agricultural products.

By accessing or using this Website, you ("User", "you") agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, please do not use this Website.`,
  },
  {
    title: "2. Purpose of the Website",
    body: `This Website is provided for informational purposes to present the Company's business profile, products, and export capabilities, and to enable prospective buyers and business partners to submit inquiries through contact forms or email. This Website does not offer direct e-commerce transactions, online checkout, or online payment processing.`,
  },
  {
    title: "3. Eligibility",
    body: `This Website is intended for business users, prospective buyers, distributors, and partners interested in the Company's export products. By using this Website, you represent that you are at least 18 years old and have the legal capacity to enter into business communications on behalf of yourself or an organization.`,
  },
  {
    title: "4. Use of the Website",
    body: `You agree to use this Website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this Website by any third party. Prohibited uses include, but are not limited to:

• Attempting to gain unauthorized access to the Website, its servers, or any connected systems;
• Uploading or transmitting viruses, malware, or any other malicious code;
• Using automated systems (bots, scrapers, crawlers) to extract data from the Website without prior written consent;
• Submitting false, misleading, or fraudulent inquiries;
• Using the Website in any way that violates applicable Indonesian or international law.`,
  },
  {
    title: "5. Inquiries and Communications",
    body: `When you submit an inquiry through our contact form or email, you agree to provide accurate and complete information. Any business discussions, quotations, or agreements resulting from such inquiries are not concluded through this Website itself but through separate direct communication (email, phone, or written contract) between you and the Company. These Terms do not constitute a sales contract, offer, or binding commercial agreement.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All content on this Website, including but not limited to text, graphics, logos, images, product descriptions, and the overall design and layout, is the property of PT Cakra Baja Niaga or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this Website without our prior written consent, except for personal, non-commercial reference purposes.`,
  },
  {
    title: "7. Product Information Disclaimer",
    body: `We make reasonable efforts to ensure that product descriptions, specifications, images, and availability information on this Website are accurate and up to date. However, actual product characteristics (including size, color, weight, and seasonal availability) may vary. Any product information on this Website is provided for general reference only and does not constitute a binding offer. Final specifications, pricing, and terms for any transaction will be confirmed directly and separately with the buyer.`,
  },
  {
    title: "8. Third-Party Links",
    body: `This Website may contain links to third-party websites or services that are not owned or controlled by the Company. We are not responsible for the content, privacy policies, or practices of any third-party websites. Accessing any linked third-party website is done at your own risk.`,
  },
  {
    title: "9. Privacy",
    body: `Your use of this Website is also governed by our Privacy Policy, which explains how we collect, use, and protect information submitted through this Website (for example, via contact or inquiry forms).`,
  },
  {
    title: "10. Limitation of Liability",
    body: `To the fullest extent permitted by applicable law, PT Cakra Baja Niaga shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of, or inability to use, this Website, including but not limited to loss of profits, data, business opportunities, or goodwill, even if we have been advised of the possibility of such damages.

This Website and its content are provided on an "as is" and "as available" basis, without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.`,
  },
  {
    title: "11. Indemnification",
    body: `You agree to indemnify and hold harmless PT Cakra Baja Niaga, its directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising out of your violation of these Terms or your misuse of this Website.`,
  },
  {
    title: "12. Changes to These Terms",
    body: `We reserve the right to modify or update these Terms at any time at our sole discretion. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of the Website after such changes constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.`,
  },
  {
    title: "13. Termination of Access",
    body: `We reserve the right, without notice, to suspend or terminate your access to this Website if we believe, in our sole discretion, that you have violated these Terms or engaged in conduct that is unlawful or harmful to the Company or other users.`,
  },
  {
    title: "14. Governing Law and Jurisdiction",
    body: `These Terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia, without regard to its conflict of law provisions. Any disputes arising out of or in connection with these Terms or your use of this Website shall be subject to the exclusive jurisdiction of the competent courts in Indonesia, unless otherwise agreed in writing by both parties.`,
  },
  {
    title: "15. Severability",
    body: `If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.`,
  },
  {
    title: "16. Contact Us",
    body: `If you have any questions about these Terms, please contact us at:

PT Cakra Baja Niaga
Email: admin@cakrabajaniaga.com
Address: Ruko Puri Sentra Niaga Blok D/62, 3rd Floor, Jl. Seulawah Raya, RT.12/RW.07, Kel. Cipinang Melayu, Kec. Makasar, Jakarta Timur, DKI Jakarta 13620
Website: https://cakrabajaniaga.com`,
  },
];

export default function TosPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-4">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-5 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 sm:text-sm">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-stone-500">Last updated: 03 August 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-5 sm:py-16">
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-2 font-display text-lg font-semibold text-stone-900">
                {section.title}
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-stone-600">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
