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
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo as a clickable link */}
        <Link 
  href="/" 
  className="text-2xl font-bold text-white transition-transform duration-300 hover:scale-105"
>
  SaveMyTikTok
</Link>


        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            ref={iconRef}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="text-white focus:outline-none"
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
        <div ref={menuRef} className="md:hidden bg-blue-600">
          <nav className="flex flex-col space-y-4 px-4 py-2">
            <Link href="/" onClick={closeMenu} className="hover:underline">Home</Link>
            <Link href="/about" onClick={closeMenu} className="hover:underline">About Us</Link>
            <Link href="/disclaimer" onClick={closeMenu} className="hover:underline">Disclaimer</Link> {/* Added link for Disclaimer */}
            <Link href="/contact" onClick={closeMenu} className="hover:underline">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
