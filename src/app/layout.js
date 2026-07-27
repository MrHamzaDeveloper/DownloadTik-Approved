"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import "./globals.css";

// Dynamically import GDPR banner, but avoid SSR-related hydration issues
const GdprBanner = dynamic(() => import("../components/GdprBanner"), { ssr: false });

export default function RootLayout({ children }) {
  const [showBanner, setShowBanner] = useState(false);
  const [isClient, setIsClient] = useState(false); // Ensure client-side rendering

  useEffect(() => {
    setIsClient(true); // Mark that we're on the client
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

  // Load external scripts only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Google Analytics
      const scriptAnalytics = document.createElement("script");
      scriptAnalytics.src = "https://www.googletagmanager.com/gtag/js?id=G-FF1EZJCWPC";
      scriptAnalytics.async = true;
      document.head.appendChild(scriptAnalytics);

      const scriptAnalyticsInit = document.createElement("script");
      scriptAnalyticsInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-FF1EZJCWPC');
      `;
      document.head.appendChild(scriptAnalyticsInit);

      // Google AdSense
      const scriptAdsense = document.createElement("script");
      scriptAdsense.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-";
      scriptAdsense.async = true;
      scriptAdsense.crossOrigin = "anonymous";
      document.head.appendChild(scriptAdsense);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2531527954745046" />
        <title>Download TikTok Videos Without Watermark - Free & HD | DownloadTik</title>
        <meta
          name="description"
          content="Download TikTok videos without watermark in HD quality. Fast, free, and secure TikTok video downloader. No login required!"
        />
        <meta name="keywords" content="TikTok downloader, download TikTok videos, TikTok video without watermark, free TikTok downloader, TikTok video saver" />
        <link rel="canonical" href="https://downloadtik.com/" />

        {/* Open Graph (OG) Meta Tags for Social Sharing */}
        <meta property="og:title" content="Download TikTok Videos Without Watermark - Free & HD | DownloadTik" />
        <meta property="og:description" content="Easily download TikTok videos without watermark in HD. 100% free and no login required." />
        <meta property="og:url" content="https://downloadtik.com/" />
        <meta property="og:image" content="https://downloadtik.com/preview-image.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Download TikTok Videos Without Watermark - Free & HD | DownloadTik" />
        <meta name="twitter:description" content="Easily download TikTok videos without watermark in HD. 100% free and no login required." />
        <meta name="twitter:image" content="https://downloadtik.com/preview-image.jpg" />

        {/* Preload Fonts for Performance */}
        <link rel="preload" href="/fonts/GeistVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GeistMonoVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>

      <body className="antialiased" suppressHydrationWarning>
        {children}
        {isClient && showBanner && <GdprBanner onAccept={handleAccept} onDecline={handleDecline} />}
      </body>
    </html>
  );
}
