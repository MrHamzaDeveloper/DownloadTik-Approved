"use client"; // Make this a client-side component

import React, { useEffect, useState } from 'react';
import Header from '../../components/header'; // Adjust the import based on your structure
import Footer from '../../components/Footer'; // Adjust the import based on your structure



const PrivacyPolicy = () => {
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
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy for DownloadTik</h1>
        <p className="mb-4">Last updated: October 30, 2024</p>

        <p className="mb-4">
          Welcome to DownloadTik! Your privacy is important to us, and this Privacy Policy explains how we collect, use, and protect your information when you visit our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
        <p className="mb-4">
          We may collect the following types of information:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Personal Information:</strong> Such as your name and email address if you choose to provide them.</li>
          <li><strong>Usage Data:</strong> Information about how you use our site, including your IP address and the pages you visit.</li>
          <li><strong>Cookies:</strong> Small files stored on your device to help us improve your experience on our site.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Provide and maintain our services.</li>
          <li>Notify you about changes to our services.</li>
          <li>Improve our website and services.</li>
          <li>Respond to your comments and questions.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
        <p className="mb-4">
          We take your data security seriously and strive to use commercially acceptable means to protect your personal information. However, please remember that no method of transmission over the internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. If you have any questions about your data or this Privacy Policy, please contact us.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>

        <p className="mb-4">
          Thank you for trusting DownloadTik with your information! We are committed to protecting your privacy and providing you with a safe online experience.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
