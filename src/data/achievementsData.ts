export interface AchievementItem {
  id: string;
  type: 'Hackathon' | 'Technical Certification' | 'Academic Course' | 'Project Completion' | 'Co-Curricular';
  title: string;
  organizer: string;
  date: string;
  description: string;
  learnings: string;
  certificateUrl: string;
  isPdf: boolean;
  verified: boolean;
}

export const verifiedAchievements: AchievementItem[] = [
  {
    id: 'hackwithhyderabad-2026',
    type: 'Hackathon',
    title: 'HackWithHyderabad 3.0 Participant',
    organizer: 'Microsoft Office, Hyderabad',
    date: 'October 2026',
    description: 'Selected to participate in the HackWithHyderabad 3.0 hackathon held at Microsoft Office, Hyderabad, collaborating with peers to engineer software prototypes.',
    learnings: 'Fast-paced agile prototyping, teamwork under time constraints, and presenting to engineering judges.',
    certificateUrl: '/certificates/hackathon_certificate.pdf',
    isPdf: true,
    verified: true,
  },
  {
    id: 'project-manac-2026',
    type: 'Project Completion',
    title: 'Project Completion: Student Performance Analyser',
    organizer: 'MANAC Infotech',
    date: 'April 2026',
    description: 'Official certificate of project completion for architecting and evaluating the Student Performance Analyser application.',
    learnings: 'Academic data processing, modular Python architecture, and user-centric insight reporting.',
    certificateUrl: '/certificates/project_certificate.jpg',
    isPdf: false,
    verified: true,
  },
  {
    id: 'python-essentials-2',
    type: 'Technical Certification',
    title: 'Python Essentials 2',
    organizer: 'Cisco Networking Academy & OpenEDG Python Institute',
    date: 'October 2025',
    description: 'Advanced Python credential verifying proficiency in object-oriented programming, packages, modules, exceptions, and file processing.',
    learnings: 'Classes, inheritance, custom exceptions, lambda expressions, and file I/O operations.',
    certificateUrl: '/certificates/python_certificate_2.pdf',
    isPdf: true,
    verified: true,
  },
  {
    id: 'c-essentials-1',
    type: 'Technical Certification',
    title: 'C Essentials 1 (Basics of C Programming)',
    organizer: 'Cisco Networking Academy & C++ Institute',
    date: 'November 2025',
    description: 'Foundational programming credential covering structured C language syntax, pointer fundamentals, and memory concepts.',
    learnings: 'Low-level memory pointers, arrays, data types, and logical flow control.',
    certificateUrl: '/certificates/c_essentials_1_certificate.pdf',
    isPdf: true,
    verified: true,
  },
  {
    id: 'python-essentials-1',
    type: 'Technical Certification',
    title: 'Python Essentials 1 (Basics of Python)',
    organizer: 'Cisco Networking Academy & OpenEDG Python Institute',
    date: 'October 2025',
    description: 'Foundational Python credential verifying mastery of syntax, conditional execution, loops, and data collections.',
    learnings: 'Variables, conditional logic, functions, lists, and tuples.',
    certificateUrl: '/certificates/python_essentials_1_certificate.pdf',
    isPdf: true,
    verified: true,
  },
  {
    id: 'pgdca-diploma',
    type: 'Academic Course',
    title: 'PG Diploma in Computer Applications (PGDCA)',
    organizer: 'Computer Education Council — Grade "A"',
    date: '2022 – 2023',
    description: 'Comprehensive computer application diploma completed with Grade "A" distinction, covering computer fundamentals, office software, and databases.',
    learnings: 'Database fundamentals, software tools, Excel modeling, and operating systems.',
    certificateUrl: '/certificates/pgdca_course_certificate.jpg',
    isPdf: false,
    verified: true,
  },
  {
    id: 'chess-championship',
    type: 'Co-Curricular',
    title: 'Chess Competition Merit & Participation',
    organizer: 'Telangana Minorities Residential Educational Institutions Society',
    date: '2022',
    description: 'Demonstrated strategic thinking, foresight, and tactical planning during collegiate chess tournaments.',
    learnings: 'Strategic foresight, deep concentration, and calculating moves ahead under pressure.',
    certificateUrl: '/certificates/chess_certificate.jpg',
    isPdf: false,
    verified: true,
  },
];

export const achievementTemplateSample: AchievementItem = {
  id: 'sample-record',
  type: 'Hackathon',
  title: 'Future Innovation Hackathon',
  organizer: 'Engineering Society',
  date: 'Upcoming',
  description: 'Prototyping practical AI solutions for daily student challenges.',
  learnings: 'Rapid problem solving, cross-functional engineering, and team collaboration.',
  certificateUrl: '',
  isPdf: false,
  verified: false,
};

