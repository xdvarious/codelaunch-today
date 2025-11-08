"use client";

import { useState, useRef, useCallback } from "react";
import { toast } from "react-hot-toast";
import apiClient from "@/libs/api";

// Component for capturing email addresses from the landing page
// Implement this when your product is under development or for lead generation purposes
// Use cases include: Popups offering freebies, waitlist signups, etc.
// Communicates with the /api/lead/route.js endpoint to persist Lead documents in the database
const ButtonLead = ({ extraStyle = "", successMessage = "Thanks for joining the waitlist!" }) => {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();

    if (!email.trim() || isLoading || isDisabled) return;

    setIsLoading(true);
    try {
      await apiClient.post("/lead", { email: email.trim() });

      toast.success(successMessage, {
        duration: 4000,
        icon: "🎉",
      });

      // Remove focus from the input field
      inputRef.current?.blur();
      setEmail("");
      setIsDisabled(true);
    } catch (error) {
      console.error("Lead submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [email, isLoading, isDisabled, successMessage]);
  return (
    <form
      className={`w-full max-w-xs space-y-3 ${extraStyle}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="relative">
        <input
          required
          type="email"
          value={email}
          ref={inputRef}
          autoComplete="email"
          placeholder="your@email.com"
          aria-label="Email address"
          className="input input-bordered w-full placeholder:opacity-60 transition-all duration-200 focus:scale-[1.02] font-mono text-sm border-primary/30 focus:border-primary/50 focus:neon-border"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isDisabled}
        />
        {isDisabled && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      <button
        className="btn btn-primary btn-block transition-all duration-200 hover:scale-[1.02] disabled:scale-100 font-mono neon-border"
        type="submit"
        disabled={isDisabled || isLoading || !email.trim()}
        aria-label={isDisabled ? "Already joined" : "Join waitlist"}
      >
        {isDisabled ? "✅ JOINED" : "JOIN WAITLIST"}
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : !isDisabled && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </form>
  );
};

export default ButtonLead;
