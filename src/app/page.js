"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Typewriter from "../components/Typewriter";
import "./globals.css";

// Dynamic imports with SSR disabled
const VideoDownloadSection = dynamic(() => import("../components/VideoDownloadSection"), { ssr: false });
const TikTokDownloaderInfo = dynamic(() => import("../components/TikTokDownloaderInfo"), { ssr: false });
const FAQs = dynamic(() => import("../components/FAQs"), { ssr: false });
const Header = dynamic(() => import("../components/header"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      
      {/* Main content with hydration warning suppression */}
      <div className="container mx-auto py-10 px-4 flex flex-col items-center" suppressHydrationWarning>
        <Typewriter text="Download TikTok video without watermark in HD Quality" />
        <VideoDownloadSection />
        <TikTokDownloaderInfo />
        <FAQs />
      </div>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </>
  );
}
