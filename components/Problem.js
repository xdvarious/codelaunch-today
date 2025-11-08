const Problem = () => {
  return (
    <section className="bg-neutral text-neutral-content relative overflow-hidden py-24 md:py-32">
      {/* Cyber grid background */}
      <div className="absolute inset-0 retro-grid opacity-30"></div>

      {/* Glowing accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-error/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-warning/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-error/50 rounded-full">
            <span className="text-xs font-mono uppercase tracking-wider text-error">⚠️ WARNING</span>
          </div>

          <h2 className="font-black text-4xl md:text-6xl tracking-tight mb-6">
            <span className="block">The Death Trap</span>
            <span className="block text-error neon-text mt-2">Of Side Projects</span>
          </h2>

          <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto font-light">
            Watch developers disappear into the void, one npm install at a time
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Week 1 */}
          <div className="cyber-card p-8 rounded-lg text-center group hover:scale-105 transition-transform border border-primary/30">
            <div className="text-6xl mb-4">📅</div>
            <div className="text-2xl font-bold text-primary mb-2 font-mono">WEEK 1</div>
            <div className="text-lg font-semibold mb-3">The Setup Hell</div>
            <p className="text-sm opacity-70 leading-relaxed">
              Auth, payments, emails, database... 40 hours gone before writing a single line of real code
            </p>
            <div className="mt-4 font-mono text-xs text-error">⏱️ 40hrs wasted</div>
          </div>

          {/* Week 2 */}
          <div className="cyber-card p-8 rounded-lg text-center group hover:scale-105 transition-transform border border-warning/30">
            <div className="text-6xl mb-4">🔥</div>
            <div className="text-2xl font-bold text-warning mb-2 font-mono">WEEK 2</div>
            <div className="text-lg font-semibold mb-3">The Burnout</div>
            <p className="text-sm opacity-70 leading-relaxed">
              Motivation dying. Still configuring webhooks. Day job crushing you. Side project feels impossible
            </p>
            <div className="mt-4 font-mono text-xs text-warning">⚡ Momentum lost</div>
          </div>

          {/* Week 3+ */}
          <div className="cyber-card p-8 rounded-lg text-center group hover:scale-105 transition-transform border-2 border-error/50">
            <div className="text-6xl mb-4">💀</div>
            <div className="text-2xl font-bold text-error mb-2 font-mono">WEEK 3+</div>
            <div className="text-lg font-semibold mb-3">Project Cemetery</div>
            <p className="text-sm opacity-70 leading-relaxed">
              Another "great idea" joins the graveyard. You're not alone. 80% never ship
            </p>
            <div className="mt-4 font-mono text-xs text-error">☠️ DEAD</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block p-1 bg-gradient-to-r from-primary to-secondary rounded-lg">
            <div className="bg-neutral px-8 py-4 rounded-md">
              <p className="font-mono text-sm mb-2 text-primary">BREAK THE CYCLE</p>
              <p className="text-2xl font-bold">Skip the setup. Ship in hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
