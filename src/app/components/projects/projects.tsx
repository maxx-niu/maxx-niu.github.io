import fs from "fs";
import path from "path";
import ImageCarousel from "./carousel";

interface Project {
  id: string;
  status?: "STABLE" | "IN PROGRESS";
  title: string;
  description: string;
  tags: string[];
  link?: string;
  isFeatured?: boolean;
  assetsFolder?: string;
}

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?auto=format&fit=crop&q=80&w=1200";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function getProjectImages(assetsFolder?: string): string[] {
  if (!assetsFolder) return [PLACEHOLDER];

  const dir = path.join(process.cwd(), "public", "projects", assetsFolder);
  if (!fs.existsSync(dir)) return [PLACEHOLDER];

  const files = fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/projects/${assetsFolder}/${f}`);

  return files.length > 0 ? files : [PLACEHOLDER];
}

const projects: Project[] = [
  {
    id: "\/\/ 0-01",
    title: "MemoLife",
    status: "IN PROGRESS",
    description:
      "Your life's documents, made conversational. Upload your own files and ask questions in plain English — no keyword searches, no digging through pages. Your data stays yours.",
    tags: ["Next.js", "TypeScript", "OpenAI", "pgvector", "Supabase", "Vercel"],
    isFeatured: true,
    link: "https://github.com/maxx-niu/memolife",
    assetsFolder: "memolife",
  },
  {
    id: "\/\/ 0-02",
    status: "STABLE",
    title: "TabMagic",
    description:
      "Upload a photo of guitar tablature and get the notes and chords. Designed to help beginner guitarists understand the music they play beyond numbers on a sheet. Trained a custom object detection model from scratch on a hand-annotated dataset.",
    tags: [
      "Python",
      "PyTorch",
      "Flask",
      "React",
      "Computer Vision",
      "Object Detection",
    ],
    isFeatured: false,
    link: "https://github.com/maxx-niu/tabmagic",
    assetsFolder: "tabmagic",
  },
  {
    id: "\/\/ 0-03",
    status: "STABLE",
    title: "Capstone: RoomEase",
    description:
      "A household management app with an agentic AI assistant that helps you manage the friction of a shared living space.",
    tags: ["Flutter", "Firebase", "OpenAI", "Pinecone"],
    isFeatured: false,
    link: "https://github.com/k233yang/RoomEase",
    assetsFolder: "roomease",
  },
];

function ProjectCard({
  project,
  images,
}: {
  project: Project;
  images: string[];
}) {
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
        <ImageCarousel
          images={images}
          title={project.title}
          isFeatured={project.isFeatured}
        />

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
  const projectsWithImages = projects.map((p) => ({
    project: p,
    images: getProjectImages(p.assetsFolder),
  }));

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
            {projectsWithImages.map(({ project, images }, i) => (
              <ProjectCard key={i} project={project} images={images} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Projects;
