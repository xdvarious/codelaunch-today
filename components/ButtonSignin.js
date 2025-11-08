/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import config from "@/config";

// Straightforward button for authentication via configured providers (Google & Magic Links).
// Automatically redirects users to callbackUrl (config.auth.callbackUrl) post-login, typically a private account management page.
// For already authenticated users, displays their profile picture and immediately redirects to callbackUrl.
const ButtonSignin = ({ text = "Get started", extraStyle = "", compact = false }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClick = useCallback(() => {
    if (status === "authenticated") {
      router.push(config.auth.callbackUrl);
    } else {
      signIn(undefined, { callbackUrl: config.auth.callbackUrl });
    }
  }, [status, router]);

  const userInitial = useMemo(() => {
    return session?.user?.name?.charAt(0)?.toUpperCase() || session?.user?.email?.charAt(0)?.toUpperCase() || "?";
  }, [session]);

  const displayName = useMemo(() => {
    if (compact) return null;
    return session?.user?.name || session?.user?.email || "Account";
  }, [session, compact]);

  if (status === "authenticated") {
    return (
      <Link
        href={config.auth.callbackUrl}
        className={`btn btn-ghost font-mono ${extraStyle} transition-all duration-200 hover:scale-105 border border-primary/30 hover:border-primary/50`}
        aria-label={`Go to ${displayName || "account"}`}
      >
        {session.user?.image ? (
          <div className="avatar">
            <div className="w-6 h-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
              <img
                src={session.user.image}
                alt={session.user?.name || "User avatar"}
                className="object-cover"
                referrerPolicy="no-referrer"
                width={24}
                height={24}
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder">
            <div className="w-6 h-6 bg-primary text-primary-content rounded-full flex items-center justify-center font-semibold text-xs">
              <span>{userInitial}</span>
            </div>
          </div>
        )}
        {displayName && <span className="text-sm">{displayName}</span>}
      </Link>
    );
  }

  return (
    <button
      className={`btn btn-primary font-mono neon-border ${extraStyle} transition-all duration-200 hover:scale-105 active:scale-95`}
      onClick={handleClick}
      disabled={status === "loading"}
      aria-label={text}
    >
      {status === "loading" ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {text}
        </>
      )}
    </button>
  );
};

export default ButtonSignin;
