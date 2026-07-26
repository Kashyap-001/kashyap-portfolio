import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useSectionScroll } from '@/hooks/useSectionScroll'
import { useActiveSection } from '@/hooks/useActiveSection'

const links = [
  { href: '#about', label: 'About', num: '01.' },
  { href: '#skills', label: 'Skills', num: '02.' },
  { href: '#projects', label: 'Projects', num: '03.' },
  { href: '#education', label: 'Education', num: '04.' },
  { href: '#contact', label: 'Contact', num: '05.' },
]

const sectionIds = links.map((l) => l.href.slice(1))

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const scrollToSection = useSectionScroll()
  const active = useActiveSection(sectionIds)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 10))

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-100 flex h-nav items-center justify-between border-b px-8 bg-background/85 backdrop-blur-sm transition-colors duration-200 ease-out ${
        scrolled ? 'border-border' : 'border-transparent'
      }`}
    >
      <a href="#hero" className="font-mono text-xl font-bold text-primary">KP</a>

      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-2xl text-primary md:hidden"
      >
        &#9776;
      </button>

      <ul
        className={`fixed top-nav right-0 z-100 flex h-[calc(100vh-var(--spacing-nav))] w-56 flex-col items-start gap-7 border-l border-border bg-brand-bg-secondary px-6 py-10 transition-transform duration-250 ease-out md:static md:h-auto md:w-auto md:flex-row md:items-center md:border-l-0 md:bg-transparent md:p-0 ${
          open ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        {links.map((link) => {
          const isActive = active === link.href.slice(1)
          return (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  scrollToSection(e, link.href)
                  setOpen(false)
                }}
                className={`group relative font-mono text-sm ${isActive ? 'text-primary' : 'text-brand-heading'}`}
              >
                <span className="text-primary">{link.num}</span> {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary transition-[width] duration-250 ease-linear ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
