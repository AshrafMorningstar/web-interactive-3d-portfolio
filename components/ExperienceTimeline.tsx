import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExperienceItem } from '../types';
import { Briefcase } from 'lucide-react';
import { fetchExperience } from '../services/linkedinService';

const TimelineItem: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative pl-8 md:pl-0 md:grid md:grid-cols-5 items-center mb-16 gap-8`}
    >
      {/* Date - Left Side (Desktop) */}
      <div className={`md:col-span-2 ${index % 2 === 0 ? 'md:text-right' : 'md:order-3 md:text-left'}`}>
        <span className="text-gold-400 font-display font-bold text-xl">{item.period}</span>
        <h3 className="text-xl font-bold text-white mt-1">{item.company}</h3>
      </div>

      {/* Center Line & Dot */}
      <div className="absolute left-0 top-0 md:relative md:col-span-1 md:flex md:justify-center h-full">
         <div className="h-full w-[2px] bg-white/10 absolute top-4 md:left-1/2 transform -translate-x-1/2"></div>
         <div className="w-4 h-4 rounded-full bg-gold-400 shadow-[0_0_15px_rgba(255,215,0,0.5)] z-10 relative mt-2 md:mx-auto"></div>
      </div>

      {/* Content - Right Side (Desktop) */}
      <div className={`md:col-span-2 ${index % 2 === 0 ? '' : 'md:order-1 md:text-right'}`}>
         <div className="bg-dark-800/50 backdrop-blur-sm border border-white/5 p-6 rounded-lg hover:border-gold-400/30 transition-colors duration-300">
            <h4 className="text-lg font-semibold text-cyan-400 mb-2 flex items-center gap-2 md:block">
              <Briefcase size={16} className="md:hidden" />
              {item.role}
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>
            <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? 'md:justify-end' : ''}`}>
              {item.skills.map(skill => (
                <span key={skill} className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
         </div>
      </div>
    </motion.div>
  );
};

const SkeletonItem: React.FC = () => (
    <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-5 items-center mb-16 gap-8 animate-pulse">
        <div className="md:col-span-2 md:text-right space-y-2">
            <div className="h-6 w-32 bg-white/5 rounded ml-auto"></div>
            <div className="h-8 w-48 bg-white/10 rounded ml-auto"></div>
        </div>
        <div className="absolute left-0 top-0 md:relative md:col-span-1 md:flex md:justify-center h-full">
            <div className="w-4 h-4 rounded-full bg-white/20 relative mt-2 md:mx-auto"></div>
        </div>
        <div className="md:col-span-2">
            <div className="bg-white/5 p-6 rounded-lg border border-white/5 h-40 w-full"></div>
        </div>
    </div>
)

const ExperienceTimeline: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchExperience();
        setExperiences(data);
      } catch (e) {
        console.error("Failed to load experience", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <section id="experience" className="py-24 relative bg-dark-900">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
           <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Professional <span className="text-gold-400">Journey</span></h2>
           <p className="text-gray-400 max-w-2xl mx-auto">15+ years of navigating complex architectural challenges.</p>
        </motion.div>

        <div className="relative">
          {loading ? (
             <>
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
             </>
          ) : (
             experiences.map((exp, index) => (
                <TimelineItem key={exp.id} item={exp} index={index} />
             ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;