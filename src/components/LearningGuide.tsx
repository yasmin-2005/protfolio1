import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Lightbulb,
  Loader2
} from 'lucide-react';

interface Stage {
  stage: string;
  duration: string;
  summary: string;
  topics: string[];
  exercise: string;
  project: string;
}

interface LearningPlanResult {
  topic: string;
  level: string;
  stages: Stage[];
  nextSteps: string[];
  source?: string;
  isAiConfigured?: boolean;
}

export const LearningGuide: React.FC = () => {
  const [topic, setTopic] = useState('Python from basics');
  const [level, setLevel] = useState('Beginner');
  const [goal, setGoal] = useState('Build practical projects and understand fundamentals');
  const [timeCommitment, setTimeCommitment] = useState('4-5 hours per week');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<LearningPlanResult | null>(null);

  const quickTopics = [
    'Python from basics',
    'HTML & Modern CSS Layouts',
    'Generative AI & Prompt Engineering',
    'Computer Science Data Structures',
    'Full Stack Web Development',
  ];

  const handleGeneratePlan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/learning-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          level,
          goal,
          timeCommitment,
        }),
      });

      const data = await res.json();
      setPlan(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
      
      {/* Header */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h3 className="font-editorial text-2xl font-bold text-[#26344A]">
            Guide My Learning
          </h3>
        </div>
        <p className="text-xs text-[#747780]">
          Get a structured, step-by-step roadmap tailored to your current level and available study hours.
        </p>
      </div>

      {/* Form Grid */}
      <form onSubmit={handleGeneratePlan} className="space-y-5 mb-8">
        
        {/* Topic Input & Quick Chips */}
        <div>
          <label className="text-xs font-bold text-[#26344A] block mb-1.5">
            What topic would you like to master?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Python from basics, Prompt engineering, HTML/CSS..."
            className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
            required
          />

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="text-[11px] text-[#747780] self-center mr-1">Quick ideas:</span>
            {quickTopics.map((qt) => (
              <button
                key={qt}
                type="button"
                onClick={() => setTopic(qt)}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                  topic === qt
                    ? 'bg-[#26344A] text-white border-[#26344A]'
                    : 'bg-[#FAF8F3] hover:bg-[#F2F3F5] text-[#303039] border-gray-200'
                }`}
              >
                {qt}
              </button>
            ))}
          </div>
        </div>

        {/* Level, Goal, and Time Commitment */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-[#26344A] block mb-1">
              Current Knowledge Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#26344A]"
            >
              <option value="Absolute Beginner">Absolute Beginner</option>
              <option value="Beginner (Some theory)">Beginner (Some theory)</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#26344A] block mb-1">
              Primary Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#26344A]"
            >
              <option value="Build practical projects and understand fundamentals">Build practical projects</option>
              <option value="Prepare for campus engineering interviews">Campus interview prep</option>
              <option value="Clarify academic syllabus concepts">College exam & syllabus clarity</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#26344A] block mb-1">
              Available Study Time
            </label>
            <select
              value={timeCommitment}
              onChange={(e) => setTimeCommitment(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#26344A]"
            >
              <option value="2-3 hours per week">2-3 hours / week</option>
              <option value="4-5 hours per week">4-5 hours / week</option>
              <option value="8+ hours per week">8+ hours / week (Intensive)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Personalized Roadmap...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>Generate My Learning Plan</span>
            </>
          )}
        </button>
      </form>

      {/* Generated Roadmap Result */}
      {plan && (
        <div className="pt-6 border-t border-gray-100 animate-in fade-in duration-300">
          
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Custom Roadmap Ready
              </span>
              <h4 className="font-editorial text-2xl font-bold text-[#26344A] mt-1">
                {plan.topic} Roadmap
              </h4>
            </div>

            <span className="text-xs text-[#747780]">
              Target Level: <strong>{plan.level}</strong>
            </span>
          </div>

          {/* Stages List */}
          <div className="space-y-4 mb-8">
            {plan.stages?.map((stage, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF8F3] border border-gray-200 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#26344A] text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h5 className="font-editorial text-lg font-bold text-[#26344A]">
                      {stage.stage}
                    </h5>
                  </div>
                  {stage.duration && (
                    <span className="text-xs font-medium text-[#747780] bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                      {stage.duration}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#303039] leading-relaxed">
                  {stage.summary}
                </p>

                {/* Topics list */}
                {stage.topics && stage.topics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {stage.topics.map((t, ti) => (
                      <div key={ti} className="text-xs text-[#26344A] flex items-start gap-1.5 bg-white p-2 rounded-lg border border-gray-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Exercise & Project */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  {stage.exercise && (
                    <div className="p-2.5 rounded-xl bg-white border border-gray-100">
                      <span className="font-bold text-[#26344A] block mb-0.5">✍️ Practice Exercise:</span>
                      <span className="text-[#747780]">{stage.exercise}</span>
                    </div>
                  )}
                  {stage.project && (
                    <div className="p-2.5 rounded-xl bg-white border border-gray-100">
                      <span className="font-bold text-[#26344A] block mb-0.5">🚀 Mini-Project Milestone:</span>
                      <span className="text-[#747780]">{stage.project}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          {plan.nextSteps && plan.nextSteps.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#E8F3ED] border border-[#CBDAD1]">
              <h5 className="text-xs font-bold text-[#26344A] uppercase tracking-wider mb-2">
                Recommended Habits & Next Steps
              </h5>
              <ul className="space-y-1.5 text-xs text-[#26344A]">
                {plan.nextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
