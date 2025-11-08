import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.resend.supportEmail, the link won't be displayed.

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-primary/20 relative overflow-hidden">
      {/* Cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <div className="flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href="/#"
              aria-current="page"
              className="flex gap-2 justify-center md:justify-start items-center group"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                priority={true}
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                width={24}
                height={24}
              />
              <strong className="font-extrabold tracking-tight text-base md:text-lg group-hover:text-primary transition-colors duration-300 font-mono">
                {config.appName}
              </strong>
            </Link>

            <p className="mt-4 text-sm text-base-content/80 leading-relaxed font-light">
              {config.appDescription}
            </p>
            <p className="mt-4 text-xs text-base-content/60 font-mono">
              © {new Date().getFullYear()} • ALL RIGHTS RESERVED
            </p>
          </div>

          <div className="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-primary tracking-widest text-sm md:text-left mb-4 font-mono">
                ⚡ LINKS
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-3 mb-10 text-sm">
                {config.resend.supportEmail && (
                  <a
                    href={`mailto:${config.resend.supportEmail}`}
                    target="_blank"
                    className="link link-hover hover:text-primary transition-all duration-300 hover:translate-x-1"
                    aria-label="Contact Support"
                  >
                    Support
                  </a>
                )}
                <Link href="/#pricing" className="link link-hover hover:text-primary transition-all duration-300 hover:translate-x-1">
                  Pricing
                </Link>
                <Link href="/blog" className="link link-hover hover:text-primary transition-all duration-300 hover:translate-x-1">
                  Blog
                </Link>
                <a href="/#" target="_blank" className="link link-hover hover:text-primary transition-all duration-300 hover:translate-x-1">
                  Affiliates
                </a>
              </div>
            </div>

            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-primary tracking-widest text-sm md:text-left mb-4 font-mono">
                📜 LEGAL
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-3 mb-10 text-sm">
                <Link href="/tos" className="link link-hover hover:text-primary transition-all duration-300 hover:translate-x-1">
                  Terms of services
                </Link>
                <Link href="/privacy-policy" className="link link-hover hover:text-primary transition-all duration-300 hover:translate-x-1">
                  Privacy policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
