import React from 'react';

const skills = [
  "PYTHON", "TYPESCRIPT", "REACT.JS", "NEXT.JS", "NODE.JS", "DJANGO", 
  "POSTGRESQL", "SQL", "LLMs", "RAG", "GENERATIVE AI", "PROMPT ENGINEERING",
  "TAILWIND CSS", "DOCKER", "GIT", "REST APIs"
];

// We double the array so the marquee can loop seamlessly
const marqueeItems = [...skills, ...skills];

const SkillsMarquee: React.FC = () => {
  return (
    <section className="w-full bg-[#0a0f12] py-8 md:py-12 border-y border-white/10 overflow-hidden relative flex items-center">
      {/* Keyframes for seamless looping */}
      <style>
        {`
          @keyframes brutal-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-brutal-marquee {
            display: flex;
            width: max-content;
            animation: brutal-marquee 40s linear infinite;
          }
        `}
      </style>

      {/* Absolute Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '150px 150px',
        }}
      />
      
      {/* Marquee Container */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="animate-brutal-marquee items-center">
          {marqueeItems.map((skill, index) => (
            <React.Fragment key={index}>
              <span 
                className="font-mono text-4xl md:text-6xl text-transparent font-black tracking-widest uppercase mx-6" 
                style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)' }}
              >
                {skill}
              </span>
              <span className="text-sage text-2xl md:text-3xl mx-2">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;
