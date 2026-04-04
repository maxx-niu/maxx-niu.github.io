"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Copy, Check, ExternalLink } from "lucide-react";

// Icons are from Simple Icons
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const EMAIL = "maxniu444@gmail.com";
const PHONE = "+1 (519) 781 6213";
const GITHUB = "https://github.com/maxx-niu";
const LINKEDIN = "https://linkedin.com/in/max-n";

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="contact" className="w-full bg-surface">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-24 pb-32">
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-2">
            SYSTEM_LOG // CONNECT
          </p>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter uppercase text-on-surface">
            Contact
          </h1>
          <div className="h-px w-24 bg-primary mt-6" />
        </motion.header>

        {/* Business Card */}
        <motion.div
          className="border border-outline-variant/40 p-8 md:p-12 self-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.1 }}
        >
          {/* Name + Title */}
          <div className="mb-8">
            <h2 className="font-mono text-2xl font-bold tracking-tight text-on-surface uppercase">
              Maximus Niu
            </h2>
            <p className="font-mono text-md uppercase tracking-widest text-secondary mt-1">
              Software_Engineer // Waterloo, ON, Canada
            </p>
          </div>

          <div className="h-px w-full bg-outline-variant/40 mb-8" />

          {/* Email row */}
          <div className="flex items-center justify-between mb-6">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 group"
            >
              <Mail className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
              <span className="font-mono text-sm text-secondary group-hover:text-primary transition-colors">
                {EMAIL}
              </span>
            </a>
            <button
              onClick={copyEmail}
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-outline hover:text-primary transition-colors cursor-pointer"
              aria-label="Copy email"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-tertiary" />
                  <span className="text-tertiary">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Phone row */}
          <div className="flex items-center mb-6">
            <a
              href={`tel:${PHONE.replace(/\s|\(|\)/g, "")}`}
              className="flex items-center gap-3 group"
            >
              <Phone className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
              <span className="font-mono text-sm text-secondary tracking-tighter group-hover:text-primary transition-colors">
                {PHONE}
              </span>
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm text-secondary hover:text-primary transition-colors group"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm text-secondary hover:text-primary transition-colors group"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
