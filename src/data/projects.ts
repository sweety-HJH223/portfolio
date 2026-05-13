export type ProjectCategory = 'All' | 'Frontend' | 'Python' | 'AI' | 'Automation';

export interface Project {
  icon: string;
  name: string;
  slug: string;
  featured: boolean;
  overview: string;
  whatItDoes: string[];
  challengesSolutions: {
    challenge: string;
    solution: string;
  };
  learned: string;
  techStack: string[];
  github: boolean;
  liveDemo: boolean;
  category: ProjectCategory;
  image?: string; // Optional image URL for the project page
}

export const projects: Project[] = [
  {
    icon: '🤖',
    name: 'AI Chatbot Desktop Automation',
    slug: 'ai-chatbot',
    featured: true,
    overview:
      'AI-powered desktop automation that reads messages and replies using LLM without web APIs. Works directly with desktop UI using screen automation.',
    whatItDoes: [
      'Reads messages automatically from desktop app',
      'Replies intelligently using OpenAI LLM',
      'Target user filtering',
      'Human-like reply cooldowns',
      'Emergency stop mechanism',
      'Conversation logging for debugging',
    ],
    challengesSolutions: {
      challenge: 'Working without web API',
      solution: 'Screen automation + clipboard parsing + keyboard control',
    },
    learned: 'Desktop automation, LLM prompt engineering, error handling in automation systems',
    techStack: ['Python', 'PyAutoGUI', 'OpenAI API', 'LLM Integration'],
    github: true,
    liveDemo: false,
    category: 'AI',
  },
  {
    icon: '🌦️',
    name: 'Korean-English Weather App',
    slug: 'weather-app',
    featured: false,
    overview:
      'Fully responsive weather app with real-time language switching between English and Korean. Deployed on GitHub Pages.',
    whatItDoes: [
      'Real-time English/Korean language switching',
      'Live weather data via OpenWeather API',
      'Temperature, humidity and forecasts',
      'Real feel engine for human comfort level',
      'Mobile-first responsive design',
    ],
    challengesSolutions: {
      challenge: 'Building smooth bilingual switching',
      solution: 'Language state management with full translation object',
    },
    learned: 'API integration, bilingual UX design, responsive mobile-first development',
    techStack: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
    github: true,
    liveDemo: true,
    category: 'Frontend',
  },
  {
    icon: '🔍',
    name: 'Python Web Scraper + Excel Dashboard',
    slug: 'web-scraper',
    featured: false,
    overview:
      'OOP-based scraper that extracts product data from live e-commerce sites and generates professional Excel reports with charts.',
    whatItDoes: [
      'Extracts title, price, rating, stock from live sites',
      'Dual-level error handling + file logging',
      'Auto-timestamped output files',
      'Excel reports with pie and bar charts',
      'KPI metrics dashboard sheet',
      'Ethical rate limiting + randomized delays',
    ],
    challengesSolutions: {
      challenge: 'Stable scraping without getting blocked',
      solution: 'Randomized delays + rate limiting + robust error handling',
    },
    learned: 'OOP design patterns, Excel automation, ethical web scraping practices',
    techStack: ['Python', 'BeautifulSoup', 'requests', 'pandas', 'xlsxwriter'],
    github: true,
    liveDemo: false,
    category: 'Python',
  },
  {
    icon: '📊',
    name: 'Automated Sales Analysis Reporter',
    slug: 'sales-reporter',
    featured: false,
    overview:
      'Data pipeline that transforms raw Excel transaction logs into clean executive-ready business reports automatically.',
    whatItDoes: [
      'Automated data cleaning + normalization',
      'Financial aggregation eliminating manual entry',
      'Multi-sheet Excel output',
      'Category summaries + high level KPIs',
      'Auto-adjusts column widths professionally',
    ],
    challengesSolutions: {
      challenge: 'Handling messy inconsistent raw data',
      solution: 'Text normalization pipeline using pandas',
    },
    learned: 'Advanced pandas, business reporting, professional data presentation',
    techStack: ['Python', 'pandas', 'xlsxwriter'],
    github: true,
    liveDemo: false,
    category: 'Automation',
  },
  {
    icon: '📁',
    name: 'Batch File Organizer with Audit Log',
    slug: 'file-organizer',
    featured: false,
    overview:
      'Desktop automation tool that organizes files by type into categorized folders with full audit logging.',
    whatItDoes: [
      'Organizes files by type automatically',
      'Duplicate-safe unique filename generation',
      'Timestamped CSV audit log for every operation',
      'Professional accountability tracking',
    ],
    challengesSolutions: {
      challenge: 'Preventing duplicate file overwrites',
      solution: 'Unique filename generation system',
    },
    learned: 'File system automation, logging systems, error prevention strategies',
    techStack: ['Python', 'os', 'shutil', 'csv'],
    github: true,
    liveDemo: false,
    category: 'Automation',
  },
  {
    icon: '🌐',
    name: 'Personal Portfolio Website',
    slug: 'portfolio',
    featured: false,
    overview:
      'Personal portfolio built with Next.js featuring AI chatbot, Korean/English toggle, dark theme and animated background.',
    whatItDoes: [
      'AI chatbot trained on resume using Gemini API',
      'Korean/English language toggle',
      'Dark/light mode toggle',
      'Animated particle background',
      'Terminal-style auto-typing bio',
      'Project showcase with popup navigation',
    ],
    challengesSolutions: {
      challenge: 'Building smooth multi-level popup navigation',
      solution: 'React state management for modal system',
    },
    learned: 'Next.js, React state management, UI/UX design, API integration',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Gemini API'],
    github: true,
    liveDemo: true,
    category: 'Frontend',
  },
];
