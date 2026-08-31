"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileImg from "../assets/images/Profile_Picture.png";
import { ContainerTextFlip } from "./ContainerTextFlip";

const interests = [
  "Next.js & Django Apps",
  "Open-Source",
  "AI-First Web Platforms",
  "IoT & Hardware Integration",
  "Premium React Interfaces",
  "AI Engineering",
  "Engineering Products",
];

const burstItems = [
  { text: "Oh, I'm an avgeek too ✈️", x: -180, y: -100, delay: 0 },
  { text: "I'm into finance too 📈", x: 180, y: -110, delay: 0.05 },
  { text: "I love building stuff 🎨", x: -160, y: 120, delay: 0.1 },
  { text: "I play Minecraft (none lately) 🧊", x: 200, y: 100, delay: 0.15 },
];

const HeroSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Toggle this to true/false to show or hide the "Open to Work" frame
  const isOpenToWork = true;

  return (
    <section id="top" className="relative w-full min-h-screen bg-navy flex flex-col justify-center overflow-hidden pt-32 pb-16">
      {/* Ambient Background Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[384px] h-[384px] bg-sage opacity-20 blur-[120px] rounded-full animate-float pointer-events-none mix-blend-screen" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-[20%] right-[10%] w-[384px] h-[384px] bg-soft-blue opacity-20 blur-[120px] rounded-full animate-float pointer-events-none mix-blend-screen" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 px-8 md:px-16 w-full flex flex-col flex-grow justify-center">
        {/* Central text & Image Area */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full mt-12 md:mt-20 gap-16 md:gap-0">

          {/* Typography - Name & Bio */}
          <div className="flex flex-col relative w-full md:w-auto z-20">
            {/* Overlapping 'I'm' with intentional background styling */}
            <div className="absolute -top-6 -left-4 bg-navy px-4 py-1 z-30 transform -rotate-3 border border-sage/30 rounded-lg shadow-xl shadow-navy/50">
              <span className="font-serif italic text-sage text-2xl md:text-3xl">I'm</span>
            </div>

            <h1
              className="font-display uppercase hero-name-text leading-[0.85] tracking-tighter relative z-20 text-[26vw] sm:text-[22vw] md:text-[15vw]"
            >
              Atharv
            </h1>
            <h1 className="font-display uppercase hero-name-outline leading-[0.85] tracking-tighter relative z-20 text-[26vw] sm:text-[22vw] md:text-[15vw]">
              Kasar
            </h1>

            {/* Bio Paragraph Moved Here */}
            <div className="max-w-sm md:max-w-md mt-8 md:mt-12 ml-2">
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-light border-l-2 border-sage/50 pl-6">
                Full-Stack Engineer working across React, Next.js, Node.js, TypeScript, and Python. I've shipped real products from SaaS dashboards to AI-integrated platforms, and I care about writing code that actually holds up in production.
              </p>
            </div>
          </div>

          {/* Image and Vertical Scrolling Text */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 md:-ml-24 xl:ml-0 z-10 w-full md:w-auto justify-end">

            {/* Portrait Image with Bursting Text Blocks */}
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Bursting Items */}
              <AnimatePresence>
                {isHovered && burstItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.5 }}
                    animate={{ opacity: 1, x: `calc(-50% + ${item.x}px)`, y: `calc(-50% + ${item.y}px)`, scale: 1 }}
                    exit={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.5, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: item.delay }}
                    className="absolute top-1/2 left-1/2 z-0 px-4 py-2 burst-block-bg rounded-full backdrop-blur-md whitespace-nowrap pointer-events-none shadow-lg border border-white/20"
                  >
                    <span className="font-serif italic text-sm font-semibold tracking-wide">{item.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full p-[4px] profile-noise-border shadow-2xl shadow-[#3b899a]/20 z-10">
                <div className="w-full h-full rounded-full overflow-hidden bg-navy relative">
                  <img src={ProfileImg} alt="Atharv Kasar" className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-700" />

                  {/* Open To Work Overlay */}
                  {isOpenToWork && (
                    <div
                      className="absolute inset-0 z-20 pointer-events-none drop-shadow-lg"
                      style={{
                        WebkitMaskImage: 'conic-gradient(from 120deg at 50% 50%, transparent 0deg, black 25deg, black 95deg, transparent 120deg)',
                        maskImage: 'conic-gradient(from 120deg at 50% 50%, transparent 0deg, black 25deg, black 95deg, transparent 120deg)'
                      }}
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                        {/* Solid arc, fading is handled perfectly by the conic-gradient mask */}
                        <path id="openToWorkCurve" d="M 12.8,71.5 A 43,43 0 0,0 87.2,71.5" fill="transparent" stroke="#3b899a" strokeWidth="14" />
                        <text className="font-sans uppercase font-bold text-[8px]" fill="#ffffff" letterSpacing="0px" style={{ filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.6))' }}>
                          <textPath href="#openToWorkCurve" startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                            #OPEN TO WORK
                          </textPath>
                        </text>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3D Dial Scrolling Interests Text */}
            <div className="flex flex-col items-start justify-center shrink-0 w-full md:w-96 mt-6 md:mt-0">
              <span className="font-serif italic text-taupe text-lg md:text-xl mb-2 ml-2">I'm interested in...</span>

              <div className="w-full">
                <ContainerTextFlip
                  words={interests}
                  interval={3500}
                  className="!bg-navy !shadow-none !border !border-white/10 !bg-none bg-white/[0.02] backdrop-blur-md px-6 py-4"
                  textClassName="font-display uppercase text-white text-xl md:text-3xl tracking-wide"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
