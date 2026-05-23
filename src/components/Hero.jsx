import { GitHubIcon, LinkedInIcon } from './icons'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <p className="hero-tag">
        <span>INCAE Business School · 2026</span>
      </p>

      <h1>
        Josué<br />
        <em>Rodríguez</em>
      </h1>

      <p className="hero-role">Data Engineer &amp; Business Intelligence Professional</p>
      <p className="hero-sub">IBM · Hakkoda · INCAE Business School</p>

      <p className="hero-desc">
        Especializado en pipelines de datos, dashboards analíticos y gobernanza de datos
        en los sectores energético y empresarial. Construyo la infraestructura que convierte
        datos crudos en decisiones estratégicas.
      </p>

      <div className="hero-actions">
        <a href="#projects" className="btn btn--primary">Ver Proyectos</a>
        <a
          href="https://github.com/JosueRodriguezS"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost"
        >
          <GitHubIcon size={16} /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/josue-rodriguez-solis-a2197a243"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost"
        >
          <LinkedInIcon size={16} /> LinkedIn
        </a>
      </div>

      <div className="hero-meta">
        <div className="meta-item">
          <span className="meta-label">Rol actual</span>
          <span className="meta-value">Data Engineer</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Empresa</span>
          <span className="meta-value">IBM / Hakkoda</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Industria</span>
          <span className="meta-value">Energía &amp; Salud</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Programa</span>
          <span className="meta-value">DBI · INCAE 2026</span>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <div className="scroll-line" />
        <span className="scroll-text">Explorar</span>
      </div>
    </section>
  )
}
