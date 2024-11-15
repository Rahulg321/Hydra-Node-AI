import React from "react";
import { Twitter, Linkedin, CircleDot } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white py-16 dark:bg-black/90">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Main Footer Content */}
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Logo and Social Section */}
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2">
                <img
                  src="/logo-dark.svg"
                  alt="Hydranode"
                  className="h-8 dark:hidden"
                />
                <img
                  src="/logo-light.svg"
                  alt="Hydranode"
                  className="hidden h-8 dark:block"
                />
              </Link>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Boost your Competitive Skills
                <br />& Earn Rewards
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  aria-label="Medium"
                >
                  <CircleDot className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about-us"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Product
                  </a>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
            <p className="text-center text-gray-600 dark:text-gray-400">
              © 2024 Hydranode AI Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
