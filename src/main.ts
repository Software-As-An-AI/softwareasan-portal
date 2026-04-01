import './style.css'

interface Project {
  id: string
  title: string
  desc: string
  icon: string
  url: string
  status: 'live' | 'invite' | 'dev'
  tags: string[]
}

// All data is hardcoded — no user input flows into rendering.
// Safe to use innerHTML for static content.

const projects: Project[] = [
  {
    id: 'paperclip',
    title: 'Paperclip SAFE',
    desc: 'Encryption-in-use teknolojisi ile kurumsal veri guvenliqi demo platformu. Canli saldiri simülasyonu ve karsilastirmali analiz.',
    icon: '🔐',
    url: 'https://paperclip.softwareasan.ai',
    status: 'live',
    tags: ['Veri Guvenligi', 'Encryption', 'SaaS Demo'],
  },
  {
    id: 'mirakl',
    title: 'Mirakl',
    desc: 'Askeri seviye guvenlik ve istihbarat platformu. Erisim sadece davetli kullanicilar icindir.',
    icon: '🛡️',
    url: '#',
    status: 'invite',
    tags: ['Savunma', 'Guvenlik', 'Invite Only'],
  },
]

function renderBadge(status: Project['status']): string {
  const labels: Record<string, string> = { live: 'Canli', invite: 'Davetli', dev: 'Gelistirme' }
  return `<span class="card-badge badge--${status}">${labels[status]}</span>`
}

function renderCard(p: Project): string {
  const isLocked = p.status === 'invite' || p.status === 'dev'
  const tag = isLocked ? 'div' : 'a'
  const href = isLocked ? '' : ` href="${p.url}" target="_blank" rel="noopener"`
  const lockedClass = isLocked ? ' project-card--locked' : ''

  return `
    <${tag}${href} class="project-card${lockedClass}">
      <div class="card-header">
        <div class="card-icon">${p.icon}</div>
        ${renderBadge(p.status)}
      </div>
      <div class="card-title">${p.title}</div>
      <div class="card-desc">${p.desc}</div>
      <div class="card-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      ${!isLocked ? '<span class="card-arrow">&rarr;</span>' : ''}
    </${tag}>
  `
}

// Static content only — all values are hardcoded constants, no user input
const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <div class="portal">
    <nav class="nav">
      <div class="nav-brand">
        <div class="nav-logo">&#9889;</div>
        <div class="nav-title">Software<span>Asan</span></div>
      </div>
      <span class="nav-tag">POC Portal</span>
    </nav>

    <section class="hero">
      <div class="hero-eyebrow">
        <span class="hero-dot"></span>
        Proof of Concept Hub
      </div>
      <h1>Projelerinize<br />tek noktadan erisin.</h1>
      <p>Her proje kendi ortaminda, kendi kurallariyla. Ilgilendiginiz projeyi secin ve canli demoya baslayin.</p>
    </section>

    <div class="section-label">Aktif Projeler</div>
    <div class="projects">
      ${projects.map(renderCard).join('')}
    </div>

    <footer class="footer">
      &copy; 2026 SoftwareAsan &mdash; <a href="mailto:info@softwareasan.ai">info@softwareasan.ai</a>
    </footer>
  </div>
`
