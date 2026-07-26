import { useLenis } from 'lenis/react'
import type { MouseEvent } from 'react'

export function useSectionScroll() {
  const lenis = useLenis()

  return (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href)
    if (!target) return
    e.preventDefault()
    // -70 matches --brand-nav-height in src/index.css
    lenis?.scrollTo(target as HTMLElement, { offset: -70 })
  }
}
