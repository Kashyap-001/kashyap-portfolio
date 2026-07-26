import { useRef, type ReactNode } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'

export function DiagramCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const pieces = ref.current?.querySelectorAll('svg > *')
    if (!pieces?.length) return
    const activeCount = Math.floor(progress * pieces.length)
    pieces.forEach((piece, i) => {
      piece.classList.toggle('piece-active', i < activeCount)
    })
  })

  return (
    <div
      ref={ref}
      className="diagram-card rounded-md border border-border bg-brand-bg-secondary p-6 transition-[box-shadow,border-color] duration-300 ease-out group-hover:border-primary group-hover:shadow-[0_0_28px_var(--brand-glow)]"
    >
      {children}
    </div>
  )
}
