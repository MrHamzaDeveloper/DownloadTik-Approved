import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

const TikTokDownloaderInfo = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <NextSeo
        title="Download TikTok Videos Without Watermark | DownloadTik"
        description="Easily download TikTok videos without watermarks using DownloadTik. No software needed, high-quality HD downloads, and a secure, user-friendly experience."
        canonical="https://downloadtik.com/"
        openGraph={{
          url: "https://downloadtik.com/",
          title: "Download TikTok Videos Without Watermark | DownloadTik",
          description:
            "Use DownloadTik to download TikTok videos in HD quality without any watermark. 100% free, safe, and easy to use.",
          images: [
            {
              url: "https://downloadtik.com/static/images/downloadtik-thumbnail.jpg",
              alt: "DownloadTik - TikTok Video Downloader Without Watermark",
            },
          ],
          site_name: "DownloadTik",
        }}
        twitter={{
          handle: "@DownloadTik",
          site: "@DownloadTik",
          cardType: "summary_large_image",
        }}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DownloadTik",
              url: "https://downloadtik.com/",
              description:
                "Download TikTok videos without watermark in high quality using DownloadTik. Fast, free, and no software required.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://downloadtik.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <div className="mt-10 w-full max-w-3xl mx-auto p-4 blog-container">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Download TikTok Videos Without Watermark | DownloadTik
        </h1>
        <p className="text-gray-700 mb-6 text-center border-b border-gray-300 pb-4">
          Download your favorite TikTok videos without watermarks in high
          quality with <strong>DownloadTik</strong>. 100% free, fast, and
          secure. No software installation required!
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Why Choose DownloadTik?
        </h2>
        <p className="text-gray-700 mb-6 text-center border-b border-gray-300 pb-4">
          TikTok is one of the most popular social media platforms, but the
          watermark on videos can be annoying. <strong>DownloadTik</strong>{" "}
          allows you to save TikTok videos without watermarks in just a few
          clicks. Whether you want to share content or store it for later,
          DownloadTik makes it seamless and hassle-free.
        </p>

        <h3 className="text-xl font-semibold mb-4">How to Download TikTok Videos?</h3>
        <ul className="list-disc pl-10 mb-6 text-gray-700">
          <li>Copy the link to the TikTok video you want to download.</li>
          <li>Paste the link into the DownloadTik website.</li>
          <li>Click the “Download” button to save your video.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">Features of DownloadTik</h3>
        <ul className="list-disc pl-10 mb-6 text-gray-700">
          <li><strong>High-Quality HD Downloads:</strong> Save videos in full resolution.</li>
          <li><strong>No Watermark:</strong> Enjoy clean, professional-quality videos.</li>
          <li><strong>Completely Free:</strong> No hidden fees or subscriptions.</li>
          <li><strong>Works on All Devices:</strong> Desktop, mobile, and tablets supported.</li>
          <li><strong>Fast & Secure:</strong> Download videos in seconds with complete privacy.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">No Software Installation Needed</h3>
        <p className="text-gray-700 mb-6 text-center border-b border-gray-300 pb-4">
          Unlike other downloaders, <strong>DownloadTik</strong> works directly
          in your browser—no apps, extensions, or installations required.
        </p>

        <h3 className="text-xl font-semibold mb-4">Start Downloading Now!</h3>
        <p className="text-gray-700 mb-6 text-center">
          Get started with <strong>DownloadTik</strong> today and download your
          favorite TikTok videos watermark-free!
        </p>
      </div>
    </>
  );
};

export default TikTokDownloaderInfo;
