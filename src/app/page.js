// Import necessary modules
"use client";

import React, { Suspense } from 'react';
import styles from './TypewriterText.module.css';
import './styles.css';
import './globals.css';
import VideoDownloadSection from '../components/VideoDownloadSection';
import TikTokDownloaderInfo from '../components/TikTokDownloaderInfo'; // Adjust the path as necessary
import FAQs from '../components/FAQs'; // Adjust the path as necessary



const Header = React.lazy(() => import('../components/header')); // Lazy load Header for improved performance
const Footer = React.lazy(() => import('../components/Footer')); // Lazy load Footer

export default function Page() {
  
  return (
    <>
      <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <div className="container mx-auto py-10 px-4 flex flex-col items-center">
          {/* Typewriter Effect */}
          <h1 className={`${styles.typewriter} flex items-center justify-center mb-6 text-center`}>
            <span className={styles['typewriter-text']}>
              {"Download TikTok video without watermark in HD Quality".split("").map((char, index) => (
                <span key={index} className={styles.letter} style={{ animationDelay: `${index * 0.05}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              <span
                className={styles.cursor}
                style={{ animationDelay: `${("Download TikTok video without watermark in HD Quality".length) * 0.05}s` }}
              ></span>
            </span>
          </h1>

          {/* Video Download Section */}
          <VideoDownloadSection />
        </div>


        <TikTokDownloaderInfo />

        <FAQs />

{/* Include the footer at the bottom */}
<Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
    </>
    
  );
}
