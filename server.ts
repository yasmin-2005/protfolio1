import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));

// Initialize GoogleGenAI SDK with server-side API Key
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instructions for the learning assistant
const SYSTEM_INSTRUCTION = `You are the AI Learning Assistant on Shaik Yasmin's 3D personal portfolio website. Shaik Yasmin is a passionate Computer Science Engineering student.

Your role:
- Help students and visitors clarify doubts in programming (Python, HTML, CSS, JavaScript, Web Development), Artificial Intelligence, Generative AI, Prompt Engineering, Computer Science fundamentals, debugging, and academic projects.
- Help with interview preparation, college subjects, and study techniques.
- Answer questions about Shaik Yasmin's projects using the verified information provided:
  * "Student AI Copilot": An AI-powered student assistant project designed to help learners explore learning tools, clarify questions, and organize academic workflows. Built using Python, Generative AI, HTML/CSS, and Prompt Engineering, with multilingual Telugu support.
  * "Student Performance Analyser": A student-focused project for exploring academic performance information, semester marks distribution, and presenting useful insights in an understandable format using Python, Data Analysis, and HTML/CSS.
- Answer in simple, clear English. Break complex concepts down into step-by-step points.
- Include short, clean code examples whenever helpful.
- When asked to explain in Telugu (or if the user speaks in Telugu), provide warm, accurate, and easy-to-understand explanations in Telugu (script or conversational transliterated Telugu as appropriate).
- Maintain an encouraging, intelligent, approachable tone.
- Do NOT invent personal claims, unverified metrics, or certificates for Shaik Yasmin. Only discuss the verified technologies and project details documented above.`;

// In-memory contact messages storage
const contactSubmissions: Array<{
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}> = [];

