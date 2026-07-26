import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { RevealOnScroll } from '@/components/RevealOnScroll'

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[min(1100px,92vw)] px-6 py-25">
      <RevealOnScroll>
        <p className="mb-3 flex items-center gap-3 whitespace-nowrap font-mono text-[15px] font-medium text-primary">
          <span>03.</span> Some Things I've Built
        </p>
      </RevealOnScroll>

      <div className="flex flex-col gap-20">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <p className="mt-10 font-mono text-[15px]">
        Also: merged a pull request fixing a snippet-generator bug in a third-party VS Code extension,{' '}
        <a href="https://github.com/mstuttgart/odoo-snippets/pull/15" target="_blank" rel="noopener" className="hover:underline">
          mstuttgart/odoo-snippets #15 &rarr;
        </a>
      </p>
    </section>
  )
}
