// components/FAQs.js
import React from 'react';

const FAQs = () => {
  return (
    <div id="faqs" className="mt-10 w-full max-w-3xl mx-auto p-4 faqs-container">
  <h2 className="text-2xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>

  <div className="mb-6 text-center">
    <h3 className="font-semibold mb-2">1. How does the DownloadTik TikTok video downloader work?</h3>
    <p className="mb-4">
      The <strong>DownloadTik</strong> TikTok video downloader allows you to easily save your favorite TikTok videos without the watermark. Simply copy the video link from TikTok, paste it into our tool, and click the download button. In just a few seconds, the video will be saved to your device in high-quality resolution, ready for offline viewing or sharing.
    </p>
    <hr className="border-gray-300 my-4" /> {/* Horizontal line */}
  </div>

  <div className="mb-6 text-center">
    <h3 className="font-semibold mb-2">2. Is it safe to use the DownloadTik TikTok video downloader?</h3>
    <p className="mb-4">
      Yes, using <strong>DownloadTik</strong> is completely safe. We prioritize your privacy and security, and our tool does not require any personal information to function. Our website is free from malware or intrusive ads, so you can confidently use our downloader without compromising your security.
    </p>
    <hr className="border-gray-300 my-4" /> {/* Horizontal line */}
  </div>

  <div className="mb-6 text-center">
    <h3 className="font-semibold mb-2">3. Can I download TikTok videos in high quality with DownloadTik?</h3>
    <p className="mb-4">
      Absolutely! With <strong>DownloadTik</strong>, you can download TikTok videos in high-definition (HD) quality, ensuring that you enjoy the content just as it was originally uploaded. Whether you're saving tutorials, funny skits, or viral dance challenges, you’ll get the crisp visuals and clear audio every time.
    </p>
    <hr className="border-gray-300 my-4" /> {/* Horizontal line */}
  </div>

  <div className="mb-6 text-center">
    <h3 className="font-semibold mb-2">4. Do I need to pay to use DownloadTik's TikTok video downloader?</h3>
    <p className="mb-4">
      No, <strong>DownloadTik</strong> is completely free to use! We believe that everyone should have access to high-quality, watermark-free TikTok video downloads without any hidden charges. While some advanced features may be available in the future, our core service remains free for all users.
    </p>
    <hr className="border-gray-300 my-4" /> {/* Horizontal line */}
  </div>

  <div className="mb-6 text-center">
    <h3 className="font-semibold mb-2">5. Can I download videos from private TikTok accounts using DownloadTik?</h3>
    <p className="mb-4">
      Unfortunately, you cannot download videos from private TikTok accounts using <strong>DownloadTik</strong>. Our tool can only download publicly available TikTok videos. For privacy reasons, you must have the necessary permissions from the account owner to download videos from private accounts.
    </p>
    {/* No line after the last FAQ */}
  </div>
</div>

  );
};

export default FAQs;
