"use client";

import Script from "next/script";

export function TawkChat() {
  return (
    <Script
      id="tawk-to-widget"
      strategy="lazyOnload"
      src="https://embed.tawk.to/69529ec50c14261985ec0096/1jdlbod6i"
    />
  );
}
