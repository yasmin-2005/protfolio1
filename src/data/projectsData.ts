export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  featured: boolean;
  status: 'In Active Development' | 'Prototype Ready' | 'Completed Project';
  technologies: string[];
  keyFeatures: string[];
  githubUrl: string;
  liveDemoUrl: string;
  hasLiveDemo: boolean;
  canEmbedIframe: boolean;
  thumbnailUrl: string;
  screenshots: string[];
  thumbnailPlaceholderColor: string;
  accentColor: string;
  demoVideoPath?: string;
  demoVideoTitle?: string;
  previewDetails: {
    overview: string;
    architecture: string[];
    userFlow: string[];
    sampleOutputs?: string[];
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: 'student-ai-copilot',
    title: 'Student AI Copilot',
    tagline: 'AI-assisted academic workflow & concept clarification companion',
    description:
      'An AI-powered student assistant project designed to help learners explore learning tools, clarify questions, and organize academic workflows.',
    role: 'Lead Student Developer & Designer',
    featured: true,
    status: 'In Active Development',
    technologies: ['Python', 'Generative AI', 'Web Development', 'Prompt Engineering', 'HTML & CSS'],
    keyFeatures: [
      'Interactive doubt clarification on engineering and programming topics',
      'Step-by-step conceptual breakdowns with code explanations',
      'Academic workflow & study task organization',
      'Multilingual support including Telugu explanations on demand'
    ],
    githubUrl: 'https://github.com/shaikyasmin/student-ai-copilot',
    liveDemoUrl: '', // Add real URL when deployed
    hasLiveDemo: false,
    canEmbedIframe: false,
    thumbnailUrl: '/images/projects/screenshot_01.png',
    screenshots: [
      '/images/projects/screenshot_01.png',
      '/images/projects/screenshot_02.png',
      '/images/projects/screenshot_03.png',
      '/images/projects/screenshot_04.png',
      '/images/projects/screenshot_05.png',
    ],
    thumbnailPlaceholderColor: '#EAF2FF',
    accentColor: '#26344A',
    demoVideoPath: '/videos/aivideo1.mp4',
    demoVideoTitle: 'AI Visual Workflow Simulation',
    previewDetails: {
      overview:
        'Student AI Copilot bridges the gap between daunting engineering lectures and personalized learning. By combining prompt engineering with clear modular UI, it transforms complex programming and theoretical concepts into accessible, digestible lessons.',
      architecture: [
        'Modular query router that identifies question category (Debugging, Conceptual, Syntax, or Academic Planning)',
        'Prompt optimization pipeline enforcing clear language, step-by-step breakdowns, and code snippets',
        'Lightweight, responsive student dashboard interface built with clean web standards',
        'Session-isolated context management respecting user privacy'
      ],
      userFlow: [
        'Student inputs a programming bug or academic concept doubt',
        'Assistant analyzes the underlying principle and constructs a stepped explanation',
        'Provides runnable code snippets and an intuitive analogy',
        'Suggests follow-up practice exercises to consolidate learning'
      ],
      sampleOutputs: [
        'Python list comprehension explained via step-by-step transformation diagrams',
        'Debugging "IndexError: list index out of range" with visual boundary checks',
        'Telugu explanations for fundamental algorithmic sorting concepts'
      ]
    }
  },
  {
    id: 'student-performance-analyser',
    title: 'Student Performance Analyser',
    tagline: 'Exploratory academic performance metrics and visual clarity',
    description:
      'A student-focused project for exploring academic performance information and presenting useful insights in an understandable format. Completed with MANAC Infotech project certification.',
    role: 'Student Developer',
    featured: false,
    status: 'Completed Project',
    technologies: ['Python', 'Data Analysis', 'Tableau', 'HTML & CSS', 'Problem Solving'],
    keyFeatures: [
      'Visual breakdown of semester marks and subject distribution',
      'Clarity on credit progressions and areas needing extra study time',
      'Clean data presentation without overwhelming academic jargon',
      'Certified project completion via MANAC Infotech (April 2026)'
    ],
    githubUrl: 'https://github.com/shaikyasmin/student-performance-analyser',
    liveDemoUrl: '',
    hasLiveDemo: false,
    canEmbedIframe: false,
    thumbnailUrl: '/images/projects/screenshot_06.png',
    screenshots: [
      '/images/projects/screenshot_06.png',
      '/images/projects/screenshot_07.png',
      '/images/projects/screenshot_08.png',
      '/images/projects/screenshot_09.png',
      '/images/projects/screenshot_10.png',
    ],
    thumbnailPlaceholderColor: '#F6EAF0',
    accentColor: '#303039',
    previewDetails: {
      overview:
        'Understanding semester performance is often obscured by fragmented grade cards. Student Performance Analyser organizes subject scores into clear visual summaries, helping students identify strengths and prioritize exam preparation realistically.',
      architecture: [
        'Python data parser for semester mark sheets and credit hours',
        'Calculation engine for SGPA, CGPA progression, and subject weightings',
        'Clean, accessible CSS grid visualization dashboard with light pastel themes',
        'Exportable study-focus summary for personal planning'
      ],
      userFlow: [
        'Student inputs or selects semester subject marks',
        'System visualizes performance distribution across theory and laboratory subjects',
        'Highlights subjects where extra study hours yield maximum impact',
        'Provides a clean, printable academic progress overview'
      ],
      sampleOutputs: [
        'Semester-over-semester GPA trend graph',
        'Subject-wise credit weighting and score distribution',
        'Actionable study plan allocation based on syllabus weightage'
      ]
    }
  }
];