// Helper for comprehensive educational responses
function getCuratedEducationalAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('telugu') || q.includes('తెలుగు')) {
    return `నమస్కారం! (Hello!)\n\nనేను షేక్ యాస్మిన్ (Shaik Yasmin) AI లెర్నింగ్ అసిస్టెంట్‌ని. కంప్యూటర్ సైన్స్, పైథాన్ (Python), వెబ్ డెవలప్‌మెంట్, లేదా ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ (AI) లో మీకు ఏ సందేహం ఉన్నా తెలుగులో సులభంగా అర్థమయ్యేలా వివరిస్తాను.\n\nఉదాహరణకు:\n1. పైథాన్ ప్రాథమిక అంశాలు (Variables, Loops, Functions)\n2. వెబ్ పేజీ ఎలా తయారు చేయాలి (HTML & CSS)\n3. కోడింగ్ బగ్స్ ఎలా సరిదిద్దాలి (Debugging)\n\nమీ ప్రశ్నను ఇక్కడ అడగండి, నేను స్టెప్-బై-స్టెప్ వివరిస్తాను!`;
  }

  if (q.includes('copilot') || (q.includes('student') && q.includes('ai'))) {
    return `### Student AI Copilot Overview\n\n**Student AI Copilot** is Shaik Yasmin's featured engineering project designed to help learners explore academic tools, clarify programming questions, and organize study workflows.\n\n- **Technologies**: Python, Generative AI, HTML/CSS, Prompt Engineering.\n- **Core Highlights**:\n  1. Step-by-step doubt resolution for engineering concepts.\n  2. Runnable code snippets with explanations.\n  3. Regional language explanations in Telugu on demand.\n  4. Session-isolated privacy preventing cross-visitor leaks.\n- **Status**: In Active Development with prototype simulation in the Project Visualization Studio!`;
  }

  if (q.includes('analyser') || q.includes('analyzer') || (q.includes('performance') && q.includes('student'))) {
    return `### Student Performance Analyser Overview\n\n**Student Performance Analyser** is a student-focused project for exploring academic performance information and presenting useful insights in an understandable format.\n\n- **Technologies**: Python, Data Analysis, HTML & CSS, Problem Solving.\n- **Core Highlights**:\n  1. Subject-wise marks distribution without overwhelming academic jargon.\n  2. Credit and SGPA/CGPA progression tracking.\n  3. Actionable study prioritization recommendations based on syllabus weightage.\n  4. Clean, honest data reporting without inflated or fabricated predictive claims.`;
  }

  if (q.includes('python') && (q.includes('basic') || q.includes('list') || q.includes('start'))) {
    return `### Python Fundamentals Breakdown\n\nPython is designed around human readability and simplicity. Here is the step-by-step foundation:\n\n1. **Variables & Dynamic Typing**:\n   \`\`\`python\n   student_name = "Shaik Yasmin"\n   year_of_study = 2\n   gpa_target = 9.0\n   \`\`\`\n\n2. **Lists vs Tuples**:\n   - **Lists** are mutable (can be altered): \`skills = ["Python", "HTML", "AI"]\`\n   - **Tuples** are immutable (fixed once created): \`coordinates = (17.9689, 79.5941)\`\n\n3. **Conditionals & Clean Loops**:\n   \`\`\`python\n   for skill in skills:\n       print(f"Actively exploring: {skill}")\n   \`\`\`\n\n4. **Student Practice Habit**: Write 10 lines of code every day in Google Colab or your local terminal to build muscle memory!`;
  }

  if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('generative')) {
    return `### Understanding Artificial Intelligence & Generative Models\n\nArtificial Intelligence is the branch of computer science focused on building systems capable of tasks that typically require human cognition.\n\n1. **Core Distinction**:\n   - **Traditional AI / Machine Learning**: Learns patterns from past data to classify or predict (e.g., spam email filter, GPA analysis).\n   - **Generative AI (LLMs)**: Generates new text, code, or images by predicting the most statistically coherent next tokens based on context.\n\n2. **How Shaik Yasmin Uses It**:\n   In projects like **Student AI Copilot**, prompt engineering and system instructions guide models to act as patient academic tutors without fabricating false information.\n\n3. **Where to Start**:\n   - Learn basic Python\n   - Understand Tokenization & Embeddings\n   - Experiment with system instructions and JSON output schemas.`;
  }

  if (q.includes('website') || q.includes('web development') || q.includes('html')) {
    return `### How to Build a Modern Website (Step-by-Step)\n\nBuilding web experiences comes down to three core layers:\n\n1. **HTML (The Skeleton)**:\n   Provides accessible, semantic structure (\`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<footer>\`).\n\n2. **CSS (The Aesthetics)**:\n   Transforms raw elements into beautiful layouts using Flexbox, CSS Grid, and harmonious palettes (like this website's Sage Green & Pastel accents).\n\n3. **JavaScript / React (The Interactivity)**:\n   Adds dynamic state, 3D WebGL scenes via Three.js, and connects forms to backend APIs.\n\n4. **Next Step**: Start by building a simple 1-page personal profile in HTML and CSS, then introduce component-based frameworks like React!`;
  }

  if (q.includes('interview') || q.includes('prepare')) {
    return `### Campus Engineering Interview Preparation Guide\n\nFor Computer Science students:\n\n1. **Data Structures & Algorithms (Core)**:\n   - Arrays, Strings, Dictionaries/HashMaps, Linked Lists.\n   - Practice time complexity (Big-O analysis).\n\n2. **Academic Projects**:\n   - Be ready to explain the architecture of your projects (e.g., **Student AI Copilot** or **Student Performance Analyser**).\n   - Highlight how you handled errors, modularized code, and chose your tech stack.\n\n3. **CS Fundamentals**:\n   - Operating Systems (Processes vs Threads, Deadlocks)\n   - Database concepts (SQL vs NoSQL)\n   - Object-Oriented Programming (Polymorphism, Inheritance, Encapsulation)\n\n4. **Communication**: Explain your thought process out loud before jumping into coding!`;
  }

  if (q.includes('debug') || q.includes('error')) {
    return `### Systematic Debugging Framework for Students\n\nWhen encountering compiler or runtime errors:\n\n1. **Read the Full Traceback**: Scroll to the very bottom line first—it tells you the exact exception type (e.g., \`TypeError\`, \`IndexError\`, \`KeyError\`).\n2. **Locate the Line Number**: Identify where the exception was triggered in your code versus library internals.\n3. **Inspect Variable States**: Use \`print(f"Debug: x={x}, type={type(x)}")\` or Python's \`breakpoint()\`.\n4. **Isolate the Sub-Problem**: Strip away extraneous logic until you have a minimal 5-line reproducing script.`;
  }

  if (q.includes('project') || q.includes('idea')) {
    return `### High-Impact Project Ideas for CS Students\n\n1. **Student Academic Copilot**: A lightweight tool that takes syllabus topics and generates flashcards with local test quizzes.\n2. **Semester Mark Sheet Visualizer**: Parse semester PDFs and generate SVG progress charts.\n3. **Local Code Reviewer**: A CLI tool that checks Python scripts for PEP-8 compliance and adds docstrings.\n4. **Campus Notice Board Aggregator**: Scrapes college notifications and organizes them by deadline.`;
  }

  return `### Step-by-Step Explanation\n\nThank you for asking about: **"${query}"**.\n\n1. **Core Concept**: In Computer Science, break every large challenge into modular, testable components.\n2. **Practical Application**: Write a small script to test edge cases before designing the user interface.\n3. **Student Tip**: Document your code with comments and verify functionality with step-by-step logging.\n\n*Feel free to ask a follow-up question or request an explanation in Telugu!*`;
}

