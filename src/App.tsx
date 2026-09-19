import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeMode } from './types';
import { NavbarClean } from './components/NavbarClean';
import { HeroClean } from './components/HeroClean';
import { LocalhostFolders } from './components/LocalhostFolders';
import { VoiceCallingDemo } from './components/VoiceCallingDemo';
import { EngagePlatformDemo } from './components/EngagePlatformDemo';
import { ServicesClean } from './components/ServicesClean';
import { WhyKosalClean } from './components/WhyKosalClean';
import { BriefBuilderClean } from './components/BriefBuilderClean';
import { FooterClean } from './components/FooterClean';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  // Default to light mode for the clean, minimalist Stripe/LocalhostHQ look requested by user
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [preselectedService, setPreselectedService] = useState<string>('');

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

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const scrollToContact = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDemos = () => {
    const elem = document.getElementById('products');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative min-h-screen ${theme === 'dark' ? 'bg-[#090b10] text-slate-100' : 'bg-[#fafbfc] text-slate-900'} font-sans transition-colors duration-300 selection:bg-blue-500 selection:text-white`}>
      {/* Precision Trailing Custom Cursor */}
      <CustomCursor />

      {/* Subtle Grid Backdrop */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-40" />

      {/* Clean Header Navigation */}
      <NavbarClean
        theme={theme}
        setTheme={setTheme}
        onOpenBrief={() => scrollToContact()}
      />

      {/* Main Content Hierarchy */}
      <main className="relative z-10">
        {/* Stripe-style Minimalist Hero with live 3D Data Sphere */}
        <HeroClean
          theme={theme}
          onOpenBrief={() => scrollToContact()}
          onExploreDemos={scrollToDemos}
        />

        {/* LocalhostHQ Signature Physical Folder Stacks: Airix, Aivida, Astronomy, Voice AI, Engage */}
        <LocalhostFolders />

        {/* Real-time AI Voice Calling Platform with Sub-500ms Turn-Taking */}
        <VoiceCallingDemo />

        {/* Engage Platform: Instagram & WhatsApp Cloud Automation */}
        <EngagePlatformDemo />

        {/* Core Engineering Services */}
        <ServicesClean
          onSelectService={(service) => scrollToContact(service)}
        />

        {/* Architectural Pillars & Kosal Standard */}
        <WhyKosalClean />

        {/* High-Conversion Project Builder / Contact */}
        <BriefBuilderClean
          preselectedItem={preselectedService}
        />
      </main>

      {/* Enterprise Footer with LLP and Office Credentials */}
      <FooterClean />
    </div>
  );
};
