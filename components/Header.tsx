"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import HydranodeLogo2 from "@/public/logos/HNLOGO1.svg";

import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

type HeaderProps = {
  session: Session | null;
  classname?: string;
};

const desktopNav = [
  { navlink: "/vendors", navlabel: "Product" },
  { navlink: "/about-us", navlabel: "About Us" },
  { navlink: "/pricing", navlabel: "Pricing" },
  { navlink: "/contact-us", navlabel: "Contact" },
];

const Header = ({ session, classname }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        className={clsx(
          "w-full px-2 py-2 md:px-4 lg:px-12",
          classname,
          pathname === "/token" || pathname === "/reward"
            ? "bg-[#110C1F]"
            : "bg-white",
        )}
      >
        <nav aria-label="Main-navigation">
          <ul className="flex flex-col md:m-4 md:flex-row md:items-center md:justify-between md:rounded-xl">
            <div className="flex items-center justify-between">
              <NameLogo />
              <button
                aria-label="Open menu"
                className={clsx(
                  "block text-2xl text-black dark:text-white md:hidden",
                  pathname === "/token" || pathname === "/reward"
                    ? "text-white"
                    : null,
                )}
                onClick={() => setIsOpen(true)}
              >
                <MdMenu />
              </button>
            </div>
            <div
              className={clsx(
                "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-black pr-4 pt-14 text-white transition-transform duration-300 ease-in-out md:hidden",
                isOpen ? "translate-x-0" : "translate-x-[100%]",
              )}
            >
              <button
                aria-label="Close menu"
                className={clsx(
                  "fixed right-4 top-3 block p-2 text-2xl text-white md:hidden",
                  pathname === "/token" || pathname === "/reward"
                    ? "text-white"
                    : null,
                )}
                onClick={() => setIsOpen(false)}
              >
                <MdClose />
              </button>
              {desktopNav.map((item, index) => {
                return (
                  <Link
                    href={item.navlink}
                    key={index}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={clsx(
                      "",
                      pathname === item.navlink ? "underline" : "",
                    )}
                  >
                    {item.navlabel}
                  </Link>
                );
              })}
            </div>
            <DesktopMenu />
            {/* if session does not exist user is not logged in and dont show the login and sign up links */}
            {session ? <ProfileMenu /> : <AuthDialogNavs />}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

function NameLogo({}: {}) {
  const pathname = usePathname();

  return (
    <div className="">
      <Link href="/" aria-label="Home page" className="">
        <Image
          src={HydranodeLogo2}
          alt="hyranode Logo"
          height={100}
          width={100}
          className="object-cover"
        />
        <Image
          src={HydranodeLogo2}
          alt="hyranode Logo"
          height={100}
          width={100}
          className="object-cover"
        />
      </Link>
    </div>
  );
}

function DesktopMenu() {
  const pathname = usePathname();
  return (
    <div className="hidden gap-8 md:flex md:items-center">
      {desktopNav.map((item, index) => {
        return (
          <Link
            href={item.navlink}
            key={index}
            className={clsx(
              "hover:text-mainC hover:decoration-mainC font-bold transition hover:underline hover:decoration-4 hover:underline-offset-8",
              pathname === "/token" || pathname === "/reward"
                ? "text-white"
                : "",
              pathname === item.navlink
                ? "text-mainC underline decoration-4 underline-offset-8"
                : "",
            )}
          >
            {item.navlabel}
          </Link>
        );
      })}
    </div>
  );
}

function AuthDialogNavs() {
  return (
    <div className="hidden space-x-4 md:flex md:items-center">
      <Link href={"/login"}>Login</Link>
    </div>
  );
}

function ProfileMenu() {
  const session = useSession();
  const profileName = session.data?.user.name;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={session?.data?.user.image || "https://github.com/shadcn.png"}
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
          <Link href={`/profile/${session?.data?.user.id}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
