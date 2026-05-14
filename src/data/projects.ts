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
  }[];
  learned: string;
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  fullCaseStudyUrl?: string; // For your 50-page PDF or Notion link
  category: ProjectCategory;
  image?: string; 
  images?: string[];
  caseStudy?: {
    problem: string;
    approach: string;
    result: string;
  };
  caseStudyPdfUrl?: string;
}

export const projects: Project[] = [
  {
    icon: '🤖',
    name: 'AI Chatbot Desktop Automation',
    slug: 'ai-chatbot',
    featured: true,
    overview:
      'AI-powered desktop automation that reads messages and interacts with desktop applications using LLM without direct web APIs.',
    whatItDoes: [
      'Automated message reading and intelligent replying',
      'Uses LLM (OpenAI) for context-aware responses',
      'Human-like behavior with randomized cooldowns',
      'Handles UI interaction via mouse and keyboard simulation',
    ],
    challengesSolutions: [
      {
        challenge: 'Hardcoded coordinate dependencies for UI interaction causing brittleness during resolution changes.',
        solution: 'Transitioning to adaptive image recognition (OpenCV/PyAutoGUI) to identify UI elements dynamically, improving reliability across environments.',
      },
      {
        challenge: 'Maintaining human-like interaction speed to avoid detection as a bot.',
        solution: 'Implemented randomized execution delays and human-like typing simulation to vary response cadence.',
      },
      {
        challenge: 'Data extraction from non-API desktop applications.',
        solution: 'Utilized OCR (Tesseract) and clipboard parsing techniques to read text directly from the application interface.',
      },
    ],
    learned: 'Desktop automation, LLM prompt engineering, advanced GUI scripting',
    techStack: ['Python', 'PyAutoGUI', 'OpenAI API', 'Clipboard manipulation'],
    githubUrl: 'https://github.com/sweety-HJH223/AI_BOT',
    category: 'AI',
    images: ['/images/ai-bot-1.png', '/images/ai-bot-2.png'],
  },
  {
    icon: '🌦️',
    name: 'Vibe Weather (EN/KO)',
    slug: 'weather-app',
    featured: true,
    overview:
      'A high-performance weather application with real-time bilingual switching and a lively "Vibe" aesthetic that adapts to the time of day.',
    whatItDoes: [
      'Calculates "Real Feel" temperature using wind speed & humidity',
      'Displays UV index, humidity, AQI, and pollen levels',
      'Provides outfit recommendations based on conditions',
      'Dynamic video backgrounds & music that shift based on time (Morning/Afternoon/Evening/Night)',
      'Social media sharing integration',
      'Real-time English/Korean language switching',
    ],
    challengesSolutions: [
      {
        challenge: 'Synchronizing dynamic background and audio assets with real-time weather data without UI lag.',
        solution: 'Engineered a centralized state manager that asynchronously pre-loads video segments and buffers audio, ensuring seamless scene transitions.',
      },
      {
        challenge: 'Calculating an accurate "Real Feel" index beyond simple temperature.',
        solution: 'Integrated thermodynamic formulas factoring in relative humidity and wind speed for a human-centric comfort metric.',
      },
      {
        challenge: 'Ensuring consistent UI responsiveness across disparate device screens for bilingual content.',
        solution: 'Applied a mobile-first, grid-based CSS architecture with dynamic font-scaling to prevent overflow during language toggling.',
      },
    ],
    learned: 'Advanced state management, media asset handling, UX/UI aesthetic engineering',
    techStack: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API', 'Weather Data Modeling'],
    githubUrl: 'https://github.com/sweety-HJH223/toggle-weather',
    liveDemoUrl: 'https://sweety-hjh223.github.io/toggle-weather/',
    fullCaseStudyUrl: '/Vibe_Weather_Case_Study.pdf',
    category: 'Frontend',
    images: [
      '/images/weather-2.png', 
      '/images/weather-1.png',
      '/images/weather-4.png',
      '/images/weather-5.png',
      '/images/weather-6.png',
      '/images/weather-3.png'
    ],
    caseStudyPdfUrl: '/Vibe_Weather_Case_Study.pdf'
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
    challengesSolutions: [
      {
        challenge: 'Stable scraping without getting blocked by anti-bot measures.',
        solution: 'Implemented randomized delays, rate limiting, and robust error handling to mimic human behavior.',
      },
      {
        challenge: 'Parsing dynamic HTML structures that change based on product availability.',
        solution: 'Built a modular selector system using BeautifulSoup that gracefully handles missing elements via conditional fallbacks.',
      },
      {
        challenge: 'Exporting unstructured data into a structured Excel format with charts.',
        solution: 'Used `xlsxwriter` to create a post-processing layer that calculates metrics and injects charts into formatted Excel sheets.',
      },
    ],
    learned: 'OOP design patterns, Excel automation, ethical web scraping practices',
    techStack: ['Python', 'BeautifulSoup', 'requests', 'pandas', 'xlsxwriter'],
    githubUrl: 'https://github.com/sweety-HJH223/web_scrapping',
    category: 'Python',
    images: ['/images/scraper-1.png', '/images/scraper-2.png', '/images/scraper-3.png'],
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
    challengesSolutions: [
      {
        challenge: 'Handling messy, inconsistent raw data formats from disparate input files.',
        solution: 'Developed a robust data normalization pipeline using pandas to standardize and clean data types before aggregation.',
      },
      {
        challenge: 'Processing and aggregating large volumes of transaction data without impacting performance.',
        solution: 'Optimized dataframe processing using vectorized pandas operations for near-instant aggregation.',
      },
      {
        challenge: 'Generating professional, readable Excel reports for non-technical stakeholders.',
        solution: 'Leveraged `xlsxwriter` to programmatically apply conditional formatting, headers, and visual styles to report outputs.',
      },
    ],
    learned: 'Advanced pandas, business reporting, professional data presentation',
    techStack: ['Python', 'pandas', 'xlsxwriter'],
    githubUrl: 'https://github.com/sweety-HJH223/excel-sales-automation',
    category: 'Automation',
    images: ['/images/sales-1.jpg', '/images/sales-2.jpg', '/images/sales-3.jpg', '/images/sales-4.jpg'],
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
    challengesSolutions: [
      {
        challenge: 'Preventing file overwrites during batch sorting operations.',
        solution: 'Developed a unique filename generation algorithm that checks for collisions and auto-renames files to maintain data integrity.',
      },
      {
        challenge: 'Tracking granular changes across complex file hierarchies.',
        solution: 'Added a background logging module that captures every move action and writes it to a persistent CSV audit log.',
      },
      {
        challenge: 'Maintaining high performance when handling thousands of files.',
        solution: 'Utilized `shutil` high-level file operations to minimize OS I/O overhead during massive sort operations.',
      },
    ],
    learned: 'File system automation, logging systems, error prevention strategies',
    techStack: ['Python', 'os', 'shutil', 'csv'],
    githubUrl: 'https://github.com/sweety-HJH223/file_automation',
    category: 'Automation',
  },
  {
    icon: '🌐',
    name: 'Personal Portfolio Website',
    slug: 'portfolio',
    featured: false,
    overview:
      'Personal portfolio built with Next.js featuring a dynamic AI chatbot, language switching, and interactive design.',
    whatItDoes: [
      'Interactive AI chatbot trained on my resume for intelligent Q&A',
      'Chatbot supports free-movement and context-aware responses',
      'Korean/English language toggle for global accessibility',
      'Dark/light theme mode with animated background',
      'Terminal-style bio and project showcase with modal navigation',
    ],
    challengesSolutions: [
      {
        challenge: 'Integrating LLM knowledge with real-time UI interactions.',
        solution: 'Engineered a state-driven chatbot interface that manages context and response flow independently of the main site navigation.',
      },
      {
        challenge: 'Maintaining a lively, interactive aesthetic without sacrificing page load performance.',
        solution: 'Leveraged Framer Motion for hardware-accelerated animations and implemented Next.js code-splitting to keep the main bundle light.',
      },
      {
        challenge: 'Ensuring consistent localization across dynamic UI text.',
        solution: 'Created a centralized LanguageContext provider to ensure consistent multi-lingual rendering across all UI components.',
      },
    ],
    learned: 'Next.js, LLM fine-tuning/prompting, UI/UX state management',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Gemini API'],
    category: 'Frontend',
    images: ['/images/portfolio-1.png', '/images/portfolio-2.png','/images/portfolio-3.png','/images/portfolio-4.png','/images/portfolio-5.png','/images/portfolio-6.png','/images/portfolio-7.png'],
  },
];
