import './style.css'

// =============================================================================
// SoftwareAsan Apps Portal
// -----------------------------------------------------------------------------
// Path-based dispatch:
//   /                      -> katalog (cards grid)
//   /genesis-imaging       -> Genesis Imaging product detail page
//   /<anything-else>       -> fallback to katalog (Render rewrite handles SPA)
//
// All content is hardcoded — no user input flows into rendering. Safe to use
// innerHTML for static markup.
// =============================================================================

interface Project {
  id: string
  title: string
  desc: string
  icon: string
  /** Card click target. Use `/<slug>` for internal product detail, full URL for external. */
  url: string
  status: 'live' | 'invite' | 'dev'
  tags: string[]
  /** If true, card href is treated as internal app route (no target=_blank). */
  internal?: boolean
}

const projects: Project[] = [
  {
    id: 'genesis-imaging',
    title: 'Genesis Imaging',
    desc: 'macOS native gorsel iyilestirme — Apple Neural Engine uzerinden 5x hizli, on-device, Real-ESRGAN. Ilk consumer mac native edition.',
    icon: '\u{1F5BC}\u{FE0F}',
    url: '/genesis-imaging',
    status: 'live',
    tags: ['macOS Native', 'Apple Silicon', 'ANE', 'On-Device'],
    internal: true,
  },
  {
    id: 'paperclip',
    title: 'Paperclip SAFE',
    desc: 'Encryption-in-use teknolojisi ile kurumsal veri guvenliqi demo platformu. Canli saldiri simülasyonu ve karsilastirmali analiz.',
    icon: '\u{1F510}',
    url: 'https://paperclip.softwareasan.ai',
    status: 'live',
    tags: ['Veri Guvenligi', 'Encryption', 'SaaS Demo'],
  },
  {
    id: 'mirakl',
    title: 'Mirakl',
    desc: 'Askeri seviye guvenlik ve istihbarat platformu. Erisim sadece davetli kullanicilar icindir.',
    icon: '\u{1F6E1}\u{FE0F}',
    url: '#',
    status: 'invite',
    tags: ['Savunma', 'Guvenlik', 'Invite Only'],
  },
]

const GENESIS_IMAGING_DOWNLOAD = 'https://apps.softwareasan.ai/genesis-imaging/latest.dmg'
const GENESIS_IMAGING_GITHUB = 'https://github.com/Software-As-An-AI/genesis-imaging'

// -----------------------------------------------------------------------------
// Katalog rendering
// -----------------------------------------------------------------------------

function renderBadge(status: Project['status']): string {
  const labels: Record<string, string> = { live: 'Canli', invite: 'Davetli', dev: 'Gelistirme' }
  return `<span class="card-badge badge--${status}">${labels[status]}</span>`
}

