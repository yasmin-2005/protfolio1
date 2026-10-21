import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, ArrowUpRight, Sparkles, FileText, Compass } from 'lucide-react';
import { personalData } from '../data/personalData';

interface NavbarProps {
  onOpenAssetGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssetGuide }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'ai-videos', 'journey', 'growth', 'ai-assistant', 'resume', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'AI Videos', href: '#ai-videos', id: 'ai-videos', isSpecialBadge: true },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Growth', href: '#growth', id: 'growth' },
    { label: 'AI Assistant', href: '#ai-assistant', id: 'ai-assistant', isSpecial: true },
    { label: 'Resume', href: '#resume', id: 'resume' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#E8F3ED]/85 backdrop-blur-md shadow-xs border-b border-white/60'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26344A] rounded-xl px-2 py-1"
          >
            <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-white flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-editorial text-lg font-bold text-[#26344A]">Y</span>
            </div>
            <div>
              <div className="font-editorial text-lg font-bold text-[#26344A] leading-tight flex items-center gap-1.5">
                {personalData.name}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" title="Actively Learning" />
              </div>
              <div className="text-[11px] font-medium text-[#747780] tracking-wide">
                CS Engineering Student
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full shadow-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#26344A] text-white shadow-xs'
                      : link.isSpecial
                      ? 'text-[#26344A] hover:bg-white/80 font-semibold flex items-center gap-1'
                      : 'text-[#303039] hover:text-[#26344A] hover:bg-white/60'
                  }`}
                >
                  {link.isSpecial && <Sparkles className="w-3 h-3 text-amber-500" />}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenAssetGuide && (
              <button
                onClick={onOpenAssetGuide}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[#26344A] bg-white/70 hover:bg-white border border-gray-200 transition-colors shadow-2xs flex items-center gap-1"
                title="How to replace portrait, resume, and contact links"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Customize Info</span>
              </button>
            )}

            <a
              href="#ai-assistant"
              className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-all shadow-sm hover:shadow flex items-center gap-1.5"
            >
              <Bot className="w-3.5 h-3.5 text-sky-200" />
              <span>Ask AI Copilot</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#ai-assistant"
              className="p-2 rounded-full bg-[#26344A] text-white"
              title="Open AI Assistant"
            >
              <Bot className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/80 text-[#26344A] hover:bg-white border border-gray-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl glass-panel shadow-lg border border-white/80 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-[#26344A] text-white'
                      : 'text-[#303039] hover:bg-white/80'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.isSpecial && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </a>
              ))}

              {onOpenAssetGuide && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAssetGuide();
                  }}
                  className="mt-2 w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#26344A] bg-[#EAF2FF] hover:bg-[#DCEBFF] transition-colors flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Customize Portfolio Info & Files</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
