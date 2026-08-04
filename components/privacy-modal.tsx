"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const privacyContent = [
  {
    title: "1. Introduction",
    body: `This Privacy Policy describes how PT Cakra Baja Niaga ("Company", "we", "us", or "our") collects, uses, and protects information obtained through cakrabajaniaga.com (the "Website"). By using this Website, you agree to the practices described in this Privacy Policy.`,
  },
  {
    title: "2. Information We Collect",
    body: `We may collect the following types of information when you use this Website:

• Personal Information: Name, email address, phone number, company name, and any other details you voluntarily provide through our contact or inquiry forms.
• Non-Personal Information: Browser type, device type, operating system, IP address, pages visited, time spent on pages, and other usage data collected automatically through cookies or similar technologies.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use the information we collect for the following purposes:

• To respond to your inquiries and provide requested information about our products and services;
• To communicate with you regarding business opportunities, quotations, and export-related matters;
• To improve and optimize our Website and user experience;
• To comply with legal obligations and protect our rights.`,
  },
  {
    title: "4. Cookies and Tracking Technologies",
    body: `This Website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device. You can control cookies through your browser settings. Disabling cookies may affect the functionality of certain parts of the Website.`,
  },
  {
    title: "5. Data Sharing and Disclosure",
    body: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:

• With your explicit consent;
• To comply with legal requirements, court orders, or government regulations;
• To protect the rights, property, or safety of the Company, its users, or the public;
• With trusted service providers who assist us in operating the Website, subject to confidentiality obligations.`,
  },
  {
    title: "6. Data Security",
    body: `We implement reasonable administrative, technical, and physical security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "7. Data Retention",
    body: `We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law. When your information is no longer needed, we will securely delete or anonymize it.`,
  },
  {
    title: "8. Your Rights",
    body: `You have the right to:

• Access the personal information we hold about you;
• Request correction of inaccurate or incomplete information;
• Request deletion of your personal information, subject to legal obligations;
• Withdraw your consent to the processing of your personal information at any time.

To exercise these rights, please contact us at admin@cakrabajaniaga.com.`,
  },
  {
    title: "9. Third-Party Links",
    body: `This Website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    title: "10. Children's Privacy",
    body: `This Website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete it promptly.`,
  },
  {
    title: "11. Changes to This Privacy Policy",
    body: `We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of the Website after such changes constitutes your acceptance of the revised Privacy Policy.`,
  },
  {
    title: "12. Contact Us",
    body: `If you have any questions about this Privacy Policy, please contact us at:

PT Cakra Baja Niaga
Email: admin@cakrabajaniaga.com
Address: Ruko Puri Sentra Niaga Blok D/62, 3rd Floor, Jl. Seulawah Raya, RT.12/RW.07, Kel. Cipinang Melayu, Kec. Makasar, Jakarta Timur, DKI Jakarta 13620
Website: https://cakrabajaniaga.com`,
  },
];

export function PrivacyModal() {
  return (
    <Dialog>
      <DialogTrigger className="text-xs text-stone-500 transition hover:text-stone-700 sm:text-sm">
        Privacy Policy
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Privacy Policy
          </DialogTitle>
          <p className="text-xs text-muted-foreground">
            Last updated: 03 August 2026
          </p>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-2 text-sm leading-relaxed text-stone-600">
          {privacyContent.map((section) => (
            <div key={section.title} className="mb-5">
              <h3 className="mb-1.5 font-display text-sm font-semibold text-stone-900">
                {section.title}
              </h3>
              <p className="whitespace-pre-line text-[0.8rem] leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
