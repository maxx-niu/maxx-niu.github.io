import Image from "next/image";

function About() {
  return (
    <div className="w-full bg-surface">
      <main id="about" className="pt-24 pb-20 min-h-screen bg-surface">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start md:items-stretch">
            {/* Header — visible only on mobile, above photo */}
            <header className="md:hidden">
              <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-2">
                SYSTEM_LOG // PROFILE
              </p>
              <h1 className="font-headline text-5xl font-bold tracking-tighter uppercase text-on-surface">
                About Me
              </h1>
              <div className="h-px w-24 bg-primary mt-6" />
            </header>

            {/* Photo + metadata beneath */}
            <div className="w-full md:w-1/2">
              <div className="aspect-3/4 relative overflow-hidden border border-outline-variant/40 rounded-none">
                <Image
                  src="/about/portrait.jpg"
                  alt="Portrait"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              {/* Header — visible only on desktop */}
              <header className="hidden md:block mb-10">
                <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-2">
                  SYSTEM_LOG // PROFILE
                </p>
                <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter uppercase text-on-surface">
                  About Me
                </h1>
                <div className="h-px w-24 bg-primary mt-6" />
              </header>

              {/* Status */}
              <div className="flex items-center space-x-3 mb-8">
                <span className="w-2 h-2 bg-tertiary rounded-full shadow-[0_0_6px_2px_var(--color-tertiary)]" />
                <span className="font-mono text-[14px] uppercase tracking-widest text-secondary">
                  STATUS: <span className="text-on-surface">OPEN TO WORK</span>
                </span>
              </div>

              <p className="text-secondary text-md leading-relaxed mb-8">
                I&apos;m a software engineer who&apos;s worked across the stack
                &mdash; from serverless cloud backends to large-scale frontend
                builds &mdash; with a focus on React and TypeScript. I care
                about shipping things that are fast, thoughtfully designed, and
                actually used by people.
              </p>

              <div className="mt-3 font-mono text-[12px] uppercase tracking-widest text-outline flex items-center gap-4">
                <span>Waterloo, ON, Canada</span>
                <span className="text-outline-variant">{"//"}</span>
                <span>BASc Computer Engineering</span>
                <span className="text-outline-variant">{"//"}</span>
                <span>UWaterloo &apos;24</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
