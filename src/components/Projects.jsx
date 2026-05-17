import { useState } from 'react'
import HuaweiDashboard from './dashboards/HuaweiDashboard'
import FCCDashboard from './dashboards/FCCDashboard'
import RAPSDashboard from './dashboards/RAPSDashboard'

const PROJECTS = [
  {
    id: 'huawei',
    num: '01',
    title: 'Caso Huawei',
    subtitle: 'Alineamiento Estratégico & Capacidades Dinámicas',
    description:
      'Análisis de cómo Huawei sostuvo su ventaja competitiva global mediante la alineación de capacidades de sensing, seizing y reconfiguration con su estrategia de innovación y gobernanza corporativa.',
    tags: ['Capacidades Dinámicas', 'Estrategia', 'Gobernanza', 'Chart.js'],
    component: HuaweiDashboard,
  },
  {
    id: 'fcc',
    num: '02',
    title: 'Caso FCC',
    subtitle: 'Cultura & Liderazgo Digital — IT Modernization',
    description:
      'Dashboard de análisis de la transformación digital de FCC a lo largo de 11 trimestres (2013–2016), midiendo cultura organizacional, adopción de prácticas ágiles y compromiso ejecutivo por fase de modernización.',
    tags: ['Transformación Digital', 'Analytics', 'React', 'Recharts'],
    component: FCCDashboard,
  },
  {
    id: 'raps',
    num: '03',
    title: 'Caso RAPS',
    subtitle: 'Análisis de Datos Operativos',
    description:
      'Dashboard analítico del caso RAPS, explorando métricas de desempeño operativo y su relación con decisiones de gobernanza de datos en contextos de alta complejidad empresarial.',
    tags: ['Operaciones', 'BI', 'React', 'Recharts', 'Lucide'],
    component: RAPSDashboard,
  },
]

export default function Projects() {
  const [active, setActive] = useState(null)

  const toggle = (id) => setActive(prev => (prev === id ? null : id))

  const activeProject = PROJECTS.find(p => p.id === active)

  return (
    <section id="projects" className="section">
      <div className="section-header reveal">
        <span className="section-num">01</span>
        <div>
          <h2>Proyectos & <em>Dashboards</em></h2>
          <p className="section-lead">
            Casos de estudio del curso DBI · INCAE Business School 2026
          </p>
        </div>
      </div>

      <div className="projects-grid">
        {PROJECTS.map(project => (
          <button
            key={project.id}
            className={`project-card reveal${active === project.id ? ' project-card--active' : ''}`}
            onClick={() => toggle(project.id)}
            aria-expanded={active === project.id}
          >
            <div className="project-card__num">{project.num}</div>
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__subtitle">{project.subtitle}</p>
            <p className="project-card__desc">{project.description}</p>
            <div className="project-card__tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <span className="project-card__cta">
              {active === project.id ? '↑ Cerrar dashboard' : '↓ Ver dashboard'}
            </span>
          </button>
        ))}
      </div>

      {active && activeProject && (
        <div className="dashboard-panel" role="region" aria-label="Dashboard activo">
          <div className="dashboard-panel__header">
            <span className="dashboard-panel__title">{activeProject.title}</span>
            <button
              className="dashboard-panel__close"
              onClick={() => setActive(null)}
              aria-label="Cerrar dashboard"
            >
              ✕ Cerrar
            </button>
          </div>
          <div className="dashboard-panel__body">
            <activeProject.component />
          </div>
        </div>
      )}
    </section>
  )
}
