import type { Metadata } from "next";
import LegalLayout, { type TocItem } from "@/components/legal/LegalLayout";

const title = "Privacy Policy";
const description =
  "Privacy Policy of Coolha Limited. Learn how we collect, use, and protect information when you visit https://coolha.com.";

const url = "https://coolha.com/privacy";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
    languages: {
      en: "https://coolha.com/en/privacy",
      "zh-Hans": "https://coolha.com/zh-Hans/privacy",
      "zh-Hant": "https://coolha.com/zh-Hant/privacy",
      "x-default": "https://coolha.com/en/privacy",
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
        alt: "Coolha - Privacy Policy",
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
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "how-we-use-information", title: "3. How We Use Information" },
  { id: "cookies-and-analytics", title: "4. Cookies and Website Analytics" },
  { id: "how-we-share-information", title: "5. How We Share Information" },
  { id: "international-data-transfers", title: "6. International Data Transfers" },
  { id: "data-retention", title: "7. Data Retention" },
  { id: "data-security", title: "8. Data Security" },
  { id: "your-rights", title: "9. Your Rights and Requests" },
  { id: "third-party-websites", title: "10. Third-Party Websites" },
  { id: "changes", title: "11. Changes to This Privacy Policy" },
  { id: "contact-us", title: "12. Contact Us" },
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
      name: "Privacy Policy",
      item: url,
    },
  ],
};

