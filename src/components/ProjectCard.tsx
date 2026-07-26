import { motion } from 'motion/react'
import type { Project } from '@/data/projects'
import { ExternalLinkIcon } from '@/components/icons'
import { DiagramCard } from '@/components/DiagramCard'
import { useAutoplayInView } from '@/hooks/useAutoplayInView'

const EASE_REVEAL = [0.16, 1, 0.3, 1] as const

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 48, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_REVEAL },
  },
}

const bodyVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function ProjectCard({ project }: { project: Project }) {
  const videoRef = useAutoplayInView<HTMLVideoElement>()

  return (
    <motion.article
      className="group grid grid-cols-1 items-center gap-10 md:grid-cols-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardVariants}
    >
      <div className={project.reverse ? 'md:order-2' : undefined}>
        {project.media.kind === 'video' ? (
          <video
            ref={videoRef}
            className="block w-full rounded-md border border-border bg-brand-bg-secondary transition-[box-shadow,border-color] duration-300 ease-out group-hover:border-primary group-hover:shadow-[0_0_28px_var(--brand-glow)]"
            controls
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.media.poster}
            src={project.media.src}
          />
        ) : (
          <DiagramCard>{project.media.node}</DiagramCard>
        )}
      </div>

      <motion.div variants={bodyVariants} className={project.reverse ? 'md:order-1' : undefined}>
        <motion.p variants={itemVariants} className="mb-1.5 font-mono text-sm text-primary">Featured Project</motion.p>
        <motion.h3 variants={itemVariants} className="mb-3 text-[22px] font-bold text-brand-heading">{project.title}</motion.h3>
        <motion.p variants={itemVariants} className="mb-4">{project.description}</motion.p>
        {project.note && (
          <motion.p variants={itemVariants} className="mb-4 border-l-2 border-border pl-3 text-[15px] text-foreground italic">
            {project.note}
          </motion.p>
        )}
        <motion.div variants={itemVariants} className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span key={tag} className="font-mono text-[13px] text-foreground">
              {tag}
              {i < project.tags.length - 1 && <span className="ml-2 text-border">·</span>}
            </span>
          ))}
        </motion.div>
        <motion.div variants={itemVariants}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener"
            className="mr-4 inline-flex items-center font-mono text-sm text-primary hover:underline"
          >
            GitHub<ExternalLinkIcon className="ml-1 size-3.5" />
          </a>
        </motion.div>
      </motion.div>
    </motion.article>
  )
}
