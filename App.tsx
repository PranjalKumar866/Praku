/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Upload as UploadIcon, Youtube, Instagram, Twitter, ChevronRight } from 'lucide-react';
import { BackgroundScene } from './components/Visuals';
import { Hero, Services, Skills, Experience, Contact } from './components/Sections';
import { ProjectSystem } from './components/ProjectSystem';
import { ThemeMode } from './types';

const App: React.FC = () => {
  // Force cinematic theme
  const [theme] = useState<ThemeMode>('cinematic');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isAdmin] = useState(true);

  // Smooth Scroll & Header Logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        document.body.classList.add('hovering');
      } else {
        document.body.classList.remove('hovering');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden font-sans">
      
      {/* Custom Cursor */}
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }}></div>
      <div className="cursor-outline hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }}></div>

      {/* Dynamic Background */}
      <BackgroundScene theme={theme} />
      
      {/* Navigation */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] max-w-5xl ${scrolled ? 'top-4' : 'top-8'}`}>
        <div className="glass-panel-dark rounded-[2rem] px-8 py-4 flex justify-between items-center border border-red-500/20 shadow-[0_0_30px_rgba(255,0,0,0.1)]">
          <div className="font-black text-2xl tracking-tighter cursor-pointer flex items-center gap-2 group" onClick={() => scrollToSection('home')}>
            <div className="w-10 h-10 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <img src="/input_file_0.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="group-hover:text-red-500 transition-colors uppercase">PRAKU</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-bold text-[10px] tracking-[0.2em] uppercase">
            {navItems.map((item) => (
                <button 
                    key={item.id} 
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-red-500 transition-colors relative group"
                >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
                </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             <button 
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-[10px] tracking-widest transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 group"
            >
                HIRE ME
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <button className="md:hidden p-2 text-red-500" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 text-3xl font-black bg-black/95 backdrop-blur-xl"
            >
                {navItems.map((item) => (
                    <button key={item.id} onClick={() => scrollToSection(item.id)} className="hover:text-red-500 transition-colors">
                        {item.name}
                    </button>
                ))}
                
                <button 
                    onClick={() => scrollToSection('contact')}
                    className="mt-8 px-10 py-4 bg-red-600 text-white rounded-2xl font-black tracking-widest"
                >
                    HIRE ME
                </button>

                <div className="flex gap-8 mt-12">
                    <Youtube className="text-slate-500 hover:text-red-600 cursor-pointer transition-colors" />
                    <Instagram className="text-slate-500 hover:text-red-600 cursor-pointer transition-colors" />
                    <Twitter className="text-slate-500 hover:text-red-600 cursor-pointer transition-colors" />
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <main className="relative">
        <Hero theme={theme} />
        <Services theme={theme} />
        <Skills theme={theme} />
        <ProjectSystem theme={theme} isAdmin={isAdmin} />
        <Experience theme={theme} />
        <Contact theme={theme} />
      </main>

      <footer className="py-20 relative z-10 bg-black border-t border-red-900/20">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="font-black text-3xl tracking-tighter mb-6 flex items-center gap-3">
                        <img src="/input_file_0.png" alt="Logo" className="w-10 h-10 object-contain" />
                        PRAKU<span className="text-red-600">.</span>
                    </div>
                    <p className="text-slate-400 max-w-md leading-relaxed">
                        Professional video editor and content creator specializing in cinematic storytelling, high-energy edits, and premium visual content for brands and creators worldwide.
                    </p>
                </div>
                <div>
                    <h4 className="font-black text-[10px] tracking-[0.3em] uppercase text-red-500 mb-6">Quick Links</h4>
                    <div className="flex flex-col gap-4 text-slate-400 font-bold text-sm">
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollToSection(item.id)} className="hover:text-white transition-colors text-left w-fit">{item.name}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-black text-[10px] tracking-[0.3em] uppercase text-red-500 mb-6">Socials</h4>
                    <div className="flex flex-col gap-4 text-slate-400 font-bold text-sm">
                        <a href="#" className="hover:text-white transition-colors">YouTube</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">Behance</a>
                    </div>
                </div>
            </div>
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
                    © 2026 PRANJAL KUMAR. ALL RIGHTS RESERVED.
                </p>
                <div className="flex gap-8 text-slate-500 text-xs font-bold tracking-widest uppercase">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;