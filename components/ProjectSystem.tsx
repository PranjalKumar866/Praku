/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Edit2, Trash2, GripVertical, Image as ImageIcon, LayoutGrid, PlayCircle, Camera, Upload, Link as LinkIcon, ExternalLink, Play, Maximize2 } from 'lucide-react';
import { Project, Category, ThemeMode } from '../types';

// Mock Initial Data
const INITIAL_PROJECTS: Project[] = [
  { id: '1', title: 'Cyberpunk Cinematic', category: 'Video', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80', description: 'High-energy cinematic edit with neon aesthetics.', link: 'https://youtube.com' },
  { id: '2', title: 'Tech Review Masterclass', category: 'YouTube', image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&w=800&q=80', description: 'Clean, professional YouTube editing for tech creators.', link: 'https://youtube.com' },
  { id: '3', title: 'Viral Street Reel', category: 'Reels', image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=800&q=80', description: 'Fast-paced vertical edit for Instagram/TikTok.', link: 'https://instagram.com' },
  { id: '4', title: 'Abstract Motion Intro', category: 'Motion', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80', description: 'Dynamic 3D motion graphics for brand intros.', link: 'https://vimeo.com' },
];

interface ProjectSystemProps {
  theme: ThemeMode;
  isAdmin: boolean;
}

export const ProjectSystem: React.FC<ProjectSystemProps> = ({ theme, isAdmin }) => {
  // Initialize state from Local Storage if available
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
        const saved = localStorage.getItem('praku_portfolio_projects');
        return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
        console.error("Failed to load projects from storage", e);
        return INITIAL_PROJECTS;
    }
  });

  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save to Local Storage whenever projects change
  useEffect(() => {
    localStorage.setItem('praku_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  // Filter Logic
  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  // Helper to detect video (still useful for manual URLs)
  const isVideo = (url?: string) => {
    if (!url) return false;
    return url.includes('.mp4') || url.includes('.webm') || url.startsWith('data:video');
  };

  // Helper to generate thumbnail from video file
  const generateThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;
        
        video.onloadedmetadata = () => {
             // Capture frame at 1 second or 0 if shorter
            let seekTime = 1;
            if (video.duration < 1) seekTime = 0;
            video.currentTime = seekTime;
        };

        video.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            } else {
                reject(new Error("Canvas context failed"));
            }
            video.remove();
        };

        video.onerror = (e) => reject(e);
        
        video.src = URL.createObjectURL(file);
    });
  };

  // Admin Actions
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Removed window.confirm due to iframe restrictions and user report of it not working
    setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
  };

  const handleEdit = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditForm(project);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditForm({ id: Date.now().toString(), title: '', category: 'Video', image: '', description: '', link: '', videoUrl: '' });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editForm.title || !editForm.image) return;
    
    setProjects(prevProjects => {
        if (prevProjects.find(p => p.id === editForm.id)) {
            return prevProjects.map(p => p.id === editForm.id ? editForm as Project : p);
        } else {
            return [editForm as Project, ...prevProjects];
        }
    });
    setIsEditing(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
         try {
             const thumbnail = await generateThumbnail(file);
             setEditForm(prev => ({ ...prev, image: thumbnail }));
         } catch (err) {
             console.error("Thumbnail generation failed:", err);
             const reader = new FileReader();
             reader.onloadend = () => setEditForm(prev => ({ ...prev, image: reader.result as string }));
             reader.readAsDataURL(file);
         }
      } else {
         const reader = new FileReader();
         reader.onloadend = () => {
            setEditForm(prev => ({ ...prev, image: reader.result as string }));
         };
         reader.readAsDataURL(file);
      }
    }
  };

  const handleProjectClick = (project: Project) => {
      const targetUrl = project.link || project.videoUrl;
      if (targetUrl) {
          window.open(targetUrl, '_blank');
      }
  };

  return (
    <section id="projects" className="py-32 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4">Projects</h2>
                <div className="h-1.5 w-24 bg-red-600 rounded-full mx-auto md:mx-0"></div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 p-2 rounded-3xl glass-panel-dark">
                {['All', 'Video', 'YouTube', 'Reels', 'Motion'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat as any)}
                        className={`px-6 py-2.5 rounded-2xl text-sm font-bold tracking-widest transition-all duration-300 uppercase ${filter === cat ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
            <div className="mb-12 flex justify-center md:justify-end">
                <button onClick={handleAddNew} className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black tracking-widest transition-all shadow-lg hover:shadow-red-600/40">
                    <Plus size={24} className="group-hover:rotate-90 transition-transform" /> ADD PROJECT
                </button>
            </div>
        )}

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
                {filteredProjects.map((project) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -15 }}
                        key={project.id}
                        onClick={() => handleProjectClick(project)}
                        onMouseEnter={(e) => {
                            const video = e.currentTarget.querySelector('video');
                            if (video) video.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                            const video = e.currentTarget.querySelector('video');
                            if (video) {
                                video.pause();
                                video.currentTime = 0;
                            }
                        }}
                        className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer glass-panel-dark border border-red-500/10 hover:border-red-500/40 transition-all"
                   >
                        {/* Media */}
                        <div className="aspect-[16/10] overflow-hidden bg-black relative">
                            {isVideo(project.videoUrl) || isVideo(project.image) ? (
                                <video 
                                    src={isVideo(project.videoUrl) ? project.videoUrl : project.image} 
                                    poster={!isVideo(project.image) ? project.image : undefined}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                            
                            {/* Play/Link Button Overlay */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                                <div 
                                    className="w-20 h-20 rounded-full bg-red-600/20 backdrop-blur-xl flex items-center justify-center border border-red-500/40 text-red-500 shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:bg-red-600 hover:text-white transition-all"
                                >
                                    {isVideo(project.image) ? <Play size={40} fill="currentColor" /> : <ExternalLink size={40} />}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                             <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">{project.category}</span>
                                <div className="p-2 bg-white/5 rounded-xl text-slate-400 group-hover:text-red-500 transition-colors">
                                    <ExternalLink size={16} />
                                </div>
                             </div>
                             <h3 className="text-2xl font-black text-white mb-3 group-hover:text-red-500 transition-colors">{project.title}</h3>
                             <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                        </div>
                        
                        {/* Admin Overlays */}
                        {isAdmin && (
                            <div 
                                onClick={(e) => e.stopPropagation()} 
                                className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                                <button onClick={(e) => handleEdit(project, e)} className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform" title="Edit"><Edit2 size={18} /></button>
                                <button onClick={(e) => handleDelete(project.id, e)} className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform" title="Delete"><Trash2 size={18} /></button>
                            </div>
                        )}
                   </motion.div> 
                ))}
            </AnimatePresence>
        </motion.div>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isEditing && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setIsEditing(false)}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="relative w-full max-w-lg p-10 rounded-[3rem] shadow-2xl glass-panel-dark border border-red-500/20"
                >
                    <h3 className="text-3xl font-black mb-8 text-white tracking-tight">
                        {projects.find(p => p.id === editForm.id) ? 'EDIT PROJECT' : 'NEW PROJECT'}
                    </h3>
                    
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Title</label>
                                <input 
                                    value={editForm.title || ''} 
                                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                                    className="w-full p-4 rounded-2xl outline-none bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-red-500 transition-all"
                                    placeholder="Project Name"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Category</label>
                                <select 
                                    value={editForm.category || 'Video'}
                                    onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                                    className="w-full p-4 rounded-2xl outline-none bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-red-500 transition-all appearance-none"
                                >
                                    <option value="Video">Video</option>
                                    <option value="YouTube">YouTube</option>
                                    <option value="Reels">Reels</option>
                                    <option value="Motion">Motion</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Video Link / URL</label>
                            <div className="relative">
                                <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input 
                                    value={editForm.videoUrl || ''} 
                                    onChange={e => setEditForm({...editForm, videoUrl: e.target.value})}
                                    placeholder="https://youtube.com/..."
                                    className="w-full pl-12 p-4 rounded-2xl outline-none bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-red-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Thumbnail / Media</label>
                            <div className="flex flex-col gap-3">
                                <input 
                                    value={editForm.image || ''} 
                                    onChange={e => setEditForm({...editForm, image: e.target.value})}
                                    placeholder="Thumbnail Image URL"
                                    className="w-full p-4 rounded-2xl outline-none bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-red-500 transition-all"
                                />
                                <div className="flex items-center gap-4">
                                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex-1 p-4 rounded-2xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-3"
                                    >
                                        <Upload size={20} />
                                        <span>UPLOAD FILE</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Description</label>
                            <textarea 
                                value={editForm.description || ''} 
                                onChange={e => setEditForm({...editForm, description: e.target.value})}
                                rows={3}
                                className="w-full p-4 rounded-2xl outline-none bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-red-500 transition-all"
                                placeholder="Short project summary..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-6 mt-10">
                        <button onClick={() => setIsEditing(false)} className="font-bold text-slate-500 hover:text-white transition-colors">CANCEL</button>
                        <button onClick={handleSave} className="px-10 py-4 bg-red-600 text-white rounded-2xl font-black tracking-widest hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all">SAVE PROJECT</button>
                    </div>
                </motion.div>
             </div>
        )}
      </AnimatePresence>
    </section>
  );
};