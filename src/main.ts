import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './style.css'

// =============================================================================
// SoftwareAsan Portal
// -----------------------------------------------------------------------------
// Kök yol (`/`) STATİK HTML'dir (index.html içinde, JS'siz okunur — kurum
// güvenlik cihazlarının sınıflandırıcıları JS koşturmaz). Bu betik kökte
// hiçbir şeyi ezmez; yalnız ürün sayfasını render eder:
//   /                  -> index.html'deki statik tanıtım (JS bir şey yapmaz)
//   /genesis-imaging   -> Genesis Imaging ürün sayfası (JS ile render edilir)
//   /<başka>           -> yayın katmanı index.html'e düşürür: statik tanıtım
//
// İçerik sabit — kullanıcı girdisi render'a girmez; innerHTML statik markup için güvenli.
// =============================================================================

const GENESIS_IMAGING_DOWNLOAD = 'https://apps.softwareasan.ai/genesis-imaging/latest.dmg'
const GENESIS_IMAGING_GITHUB = 'https://github.com/Software-As-An-AI/genesis-imaging'

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

      <a href="/" class="back-link">&larr; Ana sayfa</a>

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
// Path dispatch — yalnız ürün sayfası JS ile render edilir; kök statik kalır
// -----------------------------------------------------------------------------

const path = window.location.pathname.replace(/\/+$/, '') || '/'
if (path === '/genesis-imaging') {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = renderGenesisImagingDetail()
  document.title = 'Genesis Imaging — Mac için indir'
}
