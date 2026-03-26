interface ExperienceEntry {
  period: string;
  title: string;
  company: string;
  level?: string;
  isCurrent?: boolean;
  bullets: string[];
}

const experiences: ExperienceEntry[] = [
  {
    period: "MAR 2025 — PRESENT",
    title: "REACT DEVELOPER",
    company: "VENUITI HEALTHCARE",
    isCurrent: true,
    bullets: [
      "Led the front-end overhaul of the myMedcan healthcare portal using Next.js, TypeScript, and Tailwind, integrating enterprise Salesforce REST APIs into custom-built components to deliver a modern and responsive customer experience for over 20,000 registered users.",
      "Developed a complex multi-step appointment booking and checkout flow, leveraging XState and React Query for robust state management, leading to increased operational efficiency.",
      "Secured member authentication with Azure AD B2C, OAuth 2.0, MFA, and JWT sessions, eliminating client-side sensitive data exposure and protecting the protected health information (PHI) of all users.",
      "Created and self-documented an extensive library of 100+ modular and reusable React hooks and components using Storybook, adhering to Figma designs to strictly ensure WCAG AA web accessibility standards.",
      "Configured a multi-stage Azure DevOps CI/CD pipeline to automate containerized Docker front-end builds and deployments to Azure Web Apps, integrating a Jest-based testing suite comprised of 40+ unit tests to validate core components and hooks.",
      "Packaged the portal with Capacitor, extending web functionality through native SDK bridges to enable a robust iOS and Android mobile experience.",
    ],
  },
  {
    period: "NOV 2024 — MAR 2025",
    title: "FULL STACK BLOCKCHAIN DEVELOPER",
    company: "FUSMANI",
    bullets: [
      "Developed and deployed 8 Solidity smart contracts and interfaces using Hardhat, integrating them with a React front-end via Ethers.js to deliver a decentralized, gamified crypto-swap platform with real-time Ethereum blockchain synchronization.",
    ],
  },
  {
    period: "JAN 2023 — APR 2023",
    title: "SOFTWARE DEVELOPER",
    company: "WIND RIVER SYSTEMS",
    bullets: [
      "Wrote, documented, and executed over 50 C/C++ unit tests on a virtual x86 board, ensuring a functional migration of 33 Unix-based command line utility functions to the VxWorks RTOS.",
      "Implemented an internal automation tool using Python and Flask to convert different Markdown formats, processing over 500 verified pages and streamlining documentation workflows across teams.",
    ],
  },
  {
    period: "JAN 2022 — APR 2022",
    title: "FULL STACK DEVELOPER",
    company: "MY FIRST MONTESSORI SCHOOL",
    bullets: [
      "Spearheaded the development of a proprietary e-learning platform using PHP and WordPress to significantly enhance the remote learning and teaching experience for 150+ students.",
    ],
  },
  {
    period: "SEP 2020 — DEC 2020",
    title: "FULL STACK DEVELOPER",
    company: "SYNTU SOFTWARE",
    bullets: [
      "Structured a serverless system that securely handles image and video legal evidence, ensuring 100% compliance with Canadian PIPEDA confidentiality regulations using AWS DynamoDB, S3, Lambda, and IAM services.",
      "Developed and rigorously tested 13 modular UI components using Angular, leveraging end-to-end testing with detailed user stories to ensure seamless user experience and system security.",
    ],
  },
];

const skills = [
  "TYPESCRIPT",
  "JAVASCRIPT",
  "PYTHON",
  "C/C++",
  "HTML/CSS",
  "REACT",
  "NEXT.JS",
  "ANGULAR",
  "TAILWIND",
  "STORYBOOK",
  "CAPACITOR",
  "NODE.JS",
  "WEB3.JS",
  "JEST",
  "POSTGRESQL",
  "AWS",
  "AZURE",
  "DOCKER",
  "VERCEL",
  "LINUX",
  "GIT",
  "RAG / LLM PIPELINES",
];

function TimelineEntry({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="relative pl-8 md:pl-16 group">
      {/* Node */}
      <div
        className={`absolute left-[-4.5px] md:left-[11.5px] top-2 w-[10px] h-[10px] bg-background border-2 rounded-full transition-all ${
          entry.isCurrent
            ? "border-primary group-hover:scale-125"
            : "border-outline group-hover:border-primary"
        }`}
      />
      <div className="flex flex-col space-y-2">
        <span className="font-mono text-[11px] text-secondary tracking-widest mb-1">
          {entry.period}
        </span>
        <h3 className="font-headline text-2xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
          {entry.title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="font-headline text-lg text-outline font-medium">
            {entry.company}
          </span>
          {entry.level && (
            <span className="text-[10px] font-mono px-2 py-0.5 border border-outline-variant/40 text-outline uppercase">
              {entry.level}
            </span>
          )}
        </div>
        <div className="mt-6 p-6 bg-surface-container-low border border-outline-variant/10 group-hover:border-outline-variant/40 transition-all duration-300">
          <ul className="space-y-4">
            {entry.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="text-primary font-mono mt-1 text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {bullet}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Experiences() {
  return (
    <div className="w-full bg-surface selection:bg-primary-container selection:text-on-primary-container">
      {/* Main Content */}
      <main id="experience" className="pt-24 pb-20 min-h-screen bg-surface">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
          {/* Page Header */}
          <header className="mb-16">
            <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-2">
              SYSTEM_LOG // ARCHIVE
            </p>
            <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter uppercase text-on-surface">
              Experience
            </h1>
            <div className="h-px w-24 bg-primary mt-6" />
          </header>

          {/* Timeline */}
          <section className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-4 top-0 bottom-0 timeline-line" />

            <div className="space-y-16">
              {experiences.map((entry, i) => (
                <TimelineEntry key={i} entry={entry} />
              ))}
            </div>
          </section>

          {/* Bottom Section CTA */}
          <section className="mt-24 pt-12 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-start gap-8">
            <div>FOOTER</div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Experiences;
