// components/Footer.js
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Container for the entire footer content */}
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Logo Section */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h1 className="text-3xl font-bold">DownloadTik.</h1>
          </div>

          {/* Footer Navigation Links */}
          <div className="flex flex-col items-center md:flex-row md:space-x-8 justify-center mb-4 md:mb-0">
            {[
              { label: "FAQs", href: "/" }, // Link to the landing page
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms and Conditions", href: "/terms-and-conditions" },
              { label: "Sitemap", href: "/sitemap" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={label === "FAQs" ? "/#faqs" : href} // Use hash for FAQs
                className="text-gray-700 hover:text-blue-600 hover:underline mb-2 md:mb-0 transition duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="mt-4 md:mt-0 text-center">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              {["facebook-f", "twitter", "instagram"].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 transition duration-300"
                >
                  <i className={`fab fa-${platform}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center border-t border-gray-300 pt-4">
        <p className="text-center text-gray-500 text-sm">
          We are not affiliated with TikTok or ByteDance in any way.
        </p> <br></br>
          <p className="text-sm">&copy; {new Date().getFullYear()} DownloadTik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
