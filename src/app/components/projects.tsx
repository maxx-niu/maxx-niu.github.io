interface Project {
  id: string;
  revision: string;
  status: "STABLE" | "ACTIVE" | "DEPRECATED";
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  isFeatured?: boolean;
}

const projects: Project[] = [
  {
    id: "M-001",
    revision: "01",
    status: "STABLE",
    title: "MEMOLIFE",
    description:
      "Personal document intelligence via Retrieval-Augmented Generation. Built a RAG pipeline ingesting PDFs, TXT, and MD files using OpenAI embeddings and pgvector for semantic search, implementing a recursive chunking algorithm with configurable overlap for accurate context retrieval. Enforced strict per-user document isolation via Supabase RLS policies.",
    image:
      "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?auto=format&fit=crop&q=80&w=1200",
    tags: ["Next.js", "TypeScript", "OpenAI", "pgvector", "Supabase", "RAG"],
    isFeatured: true,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const statusColor =
    project.status === "ACTIVE"
      ? "text-tertiary border-tertiary/40"
      : project.status === "DEPRECATED"
        ? "text-error border-error/40"
        : "text-primary border-primary/40";

  return (
    <div
      className={`group border border-outline-variant/40 bg-surface-container-low overflow-hidden transition-all duration-300 hover:border-outline-variant ${project.isFeatured ? "md:col-span-2 lg:col-span-3" : ""}`}
    >
      {/* Header Metadata */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-outline-variant/40 bg-surface-container">
        <span className="text-[10px] font-mono text-outline uppercase tracking-widest">
          ID: {project.id} // REV: {project.revision}
        </span>
        <span
          className={`text-[10px] font-mono border px-2 py-0.5 uppercase tracking-tighter ${statusColor}`}
        >
          {project.status}
        </span>
      </div>

      {/* Content Layout */}
      <div
        className={`flex flex-col ${project.isFeatured ? "md:flex-row" : ""}`}
      >
        {/* Image Section */}
        <div
          className={`relative overflow-hidden bg-surface-container-lowest ${project.isFeatured ? "md:w-3/5" : "aspect-video"}`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
          />
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col p-6 gap-4 flex-1">
          <h3 className="font-headline text-3xl font-bold tracking-tighter text-on-surface uppercase group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-prose">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-outline border border-outline-variant/40 px-2 py-0.5 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 self-start flex items-center gap-2 text-[10px] font-mono text-on-surface border border-outline-variant px-4 py-2 hover:bg-primary hover:text-on-primary hover:border-primary transition-all uppercase tracking-widest"
            >
              VIEW_PROJECT <span className="text-xs">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="w-full bg-surface">
      <main id="projects" className="pt-24 pb-20 min-h-screen bg-surface">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
          {/* Page Header */}
          <header className="mb-16">
            <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-2">
              SYSTEM_LOG // PROJECTS
            </p>
            <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter uppercase text-on-surface">
              Projects
            </h1>
            <div className="h-px w-24 bg-primary mt-6" />
          </header>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Projects;
