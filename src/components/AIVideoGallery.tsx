import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Play,
  X,
  Sparkles,
  Filter,
  Search,
  Upload,
  Calendar,
  Clock,
  Layers,
  ExternalLink,
  Info,
  Maximize2,
  Volume2,
  Compass
} from 'lucide-react';
import {
  aiVideosList,
  sampleVideoPreviewItems,
  aiVideoCategories,
  AIVideoItem,
  VideoCategory,
} from '../data/aiVideos';

interface AIVideoGalleryProps {
  onOpenAssetGuide?: () => void;
}

export const AIVideoGallery: React.FC<AIVideoGalleryProps> = ({ onOpenAssetGuide }) => {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<AIVideoItem | null>(null);
  const [showSampleLayout, setShowSampleLayout] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Active videos to display: real uploaded videos, or sample preview if toggled
  const currentVideoList =
    aiVideosList.length > 0
      ? aiVideosList
      : showSampleLayout
      ? sampleVideoPreviewItems
      : [];

  const filteredVideos = currentVideoList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeVideo) {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  return (
    <section id="ai-videos" className="py-24 relative bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBDAD1] text-xs font-semibold text-[#26344A] mb-3 shadow-2xs">
              <Video className="w-3.5 h-3.5 text-sky-600" />
              <span>Generative Media & Storytelling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26344A] font-editorial tracking-tight mb-2">
              AI Creations & Video Gallery
            </h2>
            <p className="text-sm sm:text-base text-[#747780] max-w-xl">
              A collection of AI-generated videos, creative experiments, and visual stories.
            </p>
          </div>

          {/* Quick upload guide button */}
          {onOpenAssetGuide && (
            <button
              onClick={onOpenAssetGuide}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#26344A] bg-white hover:bg-gray-50 border border-gray-200 transition-colors shadow-2xs flex items-center gap-2 self-start md:self-end"
            >
              <Upload className="w-3.5 h-3.5 text-sky-600" />
              <span>How to Upload MP4 Videos</span>
            </button>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {aiVideoCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#26344A] text-white shadow-xs'
                      : 'bg-white/80 text-[#303039] hover:bg-white border border-gray-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-[#747780] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter videos by keyword..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#26344A]"
            />
          </div>
        </div>

        {/* Gallery Content */}
        {filteredVideos.length > 0 ? (
          /* 3-Column Responsive Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                {/* Poster / Thumbnail Area */}
                <div className="relative aspect-video bg-gradient-to-tr from-[#EAF2FF] via-[#F6EAF0] to-[#EEE9FA] flex items-center justify-center overflow-hidden">
                  {video.posterPath ? (
                    <img
                      src={video.posterPath}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-white/90 shadow-xs flex items-center justify-center text-[#26344A] mb-2 group-hover:scale-110 transition-transform">
                        <Video className="w-6 h-6 text-[#26344A]" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#486581]">
                        {video.modelUsed || 'AI Video Experiment'}
                      </span>
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-[#26344A]/10 group-hover:bg-[#26344A]/30 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#26344A] flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-[#26344A]" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-[#26344A]/80 text-white text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{video.duration}</span>
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[#26344A] text-[10px] font-semibold backdrop-blur-xs shadow-2xs">
                    {video.category}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#26344A] mb-2 group-hover:text-[#486581] transition-colors leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[#303039]/80 leading-relaxed line-clamp-2 mb-4">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#747780]">
                    <span>{video.creationDate || '2026'}</span>
                    <span className="font-semibold text-[#26344A] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Watch Video</span>
                      <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Elegant Empty State (Master Prompt: "Your AI video collection will appear here soon.") */
          <div className="rounded-3xl bg-white border border-gray-200/80 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#EAF2FF] via-[#F6EAF0] to-[#EEE9FA] flex items-center justify-center text-[#26344A] mx-auto mb-6 shadow-xs border border-white">
              <Video className="w-8 h-8 text-[#26344A]" />
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#26344A] mb-3">
              Your AI video collection will appear here soon.
            </h3>

            <p className="text-sm text-[#303039]/80 leading-relaxed max-w-md mx-auto mb-8">
              This gallery is ready to play your AI-generated videos. Simply drop your MP4 files into <code>public/videos/</code> and register their titles and categories in <code>src/data/aiVideos.ts</code>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {onOpenAssetGuide && (
                <button
                  onClick={onOpenAssetGuide}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#26344A] hover:bg-[#344662] transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Upload className="w-4 h-4" />
                  <span>MP4 Upload & Data Guide</span>
                </button>
              )}

              <button
                onClick={() => setShowSampleLayout(true)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#26344A] bg-[#F2F3F5] hover:bg-gray-200 transition-colors"
              >
                Preview Gallery Layout
              </button>
            </div>
          </div>
        )}

        {/* Video Lightbox Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#26344A]/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-white overflow-hidden animate-in zoom-in-95 duration-200">
              
              {/* Modal Top Bar */}
              <div className="px-6 py-4 bg-[#FAF8F3] border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF2FF] text-[#26344A]">
                    {activeVideo.category}
                  </span>
                </div>

                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-full bg-[#F2F3F5] hover:bg-gray-200 text-[#303039] transition-colors"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Area */}
              <div className="bg-black/95 flex items-center justify-center relative aspect-video">
                {activeVideo.videoPath && activeVideo.isAvailableLocally ? (
                  <video
                    ref={videoRef}
                    controls
                    preload="metadata"
                    poster={activeVideo.posterPath}
                    className="w-full h-full object-contain"
                  >
                    <source src={activeVideo.videoPath} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  /* Graceful state when MP4 file has not yet been dropped in public folder */
                  <div className="p-8 text-center text-white space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-2">
                      <Video className="w-7 h-7 text-sky-200" />
                    </div>
                    <h4 className="font-editorial text-xl font-bold">
                      {activeVideo.title}
                    </h4>
                    <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                      This video is configured in <code>src/data/aiVideos.ts</code>. To enable playback, add the corresponding <code>.mp4</code> file to <code>public/videos/</code>.
                    </p>
                    {activeVideo.promptConcept && (
                      <div className="p-3 rounded-xl bg-white/10 text-xs text-sky-100 max-w-lg mx-auto text-left">
                        <span className="font-bold block mb-1">Prompt Concept:</span>
                        “{activeVideo.promptConcept}”
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Video Details Info Footer */}
              <div className="p-6 bg-white overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#26344A] mb-1">
                      {activeVideo.title}
                    </h3>
                    <p className="text-xs text-[#747780]">
                      {activeVideo.modelUsed ? `Generated with ${activeVideo.modelUsed}` : 'AI Video Generation Experiment'}
                    </p>
                  </div>

                  {activeVideo.externalLink && (
                    <a
                      href={activeVideo.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full text-xs font-semibold text-[#26344A] bg-[#FAF8F3] hover:bg-gray-100 border border-gray-200 transition-colors flex items-center gap-1.5 self-start"
                    >
                      <span>External Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#303039] leading-relaxed mb-4">
                  {activeVideo.description}
                </p>

                {activeVideo.promptConcept && (
                  <div className="p-3 rounded-xl bg-[#FAF8F3] border border-gray-200 text-xs text-[#303039]">
                    <span className="font-bold text-[#26344A] block mb-0.5">Prompt Blueprint:</span>
                    <span className="text-[#747780]">{activeVideo.promptConcept}</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
