import Image from "next/image";

// A one or two sentences testimonial from a customer.
// Highlight the outcome for your customer (how did your product changed her/his life?) or the pain it's removing — Use <span className="bg-primary/25 px-1.5"> to highlight a part of the sentence
const Testimonial1Small = () => {
  return (
    <section className="bg-base-100 relative overflow-hidden">
      {/* Cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto px-8 py-16 md:py-32 relative z-10">
        <div className="cyber-card p-8 md:p-12 rounded-xl border-2 border-primary/30 neon-border hover:scale-105 transition-transform">
          <div className="rating !flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(var(--p),0.5)]"
                key={i}
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>

          <div className="text-xl leading-relaxed space-y-4 max-w-xl mx-auto text-center mb-8">
            <p className="font-light text-base-content/90">
              <span className="bg-primary/30 px-2 py-1 rounded font-semibold text-primary neon-text">
                I SAVED 36+ HOURS
              </span>{" "}
              of boring setup work. No more wrestling with Stripe docs or NextAuth configs.
            </p>
            <p className="font-light text-base-content/80">
              Just clone, configure, and ship. This is the boilerplate I wish I had when I started.
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 pt-6 border-t border-primary/20">
            <Image
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-primary ring-offset-base-100 ring-offset-2"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={`Founder testimonial for CodeLaunch`}
              width={56}
              height={56}
            />
            <div>
              <p className="font-bold font-mono text-base text-primary">Sarah Chen</p>
              <p className="text-base-content/70 text-sm font-mono">Indie Maker • 23K followers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial1Small;
