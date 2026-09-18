import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer-fine devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Precision Dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-[#0A6CDB] transition-transform duration-75 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: isHovered ? 'scale(2.5)' : 'scale(1)',
        }}
      />

      {/* Trailing Fluid Ring */}
      <div
        className={`fixed pointer-events-none z-[9998] rounded-full border transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'w-12 h-12 border-[#9047FF] bg-[#9047FF]/10 scale-125'
            : 'w-8 h-8 border-[#0A6CDB]/50 scale-100'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </>
  );
};
