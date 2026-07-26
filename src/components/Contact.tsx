import { RevealOnScroll } from '@/components/RevealOnScroll'
import { CtaButton } from '@/components/CtaButton'

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <RevealOnScroll className="relative mx-auto max-w-[min(1100px,92vw)] px-6 py-25 text-center">
        <p className="mb-2 font-mono text-base text-primary">05. What's Next?</p>
        <h2 className="text-[clamp(28px,6vw,44px)] font-bold text-brand-heading">Get In Touch</h2>
        <p className="mx-auto mt-4 mb-8 max-w-[480px]">
          I'm looking for entry-level Applied AI/ML, Android, or backend roles. My inbox is always open,
          whether you have a question or just want to say hi. I'll try my best to get back to you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <CtaButton href="mailto:kashyap6334@gmail.com">Say Hello</CtaButton>
          <CtaButton href="/assets/resume/Kashyap_Patel_Resume.pdf" download>Download Resume</CtaButton>
        </div>
      </RevealOnScroll>
    </section>
  )
}
