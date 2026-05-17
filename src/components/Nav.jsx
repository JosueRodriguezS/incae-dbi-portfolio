import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#hero',     label: 'Inicio' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#course',   label: 'Curso' },
  { href: '#contact',  label: 'Contacto' },
]

export default function Nav() {
  const [open, setOpen]       = useState(false)
  const [active, setActive]   = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = LINKS.map(l => l.href.slice(1))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const ob = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { rootMargin: '-10% 0px -80% 0px' }
      )
      ob.observe(el)
      return ob
    })
    return () => observers.forEach(ob => ob?.disconnect())
  }, [])

  const close = () => setOpen(false)

  return (
    <nav
      className={`nav${scrolled ? ' nav--scrolled' : ''}`}
      aria-label="Navegación principal"
    >
      <span className="nav-logo">josué.dev</span>

      <ul
        className={`nav-links${open ? ' nav-links--open' : ''}`}
        id="nav-links"
        role="list"
      >
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className={`nav-link${active === href.slice(1) ? ' nav-link--active' : ''}`}
              onClick={close}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`nav-toggle${open ? ' nav-toggle--active' : ''}`}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen(o => !o)}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