// API Status
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    aiConfigured: !!ai,
    message: ai
      ? 'Gemini 3.8 Flash model is connected and active.'
      : 'Gemini API key is not configured. Running in high-fidelity educational fallback mode.',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Chat endpoint for AI Doubt Clarification
app.post('/api/ai/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    if (ai) {
      try {
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            if (item.role === 'user' || item.role === 'assistant') {
              contents.push({
                role: item.role === 'user' ? 'user' : 'model',
                parts: [{ text: item.content }],
              });
            }
          }
        }

        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (response.text) {
          res.json({
            reply: response.text,
            source: 'gemini-3.8-flash',
            isAiConfigured: true,
          });
          return;
        }
      } catch (geminiErr: any) {
        console.warn('Gemini API call returned non-terminal status, using student knowledge engine:', geminiErr?.message);
        // Fall through to honest curated educational answer
        const fallbackText = getCuratedEducationalAnswer(message);
        res.json({
          reply: `${fallbackText}\n\n*(Note: Live model request received status "${geminiErr?.status || 'PROJECT_RESTRICTED'}". The learning assistant provided this verified curriculum breakdown.)*`,
          source: 'student-knowledge-base',
          isAiConfigured: true,
        });
        return;
      }
    }

    // Default fallback when AI key is missing
    const fallback = getCuratedEducationalAnswer(message);
    res.json({
      reply: fallback,
      source: 'student-knowledge-base',
      isAiConfigured: false,
    });
  } catch (err: any) {
    console.error('Error generating AI response:', err);
    res.json({
      reply: getCuratedEducationalAnswer('general concept'),
      source: 'fallback',
      isAiConfigured: false,
    });
  }
});

