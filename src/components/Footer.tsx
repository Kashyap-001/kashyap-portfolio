import { GithubIcon, LinkedinIcon, EmailIcon } from '@/components/icons'
import { socialLinks } from '@/data/links'

export function Footer() {
  return (
    <footer className="px-6 py-10 text-center font-mono text-[13px] text-foreground">
      <p>
        <a href={socialLinks.github} target="_blank" rel="noopener" className="inline-flex items-center text-foreground hover:underline">
          <GithubIcon className="mr-1.5 size-[18px]" />GitHub
        </a>{' '}·{' '}
        <a href={socialLinks.linkedin} target="_blank" rel="noopener" className="inline-flex items-center text-foreground hover:underline">
          <LinkedinIcon className="mr-1.5 size-[18px]" />LinkedIn
        </a>{' '}·{' '}
        <a href={socialLinks.email} className="inline-flex items-center text-foreground hover:underline">
          <EmailIcon className="mr-1.5 size-[18px]" />Email
        </a>
      </p>
      <p className="mt-2">Built with React, Tailwind CSS, and Framer Motion. Design inspired by Brittany Chiang.</p>
    </footer>
  )
}
