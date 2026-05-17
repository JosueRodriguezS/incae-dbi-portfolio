import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import AboutCourse from './components/AboutCourse'
import Contact from './components/Contact'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <AboutCourse />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>© 2026 · Josué Rodríguez Solís · INCAE Business School</p>
        <nav className="footer-links" aria-label="Redes sociales">
          <a href="https://github.com/JosueRodriguezS" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/josue-rodriguez-solis" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </footer>
    </>
  )
}
