/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Plus, X, Edit2, Trash2, GripVertical, Image as ImageIcon, LayoutGrid, PlayCircle, Camera, Upload, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Project, Category, ThemeMode } from '../types';

// Mock Initial Data
const INITIAL_PROJECTS: Project[] = [
  { id: '1', title: 'Neon Nights', category: 'Video', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80', description: 'Music video editing and color grading.', link: 'https://youtube.com' },
  { id: '2', title: 'Apex Branding', category: 'Design', image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&w=800&q=80', description: 'Complete brand identity overhaul.', link: 'https://behance.net' },
  { id: '3', title: 'Urban Solitude', category: 'Photo', image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=800&q=80', description: 'Street photography series in Tokyo.', link: 'https://instagram.com' },
  { id: '4', title: 'Cyber Drift', category: 'Video', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80', description: 'Automotive cinematic reel.', link: 'https://vimeo.com' },
  { id: '5', title: 'Ethereal UI', category: 'Design', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80', description: 'App interface design for wellness startup.', link: 'https://dribbble.com' },
  { id: '6', title: 'Golden Hour', category: 'Photo', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80', description: 'Portrait sessions with natural light.', link: 'https://unsplash.com' },
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

  const isLight = theme === 'light';

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
    e.stopPropagation(); // Stop click from propagating to the project card (which opens the link)
    
    if(window.confirm('Are you sure you want to permanently delete this project?')) {
        // Use functional state update to ensure we filter the latest state
        setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
    }
  };

  const handleEdit = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditForm(project);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditForm({ id: Date.now().toString(), title: '', category: 'Video', image: '', description: '', link: '' });
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
         // Auto-generate thumbnail for videos
         try {
             const thumbnail = await generateThumbnail(file);
             setEditForm(prev => ({ ...prev, image: thumbnail }));
         } catch (err) {
             console.error("Thumbnail generation failed:", err);
             // Fallback: Use raw data URL if thumbnail fails (though heavy)
             const reader = new FileReader();
             reader.onloadend = () => setEditForm(prev => ({ ...prev, image: reader.result as string }));
             reader.readAsDataURL(file);
         }
      } else {
         // Standard image upload
         const reader = new FileReader();
         reader.onloadend = () => {
            setEditForm(prev => ({ ...prev, image: reader.result as string }));
         };
         reader.readAsDataURL(file);
      }
    }
  };

  const handleProjectClick = (project: Project) => {
      if (project.link) {
          window.open(project.link, '_blank');
      }
  };

  return (
    <section id="projects" className="py-24 relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
                <h2 className={`text-4xl md:text-5xl font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Selected Work</h2>
                <div className={`h-1 w-20 ${isLight ? 'bg-slate-900' : 'bg-cyan-400'}`}></div>
            </div>

            <div className={`flex items-center gap-2 p-1 rounded-full ${isLight ? 'bg-slate-200' : 'bg-white/10 backdrop-blur-md'}`}>
                {['All', 'Video', 'Design', 'Photo'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat as any)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat ? (isLight ? 'bg-white text-slate-900 shadow-md' : 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.5)]') : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white')}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
            <div className="mb-8 flex justify-end">
                <button onClick={handleAddNew} className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/30">
                    <Plus size={20} /> Add Project
                </button>
            </div>
        )}

        {/* Grid / Reorder List */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
                {filteredProjects.map((project) => (
                   <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -10 }}
                        key={project.id}
                        onClick={() => handleProjectClick(project)}
                        className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg ${isLight ? 'bg-white' : 'bg-slate-800'}`}
                   >
                        {/* Media */}
                        <div className="aspect-[4/3] overflow-hidden bg-black relative">
                            {isVideo(project.image) ? (
                                <video 
                                    src={project.image} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    muted 
                                    loop 
                                    playsInline 
                                    onMouseOver={e => e.currentTarget.play()}
                                    onMouseOut={e => e.currentTarget.pause()}
                                />
                            ) : (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                            
                            {/* External Link Indicator */}
                            {project.link && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                                        <ExternalLink size={32} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                             <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1 block">{project.category}</span>
                             <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                             <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">{project.description}</p>
                        </div>
                        
                        {/* Admin Overlays */}
                        {isAdmin && (
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button onClick={(e) => handleEdit(project, e)} className="p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:scale-110 transition-transform" title="Edit"><Edit2 size={16} /></button>
                                <button onClick={(e) => handleDelete(project.id, e)} className="p-2 bg-red-500 text-white rounded-lg shadow-lg hover:scale-110 transition-transform" title="Delete"><Trash2 size={16} /></button>
                            </div>
                        )}

                        {/* Category Icon */}
                        <div className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-lg text-white border border-white/10 pointer-events-none">
                            {project.category === 'Video' && <PlayCircle size={20} />}
                            {project.category === 'Design' && <LayoutGrid size={20} />}
                            {project.category === 'Photo' && <Camera size={20} />}
                        </div>
                   </motion.div> 
                ))}
            </AnimatePresence>
        </motion.div>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isEditing && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setIsEditing(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl ${isLight ? 'bg-white' : 'bg-slate-900 border border-slate-700'}`}
                >
                    <h3 className={`text-2xl font-bold mb-6 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {projects.find(p => p.id === editForm.id) ? 'Edit Project' : 'New Project'}
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                            <input 
                                value={editForm.title || ''} 
                                onChange={e => setEditForm({...editForm, title: e.target.value})}
                                className={`w-full p-3 rounded-lg mt-1 outline-none border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700 text-white'}`}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                            <select 
                                value={editForm.category || 'Video'}
                                onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                                className={`w-full p-3 rounded-lg mt-1 outline-none border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700 text-white'}`}
                            >
                                <option value="Video">Video</option>
                                <option value="Design">Design</option>
                                <option value="Photo">Photo</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Project Link (URL)</label>
                            <div className="relative">
                                <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    value={editForm.link || ''} 
                                    onChange={e => setEditForm({...editForm, link: e.target.value})}
                                    placeholder="https://..."
                                    className={`w-full pl-10 p-3 rounded-lg mt-1 outline-none border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700 text-white'}`}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Thumbnail / Media</label>
                            <div className="flex gap-2">
                                <input 
                                    value={editForm.image || ''} 
                                    onChange={e => setEditForm({...editForm, image: e.target.value})}
                                    placeholder="Enter URL or upload..."
                                    className={`flex-1 p-3 rounded-lg mt-1 outline-none border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700 text-white'}`}
                                />
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept="image/*,video/*"
                                    className="hidden"
                                />
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`mt-1 px-4 py-2 rounded-lg font-bold border transition-colors flex items-center gap-2 whitespace-nowrap ${isLight ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700' : 'bg-slate-700 border-slate-600 hover:bg-slate-600 text-white'}`}
                                    title="Upload Image or Video (Auto-thumbnail)"
                                >
                                    <Upload size={18} />
                                    <span>Upload Media</span>
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">
                                * Uploading a video will automatically generate a static thumbnail image.
                            </p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                            <textarea 
                                value={editForm.description || ''} 
                                onChange={e => setEditForm({...editForm, description: e.target.value})}
                                className={`w-full p-3 rounded-lg mt-1 outline-none border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700 text-white'}`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-500 hover:text-slate-700">Cancel</button>
                        <button onClick={handleSave} className="px-6 py-2 bg-cyan-500 text-white rounded-lg font-bold hover:bg-cyan-600">Save</button>
                    </div>
                </motion.div>
             </div>
        )}
      </AnimatePresence>
    </section>
  );
};