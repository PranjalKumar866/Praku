/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles, Droplets, Lock, Upload as UploadIcon } from 'lucide-react';
import { BackgroundScene } from './components/Visuals';
import { Hero, About, Contact } from './components/Sections';
import { ProjectSystem } from './components/ProjectSystem';
import { ThemeMode } from './types';

const App: React.FC = () => {
  // Default to 'light' mode as requested
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  // Default isAdmin to true so all users can upload
  const [isAdmin, setIsAdmin] = useState(true);

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

  // Theme Helpers
  const getThemeClasses = () => {
    switch(theme) {
      case 'light': return 'bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white';
      case 'glass': return 'bg-slate-900 text-white selection:bg-cyan-400 selection:text-black';
      case 'glow': return 'bg-black text-white selection:bg-purple-500 selection:text-white';
      default: return 'bg-[#0F172A] text-white selection:bg-cyan-500 selection:text-black';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${getThemeClasses()} overflow-x-hidden`}>
      
      {/* Custom Cursor */}
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }}></div>
      <div className="cursor-outline hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }}></div>

      {/* Dynamic Background */}
      <BackgroundScene theme={theme} />
      
      {/* Glow Theme Gradient Overlay */}
      {theme === 'glow' && (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(109,40,217,0.15),transparent_70%)] animate-pulse-slow"></div>
      )}
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (theme === 'light' ? 'bg-white/80' : 'bg-slate-900/80') + ' backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="font-sans font-black text-2xl tracking-tighter cursor-pointer z-50" onClick={() => scrollToSection('home')}>
            PRAKU<span className="text-cyan-400">.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide">
            {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <button 
                    key={item} 
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="hover:text-cyan-400 transition-colors uppercase"
                >
                    {item}
                </button>
            ))}
            <button 
                onClick={() => scrollToSection('projects')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${theme === 'light' ? 'bg-slate-900 text-white hover:bg-slate-700' : 'bg-white text-black hover:bg-cyan-100'}`}
            >
                <UploadIcon size={16} />
                <span>UPLOAD</span>
            </button>
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggles */}
            <div className={`flex items-center gap-1 p-1 rounded-full border ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                <button onClick={() => setTheme('light')} className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-white shadow text-orange-400' : 'text-slate-500 hover:text-slate-400'}`}><Sun size={16}/></button>
                <button onClick={() => setTheme('midnight')} className={`p-2 rounded-full transition-all ${theme === 'midnight' ? 'bg-slate-700 shadow text-cyan-400' : 'text-slate-500 hover:text-slate-400'}`}><Moon size={16}/></button>
                <button onClick={() => setTheme('glow')} className={`p-2 rounded-full transition-all ${theme === 'glow' ? 'bg-purple-900 shadow text-purple-400' : 'text-slate-500 hover:text-slate-400'}`}><Sparkles size={16}/></button>
            </div>
          </div>

          <button className="md:hidden z-50 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
            <motion.div 
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: "spring", damping: 20 }}
                className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 text-2xl font-bold ${theme === 'light' ? 'bg-white' : 'bg-slate-900'}`}
            >
                {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                    <button key={item} onClick={() => scrollToSection(item.toLowerCase())}>
                        {item}
                    </button>
                ))}
                
                <button 
                    onClick={() => { scrollToSection('projects'); }}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-xl"
                >
                    <UploadIcon size={24} />
                    UPLOAD WORK
                </button>
                
                <div className="flex gap-4 mt-8">
                    <button onClick={() => {setTheme('light'); setMenuOpen(false)}} className="p-4 bg-slate-100 rounded-full text-orange-500"><Sun /></button>
                    <button onClick={() => {setTheme('midnight'); setMenuOpen(false)}} className="p-4 bg-slate-800 rounded-full text-cyan-400"><Moon /></button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <main className="relative">
        <Hero theme={theme} />
        <ProjectSystem theme={theme} isAdmin={isAdmin} />
        <About theme={theme} />
        <Contact theme={theme} />
      </main>

      <footer className={`py-12 border-t ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-950 border-white/5'}`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <h4 className="font-bold text-xl mb-2">PRAKU</h4>
                <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Crafting Visual Stories with Precision.</p>
            </div>
            <div className={`text-sm ${theme === 'light' ? 'text-slate-400' : 'text-slate-600'}`}>
                © 2024 Pranjal Kumar. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;