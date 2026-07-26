import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export function FlipWords({ words, interval = 2500 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span className="relative inline-grid align-bottom">
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {longest}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="col-start-1 row-start-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
