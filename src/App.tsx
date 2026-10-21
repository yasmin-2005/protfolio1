import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { AIVideoGallery } from './components/AIVideoGallery';
import { LearningJourney } from './components/LearningJourney';
import { Achievements } from './components/Achievements';
import { AIAssistant } from './components/AIAssistant';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AssetGuideModal } from './components/AssetGuideModal';

export default function App() {
  const [isAssetGuideOpen, setIsAssetGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E8F3ED] text-[#303039] selection:bg-[#EAF2FF] selection:text-[#26344A]">
      {/* Navigation */}
      <Navbar onOpenAssetGuide={() => setIsAssetGuideOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Home / Hero with 3D Scene */}
        <Hero onOpenAssetGuide={() => setIsAssetGuideOpen(true)} />

        {/* 2. About Section */}
        <About />

        {/* 3. Skills Section */}
        <Skills />

        {/* 4. Projects Showcase (Project Visualization Studio) */}
        <Projects onOpenAssetGuide={() => setIsAssetGuideOpen(true)} />

        {/* 5. AI Creations & Video Gallery */}
        <AIVideoGallery onOpenAssetGuide={() => setIsAssetGuideOpen(true)} />

        {/* 6. Learning Journey Timeline (5 stages) */}
        <LearningJourney />

        {/* 6. Achievements, Hackathons & Challenges (Authentic records) */}
        <Achievements onOpenAssetGuide={() => setIsAssetGuideOpen(true)} />

        {/* 7. AI Assistant Suite (Doubt Clarifier, Resume Builder, Learning Guide) */}
        <AIAssistant />

        {/* 8. Official Resume PDF Section */}
        <ResumeSection onOpenAssetGuide={() => setIsAssetGuideOpen(true)} />

        {/* 9. Contact Section with real validation */}
        <Contact onOpenAssetGuide={() => setIsAssetGuideOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Asset Customization Guide Modal */}
      <AssetGuideModal
        isOpen={isAssetGuideOpen}
        onClose={() => setIsAssetGuideOpen(false)}
      />
    </div>
  );
}
