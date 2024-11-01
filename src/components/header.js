"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

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
  }, [closeMenu]);

  // Memoize menu items for performance
  const menuItems = useMemo(
    () => [
      { label: "Home", href: "/" }, // Adjusted for FAQ section on landing page
      { label: "About Us", href: "/about" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50 transition duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo as a clickable link */}
        <Link href="/" className="text-2xl font-bold transition-transform duration-300 hover:text-blue-600">
          SaveMyTikTok
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8" role="navigation">
          {menuItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                         hover:bg-blue-500 hover:text-white hover:shadow-lg transform hover:scale-105"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            ref={iconRef}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="text-gray-800 focus:outline-none transition-transform duration-300 transform hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div ref={menuRef} className="md:hidden bg-white shadow-lg rounded-b-lg">
          <nav className="flex flex-col space-y-4 px-4 py-2" role="navigation">
            {menuItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                           hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
