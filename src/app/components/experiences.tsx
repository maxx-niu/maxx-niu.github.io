interface ExperienceEntry {
  period: string;
  title: string;
  company: string;
  isCurrent?: boolean;
  technologies?: string[];
  bullets: React.ReactNode[];
}

const experiences: ExperienceEntry[] = [
  {
    period: "MAR 2025 — PRESENT",
    title: "REACT DEVELOPER",
    company: "Venuiti Healthcare",
    isCurrent: true,
    technologies: [
      "Next.js",
      "TypeScript",
      "XState",
      "React Query",
      "Azure",
      "Storybook",
      "Docker",
      "Jest",
      "Capacitor",
    ],
    bullets: [
      <>
        Currently building the{" "}
        <a
          href="https://www.mymedcan.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          myMedcan
        </a>{" "}
        healthcare portal from scratch — designing the full component system,
        auth, and a booking flow that serves tens of thousands of users and
        drives hundreds of thousands in monthly revenue and bookings.
      </>,
      "Porting the portal to iOS and Android, integrating native SDK plugins for authentication and push notifications.",
    ],
  },
  {
    period: "NOV 2024 — MAR 2025",
    title: "FULL STACK BLOCKCHAIN DEVELOPER",
    company: "FUsmani",
    technologies: ["Solidity", "React", "Ethers.js", "Hardhat", "TypeScript"],
    bullets: [
      "Shipped dozens of smart contracts and frontend interfaces on Ethereum to power a decentralized mystery-box crypto swap platform, integrating real-time blockchain state synchronization.",
    ],
  },
  {
    period: "JAN 2023 — APR 2023",
    title: "SOFTWARE DEVELOPER",
    company: "Wind River Systems",
    technologies: ["C", "C++", "Python", "Flask"],
    bullets: [
      "Validated a migration of 33 Unix utilities to the VxWorks RTOS through 50+ C/C++ unit tests on a simulated x86 board.",
      "Built an internal Python/Flask tool that automated markdown conversion, processing 500+ pages of documentation across teams",
    ],
  },
  {
    period: "JAN 2022 — APR 2022",
    title: "FULL STACK DEVELOPER",
    company: "My First Montessori School",
    technologies: ["PHP", "JavaScript"],
    bullets: [
      <>
        Developed a{" "}
        <a
          href="https://learn.montessi.com/login/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          proprietary e-learning platform
        </a>{" "}
        serving 150+ students, improving the remote learning experience during
        COVID.
      </>,
    ],
  },
  {
    period: "SEP 2020 — DEC 2020",
    title: "FULL STACK DEVELOPER",
    company: "Syntu Software",
    technologies: [
      "AWS Lambda",
      "AWS DynamoDB",
      "AWS S3",
      "AWS IAM",
      "AWS API Gateway",
    ],
    bullets: [
      "Architected a serverless AWS system from scratch for handling sensitive legal evidence, built to meet PIPEDA compliance requirements.",
    ],
  },
  {
    period: "JAN 2020 — MAY 2020",
    title: "SOFTWARE DEVELOPER",
    company: "The Co-operators",
    technologies: ["Python", "OCR"],
    bullets: [
      "Automated an internal policy filing pipeline using OCR and web scraping, hitting 400+ submissions per hour and covering it with 200+ regression tests.",
    ],
  },
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
        <span className="font-mono text-sm text-secondary tracking-widest mb-1">
          {entry.period}
        </span>
        <h3 className="font-headline text-2xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
          {entry.title}
        </h3>
        <span className="font-headline text-lg text-outline font-medium">
          {entry.company}
        </span>
        {entry.technologies && (
          <div className="flex items-center gap-2 flex-wrap">
            {entry.technologies.map((technology) => (
              <span
                key={technology}
                className="text-md font-mono px-2 py-0.5 border border-outline-variant/40 text-outline uppercase"
              >
                {technology}
              </span>
            ))}
          </div>
        )}
        <div className="mt-6 p-6 bg-surface-container-low border border-outline-variant/10 group-hover:border-outline-variant/40 transition-all duration-300">
          <ul className="space-y-4">
            {entry.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="text-primary font-mono mt-1 text-xs">◉</span>
                <p className="text-on-surface-variant text-md leading-relaxed">
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

          {/* Bottom Section CTA
          <section className="mt-24 pt-12 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-start gap-8">
            <div>FOOTER</div>
          </section> */}
        </div>
      </main>
    </div>
  );
}

export default Experiences;
