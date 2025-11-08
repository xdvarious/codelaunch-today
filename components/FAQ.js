"use client";

import { useRef, useState } from "react";

const faqList = [
  {
    question: "Do I need to know how to code?",
    answer: <p>Yes. This is a boilerplate for developers. If you know React/Next.js basics, you're good to go. If not, check out the Next.js tutorial first.</p>,
  },
  {
    question: "What if I get stuck?",
    answer: (
      <p>
        Documentation included. Plus, you can reach out via email. We actually respond. Usually within 24 hours.
      </p>
    ),
  },
  {
    question: "Can I use this for client projects?",
    answer: <p>YES. Buy once, use for unlimited projects. Client work, SaaS, side hustles - whatever. No restrictions.</p>,
  },
  {
    question: "Do you offer refunds?",
    answer: (
      <p>
        7-day money-back guarantee. No questions asked. If it's not for you, just email us.
      </p>
    ),
  },
  {
    question: "Is this a subscription?",
    answer: <p>NOPE. Pay once. Own forever. Free updates included. No recurring charges. Ever.</p>,
  },
  {
    question: "What tech stack does this use?",
    answer: (
      <div>
        <p className="mb-2">Next.js 15, React 19, Tailwind CSS v4, DaisyUI, MongoDB, Stripe, NextAuth, Resend.</p>
        <p>All the good stuff. All configured. All working.</p>
      </div>
    ),
  },
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="border-b border-primary/10">
      <button
        className="relative flex gap-4 items-center w-full py-6 text-left hover:bg-primary/10 px-4 -mx-4 rounded-lg transition-all"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span className={`text-2xl transition-transform text-primary ${isOpen ? 'rotate-90' : ''}`}>
          ▶
        </span>
        <span className={`flex-1 font-bold text-lg font-mono ${isOpen ? 'text-primary' : ''}`}>
          {item?.question}
        </span>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-6 px-4 text-base-content/80 leading-relaxed pl-14">
          {item?.answer}
        </div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200 relative overflow-hidden py-24" id="faq">
      {/* Cyber grid */}
      <div className="absolute inset-0 retro-grid opacity-20"></div>

      <div className="py-24 px-8 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-primary/50 rounded-full">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">💬 FAQ</span>
          </div>

          <h2 className="font-black text-4xl lg:text-6xl tracking-tight mb-6">
            <span className="block">Questions?</span>
            <span className="block text-primary neon-text">Answers.</span>
          </h2>

          <p className="text-xl text-base-content/70">
            Everything you need to know before you buy
          </p>
        </div>

        <div className="cyber-card p-8 rounded-lg border border-primary/20">
          <ul className="space-y-2">
            {faqList.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </ul>
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center">
          <p className="text-base-content/60 mb-4 font-mono">Still have questions?</p>
          <a href="mailto:support@codelaunch.today" className="btn btn-outline font-mono border-primary/50 hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all">
            📧 EMAIL US
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
