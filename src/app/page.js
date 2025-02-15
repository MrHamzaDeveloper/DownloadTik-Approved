"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
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
      <Header />
      {/* Main content */}
      <div className="container mx-auto py-10 px-4 flex flex-col items-center" suppressHydrationWarning>
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800 tracking-wide">
  🚀 Paste the TikTok Video Link Below & Click <span className="text-blue-500">Fetch!</span> 🎬
</h3>

        <VideoDownloadSection />
        <TikTokDownloaderInfo />
        <FAQs />
      </div>
      <Footer />
    </>
  );
}
