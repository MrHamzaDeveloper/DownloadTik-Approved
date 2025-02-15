"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Header from "../../components/header"; // Adjust based on your structure
import Footer from "../../components/Footer"; // Adjust based on your structure

const BlogPage = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const posts = [
    {
      title: "Download TikTok Videos Without Watermark (2025) – HD & Free",
      slug: "download-tiktok-videos",
      description: "Want to download TikTok videos without watermark? Use the best free TikTok downloader for HD videos – No app required!",
      image: "https://images.pexels.com/photos/7481278/pexels-photo-7481278.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "TikTok video downloader without watermark"
    },
    {
      title: "Best TikTok Downloaders in 2025 (Free & No Watermark)",
      slug: "best-tiktok-downloaders",
      description: "Check out the best TikTok video downloaders available online, completely free.",
      image: "https://images.pexels.com/photos/5081915/pexels-photo-5081915.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Top TikTok video downloaders"
    }
  ];

  return (
    <div>
      {/* SEO Meta Tags */}
      <Head>
        <title>DownloadTik Blog | TikTok Video Downloader Guides</title>
        <meta name="description" content="Learn how to download TikTok videos without a watermark in HD for free. No app required – fast, secure, and 100% free TikTok downloader!" />
        <meta property="og:title" content="DownloadTik Blog" />
        <meta property="og:description" content="Latest guides on TikTok video downloading." />
        <meta property="og:image" content="https://downloadtik.com/default-blog-image.jpg" />
        <meta property="og:url" content="https://downloadtik.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://downloadtik.com/blog" />
      </Head>

      <Header />
      <main className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">DownloadTik Blog</h1>
        <p className="text-gray-600 text-center mb-8">
          Stay updated with the latest guides and tips on downloading TikTok videos.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`} className="block">
              <div className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition cursor-pointer">
                <Image
                  src={post.image}
                  alt={post.alt}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                  priority={false}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                  <p className="text-blue-600 mt-2 hover:underline">Read More →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