export default function PrivacyPage() {
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
        breadcrumbLabel="Privacy Policy"
        effectiveDate="October 13, 2026"
        lastUpdated="October 13, 2026"
        toc={toc}
      >
        <section id="introduction">
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how Coolha Limited ("Coolha", "we", "us", or "our")
            handles information when you visit our official website at{" "}
            <a href="https://coolha.com">https://coolha.com</a> (the "Website").
          </p>
          <p>
            Coolha Limited is a company incorporated in Hong Kong. This Policy applies to the
            Website and its general corporate information and communication functions only.
          </p>
          <p>
            It does not automatically apply to separately operated products, applications, or
            services that may have their own privacy policies and terms.
          </p>
        </section>

        <section id="information-we-collect">
          <h2>2. Information We Collect</h2>
          <p>
            We may collect the following categories of information when you use the Website.
          </p>

          <h3>2.1 Technical and Usage Information</h3>
          <p>
            When you visit the Website, certain technical information may be collected
            automatically by our hosting infrastructure, security systems, or analytics tools,
            including:
          </p>
          <ul>
            <li>IP address;</li>
            <li>Browser type and version;</li>
            <li>Operating system and device information;</li>
            <li>Pages visited and referring URLs;</li>
            <li>Date, time, and duration of visits; and</li>
            <li>Website interaction and usage data.</li>
          </ul>
          <p>
            The specific information collected depends on the configuration of the Website, its
            hosting infrastructure, and the analytics tools in use.
          </p>

          <h3>2.2 Information You Send by Email</h3>
          <p>
            If you contact us using an email address published on the Website, we may receive the
            information contained in your email, such as your email address, name if provided,
            message content, and any attachments you choose to send.
          </p>
          <p>
            Please avoid sending sensitive personal information unless it is necessary for your
            inquiry.
          </p>

          <h3>2.3 Information We Do Not Intentionally Collect Through This Website</h3>
          <p>
            The Website does not provide user account registration, payment processing, or
            blockchain wallet connection functionality.
          </p>
          <p>
            We therefore do not intentionally collect account credentials, payment card details,
            or wallet connection information through the Website's own user interface.
          </p>
          <p>
            This statement does not exclude technical data that may be processed by third-party
            infrastructure providers or information that you independently choose to include in an
            email.
          </p>
        </section>

        <section id="how-we-use-information">
          <h2>3. How We Use Information</h2>
          <p>
            We may use information collected through the Website for the following purposes:
          </p>
          <ul>
            <li>Operating, maintaining, and securing the Website;</li>
            <li>Understanding website traffic and visitor interactions;</li>
            <li>Measuring and improving website performance and content;</li>
            <li>Responding to email inquiries and business communications;</li>
            <li>Detecting technical errors, misuse, or security incidents; and</li>
            <li>Meeting applicable legal obligations and protecting our legitimate rights.</li>
          </ul>
          <p>
            We do not use the Website as a platform for processing financial transactions or
            providing personalised investment advice.
          </p>
          <p>We do not sell personal data collected through the Website.</p>
        </section>

        <section id="cookies-and-analytics">
          <h2>4. Cookies and Website Analytics</h2>

          <h3>4.1 Cookies and Similar Technologies</h3>
          <p>
            The Website may use cookies or similar technologies to support website functionality,
            measure traffic, and understand how visitors interact with our content.
          </p>
          <p>
            Cookies are small files or identifiers that may be stored on your device or browser.
            Some are necessary for website operation, while others may be used for analytics.
          </p>

          <h3>4.2 Google Analytics and Other Analytics Providers</h3>
          <p>
            We may use Google Analytics or other website analytics services to understand visitor
            behaviour and improve the Website.
          </p>
          <p>
            Depending on the service and its configuration, these tools may collect information
            such as page views, interaction events, browser and device information, approximate
            geographic information, referral sources, IP-related technical information, and
            cookie-based or similar identifiers.
          </p>
          <p>
            Google and other providers may process information in accordance with their own
            privacy policies and applicable service terms.
          </p>
          <p>
            For information about how Google uses information from websites that use its services,
            please visit:
          </p>
          <p>
            <a href="https://policies.google.com/technologies/partner-sites">
              https://policies.google.com/technologies/partner-sites
            </a>
          </p>
          <p>For Google's general Privacy Policy, please visit:</p>
          <p>
            <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>
          </p>

          <h3>4.3 Managing Cookies and Analytics</h3>
          <p>
            You can manage or delete cookies through your browser settings. Blocking certain
            cookies or scripts may affect the availability or accuracy of some website functions
            or analytics.
          </p>
          <p>
            Where applicable law requires consent before non-essential cookies or analytics
            technologies are used, we will implement appropriate consent mechanisms.
          </p>
        </section>

        <section id="how-we-share-information">
          <h2>5. How We Share Information</h2>
          <p>
            We may share information with the following categories of recipients when reasonably
            necessary:
          </p>
          <ul>
            <li>
              <strong>Hosting and infrastructure providers:</strong> To host, deliver, maintain,
              and secure the Website.
            </li>
            <li>
              <strong>Analytics providers:</strong> To measure website traffic and usage.
            </li>
            <li>
              <strong>Professional advisers:</strong> Where necessary for legal, accounting, or
              professional advice.
            </li>
            <li>
              <strong>Public authorities or other parties:</strong> Where disclosure is required
              by law or is reasonably necessary to establish, exercise, or defend legal rights.
            </li>
          </ul>
          <p>We do not sell personal data to third parties.</p>
          <p>
            We do not disclose personal data to third parties for their own direct marketing
            purposes unless permitted by applicable law and, where required, the necessary consent
            has been obtained.
          </p>
        </section>

        <section id="international-data-transfers">
          <h2>6. International Data Transfers</h2>
          <p>
            Our hosting, analytics, or other service providers may process information in
            locations outside Hong Kong or your place of residence.
          </p>
          <p>
            Where personal data is transferred or accessed across jurisdictions, we will take
            steps required by applicable law and use reasonable measures to protect the
            information.
          </p>
          <p>
            The actual locations and transfer arrangements depend on the providers and
            configurations used by the Website.
          </p>
        </section>

        <section id="data-retention">
          <h2>7. Data Retention</h2>
          <p>
            We retain information only for as long as reasonably necessary for the purposes
            described in this Policy, including website operation, security, responding to
            inquiries, and meeting legal obligations.
          </p>
          <p>
            Retention periods may vary depending on the type of information, the purpose of
            processing, and the settings of the relevant service provider.
          </p>
          <p>
            When information is no longer required, we will take reasonable steps to delete it or
            otherwise handle it in accordance with applicable law.
          </p>
        </section>

        <section id="data-security">
          <h2>8. Data Security</h2>
          <p>
            We use reasonable technical and organisational measures designed to protect
            information against unauthorised access, loss, misuse, alteration, or disclosure.
          </p>
          <p>
            However, no website, internet transmission, or electronic storage system can be
            guaranteed to be completely secure. We cannot guarantee absolute security.
          </p>
        </section>

        <section id="your-rights">
          <h2>9. Your Rights and Requests</h2>
          <p>
            Subject to applicable law, you may request access to or correction of personal data
            held by us, or exercise other rights available to you under applicable data protection
            legislation.
          </p>
          <p>
            To make a request, please contact us at the email address listed in Section 12.
          </p>
          <p>
            We may need to verify your identity and clarify the scope of your request before
            responding. Certain requests may be subject to lawful exceptions or limitations.
          </p>
        </section>

        <section id="third-party-websites">
          <h2>10. Third-Party Websites</h2>
          <p>
            The Website may contain links to third-party websites, social media platforms, or
            external resources.
          </p>
          <p>
            Those websites are operated independently and are governed by their own privacy
            policies and practices. We are not responsible for the privacy practices of
            third-party websites that we do not control.
          </p>
          <p>
            We recommend reviewing the relevant privacy policies before providing information to
            third parties.
          </p>
        </section>

        <section id="changes">
          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes to the
            Website, our practices, or applicable legal requirements.
          </p>
          <p>
            Any revised version will be published on this page with an updated "Last Updated"
            date.
          </p>
        </section>

        <section id="contact-us">
          <h2>12. Contact Us</h2>
          <p>
            For questions, access requests, correction requests, or other matters relating to
            this Privacy Policy, please contact:
          </p>
          <p>
            <strong>Coolha Limited</strong>
            <br />
            Website:{" "}
            <a href="https://coolha.com">https://coolha.com</a>
            <br />
            Email:{" "}
            <a href="mailto:help@coolha.com">help@coolha.com</a>
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
