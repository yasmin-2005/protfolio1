import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { personalData } from '../data/personalData';
import { BotanicalCornerVine, BotanicalDivider } from './BotanicalDecorations';

interface ContactProps {
  onOpenAssetGuide?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenAssetGuide }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill out all fields before sending.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Network error communicating with the server.');
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#E8F3ED] overflow-hidden">
      {/* Botanical Corner Accent for Contact Section */}
      <BotanicalCornerVine position="top-right" size="md" className="top-4 right-2 sm:right-6 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#CBDAD1] text-xs font-semibold text-[#26344A] mb-3 shadow-2xs">
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26344A] font-editorial tracking-tight mb-3">
            Let’s Connect
          </h2>
          <p className="text-base text-[#303039]/80 leading-relaxed font-sans mb-4">
            Whether you have questions about student projects, collaborate on engineering hackathons, or want to discuss emerging AI tools—I'd love to hear from you.
          </p>
          <BotanicalDivider centered={false} className="opacity-60" />
        </div>


        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Profile info */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-xs border border-white">
            <h3 className="font-editorial text-2xl font-bold text-[#26344A] mb-2">
              Get in Touch
            </h3>
            <p className="text-xs text-[#747780] mb-6">
              Verified communication channels and academic institution.
            </p>

            <div className="space-y-4 mb-8">
              {/* Email */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F3] border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center text-[#26344A] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780] block">
                    Institutional Email
                  </span>
                  <a
                    href={`mailto:${personalData.email}`}
                    className="text-xs font-semibold text-[#26344A] hover:underline break-all"
                  >
                    {personalData.email}
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F3] border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#F6EAF0] flex items-center justify-center text-[#26344A] shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780] block">
                    Code Repository
                  </span>
                  <a
                    href={personalData.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#26344A] hover:underline"
                  >
                    github.com/shaikyasmin
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F3] border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#EEE9FA] flex items-center justify-center text-[#26344A] shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780] block">
                    Professional Network
                  </span>
                  <a
                    href={personalData.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#26344A] hover:underline"
                  >
                    linkedin.com/in/shaikyasmin
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F3] border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3ED] flex items-center justify-center text-[#26344A] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780] block">
                    Location & Campus
                  </span>
                  <span className="text-xs font-semibold text-[#26344A]">
                    {personalData.institution}, {personalData.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Final CTA callout requested in Master Prompt */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#26344A] to-[#344662] text-white text-center">
              <span className="font-editorial text-lg tracking-wide italic font-medium block">
                “Think. Build. Explore.”
              </span>
              <span className="text-[10px] opacity-80 mt-1 block tracking-wider uppercase">
                Shaik Yasmin’s Guiding Motto
              </span>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-xs border border-white">
            <h3 className="font-editorial text-2xl font-bold text-[#26344A] mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[#747780] mb-6">
              Connects directly to the verified backend message intake service.
            </p>

            {status === 'success' ? (
              <div className="p-6 rounded-2xl bg-[#E8F3ED] border border-[#CBDAD1] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-xl font-bold text-[#26344A]">
                  Message Received!
                </h4>
                <p className="text-xs text-[#303039] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to Shaik Yasmin. Your note has been registered with the server.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-[#26344A] block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Rao"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#26344A] block mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ananya@example.com"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#26344A] block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your note, question, or project inquiry..."
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === 'submitting' ? 'Transmitting message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
