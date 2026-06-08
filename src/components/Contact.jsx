import { GitHubIcon, LinkedInIcon, EmailIcon } from './icons'

const LINKS = [
  {
    href: 'https://github.com/JosueRodriguezS',
    platform: 'GitHub',
    handle: '@JosueRodriguezS',
    iconClass: '',
    Icon: GitHubIcon,
  },
  {
    href: 'https://www.linkedin.com/in/josue-rodriguez-solis-a2197a243',
    platform: 'LinkedIn',
    handle: 'josue-rodriguez-solis',
    iconClass: 'contact-card__icon--linkedin',
    Icon: LinkedInIcon,
  },
  {
    href: 'mailto:rodriguezsolisjosue@gmail.com',
    platform: 'Email',
    handle: 'rodriguezsolisjosue@gmail.com',
    iconClass: 'contact-card__icon--email',
    Icon: EmailIcon,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-header reveal">
        <span className="section-num">04</span>
        <div>
          <h2>Contacto &amp; <em>Perfil</em></h2>
          <p className="section-lead">Conecta conmigo o revisa mi trabajo</p>
        </div>
      </div>

      <div className="contact-grid">
        {LINKS.map(({ href, platform, handle, iconClass, Icon }) => (
          <a
            key={platform}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="contact-card reveal"
          >
            <div className={`contact-card__icon${iconClass ? ' ' + iconClass : ''}`}>
              <Icon />
            </div>
            <div className="contact-card__info">
              <span className="contact-card__platform">{platform}</span>
              <span className="contact-card__handle">{handle}</span>
            </div>
            <span className="contact-card__arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
