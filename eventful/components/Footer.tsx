import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-green-50 text-black py-8 mt-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Brand */}
      <div className="font-display text-4xl font-bold mb-2 md:mb-0">KV</div>
      {/* Navigation */}
      <nav className="flex space-x-6 mb-2 md:mb-0">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <Link href="/venues" className="hover:text-accent transition-colors">
          Venues
        </Link>
        <Link href="/contact" className="hover:text-accent transition-colors">
          Contact
        </Link>
      </nav>
      {/* Socials */}
      <div className="flex space-x-4">
        <a
          href="#"
          aria-label="Facebook"
          className="hover:text-accent transition-colors"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="#"
          aria-label="Twitter"
          className="hover:text-accent transition-colors"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="hover:text-accent transition-colors"
        >
          <FaInstagram size={20} />
        </a>
      </div>
    </div>
    <div className="text-center text-black text-sm mt-4">
      &copy; {new Date().getFullYear()} Eventful. All rights reserved.
    </div>
  </footer>
);

export default Footer;
