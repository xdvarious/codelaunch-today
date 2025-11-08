import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";

const Pricing = () => {
  return (
    <section className="bg-base-200 overflow-hidden relative py-24" id="pricing">
      {/* Cyber grid background */}
      <div className="absolute inset-0 retro-grid opacity-20"></div>

      {/* Glowing effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="py-24 px-8 max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col text-center w-full mb-20">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="px-4 py-1 border border-primary/50 rounded-full">
              <span className="text-xs font-mono uppercase tracking-wider text-primary">⚡ PRICING</span>
            </div>
          </div>

          <h2 className="font-black text-4xl lg:text-6xl tracking-tight mb-6">
            <span className="block">One Price.</span>
            <span className="block text-primary neon-text">Infinite Value.</span>
          </h2>

          <p className="text-xl text-base-content/70 max-w-2xl mx-auto font-light">
            Pay once. Own forever. No subscriptions. No bullshit.
          </p>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {config.stripe.plans.map((plan, index) => (
            <div
              key={plan.priceId}
              className="relative w-full max-w-lg"
            >
              {plan.isFeatured && (
                <>
                  {/* Animated border */}
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-secondary to-primary rounded-xl blur-sm opacity-75 animate-pulse"></div>

                  {/* Popular badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-4 py-1 bg-gradient-to-r from-primary to-secondary rounded-full">
                      <span className="text-xs font-mono font-bold text-white">🔥 MOST POPULAR</span>
                    </div>
                  </div>
                </>
              )}

              <div className={`relative cyber-card rounded-xl p-8 h-full flex flex-col ${
                plan.isFeatured ? 'border-2 border-primary/50' : ''
              }`}>
                {/* Plan header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black mb-2 font-mono uppercase">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-sm text-base-content/60">{plan.description}</p>
                  )}
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    {plan.priceAnchor && (
                      <span className="text-2xl text-base-content/40 line-through font-mono">
                        ${plan.priceAnchor}
                      </span>
                    )}
                    <span className="text-6xl font-black text-primary neon-text font-mono">
                      ${plan.price}
                    </span>
                  </div>
                  <p className="text-sm text-base-content/60 font-mono mt-2">ONE-TIME PAYMENT</p>
                </div>

                {/* Features */}
                {plan.features && (
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <div className="mt-1 flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-sm group-hover:text-primary transition-colors">{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <div className="space-y-3 mt-auto">
                  <ButtonCheckout
                    priceId={plan.priceId}
                    className={`w-full font-mono ${plan.isFeatured ? 'neon-border' : ''}`}
                  />
                  <p className="text-center text-xs text-base-content/50 font-mono">
                    ⚡ INSTANT ACCESS • 💎 LIFETIME UPDATES
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-block cyber-card p-6 rounded-lg max-w-2xl border border-primary/20">
            <div className="text-3xl mb-2">🛡️</div>
            <p className="font-bold mb-2 font-mono">7-Day Money-Back Guarantee</p>
            <p className="text-sm text-base-content/70">
              Not happy? Get a full refund. No questions asked. We're that confident.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
