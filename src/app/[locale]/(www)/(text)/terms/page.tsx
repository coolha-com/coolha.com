import type { Metadata } from "next";
import LegalLayout, { type TocItem } from "@/components/legal/LegalLayout";

const title = "Terms of Service";
const description =
  "Terms of Service of Coolha Limited. These Terms govern your access to and use of https://coolha.com.";

const url = "https://coolha.com/terms";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
    languages: {
      en: "https://coolha.com/en/terms",
      "zh-Hans": "https://coolha.com/zh-Hans/terms",
      "zh-Hant": "https://coolha.com/zh-Hant/terms",
      "x-default": "https://coolha.com/en/terms",
    },
  },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    siteName: "Coolha",
    locale: "en",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Coolha - Terms of Service",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const toc: TocItem[] = [
  { id: "introduction", title: "1. Introduction" },
  { id: "purpose", title: "2. Purpose of the Website" },
  { id: "eligibility", title: "3. Eligibility and Lawful Use" },
  { id: "content", title: "4. Website Content and Accuracy" },
  { id: "ip", title: "5. Intellectual Property" },
  { id: "third-party", title: "6. Third-Party Links and Services" },
  { id: "no-advice", title: "7. No Professional Advice or Offer" },
  { id: "availability", title: "8. Website Availability and Changes" },
  { id: "warranties", title: "9. Disclaimer of Warranties" },
  { id: "liability", title: "10. Limitation of Liability" },
  { id: "indemnification", title: "11. Indemnification" },
  { id: "privacy", title: "12. Privacy" },
  { id: "changes", title: "13. Changes to These Terms" },
  { id: "governing-law", title: "14. Governing Law and Jurisdiction" },
  { id: "severability", title: "15. Severability" },
  { id: "no-waiver", title: "16. No Waiver" },
  { id: "contact-us", title: "17. Contact Us" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "Coolha Limited",
    url: "https://coolha.com",
  },
  datePublished: "2026-10-13",
  dateModified: "2026-10-13",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://coolha.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Terms of Service",
      item: url,
    },
  ],
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalLayout
        title={title}
        breadcrumbLabel="Terms of Service"
        effectiveDate="October 13, 2026"
        lastUpdated="October 13, 2026"
        toc={toc}
      >
        <section id="introduction">
          <h2>1. Introduction</h2>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the official website
            at <a href="https://coolha.com">https://coolha.com</a> (the "Website"), operated by
            Coolha Limited ("Coolha", "we", "us", or "our").
          </p>
          <p>
            By accessing or using the Website, you agree to these Terms. If you do not agree,
            please discontinue using the Website.
          </p>
          <p>
            These Terms apply to the corporate Website only. Separately operated products,
            applications, and services may be governed by their own terms and policies.
          </p>
        </section>

        <section id="purpose">
          <h2>2. Purpose of the Website</h2>
          <p>
            The Website provides general information about Coolha Limited, its business,
            technology activities, projects, and related announcements.
          </p>
          <p>
            Unless expressly stated otherwise, the Website is intended for informational and
            corporate communication purposes.
          </p>
          <p>
            The Website does not itself provide user account registration, payment processing,
            cryptocurrency exchange, wallet connection, or blockchain transaction execution.
          </p>
          <p>
            Information about any separate product or service does not mean that the product or
            service is offered directly through this Website.
          </p>
        </section>

        <section id="eligibility">
          <h2>3. Eligibility and Lawful Use</h2>
          <p>
            You may access and use the Website only in compliance with applicable laws and these
            Terms.
          </p>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Website for any unlawful, fraudulent, or deceptive purpose;</li>
            <li>
              Attempt to gain unauthorised access to the Website, its hosting environment, or
              related systems;
            </li>
            <li>Interfere with the Website's operation, availability, or security;</li>
            <li>Introduce malware or other harmful code;</li>
            <li>
              Scrape, copy, or systematically extract Website content in a manner that violates
              applicable law or the rights of others; or
            </li>
            <li>Infringe the intellectual property or other legal rights of Coolha or any third party.</li>
          </ul>
          <p>
            We may take reasonable measures to protect the Website against misuse, security
            threats, and unlawful activity.
          </p>
        </section>

        <section id="content">
          <h2>4. Website Content and Accuracy</h2>
          <p>
            We make reasonable efforts to keep the Website's content accurate and current. However,
            information may be incomplete, outdated, or subject to change.
          </p>
          <p>
            Content is provided for general informational purposes and should not be treated as a
            guarantee that a particular product, feature, project, or service is available,
            operational, or will be launched.
          </p>
          <p>We may correct, update, remove, or replace content at any time.</p>
        </section>

        <section id="ip">
          <h2>5. Intellectual Property</h2>
          <p>
            Unless otherwise indicated, the Website and its original content, including text,
            graphics, visual designs, logos, branding, and other materials, are owned by Coolha
            Limited or used under appropriate licences.
          </p>
          <p>You may access and view Website content for lawful informational purposes.</p>
          <p>
            Except as permitted by applicable law or with prior written permission, you may not
            reproduce, modify, distribute, publish, commercially exploit, or create derivative
            works from protected Website materials.
          </p>
          <p>
            Third-party names, logos, trademarks, and other intellectual property remain the
            property of their respective owners.
          </p>
          <p>Nothing in these Terms transfers ownership of intellectual property to you.</p>
        </section>

        <section id="third-party">
          <h2>6. Third-Party Links and Services</h2>
          <p>
            The Website may contain links to third-party websites, social media platforms,
            documentation, software, or other external resources.
          </p>
          <p>
            These links are provided for convenience or informational purposes. We do not control
            all third-party content, services, policies, or practices.
          </p>
          <p>
            A link does not necessarily imply endorsement, partnership, sponsorship, or
            affiliation.
          </p>
          <p>
            Your use of a third-party website or service is subject to its own terms and policies.
            To the extent permitted by applicable law, Coolha is not responsible for third-party
            content, availability, or acts and omissions outside our reasonable control.
          </p>
        </section>

        <section id="no-advice">
          <h2>7. No Professional Advice or Offer</h2>
          <p>
            Unless expressly stated otherwise in a separate agreement, Website content is provided
            for general informational purposes only.
          </p>
          <p>
            Nothing on the Website constitutes legal, tax, accounting, financial, investment, or
            other professional advice.
          </p>
          <p>
            Website content does not, by itself, constitute an offer to sell or a solicitation to
            purchase securities, digital assets, financial instruments, or other regulated
            products.
          </p>
          <p>
            You should obtain independent professional advice where appropriate before making
            decisions based on information published on the Website.
          </p>
        </section>

        <section id="availability">
          <h2>8. Website Availability and Changes</h2>
          <p>
            We may modify, suspend, restrict, or discontinue all or part of the Website when
            reasonably necessary, including for maintenance, security, operational, or business
            reasons.
          </p>
          <p>
            We do not guarantee uninterrupted access, continuous availability, error-free
            operation, or compatibility with every device or browser.
          </p>
          <p>Nothing in this section excludes liability where such exclusion is prohibited by applicable law.</p>
        </section>

        <section id="warranties">
          <h2>9. Disclaimer of Warranties</h2>
          <p>
            To the fullest extent permitted by applicable law, the Website and its content are
            provided on an "AS IS" and "AS AVAILABLE" basis.
          </p>
          <p>
            We do not warrant that the Website will always be available, secure, accurate,
            complete, or free from errors, interruptions, or harmful components.
          </p>
          <p>
            To the extent permitted by law, we disclaim implied warranties that may otherwise
            apply to the Website.
          </p>
          <p>
            Nothing in these Terms excludes any statutory rights, warranties, or protections that
            cannot lawfully be excluded.
          </p>
        </section>

        <section id="liability">
          <h2>10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Coolha Limited shall not be liable
            for indirect, incidental, special, exemplary, or consequential loss arising from or in
            connection with your use of, or inability to use, the Website.
          </p>
          <p>
            Nothing in these Terms excludes or limits liability for fraud, wilful misconduct, or
            any other liability that cannot lawfully be excluded or limited.
          </p>
          <p>
            Where liability may lawfully be limited, any limitation will apply only to the extent
            permitted by applicable law.
          </p>
        </section>

        <section id="indemnification">
          <h2>11. Indemnification</h2>
          <p>
            To the extent permitted by applicable law, you are responsible for losses, claims, and
            reasonable costs arising directly from your unlawful use of the Website, your
            infringement of third-party rights, or your material breach of these Terms.
          </p>
          <p>
            This section does not impose liability on you for losses caused by Coolha's own
            unlawful conduct, nor does it apply where such an allocation of liability is
            prohibited by law.
          </p>
        </section>

        <section id="privacy">
          <h2>12. Privacy</h2>
          <p>
            Your use of the Website is also subject to our Privacy Policy, which explains how
            information may be collected, used, and handled.
          </p>
          <p>You can review the Privacy Policy at:</p>
          <p>
            <a href="/privacy">https://coolha.com/privacy</a>
          </p>
        </section>

        <section id="changes">
          <h2>13. Changes to These Terms</h2>
          <p>We may revise these Terms from time to time.</p>
          <p>
            The updated version will be published on this page with a revised "Last Updated" date.
            Changes will take effect as stated in the updated Terms, subject to applicable law.
          </p>
          <p>
            Your continued use of the Website after the revised Terms take effect constitutes
            acceptance of the updated Terms to the extent permitted by law.
          </p>
        </section>

        <section id="governing-law">
          <h2>14. Governing Law and Jurisdiction</h2>
          <p>
            These Terms are governed by the laws of the Hong Kong Special Administrative Region,
            without prejudice to any mandatory legal protections or jurisdictional rules that
            apply.
          </p>
          <p>
            Subject to applicable law, the courts of the Hong Kong Special Administrative Region
            shall have jurisdiction over disputes arising out of or in connection with these Terms
            or your use of the Website.
          </p>
        </section>

        <section id="severability">
          <h2>15. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid, unlawful, or unenforceable,
            that provision shall be interpreted or limited to the minimum extent necessary, where
            legally permissible, and the remaining provisions shall continue in effect.
          </p>
        </section>

        <section id="no-waiver">
          <h2>16. No Waiver</h2>
          <p>
            A failure or delay by Coolha in exercising any right under these Terms does not
            constitute a waiver of that right.
          </p>
        </section>

        <section id="contact-us">
          <h2>17. Contact Us</h2>
          <p>For questions regarding these Terms, please contact:</p>
          <p>
            <strong>Coolha Limited</strong>
            <br />
            Website: <a href="https://coolha.com">https://coolha.com</a>
            <br />
            Email: <a href="mailto:connect@coolha.com">help@coolha.com</a>
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
