import React from "react";
import { FaFileDownload, FaEnvelope } from "react-icons/fa";
import TerminalInteractive from "./TerminalInteractive";

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-navy text-white min-h-[80vh] py-32 px-6 md:px-16 animated-noise-gradient overflow-hidden flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-24 lg:gap-16">
        
        {/* Left Side: Text and Contact */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="text-sage uppercase tracking-[0.2em] text-sm mb-6 block font-semibold">What's Next?</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[7rem] uppercase tracking-tighter mb-8 leading-none">
            Initialize<br/>Contact
          </h2>
          <p className="text-white/80 max-w-lg mb-12 leading-relaxed font-light text-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out via email or download my resume for more details.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <a 
              href="mailto:atharvk752@gmail.com" 
              className="flex items-center gap-3 bg-white text-navy px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-transform font-bold shadow-lg md:hover:scale-105 md:hover:shadow-white/20"
            >
              <FaEnvelope className="text-lg" /> Email Me
            </a>
            <a 
              href="/resume.pdf" 
              download="Atharv_Kasar_Resume.pdf"
              className="flex items-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-all font-semibold md:hover:bg-white/10 md:hover:border-white/50 md:hover:scale-105"
            >
              <FaFileDownload className="text-lg" /> Download Resume
            </a>
          </div>
        </div>

        {/* Right Side: Terminal */}
        <div className="w-full lg:w-[45%]">
           <TerminalInteractive />
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
