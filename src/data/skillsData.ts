export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Web' | 'AI & Generative' | 'Creative & Problem Solving' | 'Tools & Analytics';
  description: string;
  focusAreas: string[];
  icon: string;
  accentBg: string;
}

export const skillsCategories = [
  'All',
  'Programming',
  'Web',
  'AI & Generative',
  'Tools & Analytics',
  'Creative & Problem Solving',
] as const;

export const skillsData: SkillItem[] = [
  {
    id: 'python',
    name: 'Python Programming',
    category: 'Programming',
    description: 'Writing clean, readable code for algorithms, data structures, automation, and AI workflows.',
    focusAreas: ['Core Data Structures', 'Functions & Modularity', 'Cisco Python Essentials 1 & 2', 'Data Processing'],
    icon: 'Terminal',
    accentBg: '#EAF2FF',
  },
  {
    id: 'c-lang',
    name: 'C Language',
    category: 'Programming',
    description: 'Strong foundation in low-level procedural programming, pointers, memory management, and C Essentials certification.',
    focusAreas: ['Pointers & Dynamic Memory', 'Structures & Arrays', 'Algorithmic Problem Solving', 'Cisco C Essentials 1'],
    icon: 'Code2',
    accentBg: '#F6EAF0',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Programming',
    description: 'Object-oriented programming, class hierarchies, method overriding, and software design principles.',
    focusAreas: ['Object-Oriented Programming', 'Inheritance & Interfaces', 'Collections Framework', 'Robust Logic'],
    icon: 'Terminal',
    accentBg: '#EEE9FA',
  },
  {
    id: 'html',
    name: 'HTML5',
    category: 'Web',
    description: 'Structuring accessible, semantic web content with clean DOM architecture and modern standards.',
    focusAreas: ['Semantic HTML', 'Accessibility (a11y)', 'Forms & Validations', 'Document Structure'],
    icon: 'Code2',
    accentBg: '#E8F3ED',
  },
  {
    id: 'css',
    name: 'CSS3 & Modern Styling',
    category: 'Web',
    description: 'Crafting responsive layouts, Flexbox, CSS Grid, light pastel color harmonies, and fluid animations.',
    focusAreas: ['Responsive Design', 'Flexbox & CSS Grid', 'Tailwind CSS', 'CSS Variables & Themes'],
    icon: 'Palette',
    accentBg: '#EAF2FF',
  },
  {
    id: 'javascript',
    name: 'JavaScript & Web Dev',
    category: 'Web',
    description: 'Building interactive client-side web components, asynchronous API integration, and single-page apps.',
    focusAreas: ['DOM Manipulation', 'Event Driven Architecture', 'Asynchronous JS / Fetch', 'React Basics'],
    icon: 'Globe',
    accentBg: '#F6EAF0',
  },
  {
    id: 'ai-prompting',
    name: 'AI Prompting & Generative AI',
    category: 'AI & Generative',
    description: 'Designing context-aware system instructions, structured JSON outputs, and LLM copilot workflows.',
    focusAreas: ['Prompt Engineering', 'Context Constraints', 'LLM Integration', 'Multilingual Prompting'],
    icon: 'Sparkles',
    accentBg: '#EEE9FA',
  },
  {
    id: 'ai-video',
    name: 'AI Video & Visual Generation',
    category: 'AI & Generative',
    description: 'Creating AI-generated videos, camera prompting, storyboard concepts, and visual experiments.',
    focusAreas: ['Generative Video Workflows', 'Visual Storyboarding', 'Prompt Directing', 'Motion Concepts'],
    icon: 'Video',
    accentBg: '#E8F3ED',
  },
  {
    id: 'analytics-tools',
    name: 'Tableau, Excel & Analytics',
    category: 'Tools & Analytics',
    description: 'Data preparation, formula modeling in Microsoft Excel, and interactive dashboards in Tableau.',
    focusAreas: ['Tableau Visualizations', 'Microsoft Excel Modeling', 'PowerPoint Presentation', 'Performance Reporting'],
    icon: 'Lightbulb',
    accentBg: '#EAF2FF',
  },
  {
    id: 'soft-skills',
    name: 'Teamwork & Communication',
    category: 'Creative & Problem Solving',
    description: 'Active leadership in college activities, cross-functional hackathon teamwork, and multilingual communication.',
    focusAreas: ['Hackathon Collaboration', 'Telugu, Urdu, English, Hindi', 'Technical Presentation', 'Volunteering & Leadership'],
    icon: 'Compass',
    accentBg: '#F6EAF0',
  },
];
