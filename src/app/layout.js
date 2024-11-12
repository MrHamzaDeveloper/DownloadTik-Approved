"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import "./globals.css";

// Dynamically load the GDPR banner to avoid SSR-related hydration issues
const GdprBanner = dynamic(() => import("../components/GdprBanner"), { ssr: false });

export default function RootLayout({ children }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Override console.error to filter out specific hydration mismatch warnings
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties")
      ) {
        return; // Suppress this specific error
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
      setShowBanner(true); // Show the banner only if consent hasn't been set
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
        
        {/* Google Analytics Code */}
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

        {showBanner && <GdprBanner onAccept={handleAccept} onDecline={handleDecline} />}
      </body>
    </html>
  );
}
