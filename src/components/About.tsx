import React from 'react';
import { BookOpen, Sparkles, Code2, Lightbulb, Compass, GraduationCap, CheckCircle2 } from 'lucide-react';
import { personalData } from '../data/personalData';
import { BotanicalCornerVine, BotanicalDivider } from './BotanicalDecorations';

export const About: React.FC = () => {
  const values = [
    {
      title: 'Learning Through Practice',
      description: 'Understanding concepts by coding them, building small tools, and validating logic directly in the compiler.',
      icon: Code2,
      color: '#EAF2FF',
    },
    {
      title: 'Exploring Emerging Tech',
      description: 'Testing modern Generative AI models, prompt architectures, and creative interfaces with an open mind.',
      icon: Sparkles,
      color: '#F6EAF0',
    },
    {
      title: 'Building Useful Projects',
      description: 'Focusing on applications that solve real student challenges, such as study copilot tools and performance analyzers.',
      icon: Compass,
      color: '#EEE9FA',
    },
    {
      title: 'Creative Problem Solving',
      description: 'Decomposing complex engineering challenges into manageable steps with clean algorithmic thinking.',
      icon: Lightbulb,
      color: '#E8F3ED',
    },
    {
      title: 'Improving Through Experimentation',
      description: 'Embracing bugs and compiler errors as feedback loops that build true engineering resilience.',
      icon: BookOpen,
      color: '#EAF2FF',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Botanical Corner Accent for About */}
      <BotanicalCornerVine position="top-right" size="md" className="top-6 right-2 sm:right-6 opacity-45" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#CBDAD1] text-xs font-semibold text-[#26344A] mb-3 shadow-2xs">
            <span>Identity & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26344A] font-editorial tracking-tight mb-4">
            A Little About My World
          </h2>
          <p className="text-base sm:text-lg text-[#303039]/80 leading-relaxed font-sans mb-6">
            {personalData.aboutIntro}
          </p>
          <BotanicalDivider centered={false} className="opacity-70" />
        </div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Card: Student Context & Journey */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-xs border border-white/80 relative overflow-hidden">
            <BotanicalCornerVine position="bottom-right" size="sm" className="bottom-0 right-0 opacity-30" />

            <div className="w-12 h-12 rounded-2xl bg-[#EAF2FF] flex items-center justify-center text-[#26344A] mb-6">
              <GraduationCap className="w-6 h-6" />
            </div>

            <h3 className="font-editorial text-2xl font-bold text-[#26344A] mb-2">
              Engineering Student Mindset
            </h3>
            <p className="text-sm text-[#747780] mb-6 font-medium">
              Computer Science & Engineering • {personalData.institution}
            </p>

            <div className="space-y-4 text-sm text-[#303039] leading-relaxed">
              {personalData.aboutStory.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Student Commitment Quote */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-start gap-3">
              <span className="font-editorial text-3xl text-[#9DB4A8] leading-none">“</span>
              <p className="text-xs italic text-[#747780] leading-relaxed">
                I do not claim decades of corporate mastery—I claim genuine curiosity, rapid learning agility, and an honest dedication to building functional code that helps people.
              </p>
            </div>
          </div>

          {/* Right Column: 5 Pillars / Principles Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((val, index) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className={`p-6 rounded-3xl bg-white/90 border border-white/60 shadow-2xs hover:shadow-sm transition-all hover:-translate-y-0.5 ${
                    index === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-[#26344A]"
                    style={{ backgroundColor: val.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-editorial text-lg font-bold text-[#26344A] mb-1.5">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#747780] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
