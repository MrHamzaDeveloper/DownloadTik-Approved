// src/app/contact/page.js

import React from 'react';
import Header from '../../components/header'; // Adjust the import based on your structure
import Footer from '../../components/Footer'; // Adjust the import based on your structure

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <p className="mb-4 text-center">
          Have questions or feedback? We’d love to hear from you! Please fill out the form below, and we’ll get back to you as soon as possible.
        </p>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="5"
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-2">Email: <a href="mailto:info@savemytiktok.com" className="text-blue-500 hover:underline">info@savemytiktok.com</a></p>
          <p className="mb-2">Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a></p>
          <p>Follow us on social media for updates:</p>
          <ul className="list-disc list-inside">
            <li><a href="#" className="text-blue-500 hover:underline">Facebook</a></li>
            <li><a href="#" className="text-blue-500 hover:underline">Twitter</a></li>
            <li><a href="#" className="text-blue-500 hover:underline">Instagram</a></li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
