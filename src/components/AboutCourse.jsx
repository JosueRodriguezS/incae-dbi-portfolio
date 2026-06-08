import { PillarBridgeIcon, PillarEvidenceIcon, PillarBoundaryIcon } from './icons'

const PILLARS = [
  {
    Icon: PillarBridgeIcon,
    title: 'Puente técnico-estratégico',
    body: 'Los ingenieros de datos raramente participan en conversaciones de gobernanza. Este portafolio documenta cómo construir ese puente desde la arquitectura de datos hasta la sala de directivos.',
  },
  {
    Icon: PillarEvidenceIcon,
    title: 'Evidencia de aprendizaje',
    body: 'Cada semana produce un data product concreto. Este espacio articula el razonamiento detrás de cada decisión de diseño, no solo acumula entregables.',
  },
  {
    Icon: PillarBoundaryIcon,
    title: 'Objeto de frontera',
    body: 'Diseñado para ser útil tanto a equipos técnicos como a liderazgo ejecutivo — un boundary object que inicia conversaciones entre perfiles distintos sobre datos y gobernanza.',
  },
]

export default function AboutCourse() {
  return (
    <section id="course" className="section">
      <div className="section-header reveal">
        <span className="section-num">02</span>
        <div>
          <h2>Introducción &amp; <em>Justificación</em></h2>
          <p className="section-lead">Qué es este portafolio, para qué existe y para quién lo creé</p>
        </div>
      </div>

      <div className="portfolio-intro reveal">
        <p className="portfolio-intro__text">
          Este portafolio es el registro vivo de seis casos de estudio analizados durante el curso
          <strong> Digital Business Intelligence</strong> de INCAE Business School (2026). Existe para
          demostrar que un ingeniero de datos puede ir más allá de los pipelines y traducir datos
          en narrativas estratégicas que los directivos puedan usar. Lo creé para tres audiencias:
          líderes técnicos que quieren ver rigor analítico, ejecutivos que necesitan contexto de
          negocio, y reclutadores que buscan la intersección entre ingeniería y gobernanza de datos.
        </p>
        <p className="portfolio-intro__framework">
          Cada caso se analiza a través del <em>marco de los seis pivotes de evolución digital</em>:
          Alineamiento Estratégico, Cultura Digital, Innovación con el Cliente, Agilidad Operativa,
          Acceso y Uso de Datos, y Ecosistemas Colaborativos.
        </p>
      </div>

      <div className="course-grid">
        <div className="course-card reveal">
          <div className="course-card__logo">INCAE</div>
          <h3 className="course-card__name">Digital Business Intelligence</h3>
          <p className="course-card__sub">
            Gobernanza práctica con herramientas y dashboards
          </p>
          <div className="course-card__divider" />
          <div className="course-meta">
            {[
              ['Institución', 'INCAE Business School'],
              ['Profesor',    'Juan Carlos Barahona'],
              ['Duración',    '7 semanas · 6 data products'],
              ['Año',         '2026'],
              ['Plataforma',  'GitHub Pages'],
            ].map(([label, value]) => (
              <div key={label} className="course-meta__row">
                <span className="course-meta__label">{label}</span>
                <span className="course-meta__value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="course-pillars">
          {PILLARS.map(({ Icon, title, body }) => (
            <div key={title} className="pillar reveal">
              <div className="pillar__icon">
                <Icon size={20} />
              </div>
              <h4 className="pillar__title">{title}</h4>
              <p className="pillar__body">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
