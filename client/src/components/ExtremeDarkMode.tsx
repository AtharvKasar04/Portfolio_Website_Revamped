import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, animate } from 'framer-motion';

// SVG coordinate constants - everything is in SVG space
const ANCHOR_X = 20;     // horizontal center in SVG
const ANCHOR_Y = 0;      // string emerges from the very top edge
const REST_Y = 130;      // ball rest position Y in SVG (natural rope length = REST_Y - ANCHOR_Y)
const NATURAL_LEN = REST_Y - ANCHOR_Y; // = 122px

function buildPath(ballX: number, ballY: number): string {
  // Start at anchor
  const sx = ANCHOR_X, sy = ANCHOR_Y;
  // End at ball center
  const ex = ballX, ey = ballY;

  // Distance between anchor and ball
  const dx = ex - sx, dy = ey - sy;
  const currentLen = Math.sqrt(dx * dx + dy * dy);

  // Slack = how much shorter the current distance is vs natural length
  // When ball bounces above rest point, slack increases -> rope sags
  const slack = Math.max(0, NATURAL_LEN - currentLen);

  // Control point: midpoint + droop down + bow out (when horizontal offset exists)
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;

  // Sag control point - always droops down by slack amount, bows sideways when horizontal
  const bowX = mx + (dx < 0 ? -1 : 1) * slack * 0.5;
  const bowY = my + slack * 1.2;

  return `M ${sx} ${sy} Q ${bowX} ${bowY} ${ex} ${ey}`;
}

