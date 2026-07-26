import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.tsx'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={
          prefersReducedMotion
            ? { lerp: 1, smoothWheel: false, syncTouch: false }
            : { lerp: 0.1, smoothWheel: true, syncTouch: false }
        }
      >
        <App />
      </ReactLenis>
    </MotionConfig>
  </StrictMode>,
)
