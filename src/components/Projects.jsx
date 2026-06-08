import { useState, useRef, useEffect, Suspense, lazy } from 'react'

const HuaweiDashboard     = lazy(() => import('./dashboards/HuaweiDashboard'))
const FCCDashboard        = lazy(() => import('./dashboards/FCCDashboard'))
const RAPSDashboard       = lazy(() => import('./dashboards/RAPSDashboard'))
const DBVertriebDashboard = lazy(() => import('./dashboards/DBVertriebDashboard'))
const AXADashboard        = lazy(() => import('./dashboards/AXADashboard'))
const ArcelikDashboard    = lazy(() => import('./dashboards/ArcelikDashboard'))

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
    mobileUrl: 'dashboards/huawei.html',
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
    mobileUrl: null,
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
    mobileUrl: null,
  },
  {
    id: 'dbvertrieb',
    num: '04',
    title: 'Caso DB Vertrieb',
    subtitle: 'Agilidad Operativa & Transformación Bimodal IT',
    description:
      'Dashboard longitudinal (2005–2018, 948 observaciones) del journey de transformación digital de Deutsche Bahn Vertrieb. OKR framework de agilidad operativa, análisis por fase de IT (bimodal separado → reintegrado), y chatbot analítico con contexto del caso.',
    tags: ['Agilidad Operativa', 'Bimodal IT', 'SAFe', 'OKR', 'AI Analyst', 'Recharts'],
    component: DBVertriebDashboard,
    mobileUrl: 'https://vertrieb-pulse.lovable.app',
  },
  {
    id: 'axa',
    num: '05',
    title: 'Caso AXA Germany',
    subtitle: 'Intelligence Brief — Data Innovation Lab 2016–2018',
    description:
      'Dashboard agéntico de AXA Germany: 339 registros operativos del Data Innovation Lab analizados a través del marco de los seis pivotes de evolución digital y OKR/BSC. Incluye filtros interactivos por año y unidad, análisis de madurez por pivote, condiciones de mercado 2025–2026 y trazabilidad completa del flujo de trabajo agéntico.',
    tags: ['Agentes de IA', 'Intelligence Brief', 'OKR / BSC', '6 Pivotes', 'Chart.js', 'HTML Autónomo'],
    component: AXADashboard,
    mobileUrl: 'dashboards/axa.html',
  },
  {
    id: 'arcelik',
    num: '06',
    title: 'Caso Arçelik',
    subtitle: 'Twin Ecosystem — Innovación Digital & Ecosistemas Conectados',
    description:
      'Dashboard interactivo del ecosistema digital de Arçelik: modelo de twin ecosystem que integra cadena de valor, alianzas estratégicas y capacidades de innovación para acelerar la transformación hacia productos y servicios conectados.',
    tags: ['Twin Ecosystem', 'Innovación Digital', 'Ecosistema', 'Lovable', 'IA Generativa'],
    component: ArcelikDashboard,
    mobileUrl: 'https://areliktwinecosystem.lovable.app',
  },
]

export default function Projects() {
  const [active, setActive] = useState(null)
  const panelRef = useRef(null)

  const select = (id) => {
    setActive(prev => (prev === id ? null : id))
  }

  // Scroll the dashboard panel into view whenever a new one opens
  useEffect(() => {
    if (active && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [active])

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

      {/* Cards — always visible, act as persistent tabs */}
      <div className={`projects-grid${active ? ' projects-grid--has-active' : ''}`}>
        {PROJECTS.map(project => {
          const isActive   = active === project.id
          const isInactive = active !== null && !isActive
          return (
            <button
              key={project.id}
              type="button"
              className={[
                'project-card',
                isActive   ? 'project-card--active'   : '',
                isInactive ? 'project-card--inactive' : '',
              ].join(' ').trim()}
              onClick={() => select(project.id)}
              aria-expanded={isActive}
              aria-label={`${project.title} — ${isActive ? 'cerrar' : 'abrir'} dashboard`}
            >
              {/* Active indicator strip at bottom connecting to panel */}
              {isActive && <span className="project-card__connector" aria-hidden="true" />}

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
                {isActive ? '↑ Cerrar dashboard' : '↓ Ver dashboard'}
              </span>
            </button>
          )
        })}
      </div>

      {/* Dashboard panel — slides in below the card grid */}
      {active && activeProject && (() => {
        const ActiveDashboard = activeProject.component
        const mobileUrl = activeProject.mobileUrl
          ? activeProject.mobileUrl.startsWith('http')
            ? activeProject.mobileUrl
            : `${import.meta.env.BASE_URL}${activeProject.mobileUrl}`
          : null

        return (
          <div
            ref={panelRef}
            className="dashboard-panel"
            role="region"
            aria-label={`Dashboard: ${activeProject.title}`}
          >
            <div className="dashboard-panel__header">
              <div className="dashboard-panel__meta">
                <span className="dashboard-panel__num">{activeProject.num}</span>
                <span className="dashboard-panel__title">{activeProject.title}</span>
                <span className="dashboard-panel__subtitle">{activeProject.subtitle}</span>
              </div>
              <div className="dashboard-panel__actions">
                {PROJECTS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className={`dashboard-panel__tab${p.id === active ? ' dashboard-panel__tab--active' : ''}`}
                    onClick={() => select(p.id)}
                    aria-pressed={p.id === active}
                  >
                    {p.num}
                  </button>
                ))}
                <button
                  type="button"
                  className="dashboard-panel__close"
                  onClick={() => setActive(null)}
                  aria-label="Cerrar dashboard"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="dashboard-panel__body">
              {mobileUrl && (
                <a
                  href={mobileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dashboard-fullscreen-btn"
                >
                  ↗ Abrir en pantalla completa
                </a>
              )}
              <div className="dashboard-content-scroller">
                <Suspense fallback={<div className="dashboard-loading">Cargando dashboard…</div>}>
                  <ActiveDashboard />
                </Suspense>
              </div>
            </div>
          </div>
        )
      })()}
    </section>
  )
}
