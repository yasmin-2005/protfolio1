import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  portfolio: string;
  github: string;
  linkedin: string;
  objective: string;
  education: Array<{ degree: string; institution: string; year: string; score?: string }>;
  skills: string;
  projects: Array<{ title: string; tech: string; description: string }>;
  experience: Array<{ role: string; organization: string; period: string; details: string }>;
  certifications: string;
}

const defaultResume: ResumeData = {
  fullName: 'Shaik Yasmin',
  email: 'shaikmehayas1221@gmail.com',
  phone: '+91 8074754865',
  portfolio: 'https://shaikyasmin.dev',
  github: 'https://github.com/shaikyasmin',
  linkedin: 'https://linkedin.com/in/shaikyasmin',
  objective:
    'Dedicated and enthusiastic Computer Science student at Vaagdevi College of Engineering who enjoys working with people and taking initiative. Believes in learning through experience and contributing positively to the community. Strong interest in leadership, volunteering, and collaborating on practical digital engineering applications.',
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Vaagdevi College of Engineering',
      year: '2024 – 2028',
      score: 'CGPA: 8.10',
    },
    {
      degree: 'Intermediate (MPC)',
      institution: 'Telangana Minorities Residential School & Junior College',
      year: '2022 – 2024',
      score: '90.7%',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Telangana Minorities Residential School & Junior College',
      year: '2022',
      score: 'CGPA: 9.7',
    },
  ],
  skills:
    'C Language, Python Programming, Java, HTML5, CSS3, JavaScript, AI Prompting, Web Development, Microsoft Excel, PowerPoint, Tableau',
  projects: [
    {
      title: 'Student Performance Analyser',
      tech: 'Python, Data Analysis, Tableau, HTML/CSS (MANAC Infotech Certified)',
      description:
        'A student-focused project for exploring academic performance information, semester marks distribution, and presenting useful insights in an understandable format.',
    },
    {
      title: 'Student AI Copilot',
      tech: 'Python, Generative AI, HTML/CSS, Prompt Engineering',
      description:
        'An AI-powered student assistant project designed to help learners explore learning tools, clarify questions, and organize academic workflows with Telugu translation support.',
    },
  ],
  experience: [],
  certifications:
    'HackWithHyderabad 3.0 Participant (Microsoft Office), Project Completion (MANAC Infotech), Python Essentials 1 & 2 (Cisco & Python Institute), C Essentials 1 (Cisco & C++ Institute), PGDCA Grade "A", Chess Competition Merit',
};

