import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-base-100 retro-grid scanline">
      {/* Cyber background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-base-200/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-primary">Live & Shipping</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none">
            <span className="block text-base-content">BUILD</span>
            <span className="block text-primary neon-text my-2">FASTER</span>
            <span className="block text-base-content">SHIP TODAY</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-base-content/80 font-light leading-relaxed">
            Stop wasting weeks on boilerplate. Launch your SaaS in <span className="text-primary font-bold">hours</span>, not months.
            <br className="hidden md:block" />
            Everything you need. Nothing you don't.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 py-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-primary neon-text">5min</div>
              <div className="text-sm text-base-content/60 font-mono mt-1">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-primary neon-text">100+</div>
              <div className="text-sm text-base-content/60 font-mono mt-1">Hours Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-primary neon-text">$0</div>
              <div className="text-sm text-base-content/60 font-mono mt-1">Monthly Fees</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button className="btn btn-primary btn-lg px-8 font-mono neon-border hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              START BUILDING
            </button>
            <button className="btn btn-outline btn-lg px-8 font-mono border-primary/50 hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              VIEW DEMO
            </button>
          </div>

          {/* Tech Stack */}
          <div className="pt-12">
            <p className="text-xs text-base-content/40 font-mono uppercase tracking-widest mb-4">Powered By</p>
            <div className="flex flex-wrap justify-center gap-6 opacity-60">
              {['Next.js 15', 'React 19', 'Stripe', 'MongoDB', 'Tailwind', 'DaisyUI'].map((tech) => (
                <div key={tech} className="px-4 py-2 bg-base-200/50 rounded border border-base-content/10 backdrop-blur-sm">
                  <span className="text-xs font-mono">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-8">
            <TestimonialsAvatars priority={true} />
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 border-t-2 border-r-2 border-primary/20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 border-b-2 border-l-2 border-secondary/20"></div>
    </section>
  );
};

export default Hero;
