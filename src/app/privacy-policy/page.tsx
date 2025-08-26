"use client";

/* eslint-disable react/no-unescaped-entities */

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="relative z-50 bg-cream-50/80 backdrop-blur-sm border-b-4 border-navy-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-display font-black text-2xl text-navy-900">
              nilGPT
            </div>

            <Link
              href="/"
              className="bg-navy-900 text-cream-50 px-4 md:px-6 py-2 md:py-3 font-bold brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 rounded-lg text-sm md:text-base flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="font-display font-black text-4xl lg:text-6xl text-navy-900">
              Privacy Policy
            </h1>
            <p className="text-lg text-navy-600">
              Last updated: 14th August 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white border-4 border-navy-900 brutalist-shadow p-8 space-y-8">
              <section>
                <p className="text-navy-700 leading-relaxed mb-4">
                  nilGPT is a dApp that allows you to interact with various
                  large language models (LLMs) stored in a trusted execution
                  environment (<strong>TEE</strong>) through a unified
                  interface. This Privacy Policy explains how we collect, use,
                  and when we may disclose your personal data when you use our
                  website, applications, and other places where Nillion Labs
                  Limited acts as a <em>data controller.</em> If you have any
                  questions, you can contact us at legal@nillion.org.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                  1. Collection of Personal Data
                </h2>
                <p className="text-navy-700 leading-relaxed mb-4">
                  We may collect the following categories of personal data
                  depending on how you use our Services:
                </p>

                <h3 className="font-display font-bold text-xl text-navy-900 mb-3">
                  1.1. Personal data you provide to us directly
                </h3>
                <ul className="list-disc list-inside text-navy-700 space-y-2 mb-4">
                  <li>
                    <strong>Account Information</strong>: When you use our
                    Services, nilGPT collects identifiers, including your name,
                    wallet address and email address, and may also collect or
                    generate identifiers (e.g., User123).
                  </li>
                  <li>
                    <strong>Payment Information</strong>: We (via our
                    third-party partners, such as{" "}
                    <a
                      href="https://stripe.com/privacy"
                      className="text-navy-900 underline"
                    >
                      Stripe
                    </a>
                    ) collect your payment information if you purchase our
                    Services.
                  </li>
                  <li>
                    <strong>Communication Information</strong>: If you
                    communicate with us or interact with our social media pages,
                    we collect information, including your contact information
                    and the contents of your messages or posts. We also collect
                    your feedback on our Services.
                  </li>
                </ul>

                <h3 className="font-display font-bold text-xl text-navy-900 mb-3">
                  1.2. Personal data we receive from your use of our Services
                </h3>
                <p className="text-navy-700 leading-relaxed mb-4">
                  When you use our Services, we also receive certain technical
                  information, including:
                </p>
                <ul className="list-disc list-inside text-navy-700 space-y-2 mb-4">
                  <li>
                    <strong>Device Information</strong>: Depending on your
                    device or browser permissions, your device or browser
                    automatically sends us information about when and how you
                    access or use our Services, such as your device type,
                    operating system information, browser information, internet
                    service provider (ISP), and IP address.
                  </li>
                  <li>
                    <strong>Usage Information</strong>: We collect information
                    about your use of our Services, such as the dates and times
                    of access, pages you view, and about how you use our
                    Services.
                  </li>
                  <li>
                    <strong>Log Information</strong>: We collect information
                    about how our Services are performing when you use them,
                    including log files and information about any error.
                  </li>
                  <li>
                    <strong>Cookies</strong>: We do not use cookies or similar
                    tracking technologies on our website. As a result, we do not
                    require your consent for the use of cookies under Article
                    5(3) of Directive 2002/58/EC (the ePrivacy Directive), as no
                    such technologies are used.
                  </li>
                </ul>

                <h3 className="font-display font-bold text-xl text-navy-900 mb-3">
                  1.3. Clarification on Input and Output Data
                </h3>
                <p className="text-navy-700 leading-relaxed mb-4">
                  nilGPT does not have access to the inputs and outputs (chat
                  history) exchanged between you and the AI models (LLMs).
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  This means that:
                </p>
                <ul className="list-disc list-inside text-navy-700 space-y-2 mb-4">
                  <li>
                    <strong>
                      No one apart from you, including nilGPT, can see the
                      inputs you provide to the AI models
                    </strong>
                    : When you interact with our Services, the inputs you
                    provide, including text, images, and audio, are not
                    accessible to nilGPT. These inputs are processed solely
                    within the stateless Trusted Execution Environment (TEE)
                    where the AI models are served.
                  </li>
                  <li>
                    <strong>
                      No one apart from you, including nilGPT can see the
                      outputs provided by the AI models
                    </strong>
                    . The responses or outputs generated by the AI models are
                    not accessible to nilGPT, nor any Nillion services. These
                    outputs are returned to the nilGPT interface (frontend)
                    directly from the TEE.
                  </li>
                  <li>
                    <strong>
                      Inputs and Outputs are stored on decentralised Nillion
                      storage nodes
                    </strong>
                    . No individual node, or any combination of the nodes can
                    see any of your chat history. Chat history is encrypted
                    locally inside the nilGPT interface on your local device,
                    using your passphrase, and then split into multiple
                    cryptographically secure fragments ("Shares") using the
                    Nillion secret-sharing protocol. These Shares are stored
                    across separate nodes within the nilDB distributed network,
                    ensuring no single node can reconstruct the encrypted data.
                    Chat history can only be reconstructed and decrypted in your
                    browser when you enter your passphrase.
                  </li>
                  <li>
                    <strong>
                      Because Inputs and Outputs are encrypted and secret shared
                      when you use nilGPT they are NOT considered personal data
                    </strong>{" "}
                    and therefore the sections 2, 3 and 4 below regarding use,
                    disclosure and rights do not apply to Inputs and Outputs.
                  </li>
                </ul>
                <p className="text-navy-700 leading-relaxed mb-4">
                  This design ensures your inputs and outputs stay confidential
                  and secure and that nilGPT can never access, share or use
                  Inputs and Outputs data for any purpose.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                  2. Use of Personal Data
                </h2>
                <p className="text-navy-700 leading-relaxed mb-4">
                  We use your personal data for the following purposes:
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  2.1. To provide our Services, including to administer your
                  account, to process your requested payments, and to provide
                  customer support.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  2.2. To communicate with you, including to send you
                  information about our Services.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  2.3. To assess your eligibility for and promote our Services.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  2.4. To prevent fraud, illegal activity, and misuse of our
                  Services, and to protect the safety, security, and integrity
                  of our systems and Services.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  2.5. To comply with legal obligations and to protect the
                  rights, privacy, or safety of our users, nilGPT, or third
                  parties.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  We do not process sensitive personal data to infer
                  characteristics about a consumer.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  We do not use your personal data to train any AI model.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  We can't access or share your inputs or outputs under any
                  circumstance, nor can we use them for any purpose, including
                  training, improving, or developing our models, features, or
                  services, or sharing with third parties, or retaining them for
                  any length of time.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  We rely on the following Legal Bases to process your data:
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full table-auto border-collapse border border-navy-900">
                    <thead>
                      <tr className="bg-navy-100">
                        <th className="border border-navy-900 px-4 py-2 text-left font-bold text-navy-900">
                          Purpose
                        </th>
                        <th className="border border-navy-900 px-4 py-2 text-left font-bold text-navy-900">
                          Type of Data
                        </th>
                        <th className="border border-navy-900 px-4 py-2 text-left font-bold text-navy-900">
                          Legal Basis
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          To provide our Services, including to administer your
                          account, to process your requested payments, and to
                          provide customer support
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          • Account information
                          <br />• Payment information
                          <br />• Communication information
                          <br />• Device, usage and log data
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          Where necessary for the legitimate interest of our
                          users and nilGPT to address customer queries. We may
                          have a legal obligation to address customer
                          complaints.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          To improve and develop our Services and conduct
                          research, including to develop new product features
                          but not to train any AI Model
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          • Account information
                          <br />• Payment information
                          <br />• Communication information
                          <br />• Device, usage and log data
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          Where necessary for the legitimate interests of third
                          parties and nilGPT, such as when we develop and
                          improve our Services.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          To communicate with you, including to send you
                          information about our Services
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          • Account information
                          <br />• Communication information
                          <br />• Device, usage and log data
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          Where necessary to perform a contract with you, such
                          as using your contact information to send you a
                          notification about our Services.
                          <br />
                          Your consent to process your personal data where
                          required such as for certain marketing communications.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          To assess your eligibility for, and offer you or
                          promote our services
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          • Account information
                          <br />• Communication information
                          <br />• Device, usage and log data
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          Where necessary for the legitimate interests of nilGPT
                          and our users to understand how our Services are being
                          used and to explore ways to develop our business.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          To prevent fraud, illegal activity, and misuse of our
                          Services, and to protect the security of our systems
                          and Services
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          • Account information
                          <br />• Payment information
                          <br />• Communication information
                          <br />• Device, usage and log data
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          Where necessary to comply with a legal obligation.
                          <br />
                          Where necessary for the legitimate interests of nilGPT
                          and third parties (such as to protect against security
                          threats to our Services).
                          <br />
                          In limited cases where the processing is necessary to
                          protect individuals, vital interests.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          To comply with legal obligations and to protect the
                          rights, privacy, or safety of our users, nilGPT, or
                          third parties
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          • Account information
                          <br />• Payment information
                          <br />• Communication information
                          <br />• Device, usage and log data
                        </td>
                        <td className="border border-navy-900 px-4 py-2 text-navy-700">
                          Where necessary to comply with a legal obligation,
                          such as to comply with payments related record-keeping
                          legal obligations.
                          <br />
                          Where necessary for the legitimate interests of third
                          parties and nilGPT (such to address a violation of our
                          Terms of Service)
                          <br />
                          In limited cases where the processing is necessary to
                          protect individuals, vital interests.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                  3. Disclosure of Personal Data
                </h2>
                <p className="text-navy-700 leading-relaxed mb-4">
                  nilGPT will disclose the above categories of personal data to
                  the following third parties and for the purposes explained in
                  this Privacy Policy:
                </p>
                <ul className="list-disc list-inside text-navy-700 space-y-2 mb-4">
                  <li>
                    <strong>Third-party Processors</strong>: nilGPT shares
                    personal data with the following processors:
                    <ul className="list-disc list-inside text-navy-700 space-y-2 ml-6 mt-2">
                      <li>
                        <strong>Privy Ltd.</strong>
                        <br />• Purpose: Provide authentication and wallet
                        infrastructure services for secure user identity
                        verification and account management.
                        <br />• Data processing location: United Kingdom
                        <br />• Guarantees for international transfer: Standard
                        Contractual Clauses
                      </li>
                      <li>
                        <strong>Supabase, Inc.</strong>
                        <br />• Purpose: Provide backend-as-a-service
                        capabilities including collecting emails, database
                        hosting, storage, and API services for secure data
                        storage and retrieval.
                        <br />• Data processing location: United States
                        <br />• Guarantees for international transfer: Standard
                        Contractual Clauses
                      </li>
                      <li>
                        <strong>Latitude.sh LTDA and LLC</strong>
                        <br />• Purpose: Provide infrastructure services to
                        operate nilGPT's systems.
                        <br />• Data processing location: United States
                        <br />• Guarantees for international transfer: Standard
                        Contractual Clauses
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Affiliates & corporate partners</strong>: nilGPT
                    discloses personal data between and among its affiliates and
                    related entities.
                  </li>
                  <li>
                    <strong>Service providers & trusted partners</strong>:
                    nilGPT may disclose personal data with service providers and
                    trusted partners for various business purposes, including
                    cloud services, and safety and security services.
                  </li>
                  <li>
                    <strong>A significant corporate event</strong>: If nilGPT is
                    involved in a merger, corporate transaction, bankruptcy, or
                    a transfer of business assets, nilGPT will disclose your
                    personal data as part of these corporate transactions.
                  </li>
                  <li>
                    <strong>Third-Party Partners</strong>: We may provide the
                    personal data of individuals who visit our website to
                    third-party partners, such as analytics providers. Where
                    legally required, we provide you with the option to opt out
                    of targeted advertising on our site.
                  </li>
                  <li>
                    <strong>
                      Regulatory or legal requirements, safety and security,
                      rights of others, or to enforce our rights
                    </strong>
                    : We may disclose personal data to governmental regulatory
                    authorities as required by law, in response to their
                    requests for information or to assist in investigations. We
                    may also disclose personal data to third parties in
                    connection with disputes or litigation, or if we determine
                    its disclosure is necessary to protect the health and safety
                    of any person, to prevent fraud, credit risk, or illegal
                    activity, to enforce our or others' legal rights, or as
                    otherwise required or permitted by applicable law.
                  </li>
                  <li>
                    <strong>With an individual's consent</strong>: nilGPT will
                    disclose personal data when an individual gives us
                    permission or directs us to disclose this information.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                  4. Your Rights and Choices
                </h2>
                <p className="text-navy-700 leading-relaxed mb-4">
                  Depending on where you live and the laws that apply in your
                  country of residence, you may have certain rights regarding
                  your personal data. To exercise your rights, you or an
                  authorized agent may submit a request by emailing us at
                  legal@nillion.org. When we receive your request, we may ask
                  for additional information to confirm your identity. nilGPT
                  will not discriminate based on the exercising of privacy
                  rights you may have. You may also have the right to appeal
                  requests that we deny by emailing legal@nillion.org. Below is
                  a summary of the rights which you may have, subject to certain
                  conditions and exceptions and depending on the laws that apply
                  in your country of residence.
                </p>
                <ol className="list-decimal list-inside text-navy-700 space-y-2 mb-4">
                  <li>
                    <strong>Right to know</strong>: The right to know what
                    personal data nilGPT processes about you and the categories
                    of third parties to whom we disclose it.
                  </li>
                  <li>
                    <strong>Access & data portability</strong>: The right to
                    request a copy of the personal data nilGPT processes about
                    you and also the right to port your information to a third
                    party.
                  </li>
                  <li>
                    <strong>Deletion</strong>: The right to request that we
                    delete your personal data.
                  </li>
                  <li>
                    <strong>Correction</strong>: While we cannot guarantee the
                    factual accuracy of any outputs due to the technical
                    complexity of our models, you have the right to request that
                    we correct your personal data when it is inaccurate, subject
                    to certain exceptions.
                  </li>
                  <li>
                    <strong>Objection</strong>: You have the right to object to
                    how we process your personal data. If we use your
                    information for marketing, you can opt out of future
                    marketing messages using the unsubscribe link in those
                    messages.
                  </li>
                  <li>
                    <strong>Restriction</strong>: You have the right to restrict
                    our processing of your personal data in certain
                    circumstances.
                  </li>
                  <li>
                    <strong>Withdrawal of consent</strong>: Where nilGPT's
                    processing of your personal data is based on consent, you
                    have the right to withdraw your consent.
                  </li>
                  <li>
                    <strong>Right to complain to a regulatory authority</strong>
                    : Under many countries' laws, you have the right to file a
                    complaint with the supervisory authority in the place in
                    which you live or work.
                  </li>
                  <li>
                    <strong>Sale & targeted advertising</strong>: We do not sell
                    or share your personal data with third parties in exchange
                    for payment. However, we may provide the personal data of
                    individuals who visit our website to third-party partners,
                    such as advertising partners, analytics providers, and
                    social networks, who may assist us in advertising our
                    Services to you. This may be considered a data "sale" or
                    "sharing" as those terms are defined under the California
                    Consumer Privacy Act ("CCPA") and other applicable US
                    privacy laws. Where legally required, we provide you with
                    the option to opt out of targeted advertising on our site
                    and honor Global Privacy Controls (GPC).
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                  5. Data Transfers
                </h2>
                <p className="text-navy-700 leading-relaxed mb-4">
                  nilGPT processes your personal data on servers located outside
                  of the European Economic Area ("EEA"), Switzerland, and the
                  UK, including processing your personal data in our servers in
                  the US. Where information is transferred outside the EEA,
                  Switzerland, or the UK, we rely on:
                </p>
                <ul className="list-disc list-inside text-navy-700 space-y-2 mb-4">
                  <li>
                    <strong>Adequacy decisions</strong>: We rely on the European
                    Commission{" "}
                    <a
                      href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en"
                      className="text-navy-900 underline"
                    >
                      adequacy decisions
                    </a>{" "}
                    under Article 45 GDPR where they recognise that a country
                    outside of the EEA offers an adequate level of data
                    protection; or
                  </li>
                  <li>
                    <strong>Standard contractual clauses ("SCCs")</strong>: We
                    rely on the SCCs as approved by the European Commission
                    under Article 46 GDPR (and their approved equivalent for the
                    UK and Switzerland) that allows companies in the EEA to
                    transfer data outside the EEA.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                  6. Data Retention and Security Controls
                </h2>
                <p className="text-navy-700 leading-relaxed mb-4">
                  nilGPT retains your personal data for as long as reasonably
                  necessary for the purposes outlined in this Privacy Policy,
                  depending on factors such as the terms of your agreement, our
                  purposes for processing the data (including whether the data
                  is needed to resolve disputes and to enforce our agreements),
                  and any legal requirements that we are subject to.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  The security of your personal data is important to us. We
                  implement appropriate technical and organizational security
                  measures designed to protect personal data from loss, misuse,
                  and unauthorized access or disclosure. Our security measures
                  are designed to provide the level of security appropriate to
                  the underlying level of risk associated with the data
                  processing.
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                  7. Children
                </h2>
                <p className="text-navy-700 leading-relaxed mb-4">
                  Our Services are not directed towards, and we do not knowingly
                  collect personal data from children under the age of 18. If
                  you are the parent or guardian of a child under the age of 18
                  who you have reason to believe has provided any personal data
                  to us, please email us at{" "}
                  <a
                    href="mailto:legal@nillion.org"
                    className="text-navy-900 underline"
                  >
                    legal@nillion.org
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                  8. Contact Information and Data Controller
                </h2>
                <p className="text-navy-700 leading-relaxed mb-4">
                  If you live in the European Economic Area (EEA), UK, or
                  Switzerland (the "European Region"), the data controller
                  responsible for your personal data is Nillion Labs Limited. If
                  you live outside the European Region, the data controller
                  responsible for your personal data is Nillion Labs Limited.
                </p>
                <p className="text-navy-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, or have
                  any questions, complaints or requests regarding your personal
                  data, you can email us at{" "}
                  <a
                    href="mailto:legal@nillion.org"
                    className="text-navy-900 underline"
                  >
                    legal@nillion.org
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                  9. Changes to Our Privacy Policy
                </h2>
                <p className="text-navy-700 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes to this Privacy Policy, and
                  update the Effective Date at the top of this page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
