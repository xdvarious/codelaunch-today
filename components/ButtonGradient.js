"use client";

const ButtonGradient = ({ title = "START BUILDING", onClick = () => {} }) => {
  return (
    <button
      className="btn btn-primary font-mono neon-border hover:scale-105 transition-transform animate-shimmer"
      onClick={onClick}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      {title}
    </button>
  );
};

export default ButtonGradient;
