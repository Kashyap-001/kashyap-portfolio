import { useState } from 'react'
import { motion } from 'motion/react'
import { GithubIcon, LinkedinIcon, EmailIcon } from '@/components/icons'
import { socialLinks } from '@/data/links'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const EASE_REVEAL = [0.16, 1, 0.3, 1] as const

export function AboutFlipCard() {
  const [flipped, setFlipped] = useState(false)
  const hasFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  const handlers = hasFinePointer
    ? { onMouseEnter: () => setFlipped(true), onMouseLeave: () => setFlipped(false) }
    : { onClick: () => setFlipped((f) => !f) }

  return (
    <div className="relative z-10 mx-auto w-full max-w-[280px] md:mx-0" style={{ perspective: 1000 }}>
      <motion.div
        className="relative h-72 w-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: EASE_REVEAL }}
        {...handlers}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-brand-bg-secondary p-6 text-center transition-shadow duration-250 ease-out hover:shadow-[0_0_20px_var(--brand-glow)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="font-mono text-5xl font-bold text-primary">KP</span>
          <p className="text-lg font-bold text-brand-heading">Kashyap Patel</p>
          <p className="font-mono text-sm text-foreground">Applied AI/ML Engineer</p>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-md border border-border bg-brand-bg-secondary p-6 text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-sm text-foreground">
            MCA candidate, AWS Certified Cloud Practitioner, ships working software solo.
          </p>
          <div className="flex items-center gap-4">
            <a href={socialLinks.github} target="_blank" rel="noopener" className="text-primary hover:opacity-80">
              <GithubIcon className="size-5" />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener" className="text-primary hover:opacity-80">
              <LinkedinIcon className="size-5" />
            </a>
            <a href={socialLinks.email} className="text-primary hover:opacity-80">
              <EmailIcon className="size-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
