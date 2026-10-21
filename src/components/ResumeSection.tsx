import React, { useState } from 'react';
import { FileText, Download, Eye, AlertCircle, Compass, CheckCircle2, UploadCloud } from 'lucide-react';
import { personalData } from '../data/personalData';
import { BotanicalCornerVine, BotanicalDivider } from './BotanicalDecorations';

interface ResumeSectionProps {
  onOpenAssetGuide?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenAssetGuide }) => {
  const [hasPdf, setHasPdf] = useState(personalData.hasCustomResumePdf);

  return (
    <section id="resume" className="py-24 relative bg-[#FAF8F3] overflow-hidden">
      {/* Botanical Corner Accent for Resume Section */}
      <BotanicalCornerVine position="top-right" size="md" className="top-4 right-2 sm:right-6 opacity-35" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBDAD1] text-xs font-semibold text-[#26344A] mb-3 shadow-2xs">
            <span>Verified Document</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26344A] font-editorial tracking-tight mb-2">
            My Resume
          </h2>
          <p className="text-base text-[#303039]/80 leading-relaxed font-sans mb-4">
            Official curriculum vitae documenting academic coursework, engineering projects, and technical skills.
          </p>
          <BotanicalDivider centered={false} className="opacity-60" />
        </div>

        {/* Premium Resume Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200/80 relative overflow-hidden">
          <BotanicalCornerVine position="bottom-right" size="sm" className="bottom-0 right-0 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Icon & Graphic */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-[#EAF2FF] via-[#F6EAF0] to-[#EEE9FA] border border-white text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#26344A] mb-4">
                <FileText className="w-8 h-8 text-[#26344A]" />
              </div>
              <h4 className="font-editorial text-lg font-bold text-[#26344A] mb-1">
                Curriculum Vitae
              </h4>
              <p className="text-xs text-[#747780]">
                {personalData.name} • 2026 Edition
              </p>
            </div>

            {/* Right Information & Real State */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3ED] text-xs font-semibold text-[#26344A] mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Student Engineering Profile</span>
                </div>

                <h3 className="text-2xl font-bold font-editorial text-[#26344A] mb-2">
                  Academic & Technical Dossier
                </h3>

                <p className="text-sm text-[#303039] leading-relaxed mb-6">
                  Features comprehensive documentation of computer science coursework, Python applications, web interface development, and generative AI research projects.
                </p>
              </div>

              {hasPdf ? (
                /* When PDF has been provided */
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                  <a
                    href={personalData.resumePdfPath}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Verified Resume</span>
                  </a>

                  <a
                    href="#ai-assistant"
                    className="px-6 py-3 rounded-full text-xs font-semibold text-[#26344A] bg-[#EAF2FF] hover:bg-[#DCEBFF] transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-sky-700" />
                    <span>Open Printable Resume Studio</span>
                  </a>

                  <a
                    href={personalData.resumePdfPath}
                    download="Shaik_Yasmin_Resume.txt"
                    className="px-5 py-3 rounded-full text-xs font-semibold text-[#747780] hover:text-[#26344A] bg-[#F2F3F5] hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download TXT Dossier</span>
                  </a>
                </div>
              ) : (
                /* Honest State when resume.pdf has not yet been dropped into public folder */
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-gray-200">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-[#26344A]">
                        Official PDF Upload Slot Ready
                      </h5>
                      <p className="text-xs text-[#747780] mt-0.5 leading-relaxed">
                        To maintain 100% authentic reporting, no nonexistent PDF is linked. To make your official PDF downloadable, simply place your <code>resume.pdf</code> into the <code>public/</code> folder.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200/60">
                    <a
                      href="#ai-assistant"
                      className="text-xs font-semibold text-[#26344A] hover:underline flex items-center gap-1"
                    >
                      <span>Try the interactive AI Resume Builder instead &rarr;</span>
                    </a>
                    {onOpenAssetGuide && (
                      <button
                        onClick={onOpenAssetGuide}
                        className="text-xs font-semibold text-[#486581] hover:underline ml-auto"
                      >
                        PDF Setup Instructions
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