const LampSwitch: React.FC<{ onTrigger: (coords: { x: number, y: number }) => void, isActive: boolean }> = ({ onTrigger, isActive }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null); // invisible drag target

  // Ball position in SVG coordinates - starts at anchor (top), drops to REST_Y
  const ballX = useMotionValue(ANCHOR_X);
  const ballY = useMotionValue(-REST_Y); // Start fully above the viewport

  // Update SVG elements directly on every frame - no React re-renders
  useEffect(() => {
    const update = () => {
      const bx = ballX.get(), by = ballY.get();
      pathRef.current?.setAttribute('d', buildPath(bx, by));
      circleRef.current?.setAttribute('cx', String(bx));
      circleRef.current?.setAttribute('cy', String(by));
    };
    const u1 = ballX.on('change', update);
    const u2 = ballY.on('change', update);
    update();
    return () => { u1(); u2(); };
  }, [ballX, ballY]);

  // On mount: drop the ball from above with a bouncy spring
  useEffect(() => {
    const delay = setTimeout(() => {
      animate(ballY, REST_Y, { type: 'spring', stiffness: 60, damping: 7 });
    }, 300);
    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drag handling: track pointer delta relative to rest position
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 0) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - dragStartY.current;
    ballX.set(ANCHOR_X + dx);
    ballY.set(REST_Y + dy);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dy = ballY.get() - REST_Y;

    // Trigger if pulled down enough
    if (dy > 40 && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const absX = rect.left + ballX.get();
      const absY = rect.top + ballY.get();
      onTrigger({ x: absX, y: absY });
    }

    // Spring back with low stiffness + low damping = slow natural oscillation like a rope
    animate(ballX, ANCHOR_X, { type: 'spring', stiffness: 35, damping: 4, mass: 1.5 });
    animate(ballY, REST_Y, { type: 'spring', stiffness: 35, damping: 4, mass: 1.5 });
  };

  return (
    <div
      style={{ width: '42px', height: '170px', position: 'fixed', top: 0 }}
      className="right-6 md:right-32 z-[10005] group"
    >
      <svg
        ref={svgRef}
        width="42"
        height="170"
        className="absolute top-0 left-0 overflow-visible pointer-events-none"
      >
        {/* Rope - top is anchored to ANCHOR_Y=0, ball drops from above */}
        <path
          ref={pathRef}
          d={buildPath(ANCHOR_X, -REST_Y)}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Ball */}
        <circle
          ref={circleRef}
          cx={ANCHOR_X}
          cy={-REST_Y}
          r="6"
          fill={isActive ? '#ef4444' : '#facc15'}
          style={{ filter: isActive ? 'drop-shadow(0 0 6px #ef4444)' : 'drop-shadow(0 0 6px #facc15)' }}
        />
      </svg>
      {/* Invisible drag target overlay positioned at ball's rest location */}
      <div
        style={{
          position: 'absolute',
          top: `${REST_Y - 14}px`,
          left: `${ANCHOR_X - 14}px`,
          width: '28px',
          height: '28px',
          cursor: 'grab',
          borderRadius: '50%',
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {/* Quirky tooltip label */}
      <div
        style={{
          position: 'absolute',
          top: `${REST_Y - 8}px`,
          right: '32px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">← pull me. i dare you.</p>
      </div>
    </div>
  );
};

const ConfirmModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-navy border border-white/20 p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
        <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wider mb-4 text-white">System Override</h3>
        <p className="text-white/80 mb-8 font-mono text-sm leading-relaxed">
          Looks like someone didn't pay the electricity bill... Are you sure you want to enter the abyss? You'll definitely need a flashlight.
        </p>
        <div className="flex justify-end gap-4">
          <button 
            onClick={onCancel} 
            className="px-5 py-2 border border-white/20 text-white/70 hover:text-white hover:bg-white/5 uppercase tracking-widest text-xs font-bold transition-all"
          >
            Abort
          </button>
          <button 
            onClick={onConfirm} 
            className="px-5 py-2 bg-white text-navy uppercase tracking-widest text-xs font-bold hover:bg-yellow-400 transition-colors"
          >
            Go Dark
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const DarknessOverlay: React.FC<{ origin: { x: number, y: number } }> = ({ origin }) => {
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [phase, setPhase] = useState<'expanding' | 'dark' | 'flashlight'>('expanding');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // 1. Expand darkness (0 to 1.5s)
    // 2. Wait in pure darkness (1.5s to 2.5s)
    // 3. Flashlight flickers on (2.5s onwards)
    const t1 = setTimeout(() => setPhase('dark'), 1500);
    const t2 = setTimeout(() => setPhase('flashlight'), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
      {phase === 'expanding' && (
        <>
          <motion.div
            initial={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
            animate={{ clipPath: `circle(3000px at ${origin.x}px ${origin.y}px)` }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#050505]"
          />
          {/* Text appears as darkness spreads */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute bottom-[28%] left-0 right-0 flex flex-col items-center gap-1 select-none"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/60">[ initializing flashlight... ]</p>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-white/40">Stand by</p>
          </motion.div>
        </>
      )}
      {phase === 'dark' && (
        <>
          <div className="absolute inset-0 bg-[#050505]" />
          {/* Text visible during the dark pause, will exit when phase changes */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-[28%] left-0 right-0 flex flex-col items-center gap-1 select-none"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/60">[ initializing flashlight... ]</p>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-white/40">Stand by</p>
          </motion.div>
        </>
      )}
      {phase === 'flashlight' && (
        <>
          {/* Masked Layer: Transparent circle around mouse, black everywhere else */}
          <div 
            className="absolute inset-0 bg-[#050505]"
            style={{
              maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
              WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`
            }}
          />
          {/* Flickering Cover: Flickers from opacity 1 (black) to 0 (transparent) */}
          <div className="absolute inset-0 bg-[#050505] animate-flashlight-start" />
        </>
      )}
    </div>,
    document.body
  );
};

const ExtremeDarkMode: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [originCoords, setOriginCoords] = useState({ x: 0, y: 0 });

  const handleLampPull = (coords: { x: number, y: number }) => {
    if (isActive) {
      // If already active, pulling it turns it off instantly
      setIsActive(false);
      document.body.style.overflow = '';
      return;
    }

    if (!isModalOpen) {
      setOriginCoords(coords);
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setIsActive(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    // Hidden on mobile — your thumbs aren't ready for this
    <div className="hidden md:block">
      <LampSwitch onTrigger={handleLampPull} isActive={isActive} />
      {isModalOpen && createPortal(<ConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />, document.body)}
      {isActive && <DarknessOverlay origin={originCoords} />}
    </div>
  );
};

export default ExtremeDarkMode;
