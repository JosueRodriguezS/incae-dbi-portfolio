const SKILLS = [
  { label: 'Ingeniería de datos', items: ['dbt', 'Spark', 'Airflow', 'Snowflake', 'SQL'] },
  { label: 'Visualización & BI',  items: ['Recharts', 'Chart.js', 'Power BI', 'Tableau'] },
  { label: 'Gobernanza & estrategia', items: ['OKR / BSC', '6 Pivotes', 'DAMA-DMBOK', 'Data Mesh'] },
  { label: 'IA & automatización', items: ['Agentes de IA', 'Lovable', 'Claude', 'Prompt engineering'] },
]

const TIMELINE = [
  { period: '2024 – hoy',  role: 'Data Engineer', org: 'IBM / Hakkoda', detail: 'Pipelines de datos para clientes del sector energético y salud. Arquitectura en Snowflake, dbt y Airflow.' },
  { period: '2026',        role: 'Estudiante DBI', org: 'INCAE Business School', detail: 'Curso Digital Business Intelligence — seis casos de estudio, seis dashboards, un portafolio como objeto de frontera.' },
]

export default function Biography() {
  return (
    <section id="biography" className="section">
      <div className="section-header reveal">
        <span className="section-num">03</span>
        <div>
          <h2>Perfil <em>Profesional</em></h2>
          <p className="section-lead">Quién está detrás de este portafolio</p>
        </div>
      </div>

      <div className="bio-grid">
        <div className="bio-main reveal">
          <h3 className="bio-name">Josué Rodríguez Solís</h3>
          <p className="bio-role">Data Engineer &amp; Business Intelligence Professional</p>

          <p className="bio-text">
            Soy ingeniero de datos especializado en construir la infraestructura que convierte
            datos crudos en decisiones estratégicas. Trabajo en <strong>IBM / Hakkoda</strong> con
            clientes de los sectores energético y de salud, diseñando pipelines que mueven
            millones de registros con confiabilidad, trazabilidad y gobernanza.
          </p>
          <p className="bio-text">
            El curso DBI en INCAE representa un paso deliberado: pasar de construir la infraestructura
            a entender cómo esa infraestructura impacta las decisiones de negocio. Cada caso de este
            portafolio refleja esa transición — de los datos al tablero directivo.
          </p>
          <p className="bio-text">
            Me interesa especialmente la intersección entre <em>gobernanza de datos</em>,
            <em> agilidad organizacional</em> y <em>ecosistemas digitales</em>. Creo que los mejores
            sistemas de datos son los que los directivos entienden, no solo los que los ingenieros admiran.
          </p>

          <div className="bio-timeline">
            {TIMELINE.map(({ period, role, org, detail }) => (
              <div key={period} className="bio-timeline__item">
                <span className="bio-timeline__period">{period}</span>
                <div>
                  <span className="bio-timeline__role">{role}</span>
                  <span className="bio-timeline__org"> · {org}</span>
                  <p className="bio-timeline__detail">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bio-skills reveal">
          {SKILLS.map(({ label, items }) => (
            <div key={label} className="bio-skill-group">
              <h4 className="bio-skill-group__label">{label}</h4>
              <div className="bio-skill-group__tags">
                {items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
