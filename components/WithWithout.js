// A useful component when your product is challenging the status quo.
// Highlight the current pain points (left) and how your product is solving them (right)
// Try to match the lines from left to right, so the user can easily compare the two columns
const WithWithout = () => {
  return (
    <section className="bg-base-100 relative overflow-hidden">
      {/* Cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>

      <div className="max-w-5xl mx-auto px-8 py-16 md:py-32 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block mb-4 px-4 py-1 border border-primary/50 rounded-full">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">⚡ COMPARISON</span>
          </div>

          <h2 className="font-black text-3xl md:text-5xl tracking-tight mb-4">
            <span className="block">Stop Wasting Time</span>
            <span className="block text-primary neon-text">Start Shipping</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 md:gap-8">
          <div className="cyber-card border-2 border-error/30 p-8 md:p-12 rounded-lg w-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-error animate-pulse"></div>
              <h3 className="font-bold text-xl font-mono text-error">
                WITHOUT CODELAUNCH
              </h3>
            </div>

            <ul className="space-y-4">
              {/* Pains the user is experiencing by not using your product */}
              {[
                "5+ hours setting up Stripe webhooks",
                "Another 4 hours debugging NextAuth",
                "Endless email configuration headaches",
                "Copy-pasting code from tutorials",
                "Starting from scratch every time",
              ].map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-5 h-5 shrink-0 text-error mt-0.5"
                  >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                  <span className="text-base-content/80 font-light">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-error/10 rounded-lg border border-error/30 text-center">
              <p className="text-error font-mono text-sm">⏱️ 36+ HOURS WASTED</p>
            </div>
          </div>

          <div className="cyber-card border-2 border-success/30 p-8 md:p-12 rounded-lg w-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
              <h3 className="font-bold text-xl font-mono text-success">
                WITH CODELAUNCH
              </h3>
            </div>

            <ul className="space-y-4">
              {/* Features of your product fixing the pain (try to match each with/withot lines) */}
              {[
                "Stripe ready: payments in 5 minutes",
                "Auth configured: magic links + OAuth",
                "Emails working: Resend integrated",
                "Copy working code, not tutorials",
                "Launch in hours, not weeks",
              ].map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-5 h-5 shrink-0 text-success mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="text-base-content/80 font-light">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-success/10 rounded-lg border border-success/30 text-center">
              <p className="text-success font-mono text-sm">⚡ 36+ HOURS SAVED</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="btn btn-primary btn-lg font-mono neon-border hover:scale-105 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            SKIP THE SETUP
          </button>
        </div>
      </div>
    </section>
  );
};

export default WithWithout;
