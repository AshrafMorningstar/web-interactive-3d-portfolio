import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cloud, Database } from 'lucide-react';
import { Certification } from '../types';
import { fetchCertifications } from '../services/linkedinService';

const getIcon = (type?: string) => {
    switch (type) {
        case 'security': return <ShieldCheck className="text-crimson-500" size={32} />;
        case 'data': return <Database className="text-emerald-400" size={32} />;
        default: return <Cloud className="text-cyan-400" size={32} />;
    }
};

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const loadData = async () => {
          try {
              const data = await fetchCertifications();
              setCertifications(data);
          } catch (e) {
              console.error(e);
          } finally {
              setLoading(false);
          }
      }
      loadData();
  }, []);

  return (
    <section className="py-20 bg-dark-900 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
            <Award className="text-gold-400" size={32} />
            <h2 className="text-3xl font-display font-bold text-white">Licenses & <span className="text-gray-500">Certifications</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
                // Skeleton Loaders
                [1,2,3,4].map(i => (
                    <div key={i} className="bg-dark-800 p-6 rounded-lg border border-white/5 animate-pulse">
                        <div className="w-16 h-16 rounded-full bg-white/10 mb-4"></div>
                        <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-white/5 rounded"></div>
                    </div>
                ))
            ) : (
                certifications.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        className="bg-dark-800 p-6 rounded-lg border border-white/5 hover:border-white/20 transition-all shadow-lg group cursor-default"
                    >
                        <motion.div 
                            className="mb-4 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors"
                            // Subtle hover effect: slightly scale up and tilt
                            whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {getIcon(cert.icon)}
                        </motion.div>
                        <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-gold-400 transition-colors">{cert.name}</h3>
                        <p className="text-gray-400 text-sm">{cert.issuer}</p>
                        <p className="text-gray-600 text-xs mt-2 font-mono">{cert.date}</p>
                    </motion.div>
                ))
            )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;