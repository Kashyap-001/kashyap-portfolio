import { RevealOnScroll } from '@/components/RevealOnScroll'

const items = [
  {
    title: 'Master of Computer Applications (MCA)',
    meta: 'Swarrnim Startup & Innovation University · 2025 – 2027 (expected)',
    detail: 'Currently pursuing, Semester 3 of 4 · Current SPI 9.01',
  },
  {
    title: 'Bachelor of Computer Applications (BCA)',
    meta: 'S K Patel Institute of Management & Computer Studies · Aug 2021 – Mar 2024',
    detail: 'SPI 8.67',
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    meta: 'Amazon Web Services · Issued Jun 2025, expires Jun 2028',
    detail: null,
  },
]

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-[min(1100px,92vw)] px-6 py-25">
      <RevealOnScroll>
        <p className="mb-3 flex items-center gap-3 whitespace-nowrap font-mono text-[15px] font-medium text-primary">
          <span>04.</span> Education
        </p>
      </RevealOnScroll>

      <div className="space-y-6">
        {items.map((item) => (
          <RevealOnScroll key={item.title}>
            <h3 className="mb-1 text-lg font-bold text-brand-heading">{item.title}</h3>
            <p className="font-mono text-sm text-primary">{item.meta}</p>
            {item.detail && <p>{item.detail}</p>}
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
