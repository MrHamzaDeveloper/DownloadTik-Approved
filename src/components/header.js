"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50 transition duration-300">
  <div className="container mx-auto px-6 py-4 flex items-center justify-between">
    {/* Logo as a clickable link */}
    <Link 
      href="/" 
      className="text-2xl font-bold transition-transform duration-300 hover:text-blue-600"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      SaveMyTikTok
    </Link>

    {/* Desktop Menu */}
    <nav className="hidden md:flex space-x-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Link 
        href="/" 
        className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                   hover:bg-blue-500 hover:text-white hover:shadow-lg transform hover:scale-105"
      >
        Home
      </Link>
      <Link 
        href="/about" 
        className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                   hover:bg-blue-500 hover:text-white hover:shadow-lg transform hover:scale-105"
      >
        About Us
      </Link>
      <Link 
        href="/disclaimer" 
        className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                   hover:bg-blue-500 hover:text-white hover:shadow-lg transform hover:scale-105"
      >
        Disclaimer
      </Link>
      <Link 
        href="/contact" 
        className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                   hover:bg-blue-500 hover:text-white hover:shadow-lg transform hover:scale-105"
      >
        Contact
      </Link>
    </nav>

    {/* Mobile Menu Icon */}
    <div className="md:hidden">
      <button
        ref={iconRef}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        className="text-gray-800 focus:outline-none transition-transform duration-300 transform hover:scale-110"
      >
        {isOpen ? (
          // Cross (Close) Icon
          <svg
            key="close"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Menu (Hamburger) Icon
          <svg
            key="menu"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
    </div>
  </div>

  {/* Mobile Dropdown Menu */}
  {isOpen && (
    <div ref={menuRef} className="md:hidden bg-white shadow-lg rounded-b-lg">
      <nav className="flex flex-col space-y-4 px-4 py-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <Link 
          href="/" 
          onClick={closeMenu} 
          className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                     hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
        >
          Home
        </Link>
        <Link 
          href="/about" 
          onClick={closeMenu} 
          className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                     hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
        >
          About Us
        </Link>
        <Link 
          href="/disclaimer" 
          onClick={closeMenu} 
          className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                     hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
        >
          Disclaimer
        </Link>
        <Link 
          href="/contact" 
          onClick={closeMenu} 
          className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                     hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
        >
          Contact
        </Link>
      </nav>
    </div>
  )}
</header>

  );
};

export default Header;
