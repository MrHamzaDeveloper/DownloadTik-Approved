"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import "./globals.css";

const GdprBanner = dynamic(() => import("../components/GdprBanner"), { ssr: false });

export default function RootLayout({ children }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties")
      ) {
        return;
      }
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  useEffect(() => {
    const consent = Cookies.get("gdprConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("gdprConsent", "accepted", { expires: 365 });
    setShowBanner(false);
  };

  const handleDecline = () => {
    Cookies.set("gdprConsent", "declined", { expires: 365 });
    setShowBanner(false);
  };

  return (
    <html lang="en">
      <head>
        <meta name="description" content="Download TikTok videos with ease!" />
        <title>DownloadTik</title>
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeistMonoVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FF1EZJCWPC"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FF1EZJCWPC');
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}

        {/* AdSense Ad Slot */}
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2531527954745046"
            data-ad-slot="1234567890" {/* Replace with your ad slot ID */}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script
            dangerouslySetInnerHTML={{
              __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
            }}
          ></script>
        </div>

        {showBanner && <GdprBanner onAccept={handleAccept} onDecline={handleDecline} />}
      </body>
    </html>
  );
}
