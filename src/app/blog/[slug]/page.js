"use client";

import { useParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";

const BlogPost = () => {
  const { slug } = useParams();

  const blogPosts = {
    "download-tiktok-videos": {
      title: "How to Download TikTok Videos Without Watermark in 2025",
      description: "Learn the best ways to download TikTok videos without a watermark in high quality.",
      image: "https://images.pexels.com/photos/7481278/pexels-photo-7481278.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Guide on downloading TikTok videos without watermark",
      content: `
        <p>TikTok is one of the most popular social media platforms, but downloading videos without a watermark can be a challenge. Many users want to save TikTok videos for offline viewing, reposting, or sharing without the watermark.</p>

        <h2>How to Download TikTok Videos in 2025 (Step-by-Step Guide)</h2>
        <p>Removing the watermark provides a cleaner, professional look when sharing content on Instagram Reels, YouTube Shorts, and Facebook.</p>

        <h2>Step-by-Step Guide</h2>

        <h3>Step 1: Copy the TikTok Video Link</h3>
        <p>Find the video, tap "Share," and select "Copy Link."</p>

        <h3>2. Use <a href="https://downloadtik.com" class="text-blue-600 hover:underline" target="_blank" rel="noopener">DownloadTik</a></h3>
        <p>Paste the copied link into the input field on <strong>DownloadTik</strong> and click "Download."</p>

        <h3>Step 3: Click Download</h3>
        <p>Choose the format and download the video in HD without any watermark.</p>

        <h2>Why Choose DownloadTik?</h2>
        <ul>
          <li>✔ 100% Free & No Ads</li>
          <li>✔ Works on PC, Android & iOS</li>
          <li>✔ High-Speed HD Downloads</li>
        </ul>

        <p><a href="https://downloadtik.com" class="text-blue-600 hover:underline" target="_blank" rel="noopener">Try DownloadTik Now</a></p>
      `,
    },
    "best-tiktok-downloaders": {
      title: "Top 5 Best TikTok Downloaders in 2025 (Free & No Watermark)",
      description: "Discover the best free TikTok video downloaders in 2025 that allow you to save videos without a watermark.",
      image: "https://images.pexels.com/photos/5081915/pexels-photo-5081915.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "List of best TikTok video downloaders in 2025",
      content: `
        <p>With TikTok's growing popularity, many users want to save their favorite videos without a watermark. Below, we list the best TikTok downloaders for 2025.</p>

        <h2>1. DownloadTik - Best Free TikTok Downloader</h2>
        <p>DownloadTik provides HD TikTok downloads without watermarks.</p>
        <p><a href="https://downloadtik.com" class="text-blue-600 hover:underline" target="_blank" rel="noopener">Try DownloadTik Now</a></p>

        <h2>2. SnapTik</h2>
        <p>SnapTik is another great option, but it has ads.</p>

        <h2>3. SSSTikTok</h2>
        <p>SSSTikTok is widely used, offering free downloads.</p>

        <h2>4. TTDownloader</h2>
        <p>Provides multiple formats for downloading videos.</p>

        <h2>5. TikMate</h2>
        <p>Mobile-friendly downloader with fast speeds.</p>

        <p><a href="https://downloadtik.com" class="text-blue-600 hover:underline" target="_blank" rel="noopener">Download with DownloadTik</a></p>
      `,
    },
  };

  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="text-center text-gray-600 mt-10">
        <h2 className="text-2xl font-semibold">Blog post not found</h2>
        <p className="mt-4">The article you're looking for does not exist.</p>
        <Link href="/blog" className="text-blue-600 hover:underline mt-4 block">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{post.title} | DownloadTik</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://downloadtik.com/blog/${slug}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://downloadtik.com/blog/${slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.description,
  "image": post.image,
  "author": {
    "@type": "Organization",
    "name": "DownloadTik",
    "url": "https://downloadtik.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DownloadTik",
    "logo": {
      "@type": "ImageObject",
      "url": "https://downloadtik.com/logo.png"
    }
  },
  "datePublished": "2025-02-15",
  "dateModified": "2025-02-15",
  "url": `https://downloadtik.com/blog/${slug}`
}) }} />

      </Head>

      <Header />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <Image
  src={post.image}
  alt={post.alt}
  width={800}
  height={400}
  className="w-full h-56 object-cover rounded-lg mb-6"
  priority={false}
/>

        <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <p className="text-gray-600 mb-4 italic">{post.description}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 leading-relaxed space-y-4" />
      </div>

      <div className="text-center mt-6">
        <Link href="/blog" className="text-blue-600 hover:underline">
          ← Back to Blog
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
