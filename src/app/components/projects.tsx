import Image from "next/image";

interface Project {
  id: string;
  status?: "STABLE" | "IN PROGRESS";
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  isFeatured?: boolean;
}

const projects: Project[] = [
  {
    id: "\/\/ 0-01",
    title: "MemoLife",
    status: "IN PROGRESS",
    description:
      "Your life's documents, made conversational. Upload your own files and ask questions in plain English — no keyword searches, no digging through pages. Your data stays yours.",
    image:
      "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?auto=format&fit=crop&q=80&w=1200",
    tags: ["Next.js", "TypeScript", "OpenAI", "pgvector", "Supabase", "Vercel"],
    isFeatured: true,
    link: "https://github.com/maxx-niu/memolife",
  },
  {
    id: "\/\/ 0-02",
    status: "STABLE",
    title: "TabMagic",
    description:
      "Upload a photo of guitar tablature and get the notes and chords. Designed to help beginner guitarists understand the music they play beyond numbers on a sheet. Trained a custom object detection model from scratch on a hand-annotated dataset.",
    image:
      "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?auto=format&fit=crop&q=80&w=1200",
    tags: ["Python", "PyTorch", "Flask", "React", "Computer Vision"],
    isFeatured: false,
    link: "https://github.com/maxx-niu/tabmagic",
  },
  {
    id: "\/\/ 0-03",
    status: "STABLE",
    title: "Capstone: RoomEase",
    image:
      "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?auto=format&fit=crop&q=80&w=1200",
    description:
      "A household management app with an agentic AI assistant that helps you manage the friction of a shared living space.",

    tags: ["Flutter", "Firebase", "OpenAI", "Pinecone"],
    isFeatured: false,
    link: "https://github.com/k233yang/RoomEase",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const statusColor =
    project.status === "STABLE"
      ? "text-tertiary border-tertiary/40"
      : project.status === "IN PROGRESS"
        ? "text-primary border-primary/40"
        : "text-outline border-outline/40";

  return (
    <div
      className={`group flex flex-col border border-outline-variant/40 bg-surface-container-low overflow-hidden transition-all duration-300 hover:border-outline-variant ${project.isFeatured ? "lg:col-span-4" : "lg:col-span-2"}`}
    >
      {/* Header Metadata */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-outline-variant/40 bg-surface-container">
        <span className="text-[10px] font-mono text-outline uppercase tracking-widest">
          {project.id}
        </span>
        {project.status && (
          <span
            className={`text-[12px] font-mono border px-2 py-0.5 uppercase tracking-tighter ${statusColor}`}
          >
            {project.status}
          </span>
        )}
      </div>

      {/* Content Layout */}
      <div
        className={`flex flex-col flex-1 ${project.isFeatured ? "lg:flex-row" : ""}`}
      >
        {/* Image Section */}
        <div
          className={`relative overflow-hidden bg-surface-container-lowest ${project.isFeatured ? "aspect-video lg:aspect-auto lg:w-3/5" : "aspect-video"}`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
          />
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col p-6 gap-4 flex-1 h-full">
          <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface uppercase group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-md leading-relaxed text-on-surface-variant max-w-prose">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm font-mono text-outline border border-outline-variant/40 px-2 py-0.5 uppercase"
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
              className="mt-auto self-end flex items-center gap-2 text-sm font-mono text-on-surface border border-outline-variant px-4 py-2 hover:bg-primary hover:text-on-primary hover:border-primary transition-all uppercase tracking-widest"
            >
              VIEW_PROJECT <span>→</span>
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
              SYSTEM_LOG // WORKS
            </p>
            <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter uppercase text-on-surface">
              Projects
            </h1>
            <div className="h-px w-24 bg-primary mt-6" />
          </header>

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
