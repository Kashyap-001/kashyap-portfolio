import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const EASE_REVEAL = [0.16, 1, 0.3, 1] as const

export function RevealOnScroll({
  children,
  className,
  ...props
}: { children: ReactNode; className?: string } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.94, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE_REVEAL }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
