import { useCallback, useEffect, useRef, useState } from 'react'
import { skillGroups } from '@/data/skills'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent } from '@/components/animate-ui/components/animate/tabs'

const ROTATE_INTERVAL = 5000
const MANUAL_PAUSE = 9000

export function Skills() {
  const [active, setActive] = useState(skillGroups[0].category)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    setActive((current) => {
      const idx = skillGroups.findIndex((g) => g.category === current)
      return skillGroups[(idx + 1) % skillGroups.length].category
    })
    timeoutRef.current = setTimeout(advance, ROTATE_INTERVAL)
  }, [])

  useEffect(() => {
    timeoutRef.current = setTimeout(advance, ROTATE_INTERVAL)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [advance])

  function handleManualChange(value: string) {
    setActive(value)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(advance, MANUAL_PAUSE)
  }

  return (
    <RevealOnScroll id="skills" className="mx-auto max-w-[min(1100px,92vw)] px-6 py-12">
      <p className="mb-6 flex items-center gap-3 whitespace-nowrap font-mono text-[15px] font-medium text-primary">
        <span>02.</span> Skills
      </p>
      <Tabs value={active} onValueChange={handleManualChange}>
        <TabsList className="flex-wrap h-auto">
          {skillGroups.map((group) => (
            <TabsTrigger key={group.category} value={group.category}>
              {group.category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContents>
          {skillGroups.map((group) => (
            <TabsContent key={group.category} value={group.category}>
              <div className="flex flex-wrap gap-3 pt-4">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-border bg-brand-dim px-3.5 py-1.5 font-mono text-sm text-primary transition-[border-color,box-shadow] duration-250 ease-out hover:border-primary hover:shadow-[0_0_14px_var(--brand-glow)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </TabsContent>
          ))}
        </TabsContents>
      </Tabs>
    </RevealOnScroll>
  )
}