export const ResumeBuilder: React.FC = () => {
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [isImproving, setIsImproving] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('preview');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // Enhance objective using server AI
  const handleEnhanceObjective = async () => {
    if (!resume.objective.trim()) return;
    setIsImproving(true);
    try {
      const res = await fetch('/api/ai/resume-improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'Career Objective',
          text: resume.objective,
          role: 'Computer Science Engineering Student',
        }),
      });
      const data = await res.json();
      if (data.improvedText) {
        setResume((prev) => ({ ...prev, objective: data.improvedText }));
        if (data.suggestions) {
          setAiSuggestions(data.suggestions);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsImproving(false);
    }
  };

  const handlePrint = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
    });
    window.print();
  };

  const handleAddProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: 'New Project Title', tech: 'Technologies Used', description: 'Brief description of what you built.' },
      ],
    }));
  };

  const handleRemoveProject = (index: number) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="font-editorial text-2xl font-bold text-[#26344A]">
              Build My Resume
            </h3>
          </div>
          <p className="text-xs text-[#747780]">
            Generate an authentic, elegant student resume. No fabricated qualifications. Isolated to your current browser session.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-[#F2F3F5] rounded-full p-1 text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                activeTab === 'preview' ? 'bg-white text-[#26344A] shadow-2xs' : 'text-[#747780]'
              }`}
            >
              Resume Preview
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                activeTab === 'edit' ? 'bg-white text-[#26344A] shadow-2xs' : 'text-[#747780]'
              }`}
            >
              Edit Form Fields
            </button>
          </div>

          {/* Print / Save as PDF */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Open browser print dialog to save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* AI Enhancement Notice */}
      {aiSuggestions.length > 0 && (
        <div className="mb-6 p-4 rounded-2xl bg-[#E8F3ED] border border-[#CBDAD1] text-xs text-[#26344A]">
          <span className="font-bold block mb-1">✨ AI Consultant Suggestions Applied:</span>
          <ul className="list-disc list-inside space-y-0.5">
            {aiSuggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* TAB 1: EDIT FORM */}
      {activeTab === 'edit' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#26344A] block mb-1">Full Name</label>
              <input
                type="text"
                value={resume.fullName}
                onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#26344A] block mb-1">Email</label>
              <input
                type="email"
                value={resume.email}
                onChange={(e) => setResume({ ...resume, email: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#26344A] block mb-1">Phone (Optional)</label>
              <input
                type="text"
                value={resume.phone}
                onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#26344A] block mb-1">GitHub Profile</label>
              <input
                type="text"
                value={resume.github}
                onChange={(e) => setResume({ ...resume, github: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#26344A] block mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={resume.linkedin}
                onChange={(e) => setResume({ ...resume, linkedin: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#26344A] block mb-1">Portfolio Link</label>
              <input
                type="text"
                value={resume.portfolio}
                onChange={(e) => setResume({ ...resume, portfolio: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#26344A]">Career Objective</label>
              <button
                type="button"
                onClick={handleEnhanceObjective}
                disabled={isImproving}
                className="text-[11px] font-semibold text-[#26344A] bg-[#EAF2FF] hover:bg-[#DCEBFF] px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
              >
                <Wand2 className="w-3 h-3 text-sky-600" />
                <span>{isImproving ? 'Polishing with AI...' : 'Polish with AI'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={resume.objective}
              onChange={(e) => setResume({ ...resume, objective: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#26344A] block mb-1">Technical Skills</label>
            <input
              type="text"
              value={resume.skills}
              onChange={(e) => setResume({ ...resume, skills: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
              placeholder="Comma separated skills..."
            />
          </div>

          {/* Projects editing */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#26344A]">Projects</label>
              <button
                type="button"
                onClick={handleAddProject}
                className="text-[11px] font-semibold text-[#26344A] bg-[#F2F3F5] hover:bg-gray-200 px-2.5 py-1 rounded-md flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-3">
              {resume.projects.map((proj, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F3] border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const newProjects = [...resume.projects];
                        newProjects[idx].title = e.target.value;
                        setResume({ ...resume, projects: newProjects });
                      }}
                      className="text-xs font-bold text-[#26344A] bg-transparent border-b border-gray-300 pb-0.5 focus:outline-none w-2/3"
                      placeholder="Project Title"
                    />
                    <button
                      onClick={() => handleRemoveProject(idx)}
                      className="text-red-500 hover:text-red-700 text-xs p-1"
                      title="Remove Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={proj.tech}
                    onChange={(e) => {
                      const newProjects = [...resume.projects];
                      newProjects[idx].tech = e.target.value;
                      setResume({ ...resume, projects: newProjects });
                    }}
                    className="w-full text-[11px] text-[#747780] bg-transparent border-b border-gray-200 pb-0.5 focus:outline-none"
                    placeholder="Technologies Used"
                  />
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => {
                      const newProjects = [...resume.projects];
                      newProjects[idx].description = e.target.value;
                      setResume({ ...resume, projects: newProjects });
                    }}
                    className="w-full text-xs p-2 rounded-lg bg-white border border-gray-200 focus:outline-none"
                    placeholder="Description..."
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#26344A] block mb-1">
              Certifications & Hackathons (Verified only)
            </label>
            <input
              type="text"
              value={resume.certifications}
              onChange={(e) => setResume({ ...resume, certifications: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setActiveTab('preview')}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#26344A]"
            >
              Done Editing &rarr; View Formatted Resume
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE PRINTABLE FORMATTED RESUME */}
      {activeTab === 'preview' && (
        <div className="flex flex-col items-center">
          
          {/* Resume Paper Container */}
          <div
            id="printable-resume"
            className="w-full max-w-3xl bg-white p-8 sm:p-12 rounded-2xl shadow-xs border border-gray-200 text-[#303039]"
          >
            {/* Header */}
            <div className="border-b-2 border-[#26344A] pb-4 mb-6 text-center">
              <h1 className="font-editorial text-3xl font-bold text-[#26344A] tracking-wide mb-1">
                {resume.fullName || 'Shaik Yasmin'}
              </h1>
              <p className="text-xs text-[#747780] font-medium tracking-wide uppercase mb-2">
                Computer Science Engineering Student
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#747780]">
                {resume.email && <span>{resume.email}</span>}
                {resume.phone && <span>• {resume.phone}</span>}
                {resume.github && <span>• {resume.github.replace('https://', '')}</span>}
                {resume.linkedin && <span>• {resume.linkedin.replace('https://', '')}</span>}
              </div>
            </div>

            {/* Objective */}
            {resume.objective && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#26344A] border-b border-gray-200 pb-1 mb-2">
                  Career Objective
                </h2>
                <p className="text-xs text-[#303039] leading-relaxed text-justify">
                  {resume.objective}
                </p>
              </div>
            )}

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#26344A] border-b border-gray-200 pb-1 mb-2">
                Education
              </h2>
              {resume.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs mb-1.5">
                  <div>
                    <span className="font-bold text-[#26344A]">{edu.degree}</span>
                    <span className="text-[#747780]"> — {edu.institution}</span>
                  </div>
                  <span className="text-[11px] text-[#747780] font-medium">{edu.year}</span>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            {resume.skills && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#26344A] border-b border-gray-200 pb-1 mb-2">
                  Technical Tools & Skills
                </h2>
                <p className="text-xs text-[#303039] leading-relaxed">
                  {resume.skills}
                </p>
              </div>
            )}

            {/* Projects */}
            {resume.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#26344A] border-b border-gray-200 pb-1 mb-2">
                  Academic & Engineering Projects
                </h2>
                <div className="space-y-3">
                  {resume.projects.map((proj, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-bold text-[#26344A]">{proj.title}</span>
                        <span className="text-[10px] italic text-[#747780]">{proj.tech}</span>
                      </div>
                      <p className="text-[11px] text-[#303039] leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications & Co-Curricular */}
            {resume.certifications && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#26344A] border-b border-gray-200 pb-1 mb-2">
                  Honors, Challenges & Milestones
                </h2>
                <p className="text-xs text-[#303039] leading-relaxed">
                  {resume.certifications}
                </p>
              </div>
            )}
          </div>

          {/* Bottom helper */}
          <div className="mt-4 flex items-center gap-3 text-xs text-[#747780]">
            <span>💡 Click <strong>Print / PDF</strong> above to save as a clean PDF formatted for recruitment.</span>
          </div>
        </div>
      )}

    </div>
  );
};
