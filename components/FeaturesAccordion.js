"use client";

import { useState } from "react";

const features = [
  {
    title: "⚡ Payments Ready",
    description:
      "Stripe integration. Webhook handlers. Checkout flows. Customer portal. Everything you need to start making money TODAY.",
    icon: "💳",
  },
  {
    title: "🔐 Auth System",
    description:
      "Magic links. Google OAuth. Protected routes. Session management. No more NextAuth headaches. Just works.",
    icon: "🛡️",
  },
  {
    title: "📧 Email Pipeline",
    description:
      "Transactional emails. Newsletter system. DKIM/SPF configured. Resend integrated. Start emailing in 5 minutes.",
    icon: "✉️",
  },
  {
    title: "🎨 UI Components",
    description:
      "Dark mode. Responsive design. DaisyUI themes. Tailwind CSS v4. Build beautiful interfaces FAST.",
    icon: "🎭",
  },
  {
    title: "💾 Database Setup",
    description:
      "MongoDB integrated. Mongoose schemas. User models ready. ToJSON plugins. Just add your data.",
    icon: "🗄️",
  },
  {
    title: "🚀 Deploy Ready",
    description:
      "Vercel optimized. Environment configs. API routes. Middleware setup. Push to deploy.",
    icon: "☁️",
  },
];

const FeaturesAccordion = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section
      className="py-24 md:py-32 bg-base-100 relative overflow-hidden"
      id="features"
    >
      {/* Cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>

      {/* Glowing effects */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-primary/50 rounded-full">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">✨ FEATURES</span>
          </div>

          <h2 className="font-black text-4xl lg:text-6xl tracking-tight mb-6">
            <span className="block">Everything You Need</span>
            <span className="block text-primary neon-text">Nothing You Don't</span>
          </h2>

          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Stop cobbling together tutorials. Start with production-ready code.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={`cursor-pointer cyber-card p-6 rounded-lg transition-all duration-300 hover:scale-105 ${
                selected === i ? 'border-2 border-primary/50 neon-border' : 'border border-primary/20'
              }`}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2 font-mono">{feature.title}</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block cyber-card p-8 rounded-lg max-w-2xl border border-primary/20">
            <p className="text-2xl font-bold mb-4 font-mono">
              Plus: SEO setup, API helpers, error handling, and MORE
            </p>
            <p className="text-base-content/60 mb-6">
              Literally everything you need to go from idea to paying customers
            </p>
            <button className="btn btn-primary btn-lg font-mono neon-border hover:scale-105 transition-transform">
              🚀 GET STARTED NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
