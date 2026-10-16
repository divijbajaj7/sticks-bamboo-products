import React from "react";

interface BambooLogoProps {
  className?: string;
  size?: number;
}

export const BambooLogo: React.FC<BambooLogoProps> = ({
  className = "w-8 h-8",
  size = 32,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="STICKS Bamboo Logo"
    >
      {/* Brutalist Bamboo Stalk 1 (Left - Medium) */}
      <path
        d="M6 38V18L10 14V38H6Z"
        fill="currentColor"
      />
      <rect x="5" y="24" width="6" height="2" fill="#dc2626" />
      <rect x="5" y="32" width="6" height="2" fill="currentColor" />

      {/* Brutalist Bamboo Stalk 2 (Center - Tall) */}
      <path
        d="M16 38V8L22 2V38H16Z"
        fill="currentColor"
      />
      <rect x="15" y="14" width="8" height="2.5" fill="currentColor" />
      <rect x="15" y="23" width="8" height="2.5" fill="currentColor" />
      <rect x="15" y="31" width="8" height="2.5" fill="currentColor" />

      {/* Brutalist Bamboo Stalk 3 (Right - High) */}
      <path
        d="M28 38V12L34 7V38H28Z"
        fill="currentColor"
      />
      <rect x="27" y="19" width="8" height="2" fill="currentColor" />
      <rect x="27" y="28" width="8" height="2" fill="#dc2626" />

      {/* Grounding Base Bar */}
      <rect x="4" y="38" width="32" height="2" fill="currentColor" />
    </svg>
  );
};

export default BambooLogo;