function renderCard(p: Project): string {
  const isLocked = p.status === 'invite' || p.status === 'dev'
  const isInternal = p.internal === true
  const tag = isLocked ? 'div' : 'a'
  const targetAttr = isInternal || isLocked ? '' : ' target="_blank" rel="noopener"'
  const href = isLocked ? '' : ` href="${p.url}"${targetAttr}`
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

function renderKatalog(): string {
  return `
    <div class="portal">
      <nav class="nav">
        <div class="nav-brand">
          <div class="nav-logo">&#9889;</div>
          <div class="nav-title">Software<span>Asan</span></div>
        </div>
        <span class="nav-tag">Apps</span>
      </nav>

      <section class="hero">
        <div class="hero-eyebrow">
          <span class="hero-dot"></span>
          Genesis Apps
        </div>
        <h1>Projelerinize<br />tek noktadan erisin.</h1>
        <p>Her proje kendi ortaminda, kendi kurallariyla. Ilgilendiginiz uygulamayi secin ve baslayin.</p>
      </section>

      <div class="section-label">Aktif Uygulamalar</div>
      <div class="projects">
        ${projects.map(renderCard).join('')}
      </div>

      <footer class="footer">
        &copy; 2026 SoftwareAsan &mdash; <a href="mailto:info@softwareasan.ai">info@softwareasan.ai</a>
      </footer>
    </div>
  `
}

// -----------------------------------------------------------------------------
// Product detail — Genesis Imaging
// -----------------------------------------------------------------------------

function renderGenesisImagingDetail(): string {
  return `
    <div class="portal portal--product">
      <nav class="nav">
        <a href="/" class="nav-brand nav-brand--link">
          <div class="nav-logo">&#9889;</div>
          <div class="nav-title">Software<span>Asan</span></div>
        </a>
        <span class="nav-tag">Apps</span>
      </nav>

      <a href="/" class="back-link">&larr; T&#252;m Uygulamalar</a>

      <section class="product-hero">
        <div class="product-hero-icon">&#x1F5BC;&#xFE0F;</div>
        <h1 class="product-title">Genesis Imaging</h1>
        <p class="product-tagline">On-device image upscaling for macOS &mdash; 5x faster via Apple Neural Engine.</p>
        <a href="${GENESIS_IMAGING_DOWNLOAD}" class="cta-primary" target="_blank" rel="noopener">
          <span class="cta-icon">&darr;</span>
          <span class="cta-label">Mac i&#231;in indir</span>
          <span class="cta-sublabel">Apple Silicon &middot; macOS 14+</span>
        </a>
        <div class="product-meta">
          <a href="${GENESIS_IMAGING_GITHUB}" target="_blank" rel="noopener">GitHub &rarr;</a>
          <a href="${GENESIS_IMAGING_GITHUB}/blob/main/docs/BENCHMARKS.md" target="_blank" rel="noopener">Benchmarks &rarr;</a>
        </div>
      </section>

      <section class="product-screenshot">
        <img src="/genesis-imaging/screenshot.png" alt="Genesis Imaging &mdash; ana ekran" loading="lazy" />
      </section>

      <section class="product-features">
        <h2 class="section-label">&#214;ne &#231;ikanlar</h2>
        <div class="feature-grid">
          <div class="feature">
            <div class="feature-icon">&#9889;</div>
            <div class="feature-title">5x hiz</div>
            <div class="feature-desc">Core ML + ANE delegation. M4 Pro'da 1024&times;1024 &rarr; 4096&times;4096 ~2.4 sn (ncnn baseline 11.8 sn).</div>
          </div>
          <div class="feature">
            <div class="feature-icon">&#x1F512;</div>
            <div class="feature-title">On-device</div>
            <div class="feature-desc">Hi&#231;bir g&#246;r&#252;nt&#252; cihazindan &#231;ikmaz. Inference local Apple Silicon'da, internet baglantisi gerekmez.</div>
          </div>
          <div class="feature">
            <div class="feature-icon">&#x1F9E0;</div>
            <div class="feature-title">%100 ANE</div>
            <div class="feature-desc">1026 model katmaninin tamami Apple Neural Engine'e atanir (MLComputePlan kaniti).</div>
          </div>
          <div class="feature">
            <div class="feature-icon">&#x1F3A8;</div>
            <div class="feature-title">Real-ESRGAN x4</div>
            <div class="feature-desc">Tencent ARC Lab'in a&#231;ik kaynak modeli. Anime line-art + foto&#287;raf + y&#252;ksek frekansli i&#231;erikte test edildi.</div>
          </div>
        </div>
      </section>

      <section class="product-specs">
        <h2 class="section-label">Sistem gereksinimleri</h2>
        <ul class="specs-list">
          <li><strong>&#304;&#351;lemci:</strong> Apple Silicon (M1, M2, M3, M4) &mdash; Intel desteklenmiyor</li>
          <li><strong>macOS:</strong> 14.0 Sonoma veya &#252;zeri (Sequoia 15.x &#246;nerilen)</li>
          <li><strong>&#304;ndirme:</strong> ~135 MB DMG (Core ML modeli dahil)</li>
          <li><strong>Disk:</strong> 200 MB bo&#351; alan</li>
          <li><strong>Lisans:</strong> MIT (Real-ESRGAN modeli BSD-3-Clause)</li>
        </ul>
      </section>

      <footer class="footer">
        &copy; 2026 SoftwareAsan &mdash; <a href="mailto:info@softwareasan.ai">info@softwareasan.ai</a>
      </footer>
    </div>
  `
}

// -----------------------------------------------------------------------------
// Path dispatch
// -----------------------------------------------------------------------------

function dispatch(): string {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/genesis-imaging') {
    return renderGenesisImagingDetail()
  }
  return renderKatalog()
}

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = dispatch()

// Update page title based on route
document.title =
  window.location.pathname === '/genesis-imaging'
    ? 'Genesis Imaging — Mac için indir'
    : 'Genesis Apps — SoftwareAsan'
