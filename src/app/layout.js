"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./globals.css";
import styles from "./GdprBanner.module.css";

export default function RootLayout({ children }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("gdprConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("gdprConsent", "accepted", { expires: 365 }); // Set cookie to expire in 1 year
    setShowBanner(false);
  };

  const handleDecline = () => {
    Cookies.set("gdprConsent", "declined", { expires: 365 }); // Set cookie to expire in 1 year
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
      </head>
      <body className="antialiased">
        {children}

        {/* GDPR Consent Banner */}
        {showBanner && (
          <div className={styles.gdprBanner}>
            <p>We use cookies to enhance your experience. By using our site, you agree to our privacy policy.</p>
            <button onClick={handleAccept} className={styles.bannerButton}>Accept</button>
            <button onClick={handleDecline} className={styles.bannerButton}>Decline</button>
          </div>
        )}
      </body>
    </html>
  );
}
