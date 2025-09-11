import type { Metadata } from "next";
import Script from "next/script";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import "./globals.css";

export const metadata: Metadata = {
  title: "nilGPT - Private LLM Chat",
  description:
    "nilGPT gives you all the functionality and all the privacy. Your totally secure AI workflow.",
  metadataBase: new URL("https://nilgpt.xyz"),
  manifest: "/manifest.json",
  openGraph: {
    title: "nilGPT - Private LLM Chat",
    description:
      "nilGPT gives you all the functionality and all the privacy. Your totally secure AI workflow.",
    url: "https://nilgpt.xyz",
    siteName: "nilGPT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nilGPT - Private LLM Chat",
    description:
      "nilGPT gives you all the functionality and all the privacy. Your totally secure AI workflow.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
      <Script
        async
        src="https://cloud.umami.is/script.js"
        data-website-id="4f63bc18-938c-46f0-a0c1-873a43098e28"
      />
      <Script
        id="reddit-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_hj5tly86ywhe');rdt('track', 'PageVisit');
          `,
        }}
      />
      <ServiceWorkerRegistration />
    </html>
  );
}
