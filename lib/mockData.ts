import { Category, Project, Message } from "../types";

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Mobile Apps", slug: "mobile-apps", icon: "Smartphone" },
  { id: "cat-2", name: "AI Automation Systems", slug: "ai-systems", icon: "Brain" },
  { id: "cat-3", name: "Games", slug: "games", icon: "Gamepad" },
  { id: "cat-4", name: "Desktop Software", slug: "desktop-software", icon: "Monitor" },
  { id: "cat-5", name: "Web Platforms", slug: "web-platforms", icon: "Globe" },
  { id: "cat-6", name: "Fintech", slug: "fintech", icon: "CreditCard" },
  { id: "cat-7", name: "Web3 & Blockchain", slug: "web3-blockchain", icon: "Link2" },
  { id: "cat-8", name: "Data Scraping", slug: "data-scraping", icon: "Database" },
];

export const mockProjects: Project[] = [
  {
    id: "proj-wema-luna",
    title: "Luna.online — Wema Bank Hackathon Winner",
    slug: "luna-online-wema-hackathon",
    category_id: "cat-6",
    short_description: "1st Place Winner at the Wema Bank Hackathon (Benin City Edition). Led a 7-person engineering team building Luna.online, an intelligent banking intelligence and cash flow prediction platform.",
    full_description: "Luna.online is an award-winning banking intelligence platform built during the prestigious Wema Bank Hackathon (Benin City Edition), where our 7-person engineering team won 1st Place. The platform provides automated cash flow analysis, real-time transaction reconciliation, AI-assisted financial recommendations, and predictive treasury tracking designed for modern enterprise and SME banking customers.",
    tech_stack: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "Fintech APIs", "AI Automation"],
    featured: true,
    private_github: true,
    cover_image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
    ],
    demo_video: null,
    external_url: "https://wema-cash-flow.vercel.app",
    github_url: "https://github.com/Omatsulijoshua/Wema-Cash-Flow",
    employer_note: "Highlights high-intensity hackathon leadership, building a production-ready fintech concept and winning 1st Place.",
    project_highlights: [
      "Won 1st Place / Champions at the Wema Bank Hackathon (Benin City Edition).",
      "Led a multidisciplinary 7-person engineering team under strict hackathon deadlines.",
      "Engineered real-time cash flow intelligence, ledger balance tracking, and AI-driven advisory workflows.",
      "Presented technical architecture and business value to bank executives and industry judges."
    ],
    project_resources: [
      {
        id: "res-luna-repo",
        label: "GitHub Repository",
        type: "repository",
        url: "https://github.com/Omatsulijoshua/Wema-Cash-Flow"
      }
    ],
    created_at: "2026-09-17T12:00:00.000Z",
    categories: mockCategories[5],
  },
  {
    id: "proj-mybandup",
    title: "MyBandUp IELTS",
    slug: "mybandup-ielts",
    category_id: "cat-2",
    short_description: "AI-assisted IELTS preparation product with writing feedback, speaking analysis, timed mock tests, and cross-platform access across web and Android.",
    full_description: "MyBandUp IELTS is an all-in-one AI-assisted examination preparation platform serving candidate learners. Features include instant essay scoring with detailed lexical and grammatical critique, automated speech evaluation, full-length timed mock tests with band-score prediction, and synchronized progress analytics across the responsive web app, Android app, and iOS mobile web experience.",
    tech_stack: ["Flutter", "React", "Next.js", "Node.js", "OpenAI & Gemini APIs", "PostgreSQL", "Tailwind CSS"],
    featured: true,
    private_github: true,
    cover_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop"
    ],
    demo_video: null,
    external_url: "https://mybandupielts.com",
    github_url: "https://github.com/Omatsulijoshua/MyBandUp-IELTS",
    employer_note: "Demonstrates complete customer-facing educational SaaS with AI grading pipelines and multi-client account synchronization.",
    project_highlights: [
      "AI-assisted writing feedback and automated speaking analysis with real-time scoring.",
      "Timed full-length mock tests with granular section-by-section analytics.",
      "Unified accounts across web platform, Android APK, and mobile web app."
    ],
    project_resources: [
      {
        id: "res-bandup-web",
        label: "Live Website",
        type: "demo",
        url: "https://mybandupielts.com"
      }
    ],
    created_at: "2026-10-14T10:00:00.000Z",
    categories: mockCategories[1],
  },
  {
    id: "proj-nigerian-law",
    title: "What Does Nigerian Law Say?",
    slug: "what-does-nigerian-law-say",
    category_id: "cat-2",
    short_description: "Public Nigerian legal-information product where users ask questions and explore plain-language explanations, rights, practical next steps, and linked source material.",
    full_description: "What Does Nigerian Law Say is a public civic legal technology application designed around traceable statutory sources. Users query any legal scenario to receive plain-language summaries of constitutional rights, criminal codes, land acts, and administrative procedures with explicit source citations and guidance on professional legal consultation.",
    tech_stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "LLM APIs", "PostgreSQL", "Vector Search"],
    featured: true,
    private_github: false,
    cover_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop"
    ],
    demo_video: null,
    external_url: "https://what-does-nigeria-law-says.thispage.xyz",
    github_url: "https://github.com/Omatsulijoshua/what-does-the-law-says",
    employer_note: "Showcases AI hallucination mitigation, verified citation workflows, and public-utility civic design.",
    project_highlights: [
      "Engineered statutory grounding to deliver verifiable legal citations.",
      "Built clean, high-accessibility UI with fast search and instant answer retrieval.",
      "Integrated legal disclaimers and structured source material linking."
    ],
    project_resources: [
      {
        id: "res-law-site",
        label: "Live Application",
        type: "demo",
        url: "https://what-does-nigeria-law-says.thispage.xyz"
      }
    ],
    created_at: "2026-10-18T14:00:00.000Z",
    categories: mockCategories[1],
  },
  {
    id: "proj-portfolio-platform",
    title: "Omatsuli Joshua Portfolio & Admin Platform",
    slug: "omatsuli-joshua-portfolio-platform",
    category_id: "cat-5",
    short_description: "High-performance portfolio website with standalone admin control panel deployed across dedicated subdomains with real-time PostgreSQL telemetry.",
    full_description: "A dual-architecture software portfolio showcasing production systems, CV automation, dynamic project administration, visitor telemetry, and contact message notifications. Built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, and PostgreSQL via Neon DB.",
    tech_stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "PostgreSQL", "Framer Motion", "PDFKit", "Vercel"],
    featured: true,
    private_github: false,
    cover_image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop"
    ],
    demo_video: null,
    external_url: "https://omatsuli-joshua-poitflio.thispage.xyz",
    github_url: "https://github.com/Omatsulijoshua/portfolio-website",
    employer_note: "Demonstrates modern frontend craftsmanship, clean microservices splitting, and autonomous deployment automation.",
    project_highlights: [
      "Split public showcase and administrative management into isolated deployments.",
      "Custom domain deployment with automated SSL wildcard resolution.",
      "Real-time PostgreSQL telemetry, inbox management, and dynamic resume PDF generation."
    ],
    project_resources: [
      {
        id: "res-port-site",
        label: "Live Portfolio",
        type: "demo",
        url: "https://omatsuli-joshua-poitflio.thispage.xyz"
      },
      {
        id: "res-admin-site",
        label: "Admin Panel",
        type: "demo",
        url: "https://admin.omatsuli-joshua-poitflio.thispage.xyz"
      }
    ],
    created_at: "2026-10-19T22:00:00.000Z",
    categories: mockCategories[4],
  },
  {
    id: "proj-1",
    title: "Aether Swap & Wallet",
    slug: "aether-swap-wallet",
    category_id: "cat-7",
    short_description: "A secure, non-custodial multi-chain wallet and decentralized exchange supporting Ethereum EVM networks, Solana transactions, and NFT portfolios.",
    full_description: "Aether Swap & Wallet is a state-of-the-art Web3 application designed to act as an entry point for modern users into decentralized finance. It incorporates high-throughput decentralized exchange (DEX) pipelines, ERC-721/ERC-1155 NFT gallery viewers, and multi-chain gas-optimized cross-swaps between Ethereum (EVM chains) and Solana.\n\nThe DEX module utilizes highly audited smart contracts to perform on-chain atomic swaps with low slip thresholds. The app relies on hardware-level biometric keystore integration for signing transactions, local database encryption with SQLCipher, and optimized web-socket connections to monitor gas rates on various networks. The entire interface is animated at 120Hz using Framer Motion for a premium feel.",
    tech_stack: ["Solidity", "Rust (Anchor)", "Ethereum EVM", "Solana", "Flutter", "Supabase", "WebSockets"],
    featured: true,
    private_github: true,
    cover_image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1200&auto=format&fit=crop"
    ],
    demo_video: null,
    external_url: "https://aether-wallet-demo.vercel.app",
    github_url: "https://github.com/joshua/aether-wallet-private",
    employer_note: "Shows mobile-first product thinking, secure transaction flow, and multi-chain architecture for finance-grade applications.",
    project_highlights: [
      "Designed a non-custodial wallet flow with biometric signing patterns.",
      "Connected EVM and Solana transaction concepts in one product experience.",
      "Added testable demo and APK resources for hands-on employer review.",
    ],
    project_resources: [
      {
        id: "res-aether-demo",
        label: "Live Wallet Demo",
        type: "demo",
        url: "https://aether-wallet-demo.vercel.app",
      },
      {
        id: "res-aether-apk",
        label: "Android APK Build",
        type: "apk",
        url: "https://example.com/aether-wallet.apk",
        description: "Installable Android build for device testing.",
        file_name: "aether-wallet.apk",
      },
    ],
    created_at: "2026-01-15T08:00:00.000Z",
    categories: mockCategories[6],
  },

  {
    id: "proj-2",
    title: "Helius AI Engine",
    slug: "helius-ai-engine",
    category_id: "cat-2",
    short_description: "Distributed natural language pipeline designed for low-latency agentic coordination and tool use.",
    full_description: "Helius AI is a custom-trained lightweight language model coordinator. It routes user requests to specialized local agents, formats tool outputs, and maintains conversational states within a 4ms routing latency. By using Rust for high-throughput concurrency and Python for core model interfacing, Helius scales dynamically based on CPU/GPU loads.\n\nThe system features dynamic context-window slicing, structured JSON schema reinforcement at the token generation level, and automatic vector retrieval caching using PgVector. Ideal for enterprise client scheduling and analytics pipelines.",
    tech_stack: ["Python", "Rust", "TensorFlow", "PostgreSQL", "Next.js", "Docker"],
    featured: true,
    private_github: true,
    cover_image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1680814908456-6214489c9dec?q=80&w=1200&auto=format&fit=crop"
    ],
    demo_video: null,
    external_url: null,
    github_url: "https://github.com/joshua/helius-core-private",
    employer_note: "Demonstrates AI workflow design, backend orchestration, and structured data handling for automation-heavy teams.",
    project_highlights: [
      "Built request routing patterns for model/tool coordination.",
      "Used PostgreSQL and vector retrieval concepts for context-aware responses.",
      "Documented system architecture for technical review.",
    ],
    project_resources: [
      {
        id: "res-helius-docs",
        label: "Architecture Notes",
        type: "document",
        url: "https://example.com/helius-architecture.pdf",
        file_name: "helius-architecture.pdf",
      },
    ],
    created_at: "2026-02-10T12:00:00.000Z",
    categories: mockCategories[1],
  },
  {
    id: "proj-3",
    title: "Solaria RPG",
    slug: "solaria-rpg",
    category_id: "cat-3",
    short_description: "A fast-paced multiplayer web-based rogue-lite game powered by canvas-based rendering and WebSocket networks.",
    full_description: "Solaria is an experimental game designed to test the limits of real-time web rendering. Built using raw HTML5 Canvas and custom shaders, players navigate an infinite procedural dungeon while fighting monsters, collecting items, and upgrading stats in a shared room.\n\nThe multiplayer state is synchronized via standard WebSockets running on a lightweight Node.js server. The game achieves solid 60 FPS performance on standard mobile devices and PCs by decoupling rendering cycles from network ticks and implementing client-side prediction algorithms.",
    tech_stack: ["TypeScript", "Node.js", "HTML5 Canvas", "WebSockets", "CSS3"],
    featured: true,
    private_github: true,
    cover_image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
    ],
    demo_video: null,
    external_url: "https://solaria-rpg.vercel.app",
    github_url: "https://github.com/joshua/solaria-game-private",
    employer_note: "Proves real-time interface skill, browser performance awareness, and multiplayer state synchronization.",
    project_highlights: [
      "Built a browser-playable game experience with real-time state flow.",
      "Optimized canvas rendering for smooth gameplay.",
      "Separated rendering and network timing for better responsiveness.",
    ],
    project_resources: [
      {
        id: "res-solaria-game",
        label: "Play Browser Demo",
        type: "demo",
        url: "https://solaria-rpg.vercel.app",
      },
    ],
    created_at: "2026-03-05T14:30:00.000Z",
    categories: mockCategories[2],
  },
  {
    id: "proj-4",
    title: "Aero Editor",
    slug: "aero-editor",
    category_id: "cat-4",
    short_description: "High-performance minimalist desktop writing app featuring real-time PDF rendering, vim bindings, and cloud syncing.",
    full_description: "Aero Editor is a desktop application written using C# and Electron.NET to provide write-intensive professionals with a distractions-free Markdown environment. It includes real-time PDF conversion, syntax highlighting for over 80 coding languages, and seamless syncing with encrypted databases.\n\nFeaturing an offline-first architecture, your documents are synced instantly whenever a connection is established. It utilizes custom web view sandboxes to protect scripts and ensure privacy.",
    tech_stack: ["C#", "Electron.NET", "React", "Node.js", "Tailwind CSS"],
    featured: false,
    private_github: true,
    cover_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
    ],
    demo_video: null,
    external_url: null,
    github_url: "https://github.com/joshua/aero-docs-private",
    employer_note: "Shows desktop-product thinking, offline-first architecture, and productivity-tool UX.",
    project_highlights: [
      "Designed a focused writing interface for heavy document workflows.",
      "Added real-time PDF rendering concepts and encrypted sync flow.",
      "Built for privacy and offline usage.",
    ],
    project_resources: [],
    created_at: "2026-04-01T10:15:00.000Z",
    categories: mockCategories[3],
  },
  {
    id: "proj-5",
    title: "Chronos Team Planner",
    slug: "chronos-team-planner",
    category_id: "cat-5",
    short_description: "A collaborative calendar and project management platform with real-time editing and analytics dashboard.",
    full_description: "Chronos is a collaborative workspace tool built to solve team synchronization across timezones. It features an interactive grid calendar, kanban boards, live chat, and automatic reporting utilizing clean SVG charts.\n\nBy leveraging Next.js React Server Components and Supabase realtime hooks, multiple team members can edit tasks, schedule events, and leave comments concurrently. Layout changes are saved instantly, and user actions are animated using Framer Motion for premium feel.",
    tech_stack: ["Next.js", "React", "Supabase", "Tailwind CSS", "Framer Motion", "Recharts"],
    featured: false,
    private_github: false,
    cover_image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop"
    ],
    demo_video: null,
    external_url: "https://chronos-planner.vercel.app",
    github_url: "https://github.com/joshua/chronos-planner",
    employer_note: "A practical SaaS-style project showing collaboration features, dashboards, and real-time user workflows.",
    project_highlights: [
      "Built team scheduling and task-planning interfaces.",
      "Used realtime data concepts for collaborative updates.",
      "Created analytics-ready dashboard structure.",
    ],
    project_resources: [
      {
        id: "res-chronos-demo",
        label: "Open Live Planner",
        type: "demo",
        url: "https://chronos-planner.vercel.app",
      },
    ],
    created_at: "2026-04-18T16:00:00.000Z",
    categories: mockCategories[4],
  },
];

