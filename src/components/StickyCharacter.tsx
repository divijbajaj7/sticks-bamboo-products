import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, MessageCircle } from "lucide-react";

interface StickyCharacterProps {
  onClick: () => void;
  isOpen: boolean;
  unreadCount?: number;
  onNudgeClick: (text: string) => void;
  isThinking?: boolean;
}

const NUDGES = [
  "👋 Hey! Looking to ditch single-use plastic today?",
  "🎋 Did you know? Our Bamboo Water Bottle saves ~82.8 kg CO₂!",
  "👟 Looking for everyday footwear? Check our woven Bamboo Shoes!",
  "🦷 Eliminate 1.2 kg plastic waste with our Bamboo Toothbrush!",
  "🌿 Tap me! I'm Sticky, your Bamboo Sustainability guide.",
];

export const StickyCharacter: React.FC<StickyCharacterProps> = ({
  onClick,
  isOpen,
  onNudgeClick,
  isThinking = false,
}) => {
  // Eye tracking coordinates (-1 to 1)
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [currentNudgeIndex, setCurrentNudgeIndex] = useState(0);
  const [showNudge, setShowNudge] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const characterRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for pupil animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!characterRef.current) return;
      const rect = characterRef.current.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - charCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - charCenterY) / (window.innerHeight / 2);

      // Clamp to eye radius [-1, 1]
      const clampedX = Math.max(-1, Math.min(1, deltaX));
      const clampedY = Math.max(-1, Math.min(1, deltaY));

      setEyePos({ x: clampedX, y: clampedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Natural blinking interval (randomized between 2.5s and 5s)
  useEffect(() => {
    const blinkCycle = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 160);

      // Next blink in 2.8s to 5.2s
      const nextDelay = 2800 + Math.random() * 2400;
      blinkTimer = setTimeout(blinkCycle, nextDelay);
    };

    let blinkTimer = setTimeout(blinkCycle, 3000);
    return () => clearTimeout(blinkTimer);
  }, []);

  // Rotate nudges periodically when chat is closed
  useEffect(() => {
    if (isOpen) {
      setShowNudge(false);
      return;
    }

    setShowNudge(true);
    const interval = setInterval(() => {
      setCurrentNudgeIndex((prev) => (prev + 1) % NUDGES.length);
      setShowNudge(true);
    }, 9000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleCharacterClick = () => {
    // Playful wink on interaction
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 300);
    onClick();
  };

  // Pupil pixel offsets (max 7px in any direction)
  const pupilOffsetX = eyePos.x * 6.5;
  const pupilOffsetY = eyePos.y * 5.5;

  return (
    <div
      ref={characterRef}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-end gap-3 select-none pointer-events-none"
    >
      {/* Speech Bubble Nudge */}
      <AnimatePresence>
        {!isOpen && showNudge && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto max-w-[240px] sm:max-w-[280px] bg-white text-[#0a0a0a] border-2 border-[#0a0a0a] p-3.5 shadow-[4px_4px_0px_#0a0a0a] relative mb-2 group cursor-pointer"
            onClick={() => onNudgeClick(NUDGES[currentNudgeIndex])}
          >
            {/* Close nudge button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNudge(false);
              }}
              className="absolute -top-2 -left-2 w-5 h-5 bg-[#0a0a0a] text-white rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors shadow-xs"
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Bubble content */}
            <div className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#dc2626] shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-[#0a0a0a] leading-tight font-medium">
                {NUDGES[currentNudgeIndex]}
              </p>
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#0a0a0a]/60 uppercase pt-1 border-t border-[#0a0a0a]/15">
              <span className="text-[#dc2626] font-bold">STICKY · NUDGE</span>
              <span className="group-hover:underline text-[#0a0a0a]">Tap to ask &rarr;</span>
            </div>

            {/* Speech bubble arrow pointer pointing right towards Sticky */}
            <div className="absolute -right-2 bottom-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#0a0a0a]" />
            <div className="absolute -right-1.5 bottom-4 w-0 h-0 border-t-7 border-t-transparent border-b-7 border-b-transparent border-l-7 border-l-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Animated Sticky Mascot Button */}
      <div className="pointer-events-auto relative">
        <motion.button
          onClick={handleCharacterClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            y: isHovered ? -6 : [0, -4, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: isHovered ? 0 : Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#f2f2f2] border-3 border-[#0a0a0a] shadow-[5px_5px_0px_#0a0a0a] hover:shadow-[7px_7px_0px_#dc2626] flex items-center justify-center overflow-hidden cursor-pointer group transition-shadow focus:outline-hidden"
          aria-label="Open Sticky AI Bamboo Assistant"
        >
          {/* Base Mascot 3D Illustration */}
          <img
            src="/src/assets/images/sticky_bamboo_mascot_1791954595445.jpg"
            alt="Sticky Bamboo Mascot"
            className="w-full h-full object-cover scale-110 object-center transition-transform duration-300 group-hover:scale-115"
          />

          {/* Precision Live Animated Eyes Overlay */}
          <div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{ transform: "translateY(-4%)" }}
          >
            {/* Eye Sockets Container */}
            <div className="flex gap-2.5 items-center">
              {/* Left Eye */}
              <div className="relative w-4.5 h-6 bg-white rounded-full border border-[#0a0a0a]/80 overflow-hidden shadow-inner flex items-center justify-center">
                {/* Pupil with Specular Glint */}
                <motion.div
                  className="w-3.5 h-4.5 bg-[#2d1b0d] rounded-full relative"
                  style={{
                    transform: `translate(${pupilOffsetX}px, ${pupilOffsetY}px)`,
                  }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                >
                  {/* Large Glint */}
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                  {/* Small secondary glint */}
                  <div className="absolute bottom-0.5 left-0.5 w-0.8 h-0.8 bg-white/80 rounded-full" />
                </motion.div>

                {/* Blinking Eyelid */}
                <motion.div
                  className="absolute inset-0 bg-[#7bb32e] border-b border-[#4d731b]"
                  initial={false}
                  animate={{
                    height: isBlinking || isWinking ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.08 }}
                />
              </div>

              {/* Right Eye */}
              <div className="relative w-4.5 h-6 bg-white rounded-full border border-[#0a0a0a]/80 overflow-hidden shadow-inner flex items-center justify-center">
                {/* Pupil with Specular Glint */}
                <motion.div
                  className="w-3.5 h-4.5 bg-[#2d1b0d] rounded-full relative"
                  style={{
                    transform: `translate(${pupilOffsetX}px, ${pupilOffsetY}px)`,
                  }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                >
                  {/* Large Glint */}
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                  {/* Small secondary glint */}
                  <div className="absolute bottom-0.5 left-0.5 w-0.8 h-0.8 bg-white/80 rounded-full" />
                </motion.div>

                {/* Blinking Eyelid (winks if isWinking) */}
                <motion.div
                  className="absolute inset-0 bg-[#7bb32e] border-b border-[#4d731b]"
                  initial={false}
                  animate={{
                    height: isBlinking ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.08 }}
                />
              </div>
            </div>
          </div>

          {/* Thinking / Typing Pulse Halo */}
          {isThinking && (
            <div className="absolute inset-0 border-4 border-[#dc2626] rounded-full animate-ping opacity-75" />
          )}

          {/* Online status indicator dot */}
          <div className="absolute bottom-1 right-2 w-3.5 h-3.5 bg-[#16a34a] border-2 border-white rounded-full shadow-xs flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </motion.button>

        {/* Small floating label */}
        <div className="mt-1 text-center">
          <span className="bg-[#0a0a0a] text-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest font-bold shadow-xs">
            STICKY AI
          </span>
        </div>
      </div>
    </div>
  );
};

export default StickyCharacter;
