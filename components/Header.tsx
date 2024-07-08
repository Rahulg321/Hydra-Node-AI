"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import ReusbaleButton from "./ComponentButtons/ReusbaleButton";
import LoginDialog from "./Dialogs/LoginDialog";
import SignUpDialog from "./Dialogs/SignUpDialog";

type HeaderProps = {
  classname?: string;
};

const mobileNav = [
  { navlink: "/", navlabel: "Home" },
  { navlink: "/practice-areas", navlabel: "Practice Areas" },
  { navlink: "/our-firm", navlabel: "Our Firm" },
  { navlink: "/team-members", navlabel: "Team" },
  { navlink: "/news", navlabel: "News" },
  { navlink: "/blogs", navlabel: "Blogs" },
  { navlink: "/videos", navlabel: "Videos" },
  { navlink: "/careers", navlabel: "Careers" },
  { navlink: "/contact", navlabel: "Contact" },
];

const desktopNav = [
  { navlink: "/team-members", navlabel: "Our Professionals" },
  { navlink: "/transactions", navlabel: "Transactions" },
  { navlink: "/careers", navlabel: "Careers" },
  { navlink: "/contact", navlabel: "Contact" },
];

const Header = ({ classname }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        className={clsx(
          " px-2 md:px-4 lg:px-12 py-2 border-b sticky top-0 z-50 bg-background",
          classname
        )}
      >
        <nav aria-label="Main-navigation">
          <ul className="flex flex-col  md:m-4 md:flex-row md:items-center justify-between md:rounded-xl">
            <div className="flex items-center justify-between">
              <NameLogo />
              <button
                aria-label="Open menu"
                className="block text-2xl text-black dark:text-white md:hidden"
                onClick={() => setIsOpen(true)}
              >
                <MdMenu />
              </button>
            </div>
            <div
              className={clsx(
                "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-black text-white pr-4 pt-14  transition-transform duration-300 ease-in-out md:hidden",
                isOpen ? "translate-x-0" : "translate-x-[100%]"
              )}
            >
              <button
                aria-label="Close menu"
                className="fixed right-4 top-3 block p-2 text-2xl text-white md:hidden "
                onClick={() => setIsOpen(false)}
              >
                <MdClose />
              </button>
              {mobileNav.map((item, index) => {
                return (
                  <Link
                    href={item.navlink}
                    key={index}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={clsx(
                      "",
                      pathname === item.navlink ? "underline" : ""
                    )}
                  >
                    {item.navlabel}
                  </Link>
                );
              })}
            </div>
            <DesktopMenu />
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

function NameLogo({}: {}) {
  return (
    <div className="">
      <Link
        href="/"
        aria-label="Home page"
        className="text-3xl md:text-4xl font-bold text-mainC"
      >
        Aigbe Law PLLC
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
              "font-bold hover:underline-offset-8 hover:text-mainC hover:underline  hover:decoration-4 hover:decoration-mainC transition",
              pathname === item.navlink
                ? "text-mainC underline-offset-8 underline decoration-4"
                : ""
            )}
          >
            {item.navlabel}
          </Link>
        );
      })}

      <LoginDialog />
      <SignUpDialog />
    </div>
  );
}
