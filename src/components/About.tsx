import { useRef, useState } from 'react'
import { useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { AboutFlipCard } from '@/components/AboutFlipCard'

const HONESTY_TEXT =
  "Several projects below were built by directing AI-assisted development workflows. " +
  "I scoped the architecture and design decisions myself, then used AI tooling to generate " +
  "the implementation, and reviewed and tested every part until it worked correctly. I have " +
  "working knowledge of each system's architecture, not deep mastery of every internal, and " +
  "I'm upfront about that distinction."

const words = HONESTY_TEXT.split(/\s+/)

function HonestyParagraph() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.3'] })
  const activeCountValue = useTransform(scrollYProgress, (p) => Math.floor(p * words.length))
  const [activeCount, setActiveCount] = useState(0)
  useMotionValueEvent(activeCountValue, 'change', (v) => setActiveCount(v))

  return (
    <p ref={ref} id="honestyText">
      {words.map((word, i) => (
        <span
          key={i}
          className={`transition-colors duration-200 ${i < activeCount ? 'text-brand-heading opacity-100' : 'opacity-25'}`}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[min(1100px,92vw)] px-6 py-25">
      <RevealOnScroll>
        <p className="mb-3 flex items-center gap-3 whitespace-nowrap font-mono text-[15px] font-medium text-primary">
          <span>01.</span> About
        </p>
      </RevealOnScroll>
      <div className="md:grid md:grid-cols-[1fr_280px] md:items-start md:gap-12">
        <RevealOnScroll className="space-y-4">
          <p>
            I'm an MCA candidate (Semester 3 of 4, expected 2027) and AWS Certified Cloud Practitioner,
            self-taught across Python, Android, and Odoo/ERP development. I ship working software solo,
            including a merged pull request on a third-party open-source project.
          </p>
          <HonestyParagraph />
        </RevealOnScroll>
        <RevealOnScroll className="mt-10 md:mt-0">
          <AboutFlipCard />
        </RevealOnScroll>
      </div>
    </section>
  )
}
