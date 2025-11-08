import config from "@/config";

const CTA = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-neutral text-neutral-content">
      {/* Animated cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-30 scanline"></div>

      {/* Dramatic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent"></div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="relative hero-content text-center p-8 z-10 max-w-5xl">
        <div className="space-y-8">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-error/50 bg-base-200/50 backdrop-blur-sm animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-error">⏰ LIMITED TIME</span>
          </div>

          {/* Main headline */}
          <h2 className="font-black text-5xl md:text-7xl tracking-tight leading-none">
            <span className="block">Stop Reading.</span>
            <span className="block text-primary neon-text my-4">Start Building.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto">
            Every minute you wait is another minute your competitors are shipping.
            <br />
            <span className="text-primary font-bold">Are you really going to let them win?</span>
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 py-8">
            <div>
              <div className="text-4xl font-black text-error neon-text">↓ 95%</div>
              <div className="text-sm text-base-content/60 font-mono mt-1">Setup Time</div>
            </div>
            <div>
              <div className="text-4xl font-black text-success neon-text">↑ 10x</div>
              <div className="text-sm text-base-content/60 font-mono mt-1">Speed to Launch</div>
            </div>
            <div>
              <div className="text-4xl font-black text-primary neon-text">∞</div>
              <div className="text-sm text-base-content/60 font-mono mt-1">Projects</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <button className="btn btn-primary btn-lg px-12 text-lg font-mono neon-border hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              YES, I'M READY TO SHIP
            </button>

            <p className="text-sm text-base-content/60 font-mono">
              ⚡ INSTANT ACCESS • 💎 LIFETIME UPDATES • 🛡️ 7-DAY REFUND
            </p>
          </div>

          {/* Social proof */}
          <div className="pt-8">
            <p className="text-xs text-base-content/40 font-mono uppercase tracking-widest mb-4">
              Join 1,000+ developers who stopped procrastinating
            </p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 border-t-2 border-l-2 border-primary/30"></div>
      <div className="absolute top-0 right-0 w-64 h-64 border-t-2 border-r-2 border-secondary/30"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 border-b-2 border-l-2 border-secondary/30"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 border-b-2 border-r-2 border-primary/30"></div>
    </section>
  );
};

export default CTA;
