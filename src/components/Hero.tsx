import { GithubIcon, LinkedinIcon, EmailIcon, ResumeIcon } from '@/components/icons'
import { useSectionScroll } from '@/hooks/useSectionScroll'
import { CtaButton } from '@/components/CtaButton'
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars'
import { FlipWords } from '@/components/FlipWords'
import { socialLinks } from '@/data/links'

const TAGLINE_WORDS = [
  'agentic AI systems.',
  'LLM integrations.',
  'automation that ships.',
  'real, working software.',
]

export function Hero() {
  const scrollToSection = useSectionScroll()

  return (
    <header id="hero" className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden">
      <StarsBackground
        starColor="#22c55e"
        className="absolute inset-0 -z-20 bg-transparent opacity-40"
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--brand-glow)_0%,transparent_70%)] opacity-25" />

      <div className="mx-auto w-full max-w-[min(1100px,92vw)] px-6">
        <p className="mb-4 font-mono text-base text-primary">Hi, my name is</p>
        <h1 className="mb-2 text-[clamp(36px,8vw,64px)] font-bold text-brand-heading">Kashyap Patel.</h1>
        <p className="mb-6 text-[clamp(22px,5vw,42px)] text-foreground">
          Applied AI/ML: building <FlipWords words={TAGLINE_WORDS} />
        </p>
        <p className="mb-10 max-w-[540px]">
          MCA candidate directing AI-assisted builds of real, working software,
          from a Model Context Protocol server for Odoo to Android BLE accessibility tooling.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <a href={socialLinks.github} target="_blank" rel="noopener" className="inline-flex items-center font-mono text-[15px] text-primary hover:underline">
            <GithubIcon className="mr-1.5 size-[18px]" />GitHub
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener" className="inline-flex items-center font-mono text-[15px] text-primary hover:underline">
            <LinkedinIcon className="mr-1.5 size-[18px]" />LinkedIn
          </a>
          <a href={socialLinks.email} className="inline-flex items-center font-mono text-[15px] text-primary hover:underline">
            <EmailIcon className="mr-1.5 size-[18px]" />Email
          </a>
          <a href="/assets/resume/Kashyap_Patel_Resume.pdf" download className="inline-flex items-center font-mono text-[15px] text-primary hover:underline">
            <ResumeIcon className="mr-1.5 size-[18px]" />Resume
          </a>
          <CtaButton variant="gradient" href="#projects" onClick={(e) => scrollToSection(e, '#projects')}>
            Check out my projects
          </CtaButton>
        </div>
      </div>
    </header>
  )
}
