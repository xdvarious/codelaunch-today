/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

const features = [
  {
    title: "⚡ Payments",
    description: "Stripe checkout ready. Start charging TODAY.",
    styles: "cyber-card text-base-content border-primary/30",
    demo: (
      <div className="px-6 space-y-3 font-mono text-sm">
        <div className="flex items-center gap-3 p-3 bg-base-300/50 rounded-lg border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-success">Stripe connected</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-base-300/50 rounded-lg border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-success">Webhook handlers ready</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-base-300/50 rounded-lg border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-success">Customer portal live</span>
        </div>
        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/30 text-center">
          <div className="text-3xl font-black text-primary neon-text">$0 → $$$</div>
          <div className="text-xs text-base-content/60 mt-1">IN MINUTES</div>
        </div>
      </div>
    ),
  },
  {
    title: "🔐 Auth System",
    description: "Magic links + OAuth. Zero headaches.",
    styles: "md:col-span-2 cyber-card text-base-content border-secondary/30",
    demo: (
      <div className="px-6 max-w-[600px] space-y-3">
        {[
          {
            icon: "🔑",
            text: "Magic link authentication",
            status: "READY",
            color: "success",
          },
          {
            icon: "🔒",
            text: "Google OAuth integration",
            status: "READY",
            color: "success",
          },
          {
            icon: "🛡️",
            text: "Protected routes + middleware",
            status: "READY",
            color: "success",
          },
        ].map((feature, i) => (
          <div
            className="p-4 bg-base-300/50 rounded-lg flex justify-between items-center border border-primary/20 hover:border-primary/40 transition-all"
            key={i}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{feature.icon}</span>
              <p className="font-mono text-sm">{feature.text}</p>
            </div>
            <span className={`px-3 py-1 rounded-full bg-${feature.color}/20 text-${feature.color} text-xs font-mono font-bold`}>
              {feature.status}
            </span>
          </div>
        ))}
        <div className="mt-4 p-4 bg-neutral/50 rounded-lg border border-neutral/30 text-center font-mono">
          <span className="text-error font-bold">⏱️ 6 HOURS</span>
          <span className="text-base-content/60"> SAVED</span>
        </div>
      </div>
    ),
  },
  {
    title: "📧 Email Pipeline",
    description: "Transactional + newsletters. Configured.",
    styles: "md:col-span-2 cyber-card text-base-content border-accent/30",
    demo: (
      <div className="px-6 max-w-[600px]">
        <div className="bg-base-300/50 rounded-lg p-4 border border-primary/20 font-mono text-sm">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-base-content/10">
            <span className="text-base-content/60">FROM:</span>
            <span className="text-primary">your@domain.com</span>
          </div>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-base-content/10">
            <span className="text-base-content/60">TO:</span>
            <span>customer@email.com</span>
          </div>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-base-content/10">
            <span className="text-base-content/60">SUBJECT:</span>
            <span>Your purchase receipt</span>
          </div>
          <div className="mt-4 p-3 bg-success/10 rounded border border-success/30 text-center">
            <div className="text-success font-bold flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              DELIVERED
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "💾 Database",
    description: "MongoDB + Mongoose. Models ready.",
    styles: "cyber-card text-base-content border-warning/30",
    demo: (
      <div className="px-6 font-mono text-xs space-y-2">
        <div className="bg-base-300/50 rounded-lg p-3 border border-primary/20">
          <div className="text-primary mb-2">// User Model</div>
          <div className="text-base-content/80 space-y-1">
            <div>name: <span className="text-success">String</span></div>
            <div>email: <span className="text-success">String</span></div>
            <div>customerId: <span className="text-success">String</span></div>
            <div>hasAccess: <span className="text-warning">Boolean</span></div>
          </div>
        </div>
        <div className="bg-base-300/50 rounded-lg p-3 border border-primary/20">
          <div className="text-primary mb-2">// Lead Model</div>
          <div className="text-base-content/80 space-y-1">
            <div>email: <span className="text-success">String</span></div>
            <div>createdAt: <span className="text-info">Date</span></div>
          </div>
        </div>
        <div className="text-center text-base-content/60 text-xs pt-2">
          READY TO EXTEND
        </div>
      </div>
    ),
  },
];

const FeaturesGrid = () => {
  return (
    <section className="flex justify-center items-center w-full bg-base-100 text-base-content py-20 lg:py-32 relative overflow-hidden">
      {/* Cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>

      {/* Glowing orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="flex flex-col max-w-[82rem] gap-16 md:gap-20 px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 border border-primary/50 rounded-full">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">⚡ POWER FEATURES</span>
          </div>

          <h2 className="font-black text-4xl md:text-6xl tracking-tight mb-6">
            <span className="block">Production Ready</span>
            <span className="block text-primary neon-text">Not Tutorials</span>
          </h2>

          <p className="text-xl text-base-content/70">
            Every feature you need. Actually working. Actually tested.
          </p>
        </div>

        {/* Features Grid */}
        <div className="flex flex-col w-full h-fit gap-4 lg:gap-10 text-text-default max-w-[82rem]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`${feature.styles} rounded-xl flex flex-col gap-6 w-full h-[22rem] lg:h-[25rem] pt-6 overflow-hidden group hover:scale-105 transition-all`}
              >
                <div className="px-6 space-y-2">
                  <h3 className="font-bold text-xl lg:text-2xl tracking-tight font-mono">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/70 text-sm">{feature.description}</p>
                </div>
                {feature.demo}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-block cyber-card p-8 rounded-lg max-w-2xl border-2 border-primary/30">
            <p className="text-3xl font-black mb-4 font-mono">
              <span className="text-primary neon-text">36+</span> HOURS SAVED
            </p>
            <p className="text-base-content/60 mb-6 font-mono text-sm">
              THAT&apos;S A FULL WORK WEEK BACK IN YOUR LIFE
            </p>
            <button className="btn btn-primary btn-lg font-mono neon-border hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              START BUILDING NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
