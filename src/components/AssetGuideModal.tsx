import React from 'react';
import { X, FileText, Image, Github, Key, CheckCircle2, Folder, ExternalLink, Code } from 'lucide-react';

interface AssetGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetGuideModal: React.FC<AssetGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26344A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-white overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#FAF8F3] border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#26344A] text-white flex items-center justify-center font-bold text-xs">
              SY
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-[#26344A]">
                Shaik Yasmin’s Portfolio Customization Guide
              </h3>
              <p className="text-xs text-[#747780]">
                Beginner-friendly steps to add your portrait, resume, and certificates.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#F2F3F5] hover:bg-gray-200 text-[#303039] transition-colors"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#303039] leading-relaxed">
          
          {/* Step 1: Adding Real Portrait */}
          <div className="p-4 rounded-2xl bg-[#EAF2FF] border border-[#DCEBFF] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#26344A] text-sm">
              <Image className="w-4 h-4 text-sky-700" />
              <span>1. How to Add Your Real Portrait Photograph</span>
            </div>
            <p>
              To replace the procedural geometric 3D avatar with your actual photograph:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[#26344A] pl-1">
              <li>Save your photo as <code>public/images/yasmin_portrait.jpg</code>.</li>
              <li>Open <code>src/data/personalData.ts</code>.</li>
              <li>Set <code>avatarUrl: "/images/yasmin_portrait.jpg"</code>.</li>
            </ol>
          </div>

          {/* Step 2: Adding Official Resume PDF */}
          <div className="p-4 rounded-2xl bg-[#F6EAF0] border border-[#F2D7E5] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#26344A] text-sm">
              <FileText className="w-4 h-4 text-pink-700" />
              <span>2. How to Add Your Official Resume PDF</span>
            </div>
            <p>
              To make the "View Resume PDF" and "Download PDF" buttons active in the Resume section:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[#26344A] pl-1">
              <li>Place your PDF at <code>public/resume.pdf</code>.</li>
              <li>In <code>src/data/personalData.ts</code>, change <code>hasCustomResumePdf: true</code>.</li>
              <li>The resume card will immediately switch from the placeholder slot to live download and view buttons.</li>
            </ol>
          </div>

          {/* Step 3: Adding Certificates & Hackathon Proofs */}
          <div className="p-4 rounded-2xl bg-[#EEE9FA] border border-[#DDD4F5] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#26344A] text-sm">
              <Folder className="w-4 h-4 text-indigo-700" />
              <span>3. Adding Verified Certificates & Hackathons</span>
            </div>
            <p>
              In strict compliance with authentic reporting, certificates are never faked. To add your real certificates:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[#26344A] pl-1">
              <li>Place certificate scans in <code>public/certificates/</code> (e.g. <code>hackathon_cert.pdf</code>).</li>
              <li>Open <code>src/data/achievementsData.ts</code> and add an object to <code>verifiedAchievements</code> array.</li>
              <li>The Achievements section will automatically display your verified milestone card.</li>
            </ol>
          </div>

          {/* Step 4: Configuring Gemini AI API Key */}
          <div className="p-4 rounded-2xl bg-[#E8F3ED] border border-[#CBDAD1] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#26344A] text-sm">
              <Key className="w-4 h-4 text-emerald-800" />
              <span>4. Configuring the Gemini 3.8 Flash AI Backend</span>
            </div>
            <p>
              The AI Learning Assistant, Doubt Clarifier, and Roadmap Generator are wired to server-side Gemini 3.8 Flash via <code>@google/genai</code>.
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[#26344A] pl-1">
              <li>In Google AI Studio, ensure your <code>GEMINI_API_KEY</code> is set in the <strong>Secrets</strong> panel.</li>
              <li>The Express server reads <code>process.env.GEMINI_API_KEY</code> securely without exposing keys to the browser.</li>
              <li>If no key is present, the website automatically falls back gracefully with helpful educational notices.</li>
            </ol>
          </div>

          {/* Step 5: Updating GitHub & Project Links */}
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#26344A] text-sm">
              <Github className="w-4 h-4 text-[#26344A]" />
              <span>5. Updating Project Repositories & Live Deployed URLs</span>
            </div>
            <p>
              Open <code>src/data/projectsData.ts</code>. You can update <code>githubUrl</code> and <code>liveDemoUrl</code> for <strong>Student AI Copilot</strong> and <strong>Student Performance Analyser</strong> anytime!
            </p>
          </div>

          {/* Step 6: Uploading and Adding AI Videos */}
          <div className="p-4 rounded-2xl bg-[#EAF2FF] border border-[#DCEBFF] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#26344A] text-sm">
              <Folder className="w-4 h-4 text-sky-700" />
              <span>6. How to Upload and Display AI-Generated Videos</span>
            </div>
            <p>
              To add your AI-generated videos to the <strong>AI Creations & Video Gallery</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[#26344A] pl-1">
              <li>Place your compressed MP4 video file in <code>public/videos/</code> (e.g. <code>public/videos/ai-video-01.mp4</code>).</li>
              <li>Optionally place a poster image in <code>public/images/videos/</code> (e.g. <code>public/images/videos/poster-01.jpg</code>).</li>
              <li>Open <code>src/data/aiVideos.ts</code> and add an entry to <code>aiVideosList</code>:
                <pre className="mt-1 p-2 rounded bg-white text-[10px] text-[#303039] font-mono overflow-x-auto">
{`{
  id: 'my-video-1',
  title: 'My AI Cinematic Concept',
  description: 'Story exploration of generative visuals.',
  category: 'AI Cinematic Videos',
  videoPath: '/videos/ai-video-01.mp4',
  posterPath: '/images/videos/poster-01.jpg',
  creationDate: '2026',
  duration: '0:30',
  isAvailableLocally: true
}`}
                </pre>
              </li>
              <li>The video will immediately appear in the gallery with playback, volume, timeline scrubbing, and full-screen lightbox!</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF8F3] border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors"
          >
            Got it, Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
