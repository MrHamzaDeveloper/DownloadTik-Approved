// components/FAQs.js
import React from 'react';

const FAQs = () => {
  return (
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
  );
};

export default FAQs;
