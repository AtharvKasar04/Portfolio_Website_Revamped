import React from "react";

const experiences = [
  {
    tenure: "Jun 2026 - Present",
    role: "Full Stack Software Engineer Intern",
    company: "Stellanex Pvt. Ltd",
    details: "Working on the Xypher Engine - a robotics dev platform. Handling the web architecture side: auth flows, dashboards, documentation portals, and design partner pages across a decoupled Next.js + Django stack. Also built out the API architecture with JWT/session auth, Zod validation, CSRF protection, and rate limiting."
  },
  {
    tenure: "Sep 2025 - Nov 2025",
    role: "Software Developer Intern",
    company: "FuzenApps Solutions",
    details: "Joined an AI-first startup and worked on reusable, dashboard-based web templates. Also used Ruby on Rails with JavaScript to build and maintain UI components, improve data flow between views and controllers, and ship clean, production-ready code."
  },
  {
    tenure: "May 2025 - Aug 2025",
    role: "Engineering Intern - Frontend",
    company: "SoftDEL Systems",
    details: "Built a reusable React.js UI library - data grids, dashboards, bundled with Rollup.js and documented via Storybook. Led the Angular + TypeScript frontend for a Contract Management Portal, implementing multi-step approvals, RBAC, and Node.js API integration. Worked in an Agile team across sprint planning, SRS writing, and production deliveries."
  },
  {
    tenure: "Sep 2024 - April 2025",
    role: "Freelance Developer",
    company: "Self-Employed",
    details: "Built custom web applications for clients, improving business functions and digital presence with performance optimization and secure payment integrations."
  }
];

const WorkExperience: React.FC = () => {
  return (
    <section id="experience" className="relative w-full bg-navy text-white py-32 px-6 md:px-16 overflow-hidden">
      {/* Aurora Background - seamless translateX loop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="aurora-section-bg"
          style={{
            backgroundImage: [
              'repeating-linear-gradient(100deg, #3b899a 5%, #c4a882 11%, #73a09d 17%, #d7c5b2 23%, #bbe2f5 29%, #9f8d8b 35%, #b7c6c2 41%)',
              'repeating-linear-gradient(100deg, #171e19 0%, #171e19 6%, transparent 9%, transparent 13%, #171e19 17%)'
            ].join(', '),
          }}
        ></div>
        {/* Slanted dark left-edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, #171e19 0%, #171e19 8%, rgba(23,30,25,0.6) 22%, transparent 45%)'
          }}
        ></div>
      </div>

      <div className="flex flex-col items-center mb-20 relative z-10">
        <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tighter text-center">Experience</h2>
      </div>

      <div className="relative w-full max-w-6xl mx-auto z-10 flex flex-col gap-6 md:gap-8">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="relative p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-2xl transition-all duration-500 md:hover:bg-white/[0.04] md:hover:border-white/20 group"
          >
            {/* Subtle Noise Texture on card */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay rounded-2xl pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-center w-full">
              {/* Left Side: Tenure & Company */}
              <div className="w-full md:w-2/5 flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-10">
                <span className="text-sage uppercase text-xs tracking-[0.2em] font-semibold mb-3 block">{exp.tenure}</span>
                <h3 className="font-display text-4xl md:text-5xl uppercase leading-none text-white md:group-hover:text-cyan transition-colors duration-300">{exp.company}</h3>
              </div>

              {/* Right Side: Role & Details */}
              <div className="w-full md:w-3/5 flex flex-col">
                <h4 className="text-taupe uppercase tracking-widest text-lg font-medium mb-4">{exp.role}</h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                  {exp.details}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
