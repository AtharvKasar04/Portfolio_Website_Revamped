import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import MinecraftAchievement, { ToastData } from "./MinecraftAchievement";

type LogType = 'system' | 'command' | 'response' | 'danger' | 'tip';

interface TerminalLine {
  id: string;
  type: LogType;
  text: string;
  typing?: boolean; 
}

const commands = [
  { cmd: "cat /skills/stack.json", question: "What's your tech stack?", response: "Next.js, Django, React, Angular, Node.js, Ruby on Rails, and tinkering with AI & LLM integrations." },
  { cmd: "./run-internships.sh", question: "Where have you worked?", response: "Built the Xypher Engine at Stellanex, AI templates at FuzenApps, and UI libraries at SoftDEL Systems." },
  { cmd: "whoami --approach", question: "How do you build products?", response: "I write code across the full stack, integrate AI where it actually makes sense, and care enough to get the UI right." },
  { cmd: "npm show @atharvkasar/projects", question: "What have you shipped recently?", response: "Open-source NPM packages, custom web apps for freelance clients, and scalable API architectures." },
  { cmd: "sudo ./disable-gravity.sh", question: "Feeling adventurous?", response: "WARNING: Disabling gravity may cause unexpected physics. Continue? [y/N]", isDanger: true },
];

const TerminalInteractive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });


  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Toast State
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  const addToast = (title: string, description: string, iconType: 'command-block' | 'apple') => {
    setToasts(prev => [...prev, { id: Math.random().toString(), title, description, iconType }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Danger Command State
  const [isAwaitingConfirm, setIsAwaitingConfirm] = useState(false);
  
  // Initialization State
  const [isInitializing, setIsInitializing] = useState(true);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Initialization sequence
  useEffect(() => {
    if (isInView && history.length === 0) {
      const initSystem = async () => {
         setIsInitializing(true);
         await new Promise(r => setTimeout(r, 1000));
         setHistory(prev => [...prev, { id: Math.random().toString(), type: 'system', text: `Last login: ${new Date().toDateString()} on ttys001` }]);
         await new Promise(r => setTimeout(r, 400));
         setHistory(prev => [...prev, { id: Math.random().toString(), type: 'system', text: 'Downloading more RAM... 100% complete.' }]);
         await new Promise(r => setTimeout(r, 400));
         setHistory(prev => [...prev, { id: Math.random().toString(), type: 'system', text: 'Contacting extraterrestrials... Left on read.' }]);
         await new Promise(r => setTimeout(r, 200));
         setHistory(prev => [...prev, { id: Math.random().toString(), type: 'tip', text: '💡 TIP: Select a command below to execute...' }]);
         setIsInitializing(false);
      };
      initSystem();
    }
  }, [isInView, history.length]);

  // Reusable function for gravity confirm (used by keyboard and mobile buttons)
  const handleGravityConfirm = async (key: string) => {
    if (!isAwaitingConfirm) return;
    
    setIsAwaitingConfirm(false);
    setIsTyping(true);

    if (key === 'y') {
      setHistory(prev => [...prev, { id: Math.random().toString(), type: 'command', text: 'y' }]);
      await new Promise(r => setTimeout(r, 400));
      setHistory(prev => [...prev, { id: Math.random().toString(), type: 'system', text: 'Initializing anti-gravity thrusters...' }]);
      await new Promise(r => setTimeout(r, 800));
      setHistory(prev => [...prev, { id: Math.random().toString(), type: 'danger', text: 'Gravity suspended.' }]);
      
      document.body.classList.add('zero-gravity');
      
      // Show gravity achievement
      setTimeout(() => {
        addToast("Isaac Newton is Crying", "What goes up... comes down in 15s!", "apple");
      }, 1000);
      
      // Restore gravity after 15 seconds
      setTimeout(() => {
        document.body.classList.remove('zero-gravity');
        setHistory(prev => [...prev, { id: Math.random().toString(), type: 'system', text: 'Gravity restored to normal levels.' }]);
      }, 16000); // 1s delay + 15s effect
    } else {
      setHistory(prev => [...prev, { id: Math.random().toString(), type: 'command', text: key === 'n' ? 'n' : key }]);
      await new Promise(r => setTimeout(r, 300));
      setHistory(prev => [...prev, { id: Math.random().toString(), type: 'system', text: 'Operation aborted.' }]);
    }
    setIsTyping(false);
  };

  // Keyboard Listener for Gravity Confirm
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      handleGravityConfirm(key);
    };

    if (isAwaitingConfirm) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isAwaitingConfirm]);

  const handleCommandClick = async (cmdObj: typeof commands[0]) => {
    if (isTyping || isAwaitingConfirm) return;
    setIsTyping(true);
    
    if (!hasInteracted) {
       setHasInteracted(true);
       addToast("Terminal Hacker", "Executed your first shell command.", "command-block");
    }

    const cmdId = Math.random().toString();
    const respId = Math.random().toString();

    // 1. Show command typing
    setHistory(prev => [...prev, { id: cmdId, type: 'command', text: '', typing: true }]);
    
    for (let i = 1; i <= cmdObj.cmd.length; i++) {
      setHistory(prev => prev.map(line => line.id === cmdId ? { ...line, text: cmdObj.cmd.slice(0, i) } : line));
      await new Promise(r => setTimeout(r, Math.random() * 30 + 20)); // Typing speed
    }

    // Wait a sec before response
    await new Promise(r => setTimeout(r, 300));
    setHistory(prev => prev.map(line => line.id === cmdId ? { ...line, typing: false } : line));
    
    // 2. Show response
    setHistory(prev => [...prev, { id: respId, type: cmdObj.isDanger ? 'danger' : 'response', text: '', typing: true }]);
    for (let i = 1; i <= cmdObj.response.length; i++) {
      setHistory(prev => prev.map(line => line.id === respId ? { ...line, text: cmdObj.response.slice(0, i) } : line));
      await new Promise(r => setTimeout(r, Math.random() * 10 + 10)); // Fast response print
    }
    
    setHistory(prev => prev.map(line => line.id === respId ? { ...line, typing: false } : line));
    
    if (cmdObj.isDanger) {
      setIsAwaitingConfirm(true);
      setIsTyping(false);
    } else {
      setIsTyping(false);
    }
  };

  return (
    <>
      <MinecraftAchievement 
        toasts={toasts}
        removeToast={removeToast}
      />
      <div className="w-full flex flex-col text-sm" style={{ fontFamily: '"Fira Code", monospace' }} ref={containerRef}>
        {/* Title */}
        <div className="flex flex-col items-start mb-6 pl-3 border-l-2 border-sage/60">
          <h3 data-text="KNOW MORE ABOUT ME" className="relative font-display text-2xl md:text-3xl uppercase tracking-widest text-terminal-scanlines terminal-glitch">KNOW MORE ABOUT ME</h3>
          <p className="text-sage text-sm tracking-wider italic font-serif">...in a nerdy way</p>
        </div>

        {/* Mac Terminal UI */}
        <div className="w-full rounded-xl overflow-hidden bg-[#1c1c1c] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
          
          {/* Mobile Confirm Overlay */}
          {isAwaitingConfirm && (
            <div className="md:hidden absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
               <div className="bg-[#ff5555] p-1 w-full max-w-[250px]">
                   <div className="bg-[#1c1c1c] p-4 border-2 border-[#ff5555] flex flex-col items-center text-center gap-4">
                       <span className="text-[#ff5555] font-display uppercase tracking-widest text-lg leading-none">Confirm Action</span>
                       <span className="text-white/80 text-[10px] font-mono leading-relaxed">WARNING: Disabling gravity may cause unexpected physics.</span>
                       <div className="flex gap-4 w-full mt-2">
                           <button onClick={() => handleGravityConfirm('y')} className="flex-1 py-2 bg-[#ff5555]/20 text-[#ff5555] border border-[#ff5555] font-bold font-mono text-sm uppercase active:bg-[#ff5555] active:text-black transition-colors">Yes</button>
                           <button onClick={() => handleGravityConfirm('n')} className="flex-1 py-2 bg-white/5 text-white/50 border border-white/20 font-bold font-mono text-sm uppercase active:bg-white active:text-black transition-colors">No</button>
                       </div>
                   </div>
               </div>
            </div>
          )}

          {/* Title bar */}
          <div className="bg-[#2d2d2d] w-full h-8 flex items-center px-4 gap-2 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            <div className="flex-1 text-center text-[11px] text-white/50 tracking-widest font-sans font-medium">atharv@macbook-pro:~</div>
          </div>

          {/* Terminal Body */}
          <div data-lenis-prevent ref={scrollRef} className="p-5 h-64 md:h-72 overflow-y-auto flex flex-col gap-2 text-left scroll-smooth overscroll-contain terminal-scrollbar">
            {history.map((line) => (
               <div key={line.id} className={`leading-relaxed ${line.type === 'command' ? 'text-[#39ff14]' : line.type === 'danger' ? 'text-[#ff5555] font-semibold' : line.type === 'response' ? 'text-white/90' : line.type === 'tip' ? 'text-[#ffbd2e] font-semibold bg-[#ffbd2e]/10 px-2 py-1 rounded border border-[#ffbd2e]/20 inline-block mt-1' : 'text-gray-400'}`}>
                  {line.type === 'command' && <span className="text-white mr-2">➜</span>}
                  {line.type === 'command' && <span className="text-[#00e5ff] mr-2">~</span>}
                  {line.text}
                  {line.typing && <span className="animate-pulse bg-gray-400 w-2 h-4 inline-block ml-1 align-middle"></span>}
               </div>
            ))}

            {!isTyping && history.length > 0 && !isAwaitingConfirm && (
               <div className="text-[#39ff14] flex items-center mt-1">
                  <span className="text-white mr-2">➜</span>
                  <span className="text-[#00e5ff] mr-2">~</span>
                  <span className="animate-pulse bg-gray-400 w-2 h-4 inline-block align-middle"></span>
               </div>
            )}
            
            {isAwaitingConfirm && (
               <div className="text-[#ff5555] flex items-center mt-1 font-semibold">
                  <span className="mr-2">_</span>
                  <span className="animate-pulse bg-[#ff5555] w-2 h-4 inline-block align-middle"></span>
               </div>
            )}
          </div>
        </div>

        {/* Available Commands Panel */}
        <div className="w-full mt-4 bg-white/[0.02] border border-white/10 rounded-xl p-3 backdrop-blur-md">
           <h4 className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2 font-sans font-semibold">Available Commands</h4>
           <div className="flex flex-col gap-1.5">
             {commands.map((cmd, idx) => (
               <button 
                 key={idx} 
                 onClick={() => handleCommandClick(cmd)}
                 disabled={isTyping || isAwaitingConfirm || isInitializing}
                 className={`text-left text-[11px] bg-black/40 border border-white/5 rounded-lg px-3 py-2 md:hover:bg-sage/10 md:hover:border-sage/30 transition-all duration-300 flex justify-between items-center group ${isTyping || isAwaitingConfirm || isInitializing ? 'opacity-50 cursor-not-allowed' : ''} ${cmd.isDanger ? 'border-[#ff5555]/30 md:hover:border-[#ff5555]/80 md:hover:bg-[#ff5555]/10' : ''}`}
               >
                 <span className={`${cmd.isDanger ? 'text-[#ff5555]' : 'text-[#39ff14]'} font-semibold tracking-wider`}>{cmd.cmd}</span>
                 <span className={`${cmd.isDanger ? 'text-[#ff5555]/60 md:group-hover:text-[#ff5555]' : 'text-white/40 md:group-hover:text-white/80'} hidden md:block transition-colors font-sans italic`}>{cmd.question}</span>
               </button>
             ))}
           </div>
        </div>
      </div>
    </>
  );
};

export default TerminalInteractive;
