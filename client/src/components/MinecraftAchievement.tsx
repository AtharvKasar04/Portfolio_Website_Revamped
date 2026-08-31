import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export interface ToastData {
  id: string;
  title: string;
  description: string;
  iconType: 'command-block' | 'apple';
}

interface MinecraftAchievementProps {
  toasts: ToastData[];
  removeToast: (id: string) => void;
}

const TOAST_DURATION = 15; // seconds

const ToastItem: React.FC<{
  toast: ToastData;
  removeToast: (id: string) => void;
  isActive: boolean;
}> = ({ toast, removeToast, isActive }) => {
  const [hovered, setHovered] = useState(false);
  const remainingRef = useRef(TOAST_DURATION * 1000);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // JS timer that respects pause-on-hover
  useEffect(() => {
    if (!isActive) return;

    if (!hovered) {
      intervalRef.current = setInterval(() => {
        remainingRef.current -= 100;
        if (remainingRef.current <= 0) {
          clearInterval(intervalRef.current!);
          removeToast(toast.id);
        }
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, hovered, toast.id, removeToast]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="pointer-events-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex flex-col bg-[#212121] shadow-2xl"
        style={{
          borderTop: '4px solid #555555',
          borderLeft: '4px solid #555555',
          borderRight: '4px solid #000000',
          borderBottom: '4px solid #000000',
          imageRendering: 'pixelated',
          minWidth: '320px',
        }}
      >
        {/* Content row */}
        <div className="flex items-center gap-5 p-5">
          {/* Pixel Art Icon */}
          {toast.iconType === 'command-block' ? (
            <div
              className="w-14 h-14 shrink-0 bg-[#5c4033] relative"
              style={{
                borderTop: '3px solid #8b5a2b',
                borderLeft: '3px solid #8b5a2b',
                borderRight: '3px solid #3e2723',
                borderBottom: '3px solid #3e2723',
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-[#212121] border-[2px] border-[#111111] flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#39ff14] animate-pulse"></div>
              </div>
              <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-[#ff5555]"></div>
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-[#5555ff]"></div>
            </div>
          ) : (
            <div className="w-14 h-14 shrink-0 flex items-center justify-center text-4xl">
              🍎
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col gap-2" style={{ textShadow: '2px 2px 0 #000' }}>
            <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px', lineHeight: '12px', color: '#ffff55' }}>
              Achievement get!
            </span>
            <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '13px', lineHeight: '16px', color: '#ffffff' }}>
              {toast.title}
            </span>
            <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '9px', lineHeight: '12px', color: 'rgba(255,255,255,0.8)' }}>
              {toast.description}
            </span>
          </div>
        </div>

        {/* Timer Bar — rendered OUTSIDE the icon, at the bottom of the card */}
        <div style={{ width: '100%', height: '6px', background: '#111' }}>
          {isActive && (
            <div
              style={{
                height: '100%',
                background: '#39ff14',
                animationName: 'toast-drain',
                animationDuration: `${TOAST_DURATION}s`,
                animationTimingFunction: 'linear',
                animationFillMode: 'forwards',
                animationPlayState: hovered ? 'paused' : 'running',
                width: '100%',
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MinecraftAchievement: React.FC<MinecraftAchievementProps> = ({ toasts, removeToast }) => {
  const content = (
    <div
      className="fixed top-6 right-6 z-[10000] select-none pointer-events-none flex flex-col gap-4 items-end"
    >
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            removeToast={removeToast}
            isActive={index === 0}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  return createPortal(content, document.body);
};

export default MinecraftAchievement;
