// src/app/disclaimer/page.js

import React from 'react';
import Header from '../../components/header'; // Adjust the import based on your structure
import Footer from '../../components/Footer'; // Adjust the import based on your structure

const Disclaimer = () => {
  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Disclaimer</h1>
        <p className="mb-4">
          The information provided by SaveMyTikTok is for general informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
        </p>
        <p className="mb-4">
          Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">External Links Disclaimer</h2>
        <p className="mb-4">
          Through this website, you are able to link to other websites which are not under the control of SaveMyTikTok. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Disclaimer</h2>
        <p className="mb-4">
          We may update our disclaimer from time to time. We will notify you of any changes by posting the new disclaimer on this page. You are advised to review this disclaimer periodically for any changes. Changes to this disclaimer are effective when they are posted on this page.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Disclaimer;
