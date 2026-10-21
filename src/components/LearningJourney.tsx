import React, { useState } from 'react';
import { Compass, Hammer, Sparkles, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { timelineData, TimelineStage } from '../data/timelineData';

export const LearningJourney: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>(timelineData[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'Hammer': return Hammer;
      case 'Sparkles': return Sparkles;
      case 'Award': return Award;
      case 'TrendingUp': return TrendingUp;
      default: return Sparkles;
    }
  };

  const activeStage = timelineData.find((s) => s.id === activeStageId) || timelineData[0];

  return (
    <section id="journey" className="py-24 relative bg-[#E8F3ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#CBDAD1] text-xs font-semibold text-[#26344A] mb-3 shadow-2xs">
            <span>Milestones & Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26344A] font-editorial tracking-tight mb-4">
            My Learning Journey
          </h2>
          <p className="text-sm sm:text-base text-[#303039]/80 leading-relaxed">
            The ongoing trajectory of a Computer Science Engineering student: from foundational curiosity to building interactive applications, exploring Generative AI, and growing through feedback.
          </p>
        </div>

        {/* Desktop Interactive Horizontal Timeline & Mobile Stepper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Timeline Stages Selector (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            {timelineData.map((stage, idx) => {
              const Icon = getIcon(stage.icon);
              const isActive = stage.id === activeStageId;

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex items-center gap-4 border ${
                    isActive
                      ? 'bg-white shadow-sm border-white scale-[1.02]'
                      : 'bg-white/60 hover:bg-white/90 border-transparent text-[#303039]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                      isActive ? 'scale-110 shadow-2xs' : ''
                    }`}
                    style={{ backgroundColor: stage.highlightColor }}
                  >
                    <Icon className="w-5 h-5 text-[#26344A]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-editorial text-lg font-bold text-[#26344A] truncate">
                        {stage.stage}
                      </h4>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FAF8F3] text-[#747780]">
                        Phase {idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-[#747780] truncate mt-0.5">
                      {stage.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Stage Detail Card (Right Column) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-white">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-[#26344A] uppercase tracking-wider">
                  {activeStage.period}
                </span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EAF2FF] text-[#26344A]">
                Stage: {activeStage.stage}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#26344A] mb-2">
              {activeStage.stage}: {activeStage.tagline}
            </h3>

            <p className="text-sm sm:text-base text-[#303039] leading-relaxed mb-8">
              {activeStage.description}
            </p>

            <h4 className="text-xs font-bold text-[#26344A] uppercase tracking-wider mb-4">
              Key Focus & Understandings Gained:
            </h4>

            <div className="space-y-3 mb-8">
              {activeStage.keyLearnings.map((learning, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F3] border border-gray-100 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#303039] font-medium">
                    {learning}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#E8F3ED] text-xs text-[#26344A] flex items-center justify-between">
              <span>Next up: Continuous exploration and deepening system design concepts.</span>
              <span className="font-semibold text-[11px] underline">Active Roadmap</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
