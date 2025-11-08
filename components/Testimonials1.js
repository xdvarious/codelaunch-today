import Image from "next/image";

// A beautiful single testimonial with a user name and and company logo logo
const Testimonial = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-base-100 px-8 py-24 sm:py-32"
      id="testimonials"
    >
      {/* Cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>

      {/* Glowing orb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="mx-auto max-w-2xl lg:max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1 border border-primary/50 rounded-full">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">💬 TESTIMONIAL</span>
          </div>
          <h2 className="font-black text-4xl lg:text-5xl tracking-tight mb-4">
            <span className="block">Real Developers.</span>
            <span className="block text-primary neon-text">Real Results.</span>
          </h2>
        </div>

        <figure className="mt-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="relative rounded-xl cyber-card border-2 border-primary/30 neon-border p-2 hover:scale-105 transition-transform">
              <Image
                width={320}
                height={320}
                className="rounded-lg max-w-[320px] md:max-w-[280px] lg:max-w-[320px] object-center"
                // Ideally, load from a statically generated image for better SEO performance (import userImage from "@/public/userImage.png")
                // If you're using a static image, add placeholder="blur"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2488&q=80"
                alt="A testimonial from a happy customer"
              />
            </div>

            <div>
              <blockquote className="text-xl font-light leading-8 text-base-content sm:text-2xl sm:leading-10">
                "Got the boilerplate and{" "}
                <span className="font-bold text-primary neon-text">having Stripe payments + auth setup is a blessing.</span>
                {" "}This saves me a full week of work for each new project I build.
                The docs are clear, everything works, and it's worth every penny."
              </blockquote>
              <figcaption className="mt-10 flex items-center justify-start gap-5 pt-6 border-t border-primary/20">
                <div className="text-base">
                  <div className="font-bold text-primary mb-1 font-mono text-lg">
                    Amanda K.
                  </div>
                  <div className="text-base-content/70 font-mono text-sm uppercase tracking-wide">
                    Full Stack Developer
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(var(--p),0.5)]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </figcaption>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Testimonial;
