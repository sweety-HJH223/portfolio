export type ProjectCategory = 'All' | 'Frontend' | 'Python' | 'AI' | 'Automation';

export interface Project {
  icon: string;
  name: string;
  nameKo?: string;
  slug: string;
  featured: boolean;
  overview: string;
  overviewKo?: string;
  whatItDoes: string[];
  whatItDoesKo?: string[];
  challengesSolutions: {
    challenge: string;
    challengeKo?: string;
    solution: string;
    solutionKo?: string;
  }[];
  learned: string;
  learnedKo?: string;
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  fullCaseStudyUrl?: string; // For your 50-page PDF or Notion link
  videoUrl?: string;
  category: ProjectCategory;
  image?: string; 
  images?: string[];
  caseStudy?: {
    problem: string;
    problemKo?: string;
    approach: string;
    approachKo?: string;
    result: string;
    resultKo?: string;
  };
  caseStudyPdfUrl?: string;
}

export const projects: Project[] = [
  {
    icon: '🤖',
    name: 'AI Chatbot Desktop Automation',
    nameKo: 'AI 챗봇 데스크탑 자동화',
    slug: 'ai-chatbot',
    featured: true,
    overview:
      'AI-powered desktop automation that reads messages and interacts with desktop applications using LLM without direct web APIs.',
    overviewKo:
      '직접적인 웹 API 없이 LLM을 사용하여 메시지를 읽고 데스크탑 애플리케이션과 상호 작용하는 AI 기반 데스크탑 자동화 도구입니다.',
    whatItDoes: [
      'Automated message reading and intelligent replying',
      'Uses LLM (OpenAI) for context-aware responses',
      'Human-like behavior with randomized cooldowns',
      'Handles UI interaction via mouse and keyboard simulation',
    ],
    whatItDoesKo: [
      '자동 메시지 읽기 및 지능형 응답',
      '문맥 인식 응답을 위해 LLM(OpenAI) 사용',
      '무작위 대기 시간을 통한 인간과 유사한 행동 구현',
      '마우스 및 키보드 시뮬레이션을 통한 UI 상호 작용 처리',
    ],
    challengesSolutions: [
      {
        challenge: 'Hardcoded coordinate dependencies for UI interaction causing brittleness during resolution changes.',
        challengeKo: 'UI 상호 작용을 위한 하드코딩된 좌표 의존성으로 인해 해상도 변경 시 취약함 발생.',
        solution: 'Transitioning to adaptive image recognition (OpenCV/PyAutoGUI) to identify UI elements dynamically, improving reliability across environments.',
        solutionKo: 'UI 요소를 동적으로 식별하기 위해 적응형 이미지 인식(OpenCV/PyAutoGUI)으로 전환하여 다양한 환경에서의 신뢰성 향상.',
      },
      {
        challenge: 'Maintaining human-like interaction speed to avoid detection as a bot.',
        challengeKo: '봇으로 감지되는 것을 피하기 위해 인간과 유사한 상호 작용 속도 유지.',
        solution: 'Implemented randomized execution delays and human-like typing simulation to vary response cadence.',
        solutionKo: '응답 리듬을 다양화하기 위해 무작위 실행 지연 및 인간과 유사한 타이핑 시뮬레이션 구현.',
      },
      {
        challenge: 'Data extraction from non-API desktop applications.',
        challengeKo: 'API가 없는 데스크탑 애플리케이션으로부터 데이터 추출.',
        solution: 'Utilized OCR (Tesseract) and clipboard parsing techniques to read text directly from the application interface.',
        solutionKo: '애플리케이션 인터페이스에서 직접 텍스트를 읽기 위해 OCR(Tesseract) 및 클립보드 파싱 기술 활용.',
      },
    ],
    learned: 'Desktop automation, LLM prompt engineering, advanced GUI scripting',
    learnedKo: '데스크탑 자동화, LLM 프롬프트 엔지니어링, 고급 GUI 스크립팅',
    techStack: ['Python', 'PyAutoGUI', 'OpenAI API', 'Clipboard manipulation'],
    githubUrl: 'https://github.com/sweety-HJH223/AI_BOT',
    category: 'AI',
    
  },
  {
    icon: '🌦️',
    name: 'Vibe Weather (EN/KO)',
    nameKo: 'Vibe Weather (영어/한국어)',
    slug: 'weather-app',
    featured: true,
    overview:
      'A high-performance weather application with real-time bilingual switching and a lively "Vibe" aesthetic that adapts to the time of day.',
    overviewKo:
      '실시간 이중 언어 전환 기능을 갖추고 하루 중 시간에 따라 변화하는 생동감 넘치는 "Vibe" 테마의 고성능 날씨 애플리케이션입니다.',
    whatItDoes: [
      'Calculates "Real Feel" temperature using wind speed & humidity',
      'Displays UV index, humidity, AQI, and pollen levels',
      'Provides outfit recommendations based on conditions',
      'Dynamic video backgrounds & music that shift based on time (Morning/Afternoon/Evening/Night)',
      'Social media sharing integration',
      'Real-time English/Korean language switching',
    ],
    whatItDoesKo: [
      '풍속과 습도를 이용한 "체감" 온도 계산',
      '자외선 지수, 습도, 대기질 지수(AQI) 및 꽃가루 수치 표시',
      '날씨 조건에 따른 옷차림 추천 제공',
      '시간대(아침/오후/저녁/밤)에 따라 변화하는 동적 비디오 배경 및 음악',
      '소셜 미디어 공유 통합 기능',
      '실시간 영어/한국어 언어 전환',
    ],
    challengesSolutions: [
      {
        challenge: 'Synchronizing dynamic background and audio assets with real-time weather data without UI lag.',
        challengeKo: 'UI 지연 없이 실시간 날씨 데이터와 동적 배경 및 오디오 자산을 동기화하는 작업.',
        solution: 'Engineered a centralized state manager that asynchronously pre-loads video segments and buffers audio, ensuring seamless scene transitions.',
        solutionKo: '비디오 세그먼트를 비동기적으로 미리 로드하고 오디오를 버퍼링하여 원활한 장면 전환을 보장하는 중앙 집중식 상태 관리자를 설계함.',
      },
      {
        challenge: 'Calculating an accurate "Real Feel" index beyond simple temperature.',
        challengeKo: '단순한 온도를 넘어 정확한 "체감" 지수 계산.',
        solution: 'Integrated thermodynamic formulas factoring in relative humidity and wind speed for a human-centric comfort metric.',
        solutionKo: '인간 중심의 편안함 지표를 위해 상대 습도와 풍속을 고려한 열역학 공식을 통합함.',
      },
      {
        challenge: 'Ensuring consistent UI responsiveness across disparate device screens for bilingual content.',
        challengeKo: '이중 언어 콘텐츠에 대해 다양한 기기 화면에서 일관된 UI 반응성 보장.',
        solution: 'Applied a mobile-first, grid-based CSS architecture with dynamic font-scaling to prevent overflow during language toggling.',
        solutionKo: '언어 전환 중 오버플로우를 방지하기 위해 동적 폰트 스케일링을 적용한 모바일 퍼스트, 그리드 기반 CSS 아키텍처를 적용함.',
      },
    ],
    learned: 'Advanced state management, media asset handling, UX/UI aesthetic engineering',
    learnedKo: '고급 상태 관리, 미디어 자산 처리, UX/UI 미학 엔지니어링',
    techStack: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API', 'Weather Data Modeling'],
    githubUrl: 'https://github.com/sweety-HJH223/toggle-weather',
    liveDemoUrl: 'https://korean-weather-app.vercel.app',
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
    nameKo: '파이썬 웹 스크래퍼 + 엑셀 대시보드',
    slug: 'web-scraper',
    featured: false,
    overview:
      'OOP-based scraper that extracts product data from live e-commerce sites and generates professional Excel reports with charts.',
    overviewKo:
      '실제 이커머스 사이트에서 제품 데이터를 추출하고 차트가 포함된 전문적인 엑셀 보고서를 생성하는 OOP 기반 스크래퍼입니다.',
    whatItDoes: [
      'Extracts title, price, rating, stock from live sites',
      'Dual-level error handling + file logging',
      'Auto-timestamped output files',
      'Excel reports with pie and bar charts',
      'KPI metrics dashboard sheet',
      'Ethical rate limiting + randomized delays',
    ],
    whatItDoesKo: [
      '실시간 사이트에서 제목, 가격, 평점, 재고 정보 추출',
      '이중 레벨 오류 처리 및 파일 로깅',
      '자동 타임스탬프 출력 파일 생성',
      '원형 및 막대 차트가 포함된 엑셀 보고서',
      'KPI 지표 대시보드 시트',
      '윤리적 속도 제한 및 무작위 지연 적용',
    ],
    challengesSolutions: [
      {
        challenge: 'Stable scraping without getting blocked by anti-bot measures.',
        challengeKo: '안티 봇 조치에 차단되지 않고 안정적으로 스크래핑 수행.',
        solution: 'Implemented randomized delays, rate limiting, and robust error handling to mimic human behavior.',
        solutionKo: '인간의 행동을 모방하기 위해 무작위 지연, 속도 제한 및 강력한 오류 처리를 구현함.',
      },
      {
        challenge: 'Parsing dynamic HTML structures that change based on product availability.',
        challengeKo: '제품 가용성에 따라 변하는 동적 HTML 구조 파싱.',
        solution: 'Built a modular selector system using BeautifulSoup that gracefully handles missing elements via conditional fallbacks.',
        solutionKo: '조건부 폴백을 통해 누락된 요소를 유연하게 처리하는 BeautifulSoup 기반 모듈형 셀렉터 시스템을 구축함.',
      },
      {
        challenge: 'Exporting unstructured data into a structured Excel format with charts.',
        challengeKo: '비구조화된 데이터를 차트가 포함된 구조화된 엑셀 형식으로 내보내기.',
        solution: 'Used `xlsxwriter` to create a post-processing layer that calculates metrics and injects charts into formatted Excel sheets.',
        solutionKo: '`xlsxwriter`를 사용하여 지표를 계산하고 서식이 지정된 엑셀 시트에 차트를 삽입하는 후처리 레이어를 만듦.',
      },
    ],
    learned: 'OOP design patterns, Excel automation, ethical web scraping practices',
    learnedKo: 'OOP 디자인 패턴, 엑셀 자동화, 윤리적 웹 스크래핑 관행',
    techStack: ['Python', 'BeautifulSoup', 'requests', 'pandas', 'xlsxwriter'],
    githubUrl: 'https://github.com/sweety-HJH223/web_scrapping',
    category: 'Python',
    images: ['/images/scraper-1.png', '/images/scraper-2.png', '/images/scraper-3.png'],
  },
  {
    icon: '📊',
    name: 'Automated Sales Analysis Reporter',
    nameKo: '자동화된 매출 분석 보고서 생성기',
    slug: 'sales-reporter',
    featured: false,
    overview:
      'Data pipeline that transforms raw Excel transaction logs into clean executive-ready business reports automatically.',
    overviewKo:
      '원시 엑셀 트랜잭션 로그를 경영진용 비즈니스 보고서로 자동 변환하는 데이터 파이프라인입니다.',
    whatItDoes: [
      'Automated data cleaning + normalization',
      'Financial aggregation eliminating manual entry',
      'Multi-sheet Excel output',
      'Category summaries + high level KPIs',
      'Auto-adjusts column widths professionally',
    ],
    whatItDoesKo: [
      '자동 데이터 정제 및 정규화',
      '수동 입력을 제거하는 재무 집계',
      '멀티 시트 엑셀 출력',
      '카테고리 요약 및 핵심 KPI',
      '열 너비 자동 조정 기능',
    ],
    challengesSolutions: [
      {
        challenge: 'Handling messy, inconsistent raw data formats from disparate input files.',
        challengeKo: '서로 다른 입력 파일의 일관성 없고 복잡한 원시 데이터 형식 처리.',
        solution: 'Developed a robust data normalization pipeline using pandas to standardize and clean data types before aggregation.',
        solutionKo: '집계 전 데이터 유형을 표준화하고 정제하기 위해 pandas를 사용한 강력한 데이터 정규화 파이프라인을 개발함.',
      },
      {
        challenge: 'Processing and aggregating large volumes of transaction data without impacting performance.',
        challengeKo: '성능 저하 없이 대량의 트랜잭션 데이터 처리 및 집계.',
        solution: 'Optimized dataframe processing using vectorized pandas operations for near-instant aggregation.',
        solutionKo: '거의 즉각적인 집계를 위해 벡터화된 pandas 연산을 사용하여 데이터프레임 처리를 최적화함.',
      },
      {
        challenge: 'Generating professional, readable Excel reports for non-technical stakeholders.',
        challengeKo: '기술 지식이 없는 이해관계자를 위한 전문적이고 가독성 높은 엑셀 보고서 생성.',
        solution: 'Leveraged `xlsxwriter` to programmatically apply conditional formatting, headers, and visual styles to report outputs.',
        solutionKo: '보고서 출력물에 조건부 서식, 헤더 및 시각적 스타일을 프로그래밍 방식으로 적용하기 위해 `xlsxwriter`를 활용함.',
      },
    ],
    learned: 'Advanced pandas, business reporting, professional data presentation',
    learnedKo: '고급 pandas 활용, 비즈니스 보고, 전문적인 데이터 프레젠테이션',
    techStack: ['Python', 'pandas', 'xlsxwriter'],
    githubUrl: 'https://github.com/sweety-HJH223/excel-sales-automation',
    category: 'Automation',
    images: ['/images/sales-1.jpg', '/images/sales-2.jpg', '/images/sales-3.jpg', '/images/sales-4.jpg'],
  },
  {
    icon: '📁',
    name: 'Batch File Organizer with Audit Log',
    nameKo: '감사 로그 기능이 포함된 일괄 파일 정리 도구',
    slug: 'file-organizer',
    featured: false,
    overview:
      'Desktop automation tool that organizes files by type into categorized folders with full audit logging.',
    overviewKo:
      '파일을 유형별로 카테고리화된 폴더로 정리하고 전체 감사 로그를 기록하는 데스크탑 자동화 도구입니다.',
    whatItDoes: [
      'Organizes files by type automatically',
      'Duplicate-safe unique filename generation',
      'Timestamped CSV audit log for every operation',
      'Professional accountability tracking',
    ],
    whatItDoesKo: [
      '파일 유형별 자동 정리',
      '중복 방지를 위한 고유 파일 이름 생성',
      '모든 작업에 대한 타임스탬프 CSV 감사 로그 생성',
      '전문적인 작업 추적 기능',
    ],
    challengesSolutions: [
      {
        challenge: 'Preventing file overwrites during batch sorting operations.',
        challengeKo: '일괄 정렬 작업 중 파일 덮어쓰기 방지.',
        solution: 'Developed a unique filename generation algorithm that checks for collisions and auto-renames files to maintain data integrity.',
        solutionKo: '데이터 무결성을 유지하기 위해 충돌을 확인하고 파일 이름을 자동으로 변경하는 고유 파일 이름 생성 알고리즘을 개발함.',
      },
      {
        challenge: 'Tracking granular changes across complex file hierarchies.',
        challengeKo: '복잡한 파일 계층 구조 전반의 세부적인 변경 사항 추적.',
        solution: 'Added a background logging module that captures every move action and writes it to a persistent CSV audit log.',
        solutionKo: '모든 이동 작업을 캡처하여 영구적인 CSV 감사 로그에 기록하는 백그라운드 로깅 모듈을 추가함.',
      },
      {
        challenge: 'Maintaining high performance when handling thousands of files.',
        challengeKo: '수천 개의 파일을 처리할 때 높은 성능 유지.',
        solution: 'Utilized `shutil` high-level file operations to minimize OS I/O overhead during massive sort operations.',
        solutionKo: '대규모 정렬 작업 중 OS I/O 오버헤드를 최소화하기 위해 `shutil` 고급 파일 작업을 활용함.',
      },
    ],
    learned: 'File system automation, logging systems, error prevention strategies',
    learnedKo: '파일 시스템 자동화, 로깅 시스템, 오류 방지 전략',
    techStack: ['Python', 'os', 'shutil', 'csv'],
    githubUrl: 'https://github.com/sweety-HJH223/file_automation',
    category: 'Automation',
  },
  {
    icon: '🌐',
    name: 'Personal Portfolio Website',
    nameKo: '개인 포트폴리오 웹사이트',
    slug: 'portfolio',
    featured: false,
    overview:
      'Personal portfolio built with Next.js featuring a dynamic AI chatbot, language switching, and interactive design.',
    overviewKo:
      '동적 AI 챗봇, 언어 전환 및 인터랙티브 디자인을 갖춘 Next.js 기반 개인 포트폴리오 사이트입니다.',
    whatItDoes: [
      'Interactive AI chatbot trained on my resume for intelligent Q&A',
      'Chatbot supports free-movement and context-aware responses',
      'Korean/English language toggle for global accessibility',
      'Dark/light theme mode with animated background',
      'Terminal-style bio and project showcase with modal navigation',
    ],
    whatItDoesKo: [
      '지능형 Q&A를 위해 내 이력서를 학습한 인터랙티브 AI 챗봇',
      '자유로운 이동과 문맥 인식 응답을 지원하는 챗봇',
      '글로벌 접근성을 위한 한국어/영어 언어 전환 기능',
      '애니메이션 배경이 포함된 다크/라이트 테마 모드',
      '터미널 스타일의 자기소개 및 모달 내비게이션을 통한 프로젝트 쇼케이스',
    ],
    challengesSolutions: [
      {
        challenge: 'Integrating LLM knowledge with real-time UI interactions.',
        challengeKo: 'LLM 지식과 실시간 UI 상호 작용 통합.',
        solution: 'Engineered a state-driven chatbot interface that manages context and response flow independently of the main site navigation.',
        solutionKo: '기본 사이트 내비게이션과 독립적으로 문맥과 응답 흐름을 관리하는 상태 중심 챗봇 인터페이스를 설계함.',
      },
      {
        challenge: 'Maintaining a lively, interactive aesthetic without sacrificing page load performance.',
        challengeKo: '페이지 로드 성능을 희생하지 않으면서 생동감 넘치는 인터랙티브 미학 유지.',
        solution: 'Leveraged Framer Motion for hardware-accelerated animations and implemented Next.js code-splitting to keep the main bundle light.',
        solutionKo: '하드웨어 가속 애니메이션을 위해 Framer Motion을 활용하고, 메인 번들을 가볍게 유지하기 위해 Next.js 코드 분할을 구현함.',
      },
      {
        challenge: 'Ensuring consistent localization across dynamic UI text.',
        challengeKo: '동적 UI 텍스트 전반에 걸친 일관된 로컬라이제이션 보장.',
        solution: 'Created a centralized LanguageContext provider to ensure consistent multi-lingual rendering across all UI components.',
        solutionKo: '모든 UI 컴포넌트에서 일관된 다국어 렌더링을 보장하기 위해 중앙 집중식 LanguageContext 프로바이더를 생성함.',
      },
    ],
    learned: 'Next.js, LLM fine-tuning/prompting, UI/UX state management',
    learnedKo: 'Next.js, LLM 파인튜닝/프롬프팅, UI/UX 상태 관리',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Gemini API'],
    category: 'Frontend',
    images: ['/images/portfolio-1.png', '/images/portfolio-2.png','/images/portfolio-3.png','/images/portfolio-4.png','/images/portfolio-5.png','/images/portfolio-6.png','/images/portfolio-7.png'],
  },
  {
    icon: '🏢',
    name: 'K-Trust — Korean Market Compliance Portal',
    nameKo: 'K-Trust — 한국 시장 컴플라이언스 포털',
    slug: 'k-trust',
    featured: true,
    overview:
      'AI-powered B2B compliance verification system for South Korean merchants, auditing sellers using a live AI pipeline.',
    overviewKo:
      '한국 상인을 위한 AI 기반 B2B 컴플라이언스 검증 시스템으로, 실시간 AI 파이프라인을 통해 판매자 신뢰도를 감사합니다.',
    whatItDoes: [
      'Audits South Korean merchants using a live AI pipeline',
      'Uses Gemini 2.5 Flash to analyze raw market data and return structured risk reports',
      'Features real-time trust scoring and legal status verification',
      'Generates AI compliance summaries for B2B stakeholders',
    ],
    whatItDoesKo: [
      '실시간 AI 파이프라인을 통한 한국 상인 감사 및 검증',
      'Gemini 2.5 Flash를 활용한 시장 데이터 분석 및 구조화된 리스크 보고서 생성',
      '실시간 신뢰도 점수 산출 및 법적 상태 확인 기능',
      'B2B 이해관계자를 위한 AI 기반 컴플라이언스 요약 보고서 제공',
    ],
    challengesSolutions: [
      {
        challenge: 'Ensuring consistent structure in AI-generated risk reports from unstructured market data.',
        challengeKo: '비구조화된 시장 데이터로부터 AI가 생성하는 리스크 보고서의 일관된 구조 보장.',
        solution: 'Implemented strict Pydantic schemas in FastAPI and prompt engineering to force Gemini into returning validated JSON objects.',
        solutionKo: 'FastAPI의 엄격한 Pydantic 스키마와 프롬프트 엔지니어링을 적용하여 Gemini가 검증된 JSON 객체를 반환하도록 강제함.',
      },
      {
        challenge: 'Processing high-volume merchant data without hitting LLM rate limits or latency bottlenecks.',
        challengeKo: 'LLM 속도 제한이나 지연 시간 병목 현상 없이 대량의 상인 데이터 처리.',
        solution: 'Optimized the backend with asynchronous FastAPI tasks and utilized Gemini 2.5 Flash for its high-speed inference capabilities.',
        solutionKo: '비동기 FastAPI 태스크로 백엔드를 최적화하고 고속 추론 기능이 뛰어난 Gemini 2.5 Flash를 활용함.',
      },
      {
        challenge: 'Preventing LLM output from breaking the frontend when Gemini returns inconsistent JSON structures.',
        challengeKo: 'Gemini가 일관되지 않은 JSON 구조를 반환할 때 프론트엔드가 오류를 일으키지 않도록 방지.',
        solution: 'Used Pydantic response_schema enforcement in the new Gemini SDK to guarantee exact field types, eliminating the need for defensive JSON parsing or markdown stripping.',
        solutionKo: '새로운 Gemini SDK의 Pydantic response_schema 강제 적용으로 정확한 필드 타입을 보장하여 방어적 JSON 파싱이나 마크다운 제거 없이도 안정적인 출력을 실현함.',
      },
    ],
    learned: 'High-speed AI inference, FastAPI backend architecture, B2B compliance standards',
    learnedKo: '고속 AI 추론 처리, FastAPI 백엔드 아키텍처, B2B 컴플라이언스 표준 실무',
    techStack: ['Next.js', 'FastAPI', 'Python', 'Google Gemini 2.5', 'Vercel', 'Railway'],
    githubUrl: 'https://github.com/sweety-HJH223/K-Trust',
    liveDemoUrl: 'https://project-4xzgu-blush.vercel.app/',
    category: 'AI',
    images: [
      '/images/K-Trust-1.png',
      '/images/K-Trust-2.png',
      '/images/K-Trust-3.png',
      '/images/K-Trust-4.png',
    ],
  },
];
