import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { personalData } from '../data/personalData';
import { BotanicalDivider, BotanicalCornerVine } from './BotanicalDecorations';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF8F3] border-t border-gray-200/80 py-12 text-[#303039] relative overflow-hidden">
      <BotanicalCornerVine position="bottom-left" size="sm" className="bottom-0 left-0 opacity-25" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Motto */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="font-editorial text-lg font-bold text-[#26344A]">
                {personalData.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F3ED] text-[#26344A] font-semibold">
                CSE Student
              </span>
            </div>
            <p className="text-xs text-[#747780]">
              “Designed with curiosity and built through continuous learning.”
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personalData.email}`}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#26344A] hover:bg-[#EAF2FF] transition-colors"
              title="Send email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={personalData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#26344A] hover:bg-[#F6EAF0] transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#26344A] hover:bg-[#EEE9FA] transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-[#26344A] text-white flex items-center justify-center hover:bg-[#344662] transition-colors ml-2"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Botanical Divider */}
        <div className="mt-8 mb-4">
          <BotanicalDivider centered={true} className="opacity-55" />
        </div>

        {/* Copyright notice */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#747780] gap-2">
          <div>
            &copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with React, Three.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

