"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  CreditCard,
  LogOut,
  Menu,
  Pen,
  User,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HydranodeWhiteLogo from "@/public/logos/hydranode-white-logo.svg";

import BestHydranodeLogo from "@/public/illustrations/new_hydranode_logo.png";
import { Session } from "next-auth";

const menuItems = ["Product", "Pricing", "About Us", "Contact Us"];

const Navbar = ({ session }: { session: Session | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLogoLoaded(true);
  }, []);

  const getItemHref = (item: string) => {
    switch (item) {
      case "About Us":
        return "/about-us";
      case "Community":
        return "/community";
      case "Pricing":
        return "/pricing";
      case "Marketplace":
        return "/marketplace";
      case "Create":
        return "/create";
      case "Contact Us":
        return "/contact-us";
      case "Product":
        return "/vendors";
      default:
        return `/#${item.toLowerCase().replace(" ", "-")}`;
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 shadow-lg backdrop-blur-lg dark:bg-black/80"
            : "bg-black dark:bg-black"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Left menu items */}
            <div className="hidden items-center md:flex">
              <Link
                href={getItemHref("About Us")}
                className="mr-8 text-gray-300 transition-colors hover:text-white"
              >
                <motion.span whileHover={{ scale: 1.05 }}>About Us</motion.span>
              </Link>
              <Link
                href={getItemHref("Product")}
                className="mr-8 text-gray-300 transition-colors hover:text-white"
              >
                <motion.span whileHover={{ scale: 1.05 }}>Products</motion.span>
              </Link>
              <Link
                href={getItemHref("Pricing")}
                className="text-gray-300 transition-colors hover:text-white"
              >
                <motion.span whileHover={{ scale: 1.05 }}>Pricing</motion.span>
              </Link>
            </div>

            {/* Center logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center"
              >
                <Link href={"/"}>
                  {isLogoLoaded ? (
                    <div className="">
                      <Image
                        src={HydranodeWhiteLogo || BestHydranodeLogo}
                        alt="hydranode logo"
                        width={40}
                        height={40}
                        className="block object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-32 animate-pulse bg-gray-200 dark:bg-gray-700" />
                  )}
                </Link>
              </motion.div>
            </div>

            <div className="hidden items-center md:flex">
              <Link
                href={getItemHref("Contact Us")}
                className="mr-8 text-gray-300 transition-colors hover:text-white"
              >
                <motion.span whileHover={{ scale: 1.05 }}>
                  Contact us
                </motion.span>
              </Link>

              {session ? (
                <ProfileMenu session={session} />
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-300 transition-colors hover:text-white"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Login
                </motion.button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="text-white md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t bg-black dark:border-gray-800 md:hidden"
            >
              <div className="container mx-auto px-4 py-4">
                {menuItems.map((item) => (
                  <Link
                    key={item}
                    href={getItemHref(item)}
                    className="block py-3 text-gray-300 transition-colors hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                {session ? (
                  <div className="mt-4 py-3">
                    <ProfileMenu session={session} />
                  </div>
                ) : (
                  <button
                    className="mt-4 w-full rounded-lg bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/90"
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
    </>
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
        <span className="flex items-center font-medium text-gray-300">
          Account <ChevronDown />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link
            href={`/profile/${session.user.id}`}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            My Learnings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href={`/profile/${session.user.id}/learnings`}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Exam History
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`/profile/${session.user.id}/info`}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href={`/profile/${session.user.id}/subscription`}
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Subscription
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
