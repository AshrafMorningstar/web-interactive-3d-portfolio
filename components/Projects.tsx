import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ExternalLink, Github, Code, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchTopRepos } from '../services/githubService';
import { GitHubRepo } from '../types';

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      const data = await fetchTopRepos();
      setRepos(data);
      setLoading(false);
    };
    loadRepos();
  }, []);

  return (
    <section id="projects" className="py-24 bg-dark-800 relative overflow-hidden">
       {/* Decorative Elements */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
       <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Featured <span className="text-cyan-400">Repositories</span></h2>
            <p className="text-gray-400">Top open-source contributions fetched live from GitHub.</p>
          </div>
          <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-gold-400 hover:text-white transition-colors cursor-interactive">
            View all repositories <ExternalLink size={16} />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ repo: GitHubRepo; index: number }> = ({ repo, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate a deterministic placeholder image based on ID for visual variety
  const bgImageId = (repo.id % 10) + 10;
  const bgImage = `https://picsum.photos/id/${bgImageId}/600/400`;

  // Helper to format topic for tooltip
  const formatTopic = (t: string) => t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="group relative bg-dark-900 border border-white/5 rounded-xl overflow-hidden hover:border-gold-400/50 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col cursor-pointer"
    >
      {/* Parallax Image Area */}
      <div 
        className="relative h-48 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
        <motion.img 
          src={bgImage} 
          alt={repo.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute bottom-4 left-4 z-20 flex gap-3">
           <span className="bg-black/70 backdrop-blur-sm text-gold-400 px-2 py-1 rounded text-xs font-mono border border-gold-400/30 flex items-center gap-1">
             <Star size={12} /> {repo.stargazers_count}
           </span>
           <span className="bg-black/70 backdrop-blur-sm text-cyan-400 px-2 py-1 rounded text-xs font-mono border border-cyan-400/30 flex items-center gap-1">
             <GitFork size={12} /> {repo.forks_count}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold font-display text-white group-hover:text-gold-400 transition-colors">{repo.name}</h3>
            {repo.language && (
                <span className="text-xs font-bold text-gray-500 border border-gray-700 px-2 py-1 rounded uppercase">{repo.language}</span>
            )}
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
          {repo.description || "No description available for this repository."}
        </p>

        {/* Expandable Section */}
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-4"
                >
                    <div className="pt-2 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2 mt-2">Tech Stack & Topics</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {repo.topics.length > 0 ? (
                                repo.topics.map(topic => (
                                    <div key={topic} className="group/topic relative">
                                        <span 
                                            className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded cursor-help"
                                            aria-label={`Topic: ${formatTopic(topic)}`}
                                        >
                                            #{topic}
                                        </span>
                                        {/* Tooltip */}
                                        <div 
                                            role="tooltip"
                                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/10 text-white text-[10px] rounded opacity-0 group-hover/topic:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl"
                                        >
                                            {formatTopic(topic)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <span className="text-xs text-gray-600 italic">No topics listed</span>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-white hover:text-gold-400 transition-colors cursor-interactive">
                                <Github size={14} /> View Source
                            </a>
                            {repo.homepage && (
                                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-white hover:text-cyan-400 transition-colors cursor-interactive">
                                    <ExternalLink size={14} /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
             <button 
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors cursor-interactive focus:outline-none"
                aria-expanded={isExpanded}
             >
                {isExpanded ? 'Show Less' : 'View Details'}
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
             </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Projects;