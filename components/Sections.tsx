/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Send, Check, Youtube, Instagram, Twitter, Phone, MapPin, ExternalLink, Play, Award, Briefcase, User } from 'lucide-react';
import { ThemeMode } from '../types';

interface SectionProps {
  theme: ThemeMode;
}

export const Hero: React.FC<SectionProps> = ({ theme }) => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left: 3D Profile Image */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative w-64 h-64 md:w-96 md:h-96"
        >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-transparent animate-pulse-slow opacity-50 blur-2xl"></div>
            <div className="relative w-full h-full rounded-full border-4 border-red-500/30 overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.3)]">
                <img 
                    src="/input_file_1.png" 
                    alt="Pranjal Kumar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                />
            </div>
            {/* Floating elements */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 p-3 glass-panel rounded-xl text-red-500"
            >
                <Play size={24} fill="currentColor" />
            </motion.div>
        </motion.div>

        {/* Right: Content */}
        <div className="flex-1 text-center md:text-left">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-4 inline-block"
            >
                <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase border border-red-500/30 text-red-400 bg-red-900/10 backdrop-blur-sm">
                    Cinematic Video Editor
                </span>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-sans font-black text-5xl md:text-7xl mb-6 tracking-tight text-white leading-tight"
            >
              Hi, It’s <span className="text-red-500 text-glow-red">Praku</span> – <br />
              Video Editor & <br />
              <span className="italic text-white">Content Creator.</span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-lg md:text-xl mb-10 text-slate-300 max-w-xl leading-relaxed"
            >
              My real name is <span className="text-white font-bold">Pranjal Kumar</span>. I create cinematic edits, YouTube videos, reels, and engaging visual content for creators and brands.
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-6 justify-center md:justify-start items-center"
            >
                <a href="#contact" className="group relative px-10 py-4 rounded-full font-bold tracking-wide overflow-hidden transition-all duration-300 bg-red-600 text-white hover:bg-red-700 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                    <span className="relative z-10">HIRE ME</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </a>
                
                <div className="flex gap-4">
                    {[
                        { icon: <Youtube size={20} />, link: "#" },
                        { icon: <Instagram size={20} />, link: "#" },
                        { icon: <Twitter size={20} />, link: "#" }
                    ].map((social, i) => (
                        <motion.a 
                            key={i}
                            href={social.link}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors"
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
      >
        <ArrowDown size={24} className="text-white" />
      </motion.div>
    </section>
  );
};

export const Services: React.FC<SectionProps> = () => {
    const services = [
        { title: "Video Editing", desc: "Professional cinematic storytelling with high-end transitions and pacing.", icon: <Play /> },
        { title: "YouTube Editing", desc: "Retention-focused editing to grow your channel and engage viewers.", icon: <Youtube /> },
        { title: "Shorts/Reels", desc: "Fast-paced, viral-ready vertical content for social media platforms.", icon: <Instagram /> },
        { title: "Color Grading", desc: "Cinematic color correction and grading to set the perfect mood.", icon: <Award /> },
        { title: "Motion Graphics", desc: "Dynamic text animations and visual effects to enhance your videos.", icon: <Briefcase /> }
    ];

    return (
        <section id="services" className="py-32 relative z-10">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 text-glow-red">Services</h2>
                    <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="glass-panel-dark p-8 rounded-3xl border border-red-500/10 hover:border-red-500/30 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Skills: React.FC<SectionProps> = () => {
    const skills = [
        { name: "Premiere Pro", level: 98 },
        { name: "After Effects", level: 90 },
        { name: "CapCut", level: 95 },
        { name: "DaVinci Resolve", level: 85 },
        { name: "Storytelling", level: 92 },
        { name: "Sound Design", level: 88 }
    ];

    return (
        <section id="skills" className="py-32 relative z-10">
            <div className="container mx-auto px-6">
                <div className="glass-panel-dark p-12 rounded-[3rem] border border-red-500/10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-glow-red">Technical Arsenal</h2>
                        <p className="text-slate-400">Tools I use to bring visions to life.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {skills.map((skill, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-3">
                                    <span className="font-bold text-white tracking-wide uppercase text-sm">{skill.name}</span>
                                    <span className="text-red-500 font-mono text-sm">{skill.level}%</span>
                                </div>
                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-red-800 to-red-500 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.3)]"
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

export const Experience: React.FC<SectionProps> = () => {
    const items = [
        { year: "2023 - Present", title: "Lead Video Editor", company: "Freelance Creative", desc: "Crafting high-end cinematic content for international brands and top-tier YouTube creators." },
        { year: "2021 - 2023", title: "Content Specialist", company: "Media Agency", desc: "Managed end-to-end video production for social media campaigns, focusing on engagement and brand storytelling." },
        { year: "2019 - 2021", title: "Junior Editor", company: "Production House", desc: "Assisted in post-production for short films and commercial projects, mastering the fundamentals of editing." }
    ];

    return (
        <section id="experience" className="py-32 relative z-10">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 text-glow-red">My Journey</h2>
                    <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    {items.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="relative pl-12 border-l-2 border-red-500/30 pb-12 last:pb-0"
                        >
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>
                            <span className="text-red-500 font-mono text-sm mb-2 block tracking-widest">{item.year}</span>
                            <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                            <h4 className="text-red-400/80 font-medium mb-4">{item.company}</h4>
                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Contact: React.FC<SectionProps> = () => {
    const [sent, setSent] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <section id="contact" className="py-32 relative z-10">
             <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 text-glow-red">Get In Touch</h2>
                            <p className="text-xl text-slate-400 leading-relaxed">Ready to elevate your content? Let's discuss your next project.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: <Mail />, label: "Email", value: "pk4470588@gmail.com", link: "mailto:pk4470588@gmail.com" },
                                { icon: <Phone />, label: "Phone", value: "+91 8299657243 / +91 7618053021", link: "tel:+918299657243" },
                                { icon: <MapPin />, label: "Address", value: "India, U.P., Ghazipur", link: "#" }
                            ].map((item, i) => (
                                <a key={i} href={item.link} className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                                        <p className="text-lg text-white font-medium group-hover:text-red-400 transition-colors">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel-dark p-8 md:p-12 rounded-[3rem] border border-red-500/10">
                        {sent ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                                    <Check size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                                <p className="text-slate-400">I'll get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
                                        <input type="text" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none text-white transition-all" placeholder="Your Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                                        <input type="email" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none text-white transition-all" placeholder="your@email.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                                    <textarea rows={5} required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none text-white transition-all" placeholder="Tell me about your vision..."></textarea>
                                </div>
                                <button type="submit" className="w-full py-5 rounded-2xl font-bold text-lg tracking-widest bg-red-600 text-white shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:bg-red-700 transition-all flex items-center justify-center gap-3">
                                    <Send size={20} />
                                    SEND MESSAGE
                                </button>
                            </form>
                        )}
                    </div>
                </div>
             </div>
        </section>
    );
};
