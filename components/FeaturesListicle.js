"use client";

import { useState, useEffect, useRef } from "react";

const features = [
  {
    name: "⚡ Payments",
    description: (
      <ul className="space-y-3">
        {[
          "Stripe checkout sessions ready to go",
          "Webhook handlers for subscriptions",
          "Customer portal integration",
          "Reduce chargebacks with best practices",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{item}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 text-primary font-mono text-sm">
          ⏱️ TIME SAVED: 8 hours
        </li>
      </ul>
    ),
    icon: "💳",
  },
  {
    name: "🔐 Authentication",
    description: (
      <ul className="space-y-3">
        {[
          "Magic link authentication",
          "Google OAuth integration",
          "Protected routes & middleware",
          "Session management built-in",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{item}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 text-primary font-mono text-sm">
          ⏱️ TIME SAVED: 6 hours
        </li>
      </ul>
    ),
    icon: "🛡️",
  },
  {
    name: "📧 Emails",
    description: (
      <ul className="space-y-3">
        {[
          "Resend integration ready",
          "Transactional email templates",
          "DKIM/SPF/DMARC configured",
          "Newsletter system included",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{item}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 text-primary font-mono text-sm">
          ⏱️ TIME SAVED: 4 hours
        </li>
      </ul>
    ),
    icon: "✉️",
  },
  {
    name: "💾 Database",
    description: (
      <ul className="space-y-3">
        {[
          "MongoDB + Mongoose setup",
          "User & Lead models ready",
          "ToJSON plugins included",
          "Best practices enforced",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{item}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 text-primary font-mono text-sm">
          ⏱️ TIME SAVED: 3 hours
        </li>
      </ul>
    ),
    icon: "🗄️",
  },
  {
    name: "🎨 UI/UX",
    description: (
      <ul className="space-y-3">
        {[
          "Tailwind CSS v4 configured",
          "DaisyUI components library",
          "Dark/Retro themes ready",
          "Responsive & accessible",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{item}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 text-primary font-mono text-sm">
          ⏱️ TIME SAVED: 10 hours
        </li>
      </ul>
    ),
    icon: "🎭",
  },
  {
    name: "🚀 SEO",
    description: (
      <ul className="space-y-3">
        {[
          "Meta tags optimized",
          "OpenGraph for social sharing",
          "Sitemap auto-generation",
          "Structured data markup",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{item}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 text-primary font-mono text-sm">
          ⏱️ TIME SAVED: 5 hours
        </li>
      </ul>
    ),
    icon: "📈",
  },
];

const FeaturesListicle = () => {
  const featuresEndRef = useRef(null);
  const [featureSelected, setFeatureSelected] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasClicked) {
        setFeatureSelected((prev) => (prev + 1) % features.length);
      }
    }, 5000);

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            clearInterval(interval);
          }
        },
        { root: null, rootMargin: "0px", threshold: 0.5 }
      );
      if (featuresEndRef.current) {
        observer.observe(featuresEndRef.current);
      }
    } catch (e) {
      console.error(e);
    }

    return () => clearInterval(interval);
  }, [featureSelected, hasClicked]);

  return (
    <section className="py-24 bg-base-100 relative overflow-hidden" id="features">
      {/* Cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-primary/50 rounded-full">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">⚡ FEATURES</span>
          </div>

          <h2 className="font-black text-4xl lg:text-6xl tracking-tight mb-6">
            <span className="block">Launch In Hours</span>
            <span className="block text-primary neon-text">Not Weeks</span>
          </h2>

          <p className="text-xl text-base-content/70 max-w-2xl font-light">
            Everything configured. Everything tested. Everything ready. Just add your idea.
          </p>
        </div>

        {/* Feature selector */}
        <div className="flex flex-wrap gap-4 mb-8">
          {features.map((feature, i) => (
            <button
              key={i}
              onClick={() => {
                if (!hasClicked) setHasClicked(true);
                setFeatureSelected(i);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                featureSelected === i
                  ? "cyber-card border-2 border-primary/50 neon-border"
                  : "bg-base-200 hover:bg-base-300"
              }`}
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className={featureSelected === i ? "text-primary font-bold" : ""}>
                {feature.name}
              </span>
            </button>
          ))}
        </div>

        {/* Feature details */}
        <div className="cyber-card p-8 rounded-lg min-h-[300px]">
          <div key={featureSelected} className="animate-opacity">
            <h3 className="text-2xl font-bold mb-6 font-mono text-primary">
              {features[featureSelected].name}
            </h3>
            <div className="text-base-content/80 leading-relaxed">
              {features[featureSelected].description}
            </div>
          </div>
        </div>

        {/* Total time saved */}
        <div className="mt-12 text-center">
          <div className="inline-block cyber-card p-6 rounded-lg">
            <p className="text-3xl font-black text-primary neon-text mb-2">36+ HOURS SAVED</p>
            <p className="text-base-content/60 font-mono text-sm">That's almost a full work week</p>
          </div>
        </div>
      </div>

      <p className="opacity-0" ref={featuresEndRef}></p>
    </section>
  );
};

export default FeaturesListicle;
