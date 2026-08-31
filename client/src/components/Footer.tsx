import React, { useRef, useState } from "react";

const EmailInteractiveBlock = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a 
      ref={wrapperRef}
      href="mailto:atharvk752@gmail.com" 
      className="relative block w-full text-center cursor-pointer mb-16"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Email atharvk752@gmail.com"
    >
      {/* Base Stroke Text */}
      <div 
         className="w-full font-display text-[12vw] md:text-[9.5vw] whitespace-nowrap uppercase leading-none tracking-tighter text-transparent select-none transition-colors duration-700"
         style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
      >
         atharvk752@gmail.com
      </div>
      
      {/* Reveal Gradient Text */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center font-display text-[12vw] md:text-[9.5vw] whitespace-nowrap uppercase leading-none tracking-tighter select-none pointer-events-none email-reveal-text transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage: `radial-gradient(circle 250px at ${coords.x}px ${coords.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 250px at ${coords.x}px ${coords.y}px, black 0%, transparent 100%)`
        }}
      >
        atharvk752@gmail.com
      </div>
    </a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-gradient-to-b from-navy from-[60%] to-black text-white pt-32 pb-8 px-8 md:px-16 flex flex-col justify-between min-h-[60vh] overflow-hidden">
      <div className="flex flex-col w-fit mx-auto max-w-full">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between w-full mb-16 md:mb-24 mt-8">
          <h2 className="font-display text-6xl md:text-[8rem] uppercase leading-none tracking-tighter footer-gradient-text m-0 whitespace-nowrap">
            Let's Create
          </h2>
          <div className="flex-1 hidden md:block border-b border-white/10 mx-6 mb-4"></div>
          <p className="font-serif italic text-[#e6ccbc] text-xl md:text-3xl max-w-sm text-right mt-6 md:mt-0 pb-2">
            Open to new opportunities, collaborations, and ideas.
          </p>
        </div>
        
        {/* Interactive Email Block */}
        <EmailInteractiveBlock />
      </div>

      <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[12px] uppercase tracking-widest text-white/60">
          Fueled by ☕ and late-night debugging. Designed & Developed by Atharv Kasar.
        </p>
        <div className="flex gap-8">
          <a href="https://www.linkedin.com/in/atharv-kasar-03aa34258/" target="_blank" rel="noopener noreferrer" className="text-[12px] uppercase tracking-widest text-white/60 md:hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/AtharvKasar04" target="_blank" rel="noopener noreferrer" className="text-[12px] uppercase tracking-widest text-white/60 md:hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;