import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  duration: number;
}

interface SparklesTextProps {
  /**
   * The text or children to render inside the sparkle container
   */
  children?: React.ReactNode;
  text?: string;
  className?: string;
  sparklesCount?: number;
  colors?: {
    first: string;
    second: string;
  };
}

const SparkleIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-full h-full"
    style={{ color }}
  >
    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
  </svg>
);

export const SparklesText: React.FC<SparklesTextProps> = ({
  children,
  text,
  className = "",
  sparklesCount = 10,
  colors = {
    first: "#0a0a0a",
    second: "#dc2626",
  },
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = Array.from({ length: sparklesCount }).map(
        (_, i) => {
          return {
            id: `sparkle-${i}-${Date.now()}`,
            x: `${Math.random() * 110 - 5}%`,
            y: `${Math.random() * 110 - 5}%`,
            color: Math.random() > 0.5 ? colors.first : colors.second,
            delay: Math.random() * 1.5,
            scale: Math.random() * 0.8 + 0.6,
            duration: Math.random() * 1.5 + 1.2,
          };
        }
      );
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 2400);
    return () => clearInterval(interval);
  }, [sparklesCount, colors.first, colors.second]);

  return (
    <span className={`relative inline-block ${className}`}>
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="pointer-events-none absolute block w-4 h-4 md:w-5 md:h-5 z-20"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            scale: [0, sparkle.scale, 0],
            rotate: [0, 90, 180],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <SparkleIcon color={sparkle.color} />
        </motion.span>
      ))}
      <span className="relative z-10">{children || text}</span>
    </span>
  );
};

export default SparklesText;
