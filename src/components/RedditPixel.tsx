"use client";

import Script from "next/script";

export default function RedditPixel() {
  return (
    <Script
      id="reddit-pixel-loader"
      strategy="afterInteractive"
      onLoad={() => {
        // Initialize Reddit pixel after the script loads
        if (typeof window !== "undefined" && (window as any).rdt) {
          (window as any).rdt("init", "a2_hj5tly86ywhe");
          (window as any).rdt("track", "PageVisit");
        }
      }}
    >
      {`
        !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
      `}
    </Script>
  );
}
