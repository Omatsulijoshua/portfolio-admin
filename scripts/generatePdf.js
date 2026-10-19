const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure public directory exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const pdfPath = path.join(publicDir, 'joshuas-resume.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 }
});

const writeStream = fs.createWriteStream(pdfPath);
doc.pipe(writeStream);

// Colors
const primaryColor = '#065f46'; // Deep emerald
const accentColor = '#059669';  // Bright emerald
const textColor = '#1f2937';    // Charcoal
const lightTextColor = '#4b5563'; // Muted grey
const dividerColor = '#e5e7eb';  // Light grey

// 1. HEADER SECTION
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(24)
   .text('Omatsuli Toritseju Joshua', { tracking: 0.5 });

doc.fillColor(accentColor)
   .font('Helvetica-Bold')
   .fontSize(11)
   .text('SENIOR SOFTWARE ENGINEER & WEB3 ARCHITECT', { characterSpacing: 1, paragraphGap: 6 });

doc.fillColor(lightTextColor)
   .font('Helvetica')
   .fontSize(9)
   .text('Benin City, Nigeria  |  08158075936  |  joshuaomatsuli01@gmail.com', { paragraphGap: 15 });

// Thin line divider
doc.moveTo(45, doc.y)
   .lineTo(550, doc.y)
   .strokeColor(dividerColor)
   .lineWidth(1)
   .stroke();

doc.moveDown(1.2);

// 2. PROFESSIONAL SUMMARY
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(12)
   .text('PROFESSIONAL SUMMARY', { paragraphGap: 6 });

doc.fillColor(textColor)
   .font('Helvetica')
   .fontSize(9.5)
   .text(
     'Results-driven software developer and Web3 architect with over 6 years of experience engineering desktop, mobile, and decentralized applications. Expert in Flutter, C#/.NET, Rust, and Solidity smart contracts. Passionate about creating secure cross-chain integrations, high-performance database design, and exceptional, micro-animated user interfaces.',
     { align: 'justify', paragraphGap: 18, lineGap: 2 }
   );

// 3. CORE SKILLS
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(12)
   .text('TECHNICAL SKILLS', { paragraphGap: 6 });

const skills = [
  { name: 'Programming Languages', list: 'C#, TypeScript, JavaScript, Python, Rust, Solidity, Dart, SQL' },
  { name: 'Frameworks & Libraries', list: '.NET Core, Next.js, React, Flutter, Node.js, Express, Tailwind CSS' },
  { name: 'Databases & Storage', list: 'PostgreSQL, Supabase, SQL Server, MySQL, SQLite, Firebase' },
  { name: 'Specializations & Tools', list: 'Decentralized Exchanges (DEX), EVM Chains, NFT Standards, Git, UI/UX Design, REST APIs' }
];

skills.forEach(skill => {
  doc.fillColor(textColor)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text(`${skill.name}: `, { underline: false, continued: true })
     .font('Helvetica')
     .text(skill.list, { paragraphGap: 4 });
});

doc.moveDown(1.2);

// 4. WORK EXPERIENCE
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(12)
   .text('WORK EXPERIENCE', { paragraphGap: 6 });

// Role 1
doc.fillColor(textColor)
   .font('Helvetica-Bold')
   .fontSize(10.5)
   .text('Software Engineer', { continued: true })
   .font('Helvetica')
   .fillColor(lightTextColor)
   .text('  |  Blessed Christ Nigeria Limited, Benin City', { continued: false });

doc.fontSize(9)
   .font('Helvetica-Oblique')
   .text('2020 - 2026', { paragraphGap: 6 });

const bullets = [
  'Designed and developed custom desktop and mobile applications using C#, .NET, and Flutter, establishing secure client architectures.',
  'Engineered a desktop-based Computer-Based Testing (CBT) software exam system handling randomized questions, real-time secure timers, and customized score indexing.',
  'Integrated database-driven settings and dynamic analytical reports using Microsoft SQL Server and PostgreSQL, optimizing indices to speed up reporting loads by 35%.',
  'Implemented responsive frontend components and managed state synchronization, reducing user interface error rates.'
];

bullets.forEach(bullet => {
  doc.fillColor(textColor)
     .font('Helvetica')
     .fontSize(9.5)
     .text(`•  ${bullet}`, { indent: 10, paragraphGap: 4, lineGap: 1.5 });
});

doc.moveDown(1.2);

// 5. FEATURED PORTFOLIO PROJECTS
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(12)
   .text('FEATURED DEVELOPMENT PROJECTS', { paragraphGap: 6 });

const projects = [
  {
    title: 'Aether Swap & Wallet (Multi-Chain DEX)',
    desc: 'Developed a non-custodial Web3 wallet and decentralized exchange supporting Ethereum EVM networks, Solana token transactions, and ERC-721/1155 NFT galleries using Solidity, Rust (Anchor framework), and Flutter.'
  },
  {
    title: 'Helius AI Engine (Low-Latency LLM Orchestration)',
    desc: 'Created a distributed natural language orchestration service in Python and Rust with PgVector embeddings, handling cognitive routing and custom tool execution under 4ms latency.'
  },
  {
    title: 'Solaria RPG (Real-Time HTML5 Canvas Game)',
    desc: 'Built a low-latency web game utilizing WebSockets and Node.js backend to synchronize multiplayer rooms at 60 FPS.'
  }
];

projects.forEach(p => {
  doc.fillColor(textColor)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(p.title, { paragraphGap: 2 });
  
  doc.fillColor(lightTextColor)
     .font('Helvetica')
     .fontSize(9)
     .text(p.desc, { indent: 8, paragraphGap: 6, lineGap: 1.5 });
});

doc.moveDown(1.2);

// 6. EDUCATION
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(12)
   .text('EDUCATION', { paragraphGap: 6 });

doc.fillColor(textColor)
   .font('Helvetica-Bold')
   .fontSize(10)
   .text('National Innovation Diploma (NID) in Computer Software Engineering', { paragraphGap: 2 });

doc.fillColor(lightTextColor)
   .font('Helvetica')
   .fontSize(9.5)
   .text('Complete Computer and Technology Institute (CCTI), Adesuwa, Benin', { continued: true })
   .font('Helvetica-Bold')
   .text('  |  2023');

doc.moveDown(1.5);

// 7. REFERENCES
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(11)
   .text('REFERENCES', { paragraphGap: 4 });

doc.fillColor(lightTextColor)
   .font('Helvetica')
   .fontSize(9)
   .text('Excellent professional and academic references available upon request.', { italic: true });

// Finalize PDF file
doc.end();

writeStream.on('finish', () => {
  console.log('PDF Resume successfully generated at public/joshuas-resume.pdf');
});
writeStream.on('error', (err) => {
  console.error('Error writing PDF:', err);
});
