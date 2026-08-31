import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaGithub } from "react-icons/fa";
import ProfileImg from "../assets/images/Profile_Picture.png";

const navLinks = [
  { name: 'Works', id: 'works' },
  { name: 'Experience', id: 'experience' },
  { name: 'Capabilities', id: 'capabilities' },
];

const NavbarContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Use a threshold close to the top for more accurate active state detection
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let currentSection = '';
      
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = link.id;
        }
      }
      
      // If we are at the top, clear active section
      if (window.scrollY < 200) {
        currentSection = '';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(90%, 900px)",
        zIndex: 9999,
      }}
      className="px-6 py-4 md:px-10 md:py-4 nav-glass-noise flex justify-between items-center shadow-2xl shadow-black/30"
    >
      <div
        className="flex items-center gap-3 md:gap-4 cursor-pointer relative z-10 group"
        onClick={() => scrollTo('top')}
      >
        <img src={ProfileImg} alt="Atharv" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-white/20 shadow-md transition-transform md:group-hover:scale-105" />
        <span className="font-display text-lg md:text-xl tracking-widest text-white uppercase md:group-hover:text-sage transition-colors">
          ATHARV KASAR
        </span>
      </div>

      <div className="hidden md:flex gap-10 relative z-10">
        {navLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-semibold cursor-crosshair
              ${activeSection === item.id 
                ? 'text-sage scale-105' 
                : 'text-white/80 md:hover:text-white md:hover:opacity-100'
              }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="relative z-10">
        <a
          href="https://github.com/AtharvKasar04"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-white/50 text-[12px] uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 btn-noise-primary md:hover:scale-105 md:hover:border-transparent font-semibold text-white"
        >
          <FaGithub className="text-lg" />
          GitHub
        </a>
      </div>
    </nav>
  );
};

const Navbar: React.FC = () => {
  return createPortal(<NavbarContent />, document.body);
};

export default Navbar;
