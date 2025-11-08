"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";
import ThemeSwitcher from "./ThemeSwitcher";
import logo from "@/app/icon.png";
import config from "@/config";

const links = [
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#testimonials",
    label: "Reviews",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

const cta = <ButtonSignin extraStyle="btn-primary" />;

// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  // Close menu when route changes (when user clicks a link on mobile)
  useEffect(() => {
    closeMenu();
  }, [searchParams, closeMenu]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeMenu]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="bg-base-200 border-b border-primary/20 backdrop-blur-sm sticky top-0 z-40">
      <nav
        className="container flex items-center justify-between px-8 py-4 mx-auto"
        aria-label="Global"
      >
        {/* Your logo/name on large screens */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0 group"
            href="/"
            title={`${config.appName} hompage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-8 group-hover:scale-110 transition-transform duration-300"
              placeholder="blur"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-extrabold text-lg font-mono group-hover:text-primary transition-colors duration-300">{config.appName}</span>
          </Link>
        </div>
        {/* Burger button to open menu on mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-200"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : "mb-1"}`}></span>
              <span className={`w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? "opacity-0" : "mb-1"}`}></span>
              <span className={`w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* Your links on large screens */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover font-mono text-sm uppercase tracking-wide hover:text-primary transition-colors duration-300"
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA and theme switcher on large screens */}
        <div className="hidden lg:flex lg:justify-end lg:flex-1 lg:items-center lg:gap-3">
          <ThemeSwitcher />
          {cta}
        </div>
      </nav>

      {/* Mobile menu with backdrop and slide animation */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 animate-in fade-in"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Mobile menu panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm border-l-2 border-primary/30 transform origin-right transition-transform duration-300 ease-out animate-in slide-in-from-right lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
          {/* Your logo/name on small screens */}
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 shrink-0 group"
              title={`${config.appName} hompage`}
              href="/"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className="w-8 group-hover:scale-110 transition-transform duration-300"
                placeholder="blur"
                priority={true}
                width={32}
                height={32}
              />
              <span className="font-extrabold text-lg font-mono group-hover:text-primary transition-colors duration-300">{config.appName}</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all duration-200"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation links on mobile */}
          <div className="flow-root mt-8">
            <div className="py-4">
              <nav className="flex flex-col gap-y-4 items-start" role="navigation">
                {links.map((link, index) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="link link-hover text-lg font-medium font-mono uppercase tracking-wide hover:text-primary transition-all duration-200 hover:translate-x-1"
                    title={link.label}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="divider border-primary/20"></div>
            {/* CTA and theme switcher on mobile */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium font-mono uppercase opacity-70">Theme</span>
                <ThemeSwitcher />
              </div>
              {cta}
            </div>
          </div>
        </div>
        </>
      )}
    </header>
  );
};

export default Header;
