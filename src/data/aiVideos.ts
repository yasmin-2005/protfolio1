export type VideoCategory =
  | 'All'
  | 'AI Cinematic Videos'
  | 'AI Storytelling'
  | 'AI Art and Visual Experiments'
  | 'Creative AI Projects'
  | 'Other';

export interface AIVideoItem {
  id: string;
  title: string;
  description: string;
  category: Exclude<VideoCategory, 'All'>;
  videoPath: string; // Path relative to public/
  posterPath?: string;
  creationDate?: string;
  duration?: string;
  modelUsed?: string;
  promptConcept?: string;
  externalLink?: string;
  isAvailableLocally: boolean;
}

export const aiVideoCategories: VideoCategory[] = [
  'All',
  'AI Cinematic Videos',
  'AI Storytelling',
  'AI Art and Visual Experiments',
  'Creative AI Projects',
  'Other',
];

// All 5 real uploaded AI videos directly connected from public/videos/
export const aiVideosList: AIVideoItem[] = [
  {
    id: 'ai-vid-1',
    title: 'AI Visual Odyssey: Spatial Light & Movement',
    description: 'An AI-generated cinematic visual experiment exploring dynamic lighting transitions, depth, and atmospheric ambience.',
    category: 'AI Cinematic Videos',
    videoPath: '/videos/aivideo1.mp4',
    creationDate: 'October 2026',
    duration: '0:30',
    modelUsed: 'Generative Video AI Engine',
    promptConcept: 'Cinematic fluid motion, soft natural lighting gradients, high depth of field, slow-motion perspective.',
    isAvailableLocally: true,
  },
  {
    id: 'ai-vid-2',
    title: 'Algorithmic Rhythm: Kinetic Visuals',
    description: 'A study in AI motion pacing and kinetic transformation, translating abstract concepts into visual flow.',
    category: 'AI Art and Visual Experiments',
    videoPath: '/videos/aivideo2.mp4',
    creationDate: 'October 2026',
    duration: '0:15',
    modelUsed: 'Generative Video Model',
    promptConcept: 'Morphing procedural structures with pastel volumetric lighting and delicate reflections.',
    isAvailableLocally: true,
  },
  {
    id: 'ai-vid-3',
    title: 'The Digital Journey: Creative Storytelling',
    description: 'A visual story sequence generated using AI prompt composition, portraying curiosity, exploration, and tech advancement.',
    category: 'AI Storytelling',
    videoPath: '/videos/aivideo3.mp4',
    creationDate: 'October 2026',
    duration: '0:20',
    modelUsed: 'AI Storyboard & Video Synthesizer',
    promptConcept: 'Narrative sequence tracking from code structures into an expansive horizon.',
    isAvailableLocally: true,
  },
  {
    id: 'ai-vid-4',
    title: 'Atmospheric Horizons: Sage & Mist',
    description: 'An ambient AI video composition experimenting with soft color palettes, gentle camera drift, and spatial perspective.',
    category: 'Creative AI Projects',
    videoPath: '/videos/aivideo4.mp4',
    creationDate: 'October 2026',
    duration: '0:20',
    modelUsed: 'Multimodal Video Generator',
    promptConcept: 'Serene aerial perspective with soft sage green and sky blue lighting diffusion.',
    isAvailableLocally: true,
  },
  {
    id: 'ai-vid-5',
    title: 'Generative Textures: Fluid Light Study',
    description: 'Exploring texture generation and procedural motion in AI-assisted video workflows.',
    category: 'AI Art and Visual Experiments',
    videoPath: '/videos/aivideo5.mp4',
    creationDate: 'October 2026',
    duration: '0:20',
    modelUsed: 'Generative Diffusion Video',
    promptConcept: 'Interlocking geometric patterns shifting in harmonic rhythm with soft luminescence.',
    isAvailableLocally: true,
  },
];

export const sampleVideoPreviewItems: AIVideoItem[] = aiVideosList;
