import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Rust", "Python", "Go", "Java", "C++"],
    color: "bg-cyan-500"
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Linux"],
    color: "bg-emerald-500"
  },
  {
    title: "Security",
    skills: ["OWASP", "Penetration Testing", "OAuth2", "Cryptography", "PCI-DSS"],
    color: "bg-crimson-500"
  },
  {
    title: "Backend & Systems",
    skills: ["PostgreSQL", "Redis", "gRPC", "GraphQL", "Microservices", "Kafka"],
    color: "bg-gold-500"
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
       <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
             <div className="space-y-6">
                <h2 className="text-4xl font-display font-bold mb-8">Technical <span className="text-gold-400">Arsenal</span></h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                   My philosophy centers on "Correctness before cleverness". I choose tools that offer type safety, performance, and maintainability for long-term production stability.
                </p>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                   <h3 className="text-xl font-bold mb-2">99.9% Uptime</h3>
                   <p className="text-sm text-gray-400">Proven track record of maintaining high-availability distributed systems under heavy load.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                   <h3 className="text-xl font-bold mb-2">380+ Contributions</h3>
                   <p className="text-sm text-gray-400">Active participant in the open-source community, focusing on tooling and security libraries.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {skillCategories.map((category, idx) => (
                   <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-dark-800 p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors"
                   >
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${category.color}`}></span>
                         {category.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                         {category.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-black rounded text-sm text-gray-300 border border-white/10 hover:border-white/30 transition-colors cursor-default">
                               {skill}
                            </span>
                         ))}
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
};

export default Skills;