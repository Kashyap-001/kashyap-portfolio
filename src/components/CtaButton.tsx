import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { motion } from 'motion/react'
import { RippleButton, RippleButtonRipples } from '@/components/animate-ui/primitives/buttons/ripple'

type CtaButtonProps = {
  children: ReactNode
  variant?: 'outline' | 'gradient'
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function CtaButton({ children, className = '', variant = 'outline', ...props }: CtaButtonProps) {
  const button = (
    <RippleButton asChild>
      <a
        className={`relative z-10 inline-block rounded border border-primary px-6 py-3 font-mono text-[15px] text-primary transition-[background,box-shadow] duration-250 ease-out hover:bg-brand-dim hover:shadow-[0_0_20px_var(--brand-glow)] hover:no-underline ${className}`}
        {...props}
      >
        {children}
        <RippleButtonRipples color="var(--primary)" />
      </a>
    </RippleButton>
  )

  if (variant === 'outline') return button

  return (
    <motion.div
      className="relative z-10 inline-block overflow-hidden rounded-md p-[1.5px] transition-shadow duration-250 ease-out hover:shadow-[0_0_20px_var(--brand-glow)]"
      style={{
        backgroundImage: 'linear-gradient(90deg, #16a34a, #4ade80, #22c55e, #16a34a)',
        backgroundSize: '200% 100%',
      }}
      animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    >
      <RippleButton asChild>
        <a
          className={`block rounded-[calc(0.25rem-1.5px)] bg-background px-6 py-3 font-mono text-[15px] text-primary transition-colors duration-250 ease-out hover:bg-brand-dim hover:no-underline ${className}`}
          {...props}
        >
          {children}
          <RippleButtonRipples color="var(--primary)" />
        </a>
      </RippleButton>
    </motion.div>
  )
}
