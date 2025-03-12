import React from "react";
import { Twitter, Linkedin, CircleDot } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "@/public/logos/h_logo.svg";
import LogoLight from "@/public/logos/light_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border border-t-2 bg-white py-16 dark:bg-black/90">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Main Footer Content */}
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Logo and Social Section */}
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2">
                <Image
                  src={LogoDark}
                  alt="Hydranode"
                  width={200}
                  height={200}
                  className="hidden h-8 dark:block"
                />
                <Image
                  src={LogoLight}
                  width={200}
                  height={150}
                  alt="Hydranode"
                  className="h-8 dark:hidden"
                />
              </Link>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Boost your Competitive Skills and <br /> clear your
                Certifications
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  aria-label="Medium"
                >
                  <CircleDot className="h-5 w-5" />
                </Link>
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
                  <Link
                    href="/vendors"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Contact
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
                  <Link
                    href="/privacy-policy"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
            <p className="text-center text-gray-600 dark:text-gray-400">
              © {currentYear} Hydranode AI Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
