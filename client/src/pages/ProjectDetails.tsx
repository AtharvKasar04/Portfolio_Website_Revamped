import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { projects, ProjectData } from "../constants/projectsData";
import Navbar from "../components/Navbar";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../assets/styles/App.css";

// A brutalist CSS-based architecture diagram specific to FedLens
const AutoImageCarousel: React.FC<{ images: string[], alt: string }> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return <img src={images[0]} alt={alt} className="w-full h-full object-cover" />;
  }

  return (
    <div className="relative w-full h-full bg-[#0a0f12]">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} view ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentIndex ? 'w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-3 bg-white/30 hover:bg-white/50'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const FedLensDiagram: React.FC = () => {
  return (
    <div className="w-full bg-[#0a0f12] border border-white/10 p-6 md:p-12 relative overflow-hidden my-16">
      {/* Background static noise */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '150px 150px',
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto font-mono text-sm uppercase tracking-widest text-white/80">
        
        <h4 className="text-center font-display text-3xl text-white tracking-tighter mb-12">Architecture & Data Pipeline</h4>
        
        {/* Layer 1: Data Sources */}
        <div className="w-full relative flex flex-col items-center">
          <span className="text-[10px] text-sage tracking-[0.3em] mb-6">1. Data Sources</span>
          <div className="flex w-full justify-center gap-16 md:gap-40">
            <div className="border border-white/20 bg-white/5 px-6 py-4 flex flex-col items-center shadow-[0_0_15px_rgba(255,255,255,0.02)] w-40 text-center z-10">
              <span className="text-white font-bold mb-1">FOMC</span>
              <span className="text-[9px] text-white/40 leading-tight">Press Releases</span>
            </div>
            <div className="border border-white/20 bg-white/5 px-6 py-4 flex flex-col items-center shadow-[0_0_15px_rgba(255,255,255,0.02)] w-40 text-center z-10">
              <span className="text-white font-bold mb-1">FRED API</span>
              <span className="text-[9px] text-white/40 leading-tight">Macro Data</span>
            </div>
          </div>
          
          {/* Connector Lines (Y-shape) */}
          <div className="relative w-full h-12 flex justify-center -mt-1 z-0">
            {/* Left drop */}
            <div className="absolute left-[calc(50%-4.5rem)] md:left-[calc(50%-7.5rem)] top-0 w-px h-6 bg-white/20"></div>
            {/* Right drop */}
            <div className="absolute right-[calc(50%-4.5rem)] md:right-[calc(50%-7.5rem)] top-0 w-px h-6 bg-white/20"></div>
            {/* Horizontal bridge */}
            <div className="absolute top-6 w-[9rem] md:w-[15rem] h-px bg-white/20"></div>
            {/* Center drop with arrow */}
            <div className="absolute top-6 left-1/2 w-px h-6 bg-white/20"></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 border-b border-r border-white/20 rotate-45 -translate-x-[4.5px]"></div>
          </div>
        </div>

        {/* Layer 2: Intelligence Engine */}
        <div className="w-full relative flex flex-col items-center mt-6">
          <span className="text-[10px] text-amber-500 tracking-[0.3em] mb-4">2. AI Intelligence Engine</span>
          <div className="border border-amber-500/30 bg-amber-500/5 px-8 py-5 flex flex-col items-center w-full max-w-md text-center">
            <span className="text-amber-500 font-bold mb-2 text-base">Structured LLM Extraction</span>
            <span className="text-[10px] text-white/60 leading-relaxed">OpenAI + Instructor library<br/>Forces strictly typed JSON schema for 6 grading dimensions</span>
          </div>
          
          {/* Down Arrow */}
          <div className="flex flex-col items-center h-10 justify-center">
            <div className="w-px h-full bg-white/20"></div>
            <div className="w-2 h-2 border-b border-r border-white/20 rotate-45 -mt-1 -translate-y-1"></div>
          </div>

          <div className="border border-indigo-500/30 bg-indigo-500/5 px-8 py-5 flex flex-col items-center w-full max-w-md text-center">
            <span className="text-indigo-400 font-bold mb-2 text-base">Semantic Diffing & Analysis</span>
            <span className="text-[10px] text-white/60 leading-relaxed">Python difflib SequenceMatcher<br/>Computes divergence between rhetoric and reality</span>
          </div>
          
          {/* Down Arrow */}
          <div className="flex flex-col items-center h-10 justify-center">
            <div className="w-px h-full bg-white/20"></div>
            <div className="w-2 h-2 border-b border-r border-white/20 rotate-45 -mt-1 -translate-y-1"></div>
          </div>
        </div>

        {/* Layer 3: Storage */}
        <div className="w-full relative flex flex-col items-center mt-2">
          <span className="text-[10px] text-blue-400 tracking-[0.3em] mb-4">3. Database Layer</span>
          <div className="border border-blue-500/30 bg-blue-500/5 px-8 py-5 flex flex-col items-center w-full max-w-md text-center">
            <span className="text-blue-400 font-bold mb-2 text-base">PostgreSQL + pgvector</span>
            <span className="text-[10px] text-white/60 leading-relaxed">Stores raw text, AI grades, and vector embeddings<br/>Powers the hallucination-free RAG engine</span>
          </div>

          {/* Down Arrow */}
          <div className="flex flex-col items-center h-10 justify-center">
            <div className="w-px h-full bg-white/20"></div>
            <div className="w-2 h-2 border-b border-r border-white/20 rotate-45 -mt-1 -translate-y-1"></div>
          </div>
        </div>

        {/* Layer 4: Serving */}
        <div className="w-full relative flex flex-col items-center mt-2">
          <span className="text-[10px] text-emerald-400 tracking-[0.3em] mb-4">4. Serving Layer</span>
          <div className="flex w-full justify-center items-center gap-6 md:gap-12 flex-col md:flex-row">
            <div className="border border-emerald-500/30 bg-emerald-500/5 px-6 py-5 flex flex-col items-center w-56 text-center">
              <span className="text-emerald-400 font-bold mb-1 text-sm">FastAPI Backend</span>
              <span className="text-[9px] text-white/60 leading-tight">API Routes & RAG QA</span>
            </div>
            
            {/* Bidirectional Horizontal Arrow */}
            <div className="hidden md:flex items-center w-12 relative">
              <div className="w-2 h-2 border-l border-t border-white/20 -rotate-45 absolute left-0"></div>
              <div className="w-full h-px bg-white/20"></div>
              <div className="w-2 h-2 border-r border-t border-white/20 rotate-45 absolute right-0"></div>
            </div>
            {/* Mobile Vertical Arrow */}
            <div className="flex md:hidden flex-col items-center h-6 justify-center">
              <div className="w-px h-full bg-white/20"></div>
              <div className="w-2 h-2 border-b border-r border-white/20 rotate-45 -mt-1 -translate-y-1"></div>
            </div>

            <div className="border border-white/30 bg-white/10 px-6 py-5 flex flex-col items-center w-56 text-center">
              <span className="text-white font-bold mb-1 text-sm">Next.js Dashboard</span>
              <span className="text-[9px] text-white/60 leading-tight">Interactive UI & Visualization</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Always start at top when entering a new project page
    const foundProject = projects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id]);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/#works');
  };

  if (!project) return null; // Or a sleek 404

  return (
    <ReactLenis root options={{ lerp: 0.09, duration: 1.4, smoothWheel: true }}>
      <div className="relative w-full bg-navy text-white min-h-screen overflow-x-clip animated-noise-gradient">
        <Navbar minimal={true} />
        
        <main className="pt-32 pb-24 px-8 md:px-16 max-w-[1500px] mx-auto min-h-screen">
          
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="flex items-center gap-3 text-white/50 hover:text-white uppercase tracking-widest text-xs font-mono transition-colors duration-300 mb-12 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" /> Back to Works
          </button>

          {/* Header */}
          <div className="flex flex-col gap-6 mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-5xl md:text-8xl uppercase tracking-tighter"
            >
              {project.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-sage uppercase text-sm md:text-lg tracking-[0.2em] font-semibold"
            >
              {project.type}
            </motion.p>
          </div>

          {/* Large Image Showcase */}
          {(project.images?.length || project.image) && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="w-full mb-24 rounded-sm overflow-hidden border border-white/10 shadow-2xl shadow-black/50 relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px]"
            >
              <AutoImageCarousel 
                images={project.images || (project.image ? [project.image] : [])} 
                alt={project.name} 
              />
            </motion.div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-16 xl:gap-24">
            
            {/* Left Column: Details */}
            <div className="xl:col-span-1 flex flex-col gap-12">
              
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
                className="flex flex-col gap-3"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-sage/10 border border-sage/30 rounded-sm text-xs font-extrabold tracking-widest text-sage shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col gap-4"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-3">Links</h3>
                <div className="flex flex-col gap-4 pt-2">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white text-navy font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-taupe hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      <FaExternalLinkAlt /> Live Deployment
                    </a>
                  )}
                  {project.github && (
                    <div className="relative group w-full">
                      <div className="absolute inset-0 bg-[#8250df]/20 blur-md rounded-sm group-hover:bg-[#8250df]/40 transition-colors duration-500"></div>
                      <a href={project.github} target="_blank" rel="noreferrer" className="relative flex items-center justify-center gap-3 w-full py-4 border border-[#8250df]/50 bg-[#0a0f12] text-[#a371f7] font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-[#8250df] hover:text-white transition-all duration-300">
                        <FaGithub className="text-lg" /> Source Code
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>

            </div>

            {/* Right Column: Write-up & Diagrams */}
            <div className="xl:col-span-3 flex flex-col">
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="pb-12 mb-12 border-b border-white/10">
                <h2 className="font-display text-4xl uppercase tracking-tighter mb-6">Description</h2>
                <p className="text-xl text-white/80 leading-relaxed font-light">{project.description}</p>
              </motion.div>
              
              {project.approach && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }} className="pb-12 mb-12 border-b border-white/10">
                  <h2 className="font-display text-4xl uppercase tracking-tighter mb-6">Approach</h2>
                  <p className="text-xl text-white/80 leading-relaxed font-light whitespace-pre-wrap">{project.approach}</p>
                </motion.div>
              )}

              {project.howItWorks && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="pb-12 mb-12 border-b border-white/10">
                  <h2 className="font-display text-4xl uppercase tracking-tighter mb-6">How it works</h2>
                  <p className="text-xl text-white/80 leading-relaxed font-light whitespace-pre-wrap leading-[2.5]">{project.howItWorks}</p>
                </motion.div>
              )}

              {/* Render specific diagrams based on project ID */}
              {project.id === "fedlens" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
                  <FedLensDiagram />
                </motion.div>
              )}

            </div>
          </div>
          
        </main>
      </div>
    </ReactLenis>
  );
};

export default ProjectDetails;
