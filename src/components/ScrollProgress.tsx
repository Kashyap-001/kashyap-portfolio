import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 z-200 h-[3px] w-full origin-left bg-primary shadow-[0_0_8px_var(--brand-glow)]"
      style={{ scaleX }}
    />
  )
}
