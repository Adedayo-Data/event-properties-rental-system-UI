"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <p className="text-3xl font-display font-bold text-primary">KV</p>
            <span className="text-lg font-display font-bold text-primary">
              KptVent
            </span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center text-primary z-30 relative">
            <Link
              href="/"
              className="text-black hover:text-green-300 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/venues"
              className="text-black hover:text-green-300  font-medium transition-colors"
            >
              Venues
            </Link>
            <Link
              href="/bookings"
              className="text-black hover:text-green-300  font-medium transition-colors"
            >
              Bookings
            </Link>
            <Link
              href="/contact"
              className="text-black hover:text-green-300 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>
          <Button className="bg-primary text-white hover:bg-accent hover:text-primary transition-colors">
            <Link
              href="/signup"
              className="ml-2 px-4 py-2 rounded-xl font-semibold transition-colors"
            >
              Register
            </Link>
          </Button>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-accent hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 z-40 relative bg-white">
          <Link
            href="/"
            className="block text-black hover:text-green-300 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/venues"
            className="block text-black hover:text-green-300  font-medium transition-colors"
          >
            Venues
          </Link>
          <Link
            href="/bookings"
            className="block text-black hover:text-green-300  font-medium transition-colors"
          >
            Bookings
          </Link>
          <Link
            href="/contact"
            className="block text-black hover:text-green-300  font-medium transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/signup"
            className="block mt-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-accent hover:text-primary font-semibold transition-colors"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
