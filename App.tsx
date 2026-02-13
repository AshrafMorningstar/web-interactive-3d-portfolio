import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ExperienceTimeline from './components/ExperienceTimeline';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

const InteractiveBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[100px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[80px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-20%',
          translateY: '-20%',
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-dark-900 min-h-screen text-gray-200 selection:bg-gold-500/30 selection:text-white relative">
      <InteractiveBackground />
      
      {/* Hidden on touch devices since custom cursor is for mouse interaction */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      
      <Navigation />
      
      <Hero />

      {/* Role Dashboard Content with Entrance Animation */}
      <motion.main 
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Skills />
        <ExperienceTimeline />
        <Certifications />
        <Projects />
      </motion.main>
      
      <div className="relative z-10">
        <Contact />
      </div>
    </div>
  );
};

export default App;