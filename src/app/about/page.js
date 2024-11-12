// /pages/about.js

"use client"; // Make this a client-side component

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../../components/header'; // Import Header
import Footer from '../../components/Footer'; // Import Footer

const About = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Delay hydration logic until after the initial render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // You can show a loading spinner or nothing until hydration is complete
  }
  return (
    <div>
      <Head>
        <title>About Us - DownloadTik</title>
        <meta
          name="description"
          content="Learn more about DownloadTik and our dedication to providing seamless file-saving services."
        />
      </Head>
      
      <Header /> {/* Include Header */}
      
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
        
        <p className="mb-4">
          DownloadTik is dedicated to helping users easily save TikTok videos for offline access and sharing. Our goal is to provide a user-friendly experience that makes saving your favorite content simple and quick.
        </p>

        <p className="mb-4">
          We understand the importance of accessibility, and we are committed to improving our platform to serve our users better every day. Our team is passionate about bringing you the best tools to manage your TikTok content seamlessly.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
        <p className="mb-4">
          To provide a reliable, efficient, and secure service for downloading and sharing TikTok content. We aim to empower our users by providing them with the tools they need to curate and share their favorite moments.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Values</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>User-Centric:</strong> Our users are at the heart of everything we do. We strive to create an intuitive and satisfying experience.</li>
          <li><strong>Integrity:</strong> We prioritize security and privacy, ensuring that your data is safe with us.</li>
          <li><strong>Innovation:</strong> We continuously improve our platform, integrating new features and enhancements based on user feedback.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Journey</h2>
        <p className="mb-4">
          Since our inception, we have grown from a small project to a robust platform that serves thousands of users. Our journey is marked by a commitment to quality and a dedication to helping our community connect through TikTok.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          Have any questions? Reach out to us on our <a href="/contact" className="text-blue-500 hover:underline">Contact</a> page. We are always here to help and value your feedback.
        </p>
      </div>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default About;
