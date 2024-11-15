"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Router, X } from "lucide-react";
import Link from "next/link";
import { get } from "http";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const menuItems = ["Product", "About Us", "Pricing", "Contact Us"];

const Navbar = ({ session }: { session: Session | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getItemHref = (item: string) => {
    switch (item) {
      case "About Us":
        return "/about-us";
      case "Pricing":
        return "/pricing";
      case "Contact Us":
        return "/contact-us";
      case "Product":
        return "/product";
      default:
        return `/#${item.toLowerCase().replace(" ", "-")}`;
    }
  };

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 shadow-lg backdrop-blur-lg dark:bg-black/80"
          : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Link href={"/"}>
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
          </motion.div>

          <div className="hidden items-center gap-8 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={getItemHref(item)}
                className="text-gray-600 transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-primary"
              >
                <motion.span whileHover={{ scale: 1.05 }}>{item}</motion.span>
              </Link>
            ))}
            {session ? (
              <ProfileMenu session={session} />
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="hover:bg-primary-dark rounded-lg bg-primary px-6 py-2 text-white transition-colors"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </motion.button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="dark:bg-dark-lighter border-t bg-white dark:border-gray-800 md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  href={getItemHref(item)}
                  className="block py-3 text-gray-600 transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {session ? (
                <ProfileMenu session={session} />
              ) : (
                <button
                  className="hover:bg-primary-dark mt-4 w-full rounded-lg bg-primary px-6 py-2 text-white transition-colors"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

function ProfileMenu({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={session.user.image || "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>HN</AvatarFallback>
        </Avatar>
        <span className="flex items-center font-medium text-baseC">
          Account <ChevronDown />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={`/profile/${session.user.id}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
