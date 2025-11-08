import Image from "next/image";

const avatars = [
  {
    alt: "User",
    // Ideally, load from a statically generated image for better SEO performance (import userImage from "@/public/userImage.png")
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
  },
  {
    alt: "User",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    alt: "User",
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    alt: "User",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    alt: "User",
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3376&q=80",
  },
];

const TestimonialsAvatars = ({ priority = false }) => {
  return (
    <div className="inline-flex flex-col md:flex-row justify-center items-center gap-8 relative">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl"></div>

      <div className="relative flex flex-col md:flex-row items-center gap-8 cyber-card p-8 md:p-10 rounded-2xl border-2 border-primary/40 neon-border bg-base-200/80 backdrop-blur-md hover:scale-[1.02] transition-all shadow-2xl">
        {/* AVATARS STACK */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex -space-x-6">
            {avatars.map((image, i) => (
              <div
                className="avatar w-14 h-14 hover:scale-125 hover:z-10 transition-all duration-300"
                key={i}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="rounded-full ring-4 ring-primary/60 ring-offset-base-200 ring-offset-2 shadow-[0_0_20px_rgba(var(--p),0.4)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    priority={priority}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-success/20 rounded-full border border-success/50">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-xs font-mono font-bold text-success uppercase">Verified Users</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>

        {/* STATS */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-primary neon-text font-mono">287+</span>
              <span className="text-lg font-bold text-success animate-pulse">✓</span>
            </div>
            <span className="text-sm font-mono uppercase tracking-widest text-base-content/80">
              Developers Shipped
            </span>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col items-center px-4 py-2 bg-primary/10 rounded-lg border border-primary/30">
              <span className="text-2xl font-black text-primary font-mono">4.7</span>
              <span className="text-[10px] font-mono uppercase text-base-content/60">Rating</span>
            </div>
            <div className="flex flex-col items-center px-4 py-2 bg-success/10 rounded-lg border border-success/30">
              <span className="text-2xl font-black text-success font-mono">2411h</span>
              <span className="text-[10px] font-mono uppercase text-base-content/60">Saved</span>
            </div>
            <div className="flex flex-col items-center px-4 py-2 bg-warning/10 rounded-lg border border-warning/30">
              <span className="text-2xl font-black text-warning font-mono">100%</span>
              <span className="text-[10px] font-mono uppercase text-base-content/60">Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsAvatars;
