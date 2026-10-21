import React from 'react';
import { ArrowDown, Bot, Code2, Sparkles, Terminal, ChevronRight, Layers } from 'lucide-react';
import { personalData } from '../data/personalData';
import { Hero3D } from './Hero3D';
import { HeroBackgroundScene } from './HeroBackgroundScene';
import { BotanicalCornerVine, BotanicalAccentBranch, BotanicalEdgeVine } from './BotanicalDecorations';

interface HeroProps {
  onOpenAssetGuide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAssetGuide }) => {
  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 flex items-center overflow-hidden">
      {/* React Three Fiber interactive particle & floating shape system */}
      <HeroBackgroundScene />

      {/* Delicate Botanical Line-Art Corner Vines */}
      <BotanicalCornerVine position="top-left" size="lg" className="top-12 left-0 sm:left-2 opacity-65" />
      <BotanicalCornerVine position="bottom-right" size="md" className="bottom-2 right-0 sm:right-2 opacity-55" />
      <BotanicalEdgeVine side="left" className="opacity-35" />
      <BotanicalEdgeVine side="right" className="opacity-35" />

      {/* Background soft ambient pastel blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#EAF2FF] rounded-full blur-3xl opacity-50 -z-20 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#F6EAF0] rounded-full blur-3xl opacity-40 -z-20 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#EEE9FA] rounded-full blur-3xl opacity-40 -z-20 pointer-events-none" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column — Introduction (Style 2 Split-Screen) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Small Subtitle */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#DCEBFF] shadow-2xs mb-4 backdrop-blur-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-[#26344A] tracking-wider uppercase">
                Computer Science Engineering Student
              </span>
            </div>

            {/* Prominent Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#26344A] font-editorial tracking-tight leading-[1.08] mb-3">
              Shaik Yasmin
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-editorial italic text-[#486581] mb-5">
              “Ideas Into Interactive Experiences.”
            </p>

            {/* Concise Introduction */}
            <p className="text-base sm:text-lg text-[#303039]/90 leading-relaxed max-w-xl mb-8 font-normal">
              Hi, I'm Shaik Yasmin, a Computer Science Engineering student exploring web development, Python, artificial intelligence, Generative AI, and creative technology. I enjoy learning new tools, solving problems, and transforming ideas into practical digital experiences through projects and experimentation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              <a
                href="#projects"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-[#26344A] hover:bg-[#344662] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 group"
              >
                <span>Explore My Projects</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#ai-assistant"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm text-[#26344A] bg-white hover:bg-[#F2F3F5] border border-gray-200 transition-all shadow-2xs hover:shadow text-center flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-sky-600" />
                <span>Meet My AI Assistant</span>
              </a>
            </div>

            {/* Small Row of Skills */}
            <div className="pt-6 border-t border-gray-200/70 w-full flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-[#747780] mr-1">Skills:</span>
              {['Python', 'Web Development', 'AI', 'Prompt Engineering', 'Creative Technology'].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-white/90 border border-gray-200/90 text-[#26344A] font-medium shadow-2xs transition-transform hover:scale-105"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column — 3D Portrait Visualization */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <Hero3D onOpenAssetGuide={onOpenAssetGuide} />
            <p className="mt-4 text-[11px] text-[#747780] text-center max-w-sm">
              Interactive 3D portrait with spatial depth, glass reflections, and pointer tilt.
            </p>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-14 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 text-xs text-[#747780] hover:text-[#26344A] transition-colors focus:outline-none"
            aria-label="Scroll down to About section"
          >
            <span className="tracking-widest uppercase text-[10px] font-medium">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-[#CBDAD1] flex items-start justify-center p-1">
              <div className="w-1.5 h-2.5 rounded-full bg-[#26344A] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
