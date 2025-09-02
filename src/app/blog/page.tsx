"use client";

/* eslint-disable react/no-unescaped-entities */

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContentPolicy() {
  const [isExpanded, setIsExpanded] = useState(false);

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
              Blog
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white border-4 border-navy-900 brutalist-shadow p-8 space-y-8">
              <article className="space-y-8">
                {/* Main Title */}
                <h1 className="font-display font-black text-3xl lg:text-4xl text-navy-900 mb-6">
                  Why We Built nilGPT: Towards True Incognito Mode for ChatGPT
                </h1>

                {/* The Uncomfortable Truth About AI's Data Vacuum */}
                <section>
                  <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                    The Uncomfortable Truth About AI's Data Vacuum
                  </h2>
                  <p className="text-navy-700 leading-relaxed mb-4">
                    The AI revolution has fundamentally altered how we work,
                    think, and solve problems. LLMs have become the new
                    universal interface for everything from creative writing to
                    system architecture. The productivity gains are undeniable -
                    but there's a brewing storm most people aren't paying
                    attention to.
                  </p>
                </section>

                {/* Expandable Content - All remaining content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-none" : "max-h-0"}`}
                >
                  {/* Remaining paragraphs from first section */}
                  <section className="mb-8">
                    <p className="text-navy-700 leading-relaxed mb-4">
                      Every day, millions of users pour their most sensitive
                      information into these systems - proprietary code,
                      personal medical concerns, financial data - and even use
                      them as their therapist. We're witnessing the construction
                      of perhaps the largest unregulated repository of private
                      information in history, controlled by a handful of
                      entities with opaque governance structures.
                    </p>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      The parallels to other data catastrophes are striking.
                      Remember when 23andMe seemed like a reasonable trade-off?
                      Upload your DNA, get ancestry insights; its a no-brainer.
                      Fast-forward to today: the company faces bankruptcy, and
                      that genetic data becomes a commodity in the liquidation
                      process. The assumption should be not if, but when the
                      datasets being amassed behind modern user-friendly AI
                      tools will be leaked.
                    </p>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      The asymmetry is stark. With modern AI tools, users
                      experience immediate, tangible benefits while privacy
                      costs are deferred, irreversible, and invisible until it's
                      too late.
                    </p>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      This isn't sustainable. Privacy-conscious users and
                      advocates, in particular, should recognise that we need
                      architecturally sound alternatives - not because everyone
                      requires maximum privacy all the time, but because having
                      that option should be a fundamental right and not a
                      luxury.
                    </p>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      The path forward isn't to abandon AI; instead, we must
                      build choice into the system. We envision a world where
                      cutting-edge AI handles everyday tasks, but
                      privacy-preserving alternatives exist for sensitive
                      moments. This isn't about paranoia, it is about having
                      options when they matter most. This is why we decided to
                      build our own private AI chat - nilGPT.
                    </p>
                  </section>

                  {/* Defining Real Privacy in AI Systems */}
                  <section className="mb-8">
                    <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                      Defining Real Privacy in AI Systems
                    </h2>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      When we started architecting nilGPT, we deliberately
                      avoided the incrementalist approach. Instead of asking
                      "how can we make existing systems slightly more private,"
                      we asked "what would a genuinely private AI system look
                      like from first principles?"
                    </p>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      This led us to establish four core principles guided our
                      approach:
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          1. Breach-Resistant Architecture
                        </h3>
                        <p className="text-navy-700 leading-relaxed">
                          Data at rest must be cryptographically protected in a
                          way that makes centralised compromise meaningless. If
                          data is leaked, there should be nothing useful to
                          extract. This requires moving beyond access controls
                          to cryptographic guarantees and decentralised storage
                          architectures.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          2. Confidential Computation
                        </h3>
                        <p className="text-navy-700 leading-relaxed">
                          Privacy must extend through the entire computational
                          pipeline. No entity - including the service operator -
                          should be able to see user queries, model responses
                          during inference, or chat history. This should not
                          simply be promised in the privacy policy or terms of
                          service; it is an architectural requirement enforced
                          by hardware and cryptographic primitives.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          3. Verifiable Guarantees
                        </h3>
                        <p className="text-navy-700 leading-relaxed">
                          A truly private system eliminates the need for trust.
                          Users should not have to accept vague legalese
                          assurances about data handling. Instead, privacy
                          guarantees should be verifiable through open-source
                          components, hardware attestations, and provable
                          cryptography.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          4. Zero UX Compromises
                        </h3>
                        <p className="text-navy-700 leading-relaxed">
                          Privacy cannot come at the cost of usability. Any
                          viable private AI system must match the ergonomics
                          users expect: familiar and responsive interfaces,
                          persistent memory, and access to models capable of
                          handling real-world complexity. Privacy through
                          inconvenience is not privacy - it's a curiosity for
                          enthusiasts.
                        </p>
                      </div>
                    </div>

                    <p className="text-navy-700 leading-relaxed mt-6">
                      We believe the principles above set a high bar, but any
                      system that meets these criteria can legitimately claim to
                      be privacy-preserving while providing real-world utility.
                    </p>
                  </section>

                  {/* The Current Landscape: A Critical Assessment */}
                  <section className="mb-8">
                    <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                      The Current Landscape: A Critical Assessment
                    </h2>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      It is clear that the demand for private AI is growing and
                      many are attempting to solve it. Below, we consider some
                      of the trends and techniques we see being used, and
                      provide commentary on why we do not believe they meet our
                      criteria. The list below is not meant to be exhaustive,
                      instead, it is designed to give an indication of the types
                      of solutions we see being employed.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          Local LLMs: The Gold Standard with Practical
                          Limitations
                        </h3>
                        <p className="text-navy-700 leading-relaxed">
                          Running models locally is theoretically ideal - users
                          have complete control, there are zero external
                          dependencies and maximum privacy is achieved as data
                          never leaves the users device. However, the practical
                          constraints are often severe. High-quality models
                          require substantial computational resources that most
                          users simply don't have. There is also a high
                          technical barrier for users to get set up meaning most
                          will never be able to get beyond this phase. Also,
                          with a purely local approach users may forego
                          persistent storage across different devices - a
                          significant UX drawback. In conclusion, while for the
                          most technically able, the local approach is almost
                          certainly the best with respect to privacy, it is not
                          a universal, scalable solution for everyone.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          Centralised "Privacy-Washing" Solutions
                        </h3>
                        <p className="text-navy-700 leading-relaxed">
                          Many services tout privacy while running architectures
                          that are both centralised and effectively omniscient.
                          Common patterns include third-party cloud integration
                          with unclear encryption guarantees, or simply
                          policy-based privacy ("we promise not to look") around
                          data storage or inference. Many of these solutions
                          have state-of-the-art models and functionality.
                          However, this is largely due to having no added
                          privacy benefits beyond ChatGPT and comparables. These
                          approaches fail the verifiability requirement - they
                          rely on trust instead of technical guarantees. In
                          fact, the situation is worse. They mislead users into
                          believing they're choosing stronger privacy, when in
                          fact they're just accepting new terms and conditions.
                          This false sense of security encourages more sensitive
                          use, increasing the damage of possible future data
                          leaks.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          Pseudo-Decentralisation
                        </h3>
                        <p className="text-navy-700 leading-relaxed">
                          Some services market "decentralised AI" as offering
                          greater user privacy. In reality, this often just
                          means multiple untrusted servers (still controlled by
                          a single entity) run the models and can view all
                          inputs and outputs in plaintext. If inference still
                          occurs on centralised servers with plaintext access to
                          user data, the number of nodes in the network is
                          irrelevant. The infrastructure, while distributed, is
                          subject to the same trust assumptions that apply to
                          centralised architectures.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          "No Personal Data Storage" Fallacy
                        </h3>
                        <p className="text-navy-700 leading-relaxed">
                          A subset of solutions attempt to thread the needle by
                          claiming they don't store personal identifiers - no
                          emails, IP addresses, or account data. This approach,
                          unfortunately, fundamentally misunderstands the
                          privacy problem. When a user inputs sensitive
                          information (medical records, financial data,
                          proprietary code, and so on), that content is
                          transmitted and processed and stored in plaintext on
                          the provider's servers. The fact that they don't
                          associate it with your email address is irrelevant.
                          The sensitive data itself has already been exposed
                          during inference. This is privacy theatre that
                          conflates identity correlation with data exposure and
                          is dangerous because it could, again, cause the user
                          to trust the service more than they should.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* nilGPT's Technical Architecture & Trust Assumptions */}
                  <section className="mb-8">
                    <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                      nilGPT's Technical Architecture & Trust Assumptions
                    </h2>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      Here we explain the current architecture of nilGPT and why
                      we believe it is a strong Private AI offering.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          Architecture Overview
                        </h3>
                        <p className="text-navy-700 leading-relaxed mb-4">
                          nilGPT relies on Nillion's Blind Modules:
                        </p>
                        <ul className="list-disc list-inside text-navy-700 leading-relaxed space-y-2 mb-4">
                          <li>
                            <strong>nilCC</strong> is used to host the backend
                            of nilGPT, ensuring no third-party cloud provider
                            can access execution logs or user data. nilCC runs a
                            secure enclave (TEE) on a bare metal server, meaning
                            that all the standard protections of TEEs apply, and
                            no third party cloud provider can see logs or
                            outputs
                          </li>
                          <li>
                            <strong>nilAI</strong> is used for inference when
                            the user queries nilGPT. nilAI runs inside nilCC and
                            provides private AI inference for developers via an
                            OpenAI-compatible RESTful API. Models served in
                            nilAI are loaded into a hardware-protected enclave
                            (TEE), and neither the input queries nor the model
                            responses are ever exposed to the host system or
                            external observers.
                          </li>
                          <li>
                            <strong>nilDB</strong> is used to store chat
                            history, so the user can access it at a future date.
                            The history is encrypted with a user supplied
                            passphrase and then stored in secret-shared form
                            across a decentralised cluster of nilDB nodes (each
                            operated by a distinct entity).
                          </li>
                        </ul>
                        <p className="text-navy-700 leading-relaxed mb-4">
                          The diagram below outlines the flow of data between
                          these components and nilGPT:
                        </p>

                        {/* Architecture Diagram */}
                        <div className="my-8">
                          <Image
                            src="/img/nilGPT_architecture.webp"
                            alt="nilGPT Architecture Diagram showing the data flow between nilGPT frontend, nilCC (containing nilAI and nilGPT backend), and the nilDB cluster with three decentralized nodes"
                            width={800}
                            height={600}
                            className="w-full h-auto border-2 border-navy-900 rounded-lg"
                            priority
                          />
                        </div>

                        <p className="text-navy-700 leading-relaxed mb-4">
                          When a user sends a question to nilGPT, the input is
                          transmitted from the frontend (running in the browser)
                          through the nilGPT backend to nilAI, which generates a
                          response. Once the response is returned to the
                          frontend, it is encrypted locally using a passphrase
                          provided by the user. The encrypted data is then
                          secret-shared and stored across three nilDB nodes.
                        </p>
                        <p className="text-navy-700 leading-relaxed mb-4">
                          Local encryption ensures that even if all nodes were
                          compromised and an attacker obtained all secret
                          shares, no information about the user's chat could be
                          revealed - the reconstructed data remains encrypted
                          and meaningless without the passphrase. At the same
                          time, secret sharing ensures that no individual node
                          can reconstruct the data even if the passphrase is
                          leaked to the nodes.
                        </p>
                        <p className="text-navy-700 leading-relaxed mb-4">
                          When a user loads chat history in nilGPT (for example,
                          when logging in from another device), the secret
                          shares are retrieved from the nilDB nodes and
                          decrypted using the user's passphrase. If the
                          passphrase is incorrect, the decrypted content will
                          not represent the original conversation, as the
                          frontend will be unable to reconstruct the chat
                          history from the encrypted shares.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                          Trust Assumptions
                        </h3>
                        <p className="text-navy-700 leading-relaxed mb-4">
                          While nilGPT provides a strong baseline of security
                          (via encryption, MPC, and TEEs) and some verifiability
                          (as any standard browser can be used to inspect the
                          client-side code to verify it encrypts the chat
                          history), several trust assumptions remain. These are
                          known limitations - the result of prioritising a fast
                          release to deliver a private AI service as quickly as
                          possible. Our roadmap includes steps to address and
                          mitigate each of these.
                        </p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-display font-bold text-lg text-navy-900 mb-2">
                              1. Attestations Not Yet Published
                            </h4>
                            <p className="text-navy-700 leading-relaxed">
                              The nilGPT backend and nilAI both run inside
                              nilCC, which operates within a Trusted Execution
                              Environment (TEE) on bare-metal servers. This
                              setup provides standard TEE protections, ensuring
                              that no third-party cloud provider can access logs
                              or outputs. However, attestation reports from
                              these TEEs - covering nilCC, nilAI, and CPU/GPU
                              components - are not currently available to end
                              users. Without these reports, it is not possible
                              to independently verify that all components to
                              which user data is exposed run inside TEEs. We are
                              actively addressing this and plan to expose
                              attestation flows to the end user as soon as they
                              are implemented.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-display font-bold text-lg text-navy-900 mb-2">
                              2. nilGPT Code Not Yet Open Source
                            </h4>
                            <p className="text-navy-700 leading-relaxed">
                              Currently nilGPTs code is not yet open source. The
                              open sourcing of the code is closely related to
                              publishing attestations: in order for anyone to
                              verify the attestations fully, they need a hash
                              (immutable identifier) of the source code that was
                              claimed to be run under the hood, as well as a
                              published attestation report.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-display font-bold text-lg text-navy-900 mb-2">
                              3. nilCC Code Not Yet Open Source
                            </h4>
                            <p className="text-navy-700 leading-relaxed">
                              Similarly, nilCC is not yet open source due to
                              rapid ongoing development. Other core components
                              of the blind modules, such as nilDB and nilAI, are
                              however already open source and available for
                              review.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-display font-bold text-lg text-navy-900 mb-2">
                              4. No Independent Audit
                            </h4>
                            <p className="text-navy-700 leading-relaxed">
                              Neither the blind modules nor nilGPT have
                              undergone an external audit at this stage. Our
                              plan is to first open source the relevant code,
                              then engage independent third parties for peer
                              review and formal security audits.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Conclusion */}
                  <section className="mb-8">
                    <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">
                      Conclusion
                    </h2>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      In this article, we introduced nilGPT, outlined our design
                      criteria and goals, shared our perspective on alternative
                      approaches to private AI, and examined the architecture
                      along with the remaining trust assumptions.
                    </p>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      While there is still work to be done, we are actively
                      addressing each of these assumptions. We believe it is
                      important to make the product available now, as even in
                      its current form, we believe nilGPT sets a new benchmark
                      for private AI.
                    </p>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      Looking ahead, our roadmap goes beyond mitigating the
                      trust assumptions. We are focused on expanding
                      capabilities with larger and more powerful multimodal
                      models, integrated web search, voice note functionality,
                      and token-gated features that position the NIL token as a
                      first-class part of the experience.
                    </p>
                    <p className="text-navy-700 leading-relaxed">
                      We are excited about the journey ahead for nilGPT - and we
                      invite you to join us as we continue to push the
                      boundaries of what private AI can be.
                    </p>
                  </section>
                </div>

                {/* Toggle Button */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="bg-navy-900 text-cream-50 px-6 py-3 font-bold brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 rounded-lg"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
