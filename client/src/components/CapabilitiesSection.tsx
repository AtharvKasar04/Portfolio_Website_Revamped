import React from "react";

const capabilities = [
  "Frontend Engineering",
  "Backend & API Development",
  "AI & LLM Integrations",
  "Database Design",
  "UI/UX Implementation",
  "Prompt Engineering",
  "Open Source"
];

const CapabilitiesSection: React.FC = () => {
  return (
    <section id="capabilities" className="w-full bg-[#fafafa] text-navy py-32 px-8 md:px-16 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        
        {/* Columns 1-4: Capabilities List */}
        <div className="md:col-span-4 flex flex-col">
          <span className="text-taupe uppercase tracking-widest text-sm mb-12">Capabilities</span>
          <ul className="flex flex-col gap-6">
            {capabilities.map((cap, idx) => (
              <li key={idx} className="group flex items-center gap-6 cursor-crosshair">
                <span className="h-[1px] bg-navy w-[40px] transition-all duration-300 md:group-hover:w-[64px]"></span>
                <span className="text-navy font-semibold text-lg tracking-wide uppercase">{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Columns 5-12: Large Heading */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-light leading-tight">
            I write code across the <span className="text-taupe italic font-serif">full stack</span>, integrate AI where it actually makes sense, and care enough to get the <span className="text-taupe italic font-serif">UI right</span> too. I pick up what the project needs. be it a secure API, a <span className="text-taupe italic font-serif">polished interface</span>, or a trained model on top of it.
          </h2>
        </div>

      </div>
    </section>
  );
};

export default CapabilitiesSection;
