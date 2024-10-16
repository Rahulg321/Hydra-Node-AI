import React from "react";
import HydraNodeLogo from "@/public/hydranode_logo.png";
import Image from "next/image";
import { FaMedium } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

const companyLinks = [
  {
    name: "About Us",
    href: "/about-us",
  },

  {
    name: "Product",
    href: "/product",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

const legalLinks = [
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Cookie Policy",
    href: "/cookie-policy",
  },
  {
    name: "Terms of Service",
    href: "/terms-of-service",
  },
];

const Footer = () => {
  return (
    <footer className="block-space border-t-4">
      <div className="container flex flex-col items-start gap-6 md:flex-row md:justify-around">
        <div>
          <Image src={HydraNodeLogo} alt="logo of hydranode" />
          <span className="mt-2 block text-sm text-gray-500">
            Boost your Competitive Skills <br /> & Earn Rewards
          </span>{" "}
          <div className="mt-4 flex gap-4">
            <FaXTwitter className="size-6 text-base" />

            <FaLinkedin className="size-6 text-base" />

            <FaMedium className="size-6 text-base" />
          </div>
        </div>
        <div>
          <h5 className="mb-2 font-bold">Company</h5>
          <div className="space-y-2">
            {companyLinks.map((link) => (
              <Link key={link.name} href={link.href} className="block">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h5 className="mb-2 font-bold">Legal</h5>
          <div className="space-y-2">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="block">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