// Helper to interact with Local Storage for Admin operations if Supabase is offline
const IS_SERVER = typeof window === "undefined";

export const getLocalProjects = (): Project[] => {
  if (IS_SERVER) return mockProjects;
  const stored = localStorage.getItem("joshua_studio_projects");
  if (!stored) {
    localStorage.setItem("joshua_studio_projects", JSON.stringify(mockProjects));
    return mockProjects;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return mockProjects;
  }
};

export const saveLocalProjects = (projects: Project[]) => {
  if (IS_SERVER) return;
  localStorage.setItem("joshua_studio_projects", JSON.stringify(projects));
};

export const getLocalCategories = (): Category[] => {
  if (IS_SERVER) return mockCategories;
  const stored = localStorage.getItem("joshua_studio_categories");
  if (!stored) {
    localStorage.setItem("joshua_studio_categories", JSON.stringify(mockCategories));
    return mockCategories;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return mockCategories;
  }
};

export const saveLocalCategories = (categories: Category[]) => {
  if (IS_SERVER) return;
  localStorage.setItem("joshua_studio_categories", JSON.stringify(categories));
};

export const getLocalMessages = (): Message[] => {
  if (IS_SERVER) return [];
  const stored = localStorage.getItem("joshua_studio_messages");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveLocalMessages = (messages: Message[]) => {
  if (IS_SERVER) return;
  localStorage.setItem("joshua_studio_messages", JSON.stringify(messages));
};
