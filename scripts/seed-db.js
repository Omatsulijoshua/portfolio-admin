const { Client } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_I8uECfWwS0RF@ep-young-cake-axyrwp6d-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const mockCategories = [
  { id: "11111111-1111-1111-1111-111111111111", name: "Mobile Apps", slug: "mobile-apps", icon: "Smartphone" },
  { id: "22222222-2222-2222-2222-222222222222", name: "AI Automation Systems", slug: "ai-systems", icon: "Brain" },
  { id: "33333333-3333-3333-3333-333333333333", name: "Games", slug: "games", icon: "Gamepad" },
  { id: "44444444-4444-4444-4444-444444444444", name: "Desktop Software", slug: "desktop-software", icon: "Monitor" },
  { id: "55555555-5555-5555-5555-555555555555", name: "Web Platforms", slug: "web-platforms", icon: "Globe" },
  { id: "66666666-6666-6666-6666-666666666666", name: "Fintech", slug: "fintech", icon: "CreditCard" },
  { id: "77777777-7777-7777-7777-777777777777", name: "Web3 & Blockchain", slug: "web3-blockchain", icon: "Link2" },
  { id: "88888888-8888-8888-8888-888888888888", name: "Data Scraping", slug: "data-scraping", icon: "Database" },
];

const mockProjects = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    title: "Aether Swap & Wallet",
    slug: "aether-swap-wallet",
    category_id: "77777777-7777-7777-7777-777777777777", // Web3 & Blockchain
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
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    title: "Helius AI Engine",
    slug: "helius-ai-engine",
    category_id: "22222222-2222-2222-2222-222222222222", // AI Automation Systems
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
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    title: "Solaria RPG",
    slug: "solaria-rpg",
    category_id: "33333333-3333-3333-3333-333333333333", // Games
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
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    title: "Aero Editor",
    slug: "aero-editor",
    category_id: "44444444-4444-4444-4444-444444444444", // Desktop Software
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
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    title: "Chronos Team Planner",
    slug: "chronos-team-planner",
    category_id: "55555555-5555-5555-5555-555555555555", // Web Platforms
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
  },
];

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Connected to Neon DB. Starting seeding process...");

    // 1. Clear existing rows to avoid primary key collisions
    await client.query("DELETE FROM projects");
    await client.query("DELETE FROM categories");
    console.log("Existing projects and categories cleared.");

    // 2. Insert mock categories
    for (const cat of mockCategories) {
      await client.query(
        "INSERT INTO categories (id, name, slug, icon) VALUES ($1, $2, $3, $4)",
        [cat.id, cat.name, cat.slug, cat.icon]
      );
    }
    console.log(`Inserted ${mockCategories.length} categories successfully.`);

    // 3. Insert mock projects
    for (const proj of mockProjects) {
      await client.query(
        `INSERT INTO projects (
          id, title, slug, category_id, short_description, full_description, 
          tech_stack, featured, private_github, cover_image, gallery_images, 
          demo_video, external_url, github_url, project_highlights, 
          employer_note, project_resources, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
        )`,
        [
          proj.id,
          proj.title,
          proj.slug,
          proj.category_id,
          proj.short_description,
          proj.full_description,
          proj.tech_stack,
          proj.featured,
          proj.private_github,
          proj.cover_image,
          proj.gallery_images,
          proj.demo_video,
          proj.external_url,
          proj.github_url,
          proj.project_highlights,
          proj.employer_note,
          JSON.stringify(proj.project_resources || []),
          proj.created_at,
        ]
      );
    }
    console.log(`Inserted ${mockProjects.length} projects successfully.`);
    console.log("Database seeding completed successfully!");
  } catch (err) {
    console.error("Database seeding failed:", err.message);
  } finally {
    await client.end();
  }
}

seedDatabase();
