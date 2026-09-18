import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { PerformanceMode, ThemeMode } from './types';
import { KosalCanvas } from './canvas/KosalCanvas';
import { Navbar } from './components/Navbar';
import { HeroStorytelling } from './components/HeroStorytelling';
import { ServicesSection } from './components/ServicesSection';
import { WhyKosalSection } from './components/WhyKosalSection';
import { AboutSection } from './components/AboutSection';
import { BriefBuilderSection } from './components/BriefBuilderSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { MobileNav } from './components/MobileNav';

export const App: React.FC = () => {
  const [perfMode, setPerfMode] = useState<PerformanceMode>('high');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [preselectedService, setPreselectedService] = useState('');

  // Handle Dark / Light mode class on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Lenis Smooth Inertia Scroll (Emotion Agency signature buttery feel)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const animId = requestAnimationFrame(raf);

    // Track scroll progress across entire document height
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track normalized mouse coordinates for 3D physics (-1 to 1)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth scroll helper to section
  const scrollToContact = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const elem = document.getElementById('services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative min-h-screen ${theme === 'dark' ? 'bg-[#08080a] text-[#ededed]' : 'bg-[#f6f7fb] text-[#110C22]'} transition-colors duration-500 overflow-x-hidden`}>
      {/* Precision Trailing Custom Cursor */}
      <CustomCursor />

      {/* Cyber Grid & Ambient Grain Backdrop */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-[1] opacity-60" />
      <div className="fixed inset-0 bg-noise pointer-events-none z-[2]" />

      {/* 3D WebGL Canvas Layer */}
      <KosalCanvas
        scrollProgress={scrollProgress}
        mousePos={mousePos}
        perfMode={perfMode}
        theme={theme}
      />

      {/* Primary Top Navigation */}
      <Navbar
        perfMode={perfMode}
        setPerfMode={setPerfMode}
        theme={theme}
        setTheme={setTheme}
        onOpenBrief={() => scrollToContact()}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Scroll Storytelling Hero */}
        <HeroStorytelling
          scrollProgress={scrollProgress}
          onExploreServices={scrollToServices}
          onOpenBrief={() => scrollToContact()}
        />

        {/* 6 Interactive 3D Service Cards */}
        <ServicesSection
          onSelectService={(service) => scrollToContact(service)}
        />

        {/* 4 Pillars & Architectural Benchmarks */}
        <WhyKosalSection />

        {/* About Kosal Story & Metrics */}
        <AboutSection />

        {/* Interactive Brief Builder & Contact Hub */}
        <BriefBuilderSection
          preselectedService={preselectedService}
        />
      </main>

      {/* Agency Footer */}
      <Footer />

      {/* Mobile Action Dock */}
      <MobileNav
        perfMode={perfMode}
        setPerfMode={setPerfMode}
        theme={theme}
        setTheme={setTheme}
        onOpenBrief={() => scrollToContact()}
      />
    </div>
  );
};
