export interface PersonalData {
  name: string;
  role: string;
  department: string;
  institution: string;
  headline: string;
  heroDescription: string;
  aboutIntro: string;
  aboutStory: string[];
  primaryCTA: string;
  secondaryCTA: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  resumePdfPath: string;
  hasCustomResumePdf: boolean;
  avatarUrl: string;
}

export const personalData: PersonalData = {
  name: "Shaik Yasmin",
  role: "Computer Science Engineering Student",
  department: "Computer Science & Engineering",
  institution: "Vaagdevi College of Engineering",
  headline: "Ideas Into Interactive Experiences.",
  heroDescription:
    "Hi, I'm Shaik Yasmin, a Computer Science Engineering student at Vaagdevi College of Engineering exploring web development, artificial intelligence, and creative technology. I enjoy learning new tools, solving problems, and transforming ideas into practical digital experiences through projects and experimentation.",
  aboutIntro:
    "I am a dedicated and enthusiastic Computer Science student at Vaagdevi College of Engineering who enjoys working with people and taking initiative. I believe in learning through experience and contributing positively to my college community. Strong interest in taking up leadership and volunteering roles and love collaborating on practical digital tools.",
  aboutStory: [
    "From writing algorithms in C, Python, and Java to building responsive web interfaces and exploring generative AI prompt architectures, I focus on hands-on practical implementation.",
    "Currently pursuing my B.Tech in Computer Science & Engineering (2024–2028) at Vaagdevi College of Engineering with a consistent academic record (CGPA: 8.10).",
    "Actively participating in technical challenges like HackWithHyderabad 3.0 at Microsoft Office and building student-centered tools like Student AI Copilot and Student Performance Analyser."
  ],
  primaryCTA: "Explore My Projects",
  secondaryCTA: "Meet My AI Assistant",
  email: "shaikmehayas1221@gmail.com",
  phone: "+91 8074754865",
  location: "Thorrur, Mahabubabad, Telangana, 506163",
  githubUrl: "https://github.com/yasmin-2005",
  linkedinUrl: "https://linkedin.com/in/shaikyasmin",
  portfolioUrl: "https://shaikyasmin.dev",
  resumePdfPath: "/resume/Shaik_Yasmin_Resume.txt",
  hasCustomResumePdf: true,
  avatarUrl: "${import.meta.env.BASE_URL}/images/yasmin_portrait.png",
};
