import React, { useState } from 'react';
import { Award, Trophy, Compass, PlusCircle, ExternalLink, Calendar, CheckCircle, FileText } from 'lucide-react';
import { verifiedAchievements, achievementTemplateSample } from '../data/achievementsData';
import { BotanicalCornerVine, BotanicalDivider } from './BotanicalDecorations';

interface AchievementsProps {
  onOpenAssetGuide?: () => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ onOpenAssetGuide }) => {
  const [showSamplePreview, setShowSamplePreview] = useState(false);

  const displayList = verifiedAchievements.length > 0
    ? verifiedAchievements
    : (showSamplePreview ? [achievementTemplateSample] : []);

  return (
    <section id="growth" className="py-24 relative bg-[#FAF8F3] overflow-hidden">
      {/* Botanical Corner Accent for Growth & Achievements */}
      <BotanicalCornerVine position="top-right" size="md" className="top-4 right-2 sm:right-6 opacity-35" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBDAD1] text-xs font-semibold text-[#26344A] mb-3 shadow-2xs">
              <span>Authentic Records</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26344A] font-editorial tracking-tight mb-2">
              Experiences That Help Me Grow
            </h2>
            <p className="text-sm text-[#747780] max-w-md">
              Hackathons, technical symposiums, and engineering milestones. In accordance with honest student reporting, unverified records are never fabricated.
            </p>
          </div>
          <div className="hidden md:block">
            <BotanicalDivider centered={false} className="opacity-50" />
          </div>
        </div>


        {/* Content: Either verified cards OR elegant invitation state */}
        {displayList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayList.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EAF2FF] text-[#26344A]">
                      {item.type}
                    </span>
                    <span className="text-xs text-[#747780] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#26344A] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-[#747780] mb-3">
                    {item.organizer}
                  </p>
                  <p className="text-xs sm:text-sm text-[#303039] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-medium">
                    ✓ Verified Participation
                  </span>
                  {item.certificateUrl && (
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#26344A] hover:underline flex items-center gap-1"
                    >
                      <span>Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Elegant Empty State inviting Shaik Yasmin to add records */
          <div className="rounded-3xl bg-white border border-gray-200/80 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#EAF2FF] via-[#F6EAF0] to-[#EEE9FA] flex items-center justify-center text-[#26344A] mx-auto mb-6 shadow-xs border border-white">
              <Trophy className="w-8 h-8 text-[#26344A]" />
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#26344A] mb-3">
              Ready for Verified Milestones
            </h3>

            <p className="text-sm text-[#303039]/80 leading-relaxed max-w-md mx-auto mb-8">
              This space is dedicated to upcoming hackathons, college coding contests, and technical certifications. As Shaik Yasmin validates new milestones, they appear here with real credentials.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {onOpenAssetGuide && (
                <button
                  onClick={onOpenAssetGuide}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>How to Add Verified Milestones</span>
                </button>
              )}

              <button
                onClick={() => setShowSamplePreview(true)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#26344A] bg-[#F2F3F5] hover:bg-gray-200 transition-colors"
              >
                Preview Card Layout
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
