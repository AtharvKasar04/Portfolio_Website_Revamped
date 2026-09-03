import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import ProfileImg from "../assets/images/Profile_Picture.png";

const navLinks = [
  { name: 'Works', id: 'works' },
  { name: 'Experience', id: 'experience' },
  { name: 'Capabilities', id: 'capabilities' },
  { name: 'Contact', id: 'contact' },
];

const NavbarContent: React.FC<{ minimal?: boolean }> = ({ minimal = false }) => {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (minimal) return; // No scroll spy in minimal mode

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      let currentSection = 'top'; 
      
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportHeight / 2.5) {
            currentSection = link.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [minimal]);

  const scrollTo = (id: string) => {
    if (minimal && id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: minimal ? "16px" : "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: minimal ? "max-content" : "min(95%, 1050px)",
        zIndex: 9999,
      }}
      className={`nav-glass-noise flex justify-center md:justify-between items-center shadow-2xl shadow-black/30 transition-all duration-300 ${minimal ? 'px-6 py-2 rounded-full' : 'px-5 py-2.5 md:px-8 md:py-4'}`}
    >
      <div
        className="flex items-center gap-3 md:gap-4 cursor-pointer relative z-10 group"
        onClick={() => scrollTo('top')}
      >
        {!minimal && activeSection === 'top' && (
          <motion.div
            layoutId="navTubelight"
            className={`hidden md:flex absolute inset-x-0 -top-[16px] h-[calc(100%+16px)] pointer-events-none flex-col items-center z-0 ${isInitialLoad ? 'animate-tubelight-flicker' : ''}`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-1/2 h-[3px] bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.8)] rounded-b-full"></div>
            <div 
              className="w-[150%] flex-1 bg-gradient-to-b from-white/20 to-transparent blur-[4px]" 
              style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}
            ></div>
          </motion.div>
        )}
        
        <img src={ProfileImg} alt="Atharv" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-white/20 shadow-md transition-transform md:group-hover:scale-105 relative z-10" />
        <span className="font-display text-lg md:text-xl tracking-widest text-white uppercase md:group-hover:text-sage transition-colors relative z-10 whitespace-nowrap">
          ATHARV KASAR
        </span>
      </div>

      {!minimal && (
        <>
          <div className="hidden lg:flex gap-1 relative z-10">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative px-4 py-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold cursor-crosshair group"
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navTubelight"
                    className="absolute inset-x-0 -top-[16px] h-[calc(100%+16px)] pointer-events-none flex flex-col items-center z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="w-1/2 h-[3px] bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.8)] rounded-b-full"></div>
                    <div 
                      className="w-[150%] flex-1 bg-gradient-to-b from-white/20 to-transparent blur-[4px]" 
                      style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}
                    ></div>
                  </motion.div>
                )}
                
                <span className={`relative z-10 transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                    : 'text-white/50 group-hover:text-white/90'
                }`}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden sm:block relative z-10">
            <a
              href="https://github.com/AtharvKasar04"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/50 text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 btn-noise-primary md:hover:scale-105 md:hover:border-transparent font-semibold text-white"
            >
              <FaGithub className="text-lg" />
              GitHub
            </a>
          </div>
        </>
      )}
    </nav>
  );
};

const Navbar: React.FC<{ minimal?: boolean }> = ({ minimal = false }) => {
  return createPortal(<NavbarContent minimal={minimal} />, document.body);
};

export default Navbar;