// AI Learning Plan Generator
app.post('/api/ai/learning-plan', async (req: Request, res: Response): Promise<void> => {
  try {
    const { topic, level, goal, timeCommitment } = req.body;
    const safeTopic = topic || 'Python from basics';

    if (ai) {
      try {
        const prompt = `Generate a realistic, student-friendly step-by-step learning roadmap for a student who wants to learn "${safeTopic}".
Current knowledge level: "${level || 'Beginner'}"
Goal: "${goal || 'Build practical projects and understand fundamentals'}"
Available study time: "${timeCommitment || '3-5 hours/week'}"

Return ONLY a valid JSON object matching this schema:
{
  "topic": "${safeTopic}",
  "level": "${level || 'Beginner'}",
  "stages": [
    {
      "stage": "string",
      "duration": "string",
      "summary": "string",
      "topics": ["string", "string", "string"],
      "exercise": "string",
      "project": "string"
    }
  ],
  "nextSteps": ["string", "string", "string"]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.5,
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          res.json({
            ...parsed,
            source: 'gemini-3.8-flash',
            isAiConfigured: true,
          });
          return;
        }
      } catch (err: any) {
        console.warn('Gemini learning-plan fallback:', err?.message);
      }
    }

    // High quality structured roadmap
    res.json({
      topic: safeTopic,
      level: level || 'Beginner',
      stages: [
        {
          stage: 'Phase 1: Core Fundamentals & Syntax',
          duration: 'Weeks 1-2',
          summary: `Build rock-solid conceptual understanding of ${safeTopic} foundations.`,
          topics: ['Core syntax rules & data structures', 'Variables and conditional execution', 'Input/Output operations', 'Terminal execution'],
          exercise: `Write small 10-line scripts testing one core mechanism at a time.`,
          project: `Build a basic interactive command-line responder.`,
        },
        {
          stage: 'Phase 2: Functions, Modularity & Debugging',
          duration: 'Weeks 3-4',
          summary: `Organize code into reusable functions and master defensive error handling.`,
          topics: ['Function parameters and return values', 'Exception handling (try-except/catch)', 'Working with collections and datasets', 'Code documentation'],
          exercise: `Refactor repetitive code into clean modular helper functions.`,
          project: `Create a functional study task tracker or unit converter.`,
        },
        {
          stage: 'Phase 3: Applied Projects & Real-World Integration',
          duration: 'Weeks 5-6',
          summary: `Apply ${safeTopic} to practical student tools with user-facing interfaces.`,
          topics: ['Project structure and package management', 'Reading and writing structured data', 'Connecting logic to interfaces', 'Writing a clean README'],
          exercise: `Identify 3 common edge cases and implement unit checks.`,
          project: `A showcase engineering project ready for GitHub and portfolio display.`,
        },
      ],
      nextSteps: [
        `Dedicate ${timeCommitment || '3-4 hours'} weekly to hands-on programming rather than passive reading.`,
        'Commit your code regularly to GitHub with descriptive messages.',
        'Document your challenges and how you resolved compiler errors.',
      ],
      source: 'curriculum-standards',
      isAiConfigured: !!ai,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to generate learning plan', details: err?.message });
  }
});

// AI Resume Assistant
app.post('/api/ai/resume-improve', async (req: Request, res: Response): Promise<void> => {
  try {
    const { section, text, role } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required.' });
      return;
    }

    if (ai) {
      try {
        const prompt = `You are an expert resume consultant for Computer Science students.
Enhance the following ${section || 'resume snippet'} for a student targetting ${role || 'Computer Science Engineering / Web Development'}:

Original Text:
"${text}"

Rules:
1. Make it professional, concise, action-oriented, and impactful.
2. DO NOT invent false numbers, fake metrics, or fake employment.
3. Keep it student-appropriate and honest.
4. Return a JSON object with:
{
  "improvedText": "string",
  "suggestions": ["string", "string"]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.4,
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          res.json({
            improvedText: parsed.improvedText || text,
            suggestions: parsed.suggestions || [],
            source: 'gemini-3.8-flash',
            isAiConfigured: true,
          });
          return;
        }
      } catch (err: any) {
        console.warn('Gemini resume-improve fallback:', err?.message);
      }
    }

    // Heuristic polish
    const polished = text
      .trim()
      .replace(/^i worked on /gi, 'Engineered and collaborated on ')
      .replace(/^i made a /gi, 'Architected and built a ')
      .replace(/^i know /gi, 'Proficient in ')
      .concat(' with focus on clean structure, responsiveness, and performance.');

    res.json({
      improvedText: polished,
      suggestions: [
        'Use strong active action verbs (Engineered, Implemented, Designed, Optimized).',
        'Explicitly state the technologies utilized.',
        'Ensure claims reflect verified student work without exaggeration.',
      ],
      source: 'local_heuristic',
      isAiConfigured: !!ai,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to improve resume text', details: err?.message });
  }
});

// Contact endpoint
app.post('/api/contact', (req: Request, res: Response): void => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are all required.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  const submission = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  contactSubmissions.push(submission);
  console.log(`[Contact] New message received from ${name} (${email}): "${message.slice(0, 40)}..."`);

  res.json({
    success: true,
    message: 'Thank you for reaching out! Your message has been received.',
    id: submission.id,
  });
});

// Start Server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
    console.log(`AI Configuration: ${ai ? 'GEMINI INITIALIZED (gemini-3.8-flash)' : 'FALLBACK MODE'}`);
  });
}

startServer();
