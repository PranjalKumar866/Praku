/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Send, Check } from 'lucide-react';
import { ThemeMode } from '../types';

interface SectionProps {
  theme: ThemeMode;
}

export const Hero: React.FC<SectionProps> = ({ theme }) => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 relative z-10 text-center">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 inline-block"
        >
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase border ${theme === 'light' ? 'border-slate-300 text-slate-600 bg-white/50' : 'border-cyan-500/30 text-cyan-400 bg-cyan-900/10'} backdrop-blur-sm`}>
                Portfolio 2024
            </span>
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className={`font-sans font-extrabold text-7xl md:text-9xl mb-6 tracking-tighter ${theme === 'light' ? 'text-slate-900' : 'text-white'} drop-shadow-2xl`}
        >
          PRAKU
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`font-serif italic text-2xl md:text-3xl mb-12 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
        >
          Visual Excellence Redefined
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
            <a href="#projects" className={`group relative px-8 py-4 rounded-full font-bold tracking-wide overflow-hidden transition-all duration-300 ${theme === 'light' ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-slate-900 hover:bg-cyan-50'}`}>
                <span className="relative z-10">VIEW WORK</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </a>
            
            <a href="#contact" className={`px-8 py-4 rounded-full font-bold tracking-wide border transition-all duration-300 ${theme === 'light' ? 'border-slate-300 text-slate-700 hover:border-slate-900' : 'border-white/20 text-white hover:bg-white/10 hover:border-white'}`}>
                CONTACT ME
            </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
      >
        <ArrowDown size={24} className={theme === 'light' ? 'text-slate-900' : 'text-white'} />
      </motion.div>
    </section>
  );
};

export const About: React.FC<SectionProps> = ({ theme }) => {
    const skills = [
        { name: "Video Editing", level: 95 },
        { name: "Motion Graphics", level: 85 },
        { name: "Graphic Design", level: 90 },
        { name: "Photography", level: 88 },
        { name: "Color Grading", level: 80 }
    ];

    const isLight = theme === 'light';

    return (
        <section id="about" className="py-32 relative z-10">
            <div className="container mx-auto px-6">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${isLight ? 'bg-white/60 border-slate-200' : 'bg-slate-900/40 border-white/10'} backdrop-blur-xl p-8 md:p-12 rounded-3xl border shadow-2xl`}>
                    
                    <div className="space-y-6">
                        <div className="inline-block">
                             <h2 className={`text-4xl md:text-5xl font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>About Me</h2>
                             <div className={`h-1.5 w-24 rounded-full ${isLight ? 'bg-slate-900' : 'bg-cyan-400'}`}></div>
                        </div>
                        
                        <p className={`text-lg leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                            I am <strong className={isLight ? 'text-slate-900' : 'text-cyan-400'}>Pranjal Kumar (PRAKU)</strong>, a multidisciplinary creative professional obsessed with detail. 
                        </p>
                        <p className={`text-lg leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                            My work bridges the gap between raw footage and cinematic storytelling. Whether capturing moments through a lens or crafting visuals in post-production, I aim for perfection and emotional resonance.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className={`p-4 rounded-xl ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                                <h3 className={`font-bold text-xl mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>4+</h3>
                                <p className="text-sm opacity-60">Years Experience</p>
                            </div>
                            <div className={`p-4 rounded-xl ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                                <h3 className={`font-bold text-xl mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>100+</h3>
                                <p className="text-sm opacity-60">Projects Done</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {skills.map((skill, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className={`font-medium ${isLight ? 'text-slate-900' : 'text-white'}`}>{skill.name}</span>
                                    <span className={`font-mono text-sm ${isLight ? 'text-slate-500' : 'text-cyan-400'}`}>{skill.level}%</span>
                                </div>
                                <div className={`h-2 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-700'}`}>
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={`h-full rounded-full ${isLight ? 'bg-slate-900' : 'bg-gradient-to-r from-purple-600 to-cyan-400'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Contact: React.FC<SectionProps> = ({ theme }) => {
    const isLight = theme === 'light';
    const [sent, setSent] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <section id="contact" className="py-32 relative z-10">
             <div className="container mx-auto px-6 max-w-4xl">
                <div className={`text-center mb-16 space-y-4`}>
                    <h2 className={`text-4xl md:text-6xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Let's Create Together</h2>
                    <p className={`text-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Have a project in mind? Drop me a line.</p>
                </div>

                <div className={`rounded-3xl p-8 md:p-12 shadow-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 backdrop-blur-xl border-white/10'}`}>
                    {sent ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6">
                                <Check size={40} />
                            </div>
                            <h3 className={`text-2xl font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Message Sent!</h3>
                            <p className="opacity-60">I'll get back to you within 24 hours.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Name</label>
                                    <input type="text" required className={`w-full p-4 rounded-xl outline-none focus:ring-2 transition-all ${isLight ? 'bg-slate-50 border border-slate-200 focus:ring-slate-900 text-slate-900' : 'bg-white/5 border border-white/10 focus:ring-cyan-400 text-white'}`} placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Email</label>
                                    <input type="email" required className={`w-full p-4 rounded-xl outline-none focus:ring-2 transition-all ${isLight ? 'bg-slate-50 border border-slate-200 focus:ring-slate-900 text-slate-900' : 'bg-white/5 border border-white/10 focus:ring-cyan-400 text-white'}`} placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Message</label>
                                <textarea rows={5} required className={`w-full p-4 rounded-xl outline-none focus:ring-2 transition-all ${isLight ? 'bg-slate-50 border border-slate-200 focus:ring-slate-900 text-slate-900' : 'bg-white/5 border border-white/10 focus:ring-cyan-400 text-white'}`} placeholder="Tell me about your project..."></textarea>
                            </div>
                            <button type="submit" className={`w-full py-5 rounded-xl font-bold text-lg tracking-wide flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'}`}>
                                <Send size={20} />
                                SEND MESSAGE
                            </button>
                            <p className="text-center text-sm opacity-50 mt-4">Or email directly at <a href="mailto:pk4470588@gmail.com" className="underline hover:text-cyan-400">pk4470588@gmail.com</a></p>
                        </form>
                    )}
                </div>
             </div>
        </section>
    );
};
