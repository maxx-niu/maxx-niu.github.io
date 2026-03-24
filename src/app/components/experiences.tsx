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
    period: "2022 — PRESENT",
    title: "SENIOR INFRASTRUCTURE ENGINEER",
    company: "NEURAL_NET_SYSTEMS",
    isCurrent: true,
    bullets: [
      "Architected and deployed a multi-region Kubernetes mesh using Istio, reducing global latency by 42% across 14 operational clusters.",
      "Engineered custom CI/CD operators in Go, automating the validation of security policies for 200+ microservices.",
      "Optimization of cold-start times for Lambda-edge functions using LLVM-based pre-compilation strategies.",
    ],
  },
  {
    period: "2019 — 2022",
    title: "FULL-STACK SYSTEMS DEVELOPER",
    company: "SYNTHETIC_LOGIC_CORP",
    bullets: [
      "Lead the migration of a legacy monolithic financial engine to a distributed Rust-based event sourcing architecture.",
      "Implemented high-frequency data pipelines using Kafka and Flink, handling throughput peaks of 1.2M events per second.",
    ],
  },
  {
    period: "2017 — 2019",
    title: "BACKEND ENGINEER",
    company: "VOID_INTERACTIVE",
    bullets: [
      "Developed core game-state synchronization protocols for low-latency multiplayer environments using UDP/Enet.",
      "Optimized SQL query patterns and indexing strategies, reducing database I/O wait times by 60%.",
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
      <main className="pt-24 pb-20 min-h-screen bg-surface">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
          {/* Page Header */}
          <header className="mb-16">
            <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-2">
              SYSTEM_LOG // ARCHIVE
            </p>
            <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter uppercase text-on-surface">
              Experience: Timeline View
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
