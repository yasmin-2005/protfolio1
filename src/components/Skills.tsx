import React, { useState } from 'react';
import {
  Terminal,
  Code2,
  Palette,
  Globe,
  Sparkles,
  Bot,
  Cpu,
  Image as ImageIcon,
  Video,
  Lightbulb,
  Compass,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { skillsData, skillsCategories, SkillItem } from '../data/skillsData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return Terminal;
      case 'Code2': return Code2;
      case 'Palette': return Palette;
      case 'Globe': return Globe;
      case 'Sparkles': return Sparkles;
      case 'Bot': return Bot;
      case 'Cpu': return Cpu;
      case 'Image': return ImageIcon;
      case 'Video': return Video;
      case 'Lightbulb': return Lightbulb;
      case 'Compass': return Compass;
      default: return Layers;
    }
  };

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative bg-[#E8F3ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#CBDAD1] text-xs font-semibold text-[#26344A] mb-3 shadow-2xs">
              <span>Technical Foundations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26344A] font-editorial tracking-tight">
              Tools I’m Exploring
            </h2>
          </div>
          <p className="text-sm text-[#747780] max-w-md">
            Technologies and concepts I am actively experimenting with, studying, and using in student projects. No arbitrary percentage bars—only real exploratory focus.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillsCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#26344A] text-white shadow-xs'
                    : 'bg-white/80 text-[#303039] hover:bg-white hover:text-[#26344A] border border-gray-200/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = getIcon(skill.icon);
            return (
              <div
                key={skill.id}
                onClick={() => setActiveSkill(skill)}
                className="group p-6 rounded-3xl bg-white border border-white/80 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#26344A] transition-transform group-hover:scale-105"
                      style={{ backgroundColor: skill.accentBg }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F2F3F5] text-[#747780]">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#26344A] mb-2 group-hover:text-[#486581] transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-[#303039]/80 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                    {skill.focusAreas.slice(0, 3).map((area) => (
                      <span
                        key={area}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF8F3] text-[#747780] border border-gray-100"
                      >
                        {area}
                      </span>
                    ))}
                    {skill.focusAreas.length > 3 && (
                      <span className="text-[10px] font-medium text-[#9DB4A8] self-center">
                        +{skill.focusAreas.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill Detail Modal */}
        {activeSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26344A]/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-7 shadow-2xl border border-white relative animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#26344A]"
                  style={{ backgroundColor: activeSkill.accentBg }}
                >
                  {React.createElement(getIcon(activeSkill.icon), { className: 'w-6 h-6' })}
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="w-8 h-8 rounded-full bg-[#F2F3F5] hover:bg-gray-200 flex items-center justify-center text-[#303039] text-xs font-bold transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-[#26344A] mb-1">
                {activeSkill.name}
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EAF2FF] text-[#26344A] inline-block mb-4">
                {activeSkill.category}
              </span>

              <p className="text-sm text-[#303039] leading-relaxed mb-6">
                {activeSkill.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-bold text-[#26344A] uppercase tracking-wider mb-2.5">
                  Core Focus Areas
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeSkill.focusAreas.map((area) => (
                    <div
                      key={area}
                      className="px-3 py-2 rounded-xl bg-[#F2F3F5]/80 text-xs text-[#303039] font-medium flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#26344A]" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#E8F3ED] text-xs text-[#26344A] flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 text-[#26344A] mt-0.5" />
                <p>
                  Curious to see how I apply this? Ask my AI Assistant on this page to explain concepts in {activeSkill.name}!
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setActiveSkill(null)}
                  className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
