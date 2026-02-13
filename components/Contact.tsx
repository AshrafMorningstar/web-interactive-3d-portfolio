import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
      const newErrors: { [key: string]: string } = {};
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
          newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email is invalid";
      }
      if (!formData.message.trim()) newErrors.message = "Message is required";
      return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
      } else {
          setErrors({});
          // Simulate submission
          setTimeout(() => setSubmitted(true), 1000);
          console.log("Form Submitted", formData);
      }
  };

  return (
    <footer id="contact" className="bg-black py-20 border-t border-white/10 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
                <h2 className="text-4xl font-display font-bold mb-6">Ready to <span className="text-gold-400">Scale?</span></h2>
                <p className="text-gray-400 max-w-xl mb-12">
                   I am currently available for consulting on distributed systems architecture, security audits, and full-stack leadership roles. Let's build something secure and scalable together.
                </p>
                
                <div className="flex gap-8 mb-12">
                   <a href="mailto:ashrafmorningstar@gmail.com" className="cursor-interactive flex flex-col items-center gap-2 group">
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 10, backgroundColor: '#DAA520', color: '#000' }}
                        className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-300 transition-colors"
                      >
                         <Mail size={20} />
                      </motion.div>
                      <span className="text-sm text-gray-500 group-hover:text-gold-400 transition-colors">Email</span>
                   </a>
                   
                   <a href="https://www.linkedin.com/in/ashrafmorningstar/" target="_blank" rel="noopener noreferrer" className="cursor-interactive flex flex-col items-center gap-2 group">
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: -10, backgroundColor: '#0077b5', color: '#fff' }}
                        className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-300 transition-colors"
                      >
                         <Linkedin size={20} />
                      </motion.div>
                      <span className="text-sm text-gray-500 group-hover:text-[#0077b5] transition-colors">LinkedIn</span>
                   </a>

                   <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noopener noreferrer" className="cursor-interactive flex flex-col items-center gap-2 group">
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 10, backgroundColor: '#fff', color: '#000' }}
                        className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-300 transition-colors"
                      >
                         <Github size={20} />
                      </motion.div>
                      <span className="text-sm text-gray-500 group-hover:text-white transition-colors">GitHub</span>
                   </a>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-dark-800 p-8 rounded-2xl border border-white/5">
                <AnimatePresence mode='wait'>
                    {submitted ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-400">I'll get back to you as soon as possible.</p>
                            <button onClick={() => { setSubmitted(false); setFormData({name:'', email:'', message:''}) }} className="mt-6 text-gold-400 hover:text-white text-sm underline cursor-interactive">Send another message</button>
                        </motion.div>
                    ) : (
                        <motion.form 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit} 
                            className="space-y-6"
                        >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className={`w-full bg-dark-900 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors`}
                                    placeholder="Your Name"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                <input 
                                    type="text" 
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className={`w-full bg-dark-900 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors`}
                                    placeholder="your@email.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                                <textarea 
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className={`w-full bg-dark-900 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors`}
                                    placeholder="Tell me about your project..."
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.message}</p>}
                            </div>
                            <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-interactive">
                                Send Message <Send size={18} />
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>

        <div className="text-gray-600 text-sm mt-20 text-center">
           <p>&copy; 2026 Ashraf Morningstar. All rights reserved.</p>
           <p className="mt-2 text-xs">Built with React, TypeScript & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;