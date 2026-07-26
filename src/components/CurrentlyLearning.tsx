import { RevealOnScroll } from '@/components/RevealOnScroll'

export function CurrentlyLearning() {
  return (
    <RevealOnScroll className="mx-auto mb-15 flex max-w-[min(1100px,92vw)] items-center gap-2.5 px-6 text-[15px] text-foreground">
      <span aria-hidden="true" className="size-2 shrink-0 animate-pulse-dot rounded-full bg-primary" />
      Currently deepening classical ML fundamentals (scikit-learn, model training basics) alongside the applied agentic AI work below.
    </RevealOnScroll>
  )
}
