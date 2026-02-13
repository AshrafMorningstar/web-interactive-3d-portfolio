import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Cpu, Globe, Shield, Server, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'default' | 'cyan' | 'emerald' | 'crimson' | 'gold'>('default');

  // 3D Rotation Physics
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 });
  // Map horizontal drag distance to rotation degrees
  const rotateY = useTransform(springX, (currentX) => currentX / 2);

  const roles = [
    { id: 'fullstack', title: "Full-Stack", icon: <Globe size={24} />, color: "text-cyan-400", theme: 'cyan' as const, bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { id: 'systems', title: "Dist. Systems", icon: <Server size={24} />, color: "text-emerald-400", theme: 'emerald' as const, bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { id: 'security', title: "Security", icon: <Shield size={24} />, color: "text-crimson-500", theme: 'crimson' as const, bg: "bg-crimson-500/10", border: "border-crimson-500/20" },
    { id: 'devops', title: "DevOps", icon: <Cpu size={24} />, color: "text-gold-400", theme: 'gold' as const, bg: "bg-gold-500/10", border: "border-gold-500/20" },
  ];

  const getThemeColor = () => {
    switch (activeTheme) {
      case 'cyan': return 'text-cyan-400';
      case 'emerald': return 'text-emerald-400';
      case 'crimson': return 'text-crimson-500';
      case 'gold': return 'text-gold-400';
      default: return 'text-gold-400';
    }
  };

  const getThemeGradient = () => {
    switch (activeTheme) {
      case 'cyan': return 'from-cyan-400 to-blue-600';
      case 'emerald': return 'from-emerald-400 to-green-600';
      case 'crimson': return 'from-crimson-500 to-red-600';
      case 'gold': return 'from-gold-400 to-yellow-600';
      default: return 'from-white via-gray-200 to-gray-500';
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background Gradients based on Theme */}
      <motion.div 
        animate={{ opacity: activeTheme === 'default' ? 0.5 : 0.2 }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[128px]" 
      />
      <motion.div 
        animate={{ opacity: activeTheme === 'default' ? 0.5 : 0.8, backgroundColor: activeTheme === 'cyan' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(255, 255, 255, 0.05)' }}
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[128px]" 
      />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left"
        >
          <div className="flex items-center gap-4 mb-4">
             <motion.span 
               animate={{ backgroundColor: activeTheme === 'default' ? '#FFD700' : 'currentColor' }}
               className={`h-[1px] w-12 inline-block ${getThemeColor()}`} 
             />
             <motion.span className={`tracking-widest text-sm uppercase font-semibold ${getThemeColor()}`}>
               Nexus Portfolio
             </motion.span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            Ashraf <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${getThemeGradient()}`}>
              Morningstar
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light max-w-lg">
            Senior <span className="text-white font-medium">Full-Stack & Systems Engineer</span> building secure, scalable production systems with 15+ years of experience.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#contact" className="cursor-interactive px-8 py-4 bg-gold-500 text-black font-bold uppercase tracking-wide hover:bg-white transition-colors duration-300 rounded-sm">
              Get in Touch
            </a>
            <a href="#projects" className="cursor-interactive px-8 py-4 border border-white/20 hover:border-gold-400 text-white font-bold uppercase tracking-wide transition-colors duration-300 rounded-sm">
              View Projects
            </a>
          </div>

          {/* Social Icons with Hover Animations */}
          <div className="flex gap-6">
            <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noopener noreferrer" className="cursor-interactive text-gray-400 hover:text-white transition-colors" title="GitHub Profile">
              <motion.div whileHover={{ scale: 1.2, rotate: 5, color: "#fff" }} whileTap={{ scale: 0.9 }}>
                <Github size={24} />
              </motion.div>
            </a>
            <a href="https://www.linkedin.com/in/ashrafmorningstar/" target="_blank" rel="noopener noreferrer" className="cursor-interactive text-gray-400 hover:text-[#0077b5] transition-colors" title="LinkedIn Profile">
              <motion.div whileHover={{ scale: 1.2, rotate: -5, color: "#0077b5" }} whileTap={{ scale: 0.9 }}>
                <Linkedin size={24} />
              </motion.div>
            </a>
            <a href="mailto:ashrafmorningstar@gmail.com" className="cursor-interactive text-gray-400 hover:text-gold-400 transition-colors" title="Send Email">
              <motion.div whileHover={{ scale: 1.2, y: -3, color: "#FFD700" }} whileTap={{ scale: 0.9 }}>
                <Mail size={24} />
              </motion.div>
            </a>
          </div>

        </motion.div>

        {/* 3D Conceptual Element (The Nexus) */}
        <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">
           <div className="absolute top-0 text-center w-full text-xs text-gray-500 tracking-widest uppercase pointer-events-none select-none">
             Drag to Rotate
           </div>
           
           <motion.div
             style={{ 
               rotateY: rotateY, 
               rotateX: 15,
               cursor: 'grab'
             }}
             drag="x"
             dragConstraints={{ left: 0, right: 0 }}
             dragElastic={0.1}
             onDrag={(_, info) => {
                x.set(x.get() + info.delta.x);
             }}
             onDragEnd={() => {
                 // Snap back to front (0 degrees)
                 x.set(0);
             }}
             whileTap={{ cursor: 'grabbing' }}
             className="relative w-64 h-64 transform-style-3d touch-none"
           >
              {/* Central Core */}
              <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl animate-pulse"></div>
              
              {/* Orbiting Elements representing Roles */}
              {roles.map((role, idx) => {
                const rotation = idx * (360 / roles.length);
                return (
                  <div
                    key={role.id}
                    className="absolute top-1/2 left-1/2 w-full h-full origin-center"
                    style={{ 
                      transform: `translate(-50%, -50%) rotateY(${rotation}deg) translateZ(180px)` 
                    }}
                  >
                     <motion.div 
                        onHoverStart={() => setActiveTheme(role.theme)}
                        onHoverEnd={() => setActiveTheme('default')}
                        whileHover={{ scale: 1.15, z: 20, borderColor: '#fff' }}
                        className={`w-32 h-32 backdrop-blur-md ${role.bg} ${role.border} border flex flex-col items-center justify-center p-4 rounded-xl shadow-2xl cursor-interactive transform transition-all duration-300 select-none`}
                        // Keep the card facing front relative to viewer partially
                        style={{ transform: `rotateY(-${rotation}deg)` }}
                     >
                        <div className={`mb-2 ${role.color}`}>{role.icon}</div>
                        <span className="text-xs font-bold uppercase tracking-wider text-center text-white">{role.title}</span>
                     </motion.div>
                  </div>
                );
              })}
           </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <a href="#skills" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-interactive group z-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-gold-400 transition-colors">Scroll</span>
          <ArrowDown className="text-gold-400" size={20} />
        </motion.div>
      </a>
    </section>
  );
};

export default Hero;