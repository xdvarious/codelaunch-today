import Image from "next/image";
import config from "@/config";

// The list of your testimonials. It needs 3 items to fill the row.
const list = [
  {
    // Optional, use for social media like Twitter. Does not link anywhere but cool to display
    username: "marclou",
    // REQUIRED
    name: "Vadim",
    // REQUIRED
    text: "Really easy to use. The tutorials are really useful and explains how everything works. Hope to ship my next project really fast!",
    // Optional, a statically imported image (usually from your public folder—recommended) or a link to the person's avatar. Shows a fallback letter if not provided
    img: "https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg",
  },
  {
    username: "the_mcnaveen",
    name: "Naveen",
    text: "Setting up everything from the ground up is a really hard, and time consuming process. What you pay for will save your time for sure.",
  },
  {
    username: "wahab",
    name: "Wahab Shaikh",
    text: "Easily saves 15+ hrs for me setting up trivial stuff. Now, I can directly focus on shipping features rather than hours of setting up the same technologies from scratch. Feels like a super power! :D",
  },
];

// A single testimonial, to be rendered in  a list
const Testimonial = ({ i }) => {
  const testimonial = list[i];

  if (!testimonial) return null;

  return (
    <li key={i}>
      <figure className="relative max-w-lg h-full p-6 md:p-10 cyber-card rounded-xl border-2 border-primary/30 hover:border-primary/50 neon-border transition-all hover:scale-105 max-md:text-sm flex flex-col">
        <blockquote className="relative flex-1">
          <p className="text-base-content/90 leading-relaxed text-base">
            "{testimonial.text}"
          </p>
        </blockquote>
        <figcaption className="relative flex items-center justify-start gap-4 pt-4 mt-4 md:gap-8 md:pt-8 md:mt-8 border-t border-primary/20">
          <div className="w-full flex items-center justify-between gap-2">
            <div>
              <div className="font-bold text-primary md:mb-0.5 font-mono">
                {testimonial.name}
              </div>
              {testimonial.username && (
                <div className="mt-0.5 text-sm text-base-content/70 font-mono">
                  @{testimonial.username}
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-full bg-base-300 shrink-0 ring-2 ring-primary ring-offset-base-100 ring-offset-2 hover:scale-110 transition-transform">
              {testimonial.img ? (
                <Image
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  src={list[i].img}
                  alt={`${list[i].name}'s testimonial for ${config.appName}`}
                  width={48}
                  height={48}
                />
              ) : (
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-lg font-medium bg-primary/30 text-primary">
                  {testimonial.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

const Testimonials3 = () => {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-base-100 py-24">
      {/* Cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="py-24 px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col text-center w-full mb-20">
          <div className="inline-block mx-auto mb-6 px-4 py-1.5 border-2 border-primary/50 rounded-full bg-primary/10">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">💬 TESTIMONIALS</span>
          </div>

          <div className="mb-8">
            <h2 className="sm:text-5xl text-4xl font-black text-base-content mb-4">
              <span className="block">1000+ Developers</span>
              <span className="block text-primary neon-text drop-shadow-[0_0_20px_rgba(var(--p),0.5)]">Shipping Faster</span>
            </h2>
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-lg text-base-content/80 font-light">
            Don&apos;t take our word for it. Here&apos;s what they have to say about <span className="text-primary font-bold">CodeLaunch</span>.
          </p>
        </div>

        <ul
          role="list"
          className="flex flex-col items-center lg:flex-row lg:items-stretch gap-6 lg:gap-8"
        >
          {[...Array(3)].map((e, i) => (
            <Testimonial key={i} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials3;
