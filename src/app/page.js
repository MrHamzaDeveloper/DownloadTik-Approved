// Import necessary modules
"use client";

import Header from '../components/header'; // Adjust the path if needed
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import styles from './TypewriterText.module.css';
import './styles.css'; // Adjust the path as needed
import './globals.css';


export default function Page() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPhotoLink, setIsPhotoLink] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [isDownloadingVideo, setIsDownloadingVideo] = useState(false);
  const [isDownloadingAudio, setIsDownloadingAudio] = useState(false);



  // Clear previous data whenever videoUrl changes
  useEffect(() => {
    setVideoInfo(null);
    setError('');
    setIsPhotoLink(false);
    setMessage('');
  }, [videoUrl]);

  useEffect(() => {
    if (isDownloading) {
      setShowLoader(true);
      setMessage("Your file is being processed...");
      
      // Set a timeout for the processing message
      const processingTimeout = setTimeout(() => {
        setMessage("Your file is being downloaded...");
      }, 10000); // 10 seconds
  
      return () => clearTimeout(processingTimeout); // Cleanup on unmount
    }
  }, [isDownloading]);
  
  

  const fetchVideoInfo = async (url) => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/fetch-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred while fetching video info.');
        return;
      }

      const data = await response.json();
      setVideoInfo(data);
      setIsPhotoLink(data.isPhotoOrSlideshow);
      if (data.isPhotoOrSlideshow) {
        setMessage("This is a slideshow or photo video, and only music is available to download.");
      }
    } catch (error) {
      setError('Failed to fetch video info. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = () => {
    const trimmedUrl = videoUrl.trim();
    if (trimmedUrl) {
      fetchVideoInfo(trimmedUrl);
    } else {
      setError('Please enter a valid URL');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVideoUrl(text);
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error);
    }
  };

  const handleDownload = async (format) => {
    if (!videoInfo || !videoInfo.finalUrl) {
        console.log("Cannot download: Video info or final URL not available");
        return;
    }

    // Prevent multiple clicks
    if (isDownloading) return; // If already downloading, exit

    setIsDownloading(true); // Set to true when a download starts

    // Set downloading state based on the format
    if (format === 'audio') {
        setIsDownloadingAudio(true);
        setIsDownloadingVideo(false);
    } else {
        setIsDownloadingVideo(true);
        setIsDownloadingAudio(false);
    }

    setError('');
    setMessage('');

    try {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: videoInfo.finalUrl, option: format }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error || 'An error occurred while downloading.');
            return;
        }

        const fileName = `SaveMyTikTok_${(videoInfo.captions?.slice(0, 20) || videoInfo.username).replace(/[^a-zA-Z0-9]/g, '_') || 'Untitled'}`;
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = format === 'video' ? `${fileName}.mp4` : `${fileName}.mp3`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        setMessage("Your file has been downloaded securely.");
    } catch (error) {
        setError('Failed to download media. Please try again.');
    } finally {
        setIsDownloading(false); // Reset when download is complete
        if (format === 'audio') {
            setIsDownloadingAudio(false);
        } else {
            setIsDownloadingVideo(false);
        }
    }
};



  const handleClear = () => {
    setVideoUrl('');
    setVideoInfo(null);
    setError('');
    setIsPhotoLink(false);
    setMessage('');
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 px-4 flex flex-col items-center">
      <h1 className={`${styles.typewriter} flex items-center justify-center mb-6 text-center`}>
      <span className={styles['typewriter-text']}>
        {"Download TikTok video without watermark in HD Quality".split("").map((char, index) => (
          <span key={index} className={styles.letter} style={{ animationDelay: `${index * 0.05}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        <span className={styles.cursor} style={{ animationDelay: `${("Download TikTok video without watermark in HD Quality".length) * 0.05}s` }}></span>
      </span>
    </h1>


    <div className="flex w-full justify-center mb-6 relative">
  <div className="relative w-full flex flex-col md:flex-row max-w-5xl md:max-w-3xl lg:max-w-5xl">
    {/* Input Field Wrapper */}
    <div className="relative w-full flex">
      <input
        type="text"
        placeholder="Enter TikTok URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className={`input-field ${loading ? 'opacity-50' : ''}`}
      />
      
      {/* Paste Icon */}
      {!videoUrl && (
        <button
          onClick={handlePaste}
          className="paste-button"
          aria-label="Paste URL"
        >
          📋
        </button>
      )}
      
      {/* Clear Icon */}
      {videoUrl && (
        <button
          onClick={() => setVideoUrl('')}
          className="clear-button"
          aria-label="Clear input"
        >
          ✕
        </button>
      )}
    </div>
    
    <button
      onClick={handleFetch}
      className={`fetch-button ${loading ? 'disabled' : ''}`}
      disabled={loading}
    >
      {loading ? 'Fetching...' : 'Fetch'}
    </button>
  </div>

  {/* Centered loading GIF overlay */}
  {loading && (
    <div className="absolute inset-0 flex items-center justify-center">
      <img
        src="/images/loader1.gif"
        alt="Loading..."
        className="loading-icon"
      />
    </div>
  )}
</div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {videoInfo && (
  <div className="mt-6 flex flex-col items-center w-full">
    <div className="bg-white/30 backdrop-blur-lg rounded-lg shadow-2xl p-6 w-full max-w-lg md:max-w-xl lg:max-w-2xl border-4 border-black transition duration-300 hover:shadow-3xl">
      <div className="flex items-center">
        <img
          src={videoInfo.thumbnail}
          alt={`${videoInfo.username}'s video thumbnail`}
          className="rounded-lg shadow-lg mr-6"
          style={{ width: '150px', height: '150px' }}
        />
        <div className="text-sm text-gray-700">
          <p><strong>Username:</strong> {videoInfo.username}</p>
          <p><strong>Captions:</strong> {videoInfo.captions}</p>
          <p><strong>Duration:</strong> {videoInfo.duration}</p>
          <p><strong>File Size:</strong> {videoInfo.fileSize} MB</p>
        </div>
      </div>

      <div className="mt-6 text-center relative flex flex-col md:flex-row md:justify-center">
        {isPhotoLink ? (
          <button
            onClick={() => {
              handleDownload('audio');
            }}
            className={`flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded mb-2 md:mb-0 md:mr-2 ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-disabled={isDownloading}
            disabled={isDownloading}
          >
            <img src="/images/mp3.png" alt="Download Audio" className="w-5 h-5 mr-2" />
            {isDownloadingAudio ? 'Downloading...' : 'Download MP3'}
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                handleDownload('video');
              }}
              className={`flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded mb-2 md:mb-0 md:mr-2 ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-disabled={isDownloading}
              disabled={isDownloading}
            >
              <img src="/images/mp4.png" alt="Download Video" className="w-5 h-5 mr-2" />
              {isDownloadingVideo ? 'Downloading Video...' : 'Download Video'}
            </button>
            <button
              onClick={() => {
                handleDownload('audio');
              }}
              className={`flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded mb-2 md:mb-0 md:mr-2 ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-disabled={isDownloading}
              disabled={isDownloading}
            >
              <img src="/images/mp3.png" alt="Download Audio" className="w-5 h-5 mr-2" />
              {isDownloadingAudio ? 'Downloading Music...' : 'Download Music'}
            </button>
          </>
        )}
        
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded mb-2 md:mb-0"
        >
          Clear
        </button>

        {/* Loader GIF for mobile view */}
        {isDownloading && (
          <img
            src="/images/download.gif"
            alt="Loading"
            className="mt-2 md:hidden w-16 h-16 mx-auto"
          />
        )}
      </div>

      {/* Loader GIF for desktop view */}
      {isDownloading && (
        <div className="mt-6 text-center hidden md:block">
          <img src="/images/download.gif" alt="Loading" className="w-16 h-16 mx-auto" />
        </div>
      )}

      {/* Message display, centered below the download buttons */}
      {message && (
        <div className="mt-6 text-center">
          <p className="text-green-500">{message}</p>
        </div>
      )}
    </div>
  </div>
)}
      </div>
      <div className="mt-10 w-full max-w-3xl mx-auto p-4 blog-container">
  <h2 className="text-2xl font-semibold mb-4 text-center border-b-2 border-gray-300 pb-2">
    Why Use a TikTok Video Downloader Without Watermark?
  </h2>
  <p className="text-gray-700 mb-4 text-center border-b border-gray-300 pb-4">
    In today’s fast-paced digital world, TikTok has emerged as one of the leading platforms for sharing short, entertaining videos. However, many users face the challenge of wanting to download their favorite TikTok videos without the watermark. A TikTok video downloader without watermark is a valuable tool that allows you to save videos directly to your device, ensuring a clean viewing experience. Whether you want to share videos with friends or save them for personal use, this tool offers a seamless solution.
  </p>

  <h2 className="text-2xl font-semibold mb-4 text-center border-b-2 border-gray-300 pb-2">
    Convenience and Ease of Use
  </h2>
  <p className="text-gray-700 mb-4 text-center border-b border-gray-300 pb-4">
    One of the key advantages of using a TikTok video downloader is its convenience. With just a few clicks, you can download any TikTok video directly to your smartphone, tablet, or computer. The process is straightforward—simply copy the video link, paste it into the downloader, and hit the download button. This ease of use makes it accessible to all users, regardless of their technical skills. No need to navigate complex software or deal with unnecessary hassles; this tool streamlines the process.
  </p>

  <h2 className="text-2xl font-semibold mb-4 text-center border-b-2 border-gray-300 pb-2">
    High-Quality Downloads
  </h2>
  <p className="text-gray-700 mb-4 text-center border-b border-gray-300 pb-4">
    Quality is paramount when it comes to downloading videos. A reliable TikTok video downloader ensures that you get high-definition (HD) quality downloads without compromising the original video’s clarity. Whether you're downloading tutorials, funny skits, or trending dances, you can be assured that the quality will remain intact. Enjoy your favorite TikTok content with crisp visuals and clear audio, making your viewing experience truly enjoyable.
  </p>

  <h2 className="text-2xl font-semibold mb-4 text-center border-b-2 border-gray-300 pb-2">
    Privacy and Security
  </h2>
  <p className="text-gray-700 mb-4 text-center border-b border-gray-300 pb-4">
    Privacy is a major concern for many users in today’s online environment. When using a TikTok video downloader without watermark, your personal information remains secure. The tool typically does not require any personal details, ensuring that your downloading experience is both private and safe. Additionally, it’s essential to choose a downloader that does not store your downloaded content, further enhancing your privacy while enjoying your favorite videos.
  </p>

  <h2 className="text-2xl font-semibold mb-4 text-center border-b-2 border-gray-300 pb-2">
    Stay Ahead of Trends
  </h2>
  <p className="text-gray-700 mb-4 text-center">
    TikTok is constantly evolving, with new trends emerging every day. By utilizing a TikTok video downloader, you can stay ahead of these trends by saving and sharing content that resonates with you and your audience. Whether it’s dance challenges, cooking tutorials, or DIY projects, having access to trending content without watermarks allows you to repost or use these videos in your own creative projects, helping you to connect with your audience in fresh and exciting ways.
  </p>
</div>

{/* FAQs Section with Margin Adjustment */}
<div id="faqs" className="mt-10 w-full max-w-3xl mx-auto p-4 faqs-container">
  <h2 className="text-2xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>

  <div className="mb-6 text-center">
    <h3 className="font-semibold">1. How does a TikTok video downloader work?</h3>
    <p>
      A TikTok video downloader allows you to copy the link of a TikTok video and download it directly to your device without a watermark.
    </p>
    <hr className="border-gray-300 my-4" /> {/* Horizontal line */}
  </div>

  <div className="mb-6 text-center">
    <h3 className="font-semibold">2. Is it safe to use a TikTok video downloader?</h3>
    <p>
      Yes, as long as you use a reputable downloader that doesn't require personal information, it is generally safe.
    </p>
    <hr className="border-gray-300 my-4" /> {/* Horizontal line */}
  </div>

  <div className="mb-6 text-center">
    <h3 className="font-semibold">3. Can I download TikTok videos in high quality?</h3>
    <p>
      Most TikTok video downloaders provide high-definition downloads, ensuring the video quality remains intact.
    </p>
    <hr className="border-gray-300 my-4" /> {/* Horizontal line */}
  </div>

  <div className="mb-6 text-center">
    <h3 className="font-semibold">4. Do I need to pay to use a TikTok video downloader?</h3>
    <p>
      Many TikTok video downloaders are free to use, but some may offer premium features for a fee.
    </p>
    <hr className="border-gray-300 my-4" /> {/* Horizontal line */}
  </div>

  <div className="mb-6 text-center">
    <h3 className="font-semibold">5. Can I download videos from private accounts?</h3>
    <p>
      No, you cannot download videos from private accounts unless you have permission from the account owner.
    </p>
    {/* No line after the last FAQ */}
  </div>
</div>

{/* Include the footer at the bottom */}
<Footer />
    </>
    
  );
}
