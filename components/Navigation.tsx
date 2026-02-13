import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold tracking-widest uppercase text-white cursor-interactive">
          Nexus<span className="text-gold-400">3D</span>
        </a>

        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors uppercase tracking-wide cursor-interactive relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
            {/* Mobile menu place holder - kept simple for this demo */}
            <div className="w-8 h-8 flex flex-col justify-center gap-1.5 items-end cursor-interactive">
                <span className="w-full h-[2px] bg-white"></span>
                <span className="w-2/3 h-[2px] bg-white"></span>
                <span className="w-full h-[2px] bg-white"></span>
            </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;