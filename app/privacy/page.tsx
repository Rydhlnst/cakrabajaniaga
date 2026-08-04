import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for cakrabajaniaga.com — how PT Cakra Baja Niaga collects, uses, and protects your personal data.",
};

const sections = [
  {
    title: "1. Introduction",
    body: `PT Cakra Baja Niaga ("Company", "we", "us", or "our") operates the website cakrabajaniaga.com (the "Website"). This Privacy Policy explains how we collect, use, store, and protect personal data when you visit our Website or submit an inquiry through our contact/inquiry form.

This Policy is intended to reflect commonly recognized privacy practices (in line with international standards such as the EU's GDPR principles) and complies with Indonesia's Personal Data Protection Law (Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi / "UU PDP").

By using this Website, you acknowledge that you have read and understood this Privacy Policy.`,
  },
  {
    title: "2. Data Controller",
    body: `The data controller responsible for your personal data is:

PT Cakra Baja Niaga
Email: admin@cakrabajaniaga.com
Address: Ruko Puri Sentra Niaga Blok D/62, 3rd Floor, Jl. Seulawah Raya, RT.12/RW.07, Kel. Cipinang Melayu, Kec. Makasar, Jakarta Timur, DKI Jakarta 13620
Website: https://cakrabajaniaga.com`,
  },
  {
    title: "3. What Personal Data We Collect",
    body: `We only collect personal data that you voluntarily provide to us, primarily through our contact/inquiry form. This may include:

• Full name
• Company name and job title
• Email address
• Phone number / WhatsApp number
• Country of origin
• Content of your message or inquiry (e.g., product interest, order volume, shipping destination)

We may also automatically collect limited technical data when you browse the Website, such as:

• IP address
• Browser type and device information
• Pages visited and time spent on the Website
• Referring website (how you arrived at our Website)

This technical data is typically collected through cookies or similar analytics tools (see Section 8).`,
  },
  {
    title: "4. How We Use Your Personal Data",
    body: `We use the personal data we collect for the following purposes:

• To respond to your business inquiries and communicate with you regarding potential export transactions;
• To evaluate and process buyer/partner requests;
• To maintain business records and correspondence history;
• To improve our Website's content, functionality, and user experience;
• To comply with applicable legal, tax, and regulatory obligations related to export trade;
• To send you relevant business communications, only where you have provided your contact details for that purpose.

We do not use your data for automated decision-making or profiling that produces legal effects concerning you.`,
  },
  {
    title: "5. Legal Basis for Processing",
    body: `Where required under applicable data protection law, we process your personal data based on one or more of the following legal grounds:

• Your consent, given when you voluntarily submit the inquiry form;
• Performance of pre-contractual steps, at your request, prior to entering into a business agreement;
• Legitimate business interests, such as maintaining accurate business records and responding to trade inquiries;
• Compliance with legal obligations, including export/trade documentation requirements under Indonesian law.`,
  },
  {
    title: "6. How We Share Your Data",
    body: `We do not sell, rent, or trade your personal data to third parties. We may share your data only in the following limited circumstances:

• With logistics, shipping, or customs partners, where necessary to fulfill an actual export transaction you have initiated;
• With service providers who support our Website operations (e.g., hosting providers, email services, analytics tools), who are bound by confidentiality obligations;
• Where required by law, regulation, legal process, or governmental request;
• With your explicit consent, for any other purpose not listed above.`,
  },
  {
    title: "7. International Data Transfers",
    body: `As an export-oriented business, your data may be processed or accessed by our team or service providers located outside Indonesia (for example, cloud hosting or email service providers). Where such transfers occur, we take reasonable steps to ensure your data continues to be protected in accordance with this Policy and applicable law.`,
  },
  {
    title: "8. Cookies and Tracking Technologies",
    body: `Our Website may use cookies and similar tracking technologies to:

• Ensure the Website functions properly;
• Understand how visitors use our Website (analytics);
• Improve Website performance and content relevance.

You can control or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of the Website.`,
  },
  {
    title: "9. Data Retention",
    body: `We retain your personal data only for as long as necessary to fulfill the purposes described in this Policy, including:

• The duration of our business relationship or ongoing communication with you;
• Any additional period required to comply with legal, tax, accounting, or export documentation obligations;

Once your data is no longer needed, we will securely delete or anonymize it.`,
  },
  {
    title: "10. Data Security",
    body: `We implement reasonable technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "11. Your Rights",
    body: `Subject to applicable law (including UU PDP), you may have the right to:

• Access the personal data we hold about you;
• Request correction of inaccurate or incomplete data;
• Request deletion of your personal data, where applicable;
• Withdraw your consent at any time, without affecting the lawfulness of processing carried out before withdrawal;
• Object to or request restriction of certain processing activities;
• Request a copy of your data in a portable format, where technically feasible;
• Lodge a complaint with the competent data protection authority, if you believe your rights have been violated.

To exercise any of these rights, please contact us using the details in Section 2.`,
  },
  {
    title: "12. Children's Privacy",
    body: `This Website is intended for business use and is not directed at children. We do not knowingly collect personal data from individuals under the age of 18. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.`,
  },
  {
    title: "13. Third-Party Links",
    body: `Our Website may contain links to third-party websites. This Privacy Policy does not apply to those external websites, and we encourage you to review their respective privacy policies before providing any personal data.`,
  },
  {
    title: "14. Changes to This Privacy Policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. Any updates will be posted on this page with a revised "Last updated" date. We encourage you to review this Policy periodically.`,
  },
  {
    title: "15. Contact Us",
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy or how your personal data is handled, please contact us at:

PT Cakra Baja Niaga
Email: admin@cakrabajaniaga.com
Address: Ruko Puri Sentra Niaga Blok D/62, 3rd Floor, Jl. Seulawah Raya, RT.12/RW.07, Kel. Cipinang Melayu, Kec. Makasar, Jakarta Timur, DKI Jakarta 13620
Website: https://cakrabajaniaga.com`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-5 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 sm:text-sm">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Privacy Policy
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
