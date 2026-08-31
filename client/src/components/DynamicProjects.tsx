import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SpotSeeker from "../assets/images/SpotSeeker.jpg";
import LocalStorageWrapper from "../assets/images/localStorageWrapper.png";
import tradingExpectancyCalculator from "../assets/images/tradingExpectancyCalculator.png";
import athexDashboard from "../assets/images/athex-dashboard.png";

const projects = [
  { 
    name: "Athex Analytics", 
    type: "Full Stack", 
    image: athexDashboard, 
    whatItDoes: "A full-stack SaaS that helps traders track, manage, and analyze multiple prop firm accounts in one unified dashboard.",
    whyIBuiltIt: "To solve the fragmented tracking problem traders face when managing accounts across different proprietary trading firms.",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB"],
    github: "",
    live: "https://athex-six.vercel.app"
  },
  { 
    name: "Trading Expectancy", 
    type: "Web App", 
    image: tradingExpectancyCalculator, 
    whatItDoes: "Calculates strategy expectancy and visualizes performance using Monte Carlo simulations.",
    whyIBuiltIt: "To provide a data-driven tool for traders to model real-world equity growth and test their edge.",
    techStack: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
    github: "https://github.com/AtharvKasar04/trading-expectancy",
    live: "https://trading-expectancy.vercel.app/"
  },
  { 
    name: "SpotSeeker", 
    type: "IoT Integration", 
    image: SpotSeeker, 
    whatItDoes: "A real-time parking spot detection system displaying available spots on a React-based web dashboard.",
    whyIBuiltIt: "To build a smart parking solution leveraging IR sensors, microcontrollers, and IoT APIs for real-time data tracking.",
    techStack: ["ReactJS", "Arduino", "ESP8266 (NodeMCU)", "ThingSpeak IoT", "Sensors"],
    github: "",
    live: ""
  },
  { 
    name: "Local Storage Wrapper", 
    type: "NPM Package", 
    image: LocalStorageWrapper, 
    whatItDoes: "A lightweight NPM library simplifying browser local storage management with wrapped get, set, and remove functions.",
    whyIBuiltIt: "To master the process of creating and publishing open-source NPM packages, writing unit tests, and structuring documentation.",
    techStack: ["JavaScript", "Jest", "NPM"],
    github: "https://github.com/AtharvKasar04/localStorage-wrapper.git",
    live: "https://www.npmjs.com/package/b-local-storage-wrapper"
  },
];

const DynamicProjects: React.FC = () => {
  return (
    <section id="works" className="w-full bg-navy text-white py-32 px-8 md:px-16 animated-noise-gradient">
      <div className="flex flex-col items-center mb-24 text-center">
         <div className="relative inline-block">
           <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tighter">See what I've built</h2>
           {/* Aesthetic Hover Tip */}
           <div className="hidden md:block absolute md:-top-8 md:-right-12 lg:-right-24 animate-float" style={{ animationDelay: '1s' }}>
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.03)]">
               <div className="w-2 h-2 rounded-full bg-sage animate-pulse"></div>
               <span className="font-mono text-[9px] md:text-xs text-taupe tracking-widest uppercase whitespace-nowrap">Hover images to reveal</span>
             </div>
           </div>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-[1400px] mx-auto">
        {projects.map((proj, idx) => (
          <div key={idx} className={`w-full flex flex-col gap-4 ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}>
             <div className="flex flex-col">
                <h3 className="font-display text-5xl uppercase tracking-tight text-white mb-2">{proj.name}</h3>
                <span className="text-taupe uppercase text-sm tracking-widest font-semibold">{proj.type}</span>
             </div>

            {/* Image Container with Desktop Hover Details */}
            <div className="relative w-full aspect-video group overflow-hidden shadow-2xl rounded-sm">
              <img src={proj.image} alt={proj.name} className="w-full h-full object-cover md:transition-transform md:duration-700 md:group-hover:scale-105" />
              
              {/* Desktop Only: Static Noise Overlay & Details */}
              <div 
                className="hidden md:flex absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex-col justify-center p-12"
                style={{
                  background: 'rgba(13, 18, 21, 0.88)',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.15\'/%3E%3C/svg%3E")',
                  backgroundSize: 'auto, 100px 100px',
                }}
              >
                 <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col gap-8">
                    <div>
                      <span className="font-bold uppercase tracking-widest text-sm text-sage block mb-2">What it does</span>
                      <p className="leading-relaxed font-light text-white/95 text-lg">{proj.whatItDoes}</p>
                    </div>
                    <div>
                      <span className="font-bold uppercase tracking-widest text-sm text-sage block mb-2">Why I built it</span>
                      <p className="leading-relaxed font-light text-white/95 text-lg">{proj.whyIBuiltIt}</p>
                    </div>
                    <div>
                      <span className="font-bold uppercase tracking-widest text-sm text-sage block mb-3">Tech Stack</span>
                      <div className="flex flex-wrap gap-3">
                        {proj.techStack.map((tech, i) => (
                          <span key={i} className="px-4 py-1.5 bg-white/10 border border-white/30 rounded-full text-sm font-bold tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md text-white cursor-default md:hover:bg-white/20 md:hover:scale-105 md:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Mobile Only: Details Block */}
            <div className="flex flex-col gap-6 mt-6 md:hidden">
                <div>
                  <span className="font-bold uppercase tracking-widest text-xs text-sage block mb-1">What it does</span>
                  <p className="leading-relaxed font-light text-white/90 text-sm">{proj.whatItDoes}</p>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-widest text-xs text-sage block mb-1">Why I built it</span>
                  <p className="leading-relaxed font-light text-white/90 text-sm">{proj.whyIBuiltIt}</p>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-widest text-xs text-sage block mb-2">Tech Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold tracking-wider text-white/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row w-full gap-4 mt-4 md:mt-4">
                <a href={proj.live || '#'} target={proj.live ? "_blank" : "_self"} rel="noopener noreferrer" className={`flex-1 py-4 md:py-5 border border-white/20 rounded-sm flex items-center justify-center gap-3 uppercase tracking-widest text-xs md:text-sm font-semibold transition-all duration-300 text-white ${proj.live ? 'md:hover:bg-white/10 md:hover:border-white/50' : 'opacity-50 cursor-not-allowed'}`}>
                  <FaExternalLinkAlt className="text-lg md:text-xl" /> Live
                </a>
                <a href={proj.github || '#'} target={proj.github ? "_blank" : "_self"} rel="noopener noreferrer" className={`flex-1 py-4 md:py-5 border border-white/20 rounded-sm flex items-center justify-center gap-3 uppercase tracking-widest text-xs md:text-sm font-semibold transition-all duration-300 text-white ${proj.github ? 'md:hover:bg-white/10 md:hover:border-white/50' : 'opacity-50 cursor-not-allowed'}`}>
                  <FaGithub className="text-xl md:text-2xl" /> Code
                </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DynamicProjects;
