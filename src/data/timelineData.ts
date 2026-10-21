export interface TimelineStage {
  id: string;
  stage: string;
  tagline: string;
  period: string;
  description: string;
  keyLearnings: string[];
  icon: string;
  highlightColor: string;
}

export const timelineData: TimelineStage[] = [
  {
    id: 'discover',
    stage: 'Discover',
    tagline: 'Exploring programming and computer science',
    period: 'Foundational Phase',
    description:
      'Stepped into the world of Computer Science Engineering, learning fundamental algorithmic thinking, logical structures, and writing initial programs in Python.',
    keyLearnings: [
      'Understanding variables, memory, and control flow in Python',
      'Deconstructing problem statements into algorithmic steps',
      'Appreciating the beauty of clean, readable syntax'
    ],
    icon: 'Compass',
    highlightColor: '#EAF2FF',
  },
  {
    id: 'build',
    stage: 'Build',
    tagline: 'Practicing through code and projects',
    period: 'Hands-on Phase',
    description:
      'Moved from isolated programming exercises to creating complete mini-applications. Learned semantic HTML, CSS styling, responsive layout principles, and connecting logic to user interfaces.',
    keyLearnings: [
      'Mastering HTML5 structure and CSS Flexbox / Grid',
      'Building responsive interfaces that work across devices',
      'Debugging edge cases with patience and disciplined testing'
    ],
    icon: 'Hammer',
    highlightColor: '#F6EAF0',
  },
  {
    id: 'explore',
    stage: 'Explore',
    tagline: 'Learning about AI, prompt engineering, and creative tools',
    period: 'Innovation Phase',
    description:
      'Dove into the evolving landscape of Generative AI, prompt architecture, and AI-assisted development. Explored how models can be guided through precise system instructions and structured inputs.',
    keyLearnings: [
      'Prompt engineering frameworks and contextual constraints',
      'Integrating Large Language Models into student assistant tools',
      'Exploring AI image and media generation workflows'
    ],
    icon: 'Sparkles',
    highlightColor: '#EEE9FA',
  },
  {
    id: 'participate',
    stage: 'Participate',
    tagline: 'Taking part in hackathons and technical challenges',
    period: 'Active Engagement',
    description:
      'Collaborating with peers, brainstorming solutions under time constraints, and building practical project prototypes during engineering challenges and college symposiums.',
    keyLearnings: [
      'Rapid prototype development and feature prioritization',
      'Communicating technical ideas clearly and concisely',
      'Learning from feedback and peer implementations'
    ],
    icon: 'Award',
    highlightColor: '#E8F3ED',
  },
  {
    id: 'grow',
    stage: 'Grow',
    tagline: 'Improving through practice, feedback, and continuous learning',
    period: 'Current & Ongoing',
    description:
      'Refining code architecture, deepening knowledge of web technologies and AI capabilities, and preparing for future engineering opportunities with curiosity and dedication.',
    keyLearnings: [
      'Iterative refinement: revising projects based on real usability',
      'Staying updated with modern web standards and AI breakthroughs',
      'Maintaining an authentic, student-first engineering mindset'
    ],
    icon: 'TrendingUp',
    highlightColor: '#EAF2FF',
  },
];
