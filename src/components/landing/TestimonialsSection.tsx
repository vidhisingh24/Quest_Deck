'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Award, Building2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Computer Science Major',
    university: 'Stanford University',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    quote: 'Quest made networking click for me in 15 minutes. Becoming a data packet routing through firewalls taught me more than an entire textbook chapter!',
    rating: 5,
  },
  {
    name: 'David Thorne',
    role: 'Cybersecurity Enthusiast',
    university: 'Georgia Tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote: 'The clean Notion-like UI is so calming. I love that there are no distracting neon cyber glows — just high-yield, interactive missions.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Full Stack Learner',
    university: 'MIT Online',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    quote: 'The AI Mentor answered my CPU scheduling doubts instantly. The daily streak system keeps me coming back every single morning!',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Academic Adoption Trust Bar */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-warm-500 mb-6">
            Adopted by Students & CS Learners Across Top Institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="font-extrabold text-lg text-warm-800 tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky" /> Stanford CS
            </span>
            <span className="font-extrabold text-lg text-warm-800 tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-sage-deep" /> MIT Tech Labs
            </span>
            <span className="font-extrabold text-lg text-warm-800 tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-accent-dark" /> Georgia Tech
            </span>
            <span className="font-extrabold text-lg text-warm-800 tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-coral" /> Oxford CS Guild
            </span>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-[#FAFAF7] border border-warm-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-dark text-accent-dark" />
                  ))}
                </div>
                <p className="text-sm text-warm-700 font-medium italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-warm-200">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-warm-300"
                />
                <div>
                  <h4 className="text-sm font-bold text-warm-900">{item.name}</h4>
                  <p className="text-xs text-warm-500">{item.role} • {item.university}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
