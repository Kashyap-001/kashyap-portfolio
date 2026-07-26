import { ScrollProgress } from '@/components/ScrollProgress'
import { FluidCursor } from '@/components/FluidCursor'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { CurrentlyLearning } from '@/components/CurrentlyLearning'
import { Projects } from '@/components/Projects'
import { Education } from '@/components/Education'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <>
      <ScrollProgress />
      <FluidCursor />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <CurrentlyLearning />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}

export default App
