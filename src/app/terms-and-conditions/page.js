// src/app/terms/page.js

import React from 'react';
import Header from '../../components/header'; // Adjust the import based on your structure
import Footer from '../../components/Footer'; // Adjust the import based on your structure

const TermsAndConditions = () => {
  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Terms and Conditions for SaveMyTikTok</h1>
        <p className="mb-4">Last updated: October 30, 2024</p>

        <p className="mb-4">
          Welcome to SaveMyTikTok! These Terms and Conditions outline the rules and regulations for using our website located at [insert your website URL].
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our service, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Use of Service</h2>
        <p className="mb-4">
          You agree to use our service only for lawful purposes and in accordance with these Terms. You must not use the service in any way that violates any applicable local, national, or international law or regulation.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Intellectual Property</h2>
        <p className="mb-4">
          All content on our website, including text, graphics, logos, and images, is the property of SaveMyTikTok or our content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or modify any content without our written permission.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Disclaimer of Warranties</h2>
        <p className="mb-4">
          Our service is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the reliability, accuracy, or availability of our service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall SaveMyTikTok or its affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with the laws of [insert your jurisdiction], without regard to its conflict of law principles.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms and Conditions from time to time. We will notify you of any changes by posting the new Terms on this page. Please review these Terms periodically for any updates.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us via our <a href="/contact" className="text-blue-500 hover:underline">Contact</a> page.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
