import React, { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DynamicProjects from "./components/DynamicProjects";
import WorkExperience from "./components/WorkExperience";
import CapabilitiesSection from "./components/CapabilitiesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import "./assets/styles/App.css";

const App: React.FC = () => {
  useEffect(() => {
    // Simple intersection observer for scroll reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-[10px]');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.09, duration: 1.4, smoothWheel: true }}>
      <div className="relative w-full bg-navy text-white min-h-screen overflow-x-clip">
        <Navbar />
        <main>
          <div className="reveal-on-scroll opacity-0 translate-y-[10px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <HeroSection />
          </div>
          <div className="reveal-on-scroll opacity-0 translate-y-[10px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <DynamicProjects />
          </div>
          <WorkExperience />
          <div className="reveal-on-scroll opacity-0 translate-y-[10px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <CapabilitiesSection />
          </div>
          <div className="reveal-on-scroll opacity-0 translate-y-[10px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <ContactSection />
          </div>
        </main>
        <div className="reveal-on-scroll opacity-0 translate-y-[10px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <Footer />
        </div>
      </div>
    </ReactLenis>
  );
};

export default App;
