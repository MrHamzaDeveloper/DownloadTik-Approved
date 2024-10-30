// /pages/about.js

import React from 'react';
import Head from 'next/head';
import Header from '../../components/header'; // Import Header
import Footer from '../../components/Footer'; // Import Footer

const About = () => {
  return (
    <div>
      <Head>
        <title>About Us - SaveMyTikTok</title>
        <meta
          name="description"
          content="Learn more about SaveMyTikTok and our dedication to providing seamless file-saving services."
        />
      </Head>
      
      <Header /> {/* Include Header */}
      
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
        
        <p className="mb-4">
          SaveMyTikTok is dedicated to helping users easily save TikTok videos for offline access and sharing. Our goal is to provide a user-friendly experience that makes saving your favorite content simple and quick.
        </p>

        <p className="mb-4">
          We understand the importance of accessibility, and we are committed to improving our platform to serve our users better every day.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
        <p className="mb-4">
          To provide a reliable, efficient, and secure service for downloading and sharing TikTok content.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          Have any questions? Reach out to us on our <a href="/contact" className="text-blue-500 hover:underline">Contact</a> page.
        </p>
      </div>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default About;
