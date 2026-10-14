// softwareasan.ai kök portalı — JS'siz okunur statik tanıtım sayfası (ZEMİN kalemi 2026-10-13, operatör onaylı metin).
// Sebep: kurum güvenlik cihazı alan adını engelliyor (kategorisiz); sınıflandırıcı JS koşturmaz ⇒ içerik HTML'de olmalı.
// Çalıştırma: `npm test` (önce build, sonra bu dosya hem kaynak index.html'i hem dist/index.html'i sınar).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const kok = join(dirname(fileURLToPath(import.meta.url)), '..')
const TITLE = 'Software as an AI — Kuruma özel yapay zekâ destekli operasyon platformları'
const DESC =
  'Software as an AI; sağlık, akıllı şehir, hukuk, finans, işletme ve teknoloji alanlarında, kurumun kendi belgelerine dayanan ve kaynağını gösteren yapay zekâ destekli operasyon platformları geliştirir.'
const PLATFORMLAR = ['NABIZ', 'MİHENK', 'MİZAN', 'KÜLÇE', 'MERCEK', 'KULUÇKA']

const kaynaklar = [['index.html (kaynak)', join(kok, 'index.html')]]
if (existsSync(join(kok, 'dist', 'index.html'))) kaynaklar.push(['dist/index.html (build)', join(kok, 'dist', 'index.html')])

/** JS koşmayan okuyucunun (sınıflandırıcı/tarayıcı) göreceği metin: script/style etiketleri ve tüm etiketler atılır. */
function jssizMetin(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<head[\s\S]*?<\/head>/i, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
}

for (const [ad, yol] of kaynaklar) {
  const html = readFileSync(yol, 'utf8')
  const metin = jssizMetin(html)

  test(`${ad}: "Ayrıca" bölümü yok — Genesis Imaging ve Paperclip SAFE bağlantıları kaldırıldı (operatör 2026-10-13 22:2x)`, () => {
    assert.ok(!/Ayrıca/.test(metin), 'Ayrıca bölümü duruyor')
    assert.ok(!/Genesis Imaging|Paperclip/i.test(metin), 'kaldırılan ürün adı metinde')
    assert.ok(!/href="\/genesis-imaging"|paperclip\.softwareasan\.ai/.test(html), 'kaldırılan bağlantı duruyor')
  })

  test(`${ad}: <title> ve meta description ZEMİN metniyle birebir`, () => {
    assert.match(html, /<html lang="tr"/)
    assert.ok(html.includes(`<title>${TITLE}</title>`), 'title farklı')
    assert.ok(html.includes(`<meta name="description" content="${DESC}"`), 'meta description farklı')
    assert.ok(html.includes(`<meta property="og:title" content="${TITLE}"`), 'og:title title ile aynı olmalı')
  })

  test(`${ad}: JS'siz metinde ana başlık, 6 platform ve iletişim var`, () => {
    assert.match(html, /<h1[^>]*>\s*Software as an AI\s*<\/h1>/)
    for (const p of PLATFORMLAR) assert.ok(metin.includes(p), `platform eksik: ${p}`)
    assert.ok(metin.includes('genesis@softwareasan.ai'), 'iletişim e-postası yok')
    assert.ok(html.includes('href="mailto:genesis@softwareasan.ai"'), 'mailto bağlantısı yok')
    for (const baslik of ['Ne yapıyoruz', 'Platformlarımız', 'Güvenlik ve gizlilik', 'İletişim'])
      assert.ok(metin.includes(baslik), `bölüm eksik: ${baslik}`)
  })

  test(`${ad}: yer tutucu, askeri platform ve eski katalog ibareleri YOK`, () => {
    assert.ok(!/\[[^\]]*(ADRES|GİZLİLİK|KOŞUL|KURULUŞ)[^\]]*\]/i.test(metin), 'yer tutucu kalmış')
    assert.ok(!/askeri|mirakl|savunma|istihbarat/i.test(metin), 'askeri platform sayfada listelenmez')
    assert.ok(!/Genesis Apps — macOS/i.test(html), 'eski sayfa başlığı kalmış')
  })
}

test('main.ts: kök yolda statik içeriği ezmez, başlığı yalnız ürün sayfasında değiştirir', () => {
  const ts = readFileSync(join(kok, 'src', 'main.ts'), 'utf8')
  assert.ok(!ts.includes('renderKatalog'), 'eski katalog render kodu kalmış (ölü kod / statik içeriği ezer)')
  assert.ok(!/document\.title\s*=\s*[^;]*Genesis Apps/.test(ts), 'sekme başlığı kökte eski metne dönüyor')
})

test('dist/index.html (varsa): stilsiz okunabilir kalmaz — stylesheet bağlantısı head içinde', { skip: !existsSync(join(kok, 'dist', 'index.html')) }, () => {
  const html = readFileSync(join(kok, 'dist', 'index.html'), 'utf8')
  assert.match(html, /<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"/)
})

// Yazı tipleri kendi alan adımızdan sunulur: Google Fonts isteği YOK (gizlilik; kurum güvenlik cihazı). Operatör "3 evet" 2026-10-13.
test('yazı tipleri self-host: kaynak ve dist\'te fonts.googleapis.com / fonts.gstatic.com yok, woff2 dosyaları dist/assets\'te', () => {
  const dosyalar = [['index.html', join(kok, 'index.html')], ['src/style.css', join(kok, 'src', 'style.css')]]
  const assets = join(kok, 'dist', 'assets')
  if (existsSync(assets)) {
    for (const f of readdirSync(assets)) if (/\.(css|js)$/.test(f)) dosyalar.push([`dist/assets/${f}`, join(assets, f)])
    dosyalar.push(['dist/index.html', join(kok, 'dist', 'index.html')])
  }
  for (const [ad, yol] of dosyalar) {
    assert.ok(!/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(readFileSync(yol, 'utf8')), `${ad}: Google Fonts referansı var`)
  }
  if (existsSync(assets)) {
    const woff2 = readdirSync(assets).filter((f) => f.endsWith('.woff2'))
    assert.ok(woff2.length >= 3, `dist/assets'te woff2 yok/az (${woff2.length})`)
    const css = readdirSync(assets).filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(assets, f), 'utf8')).join('\n')
    for (const aile of ['Plus Jakarta Sans', 'Inter', 'JetBrains Mono']) assert.ok(css.includes(aile), `@font-face ${aile} yok`)
  }
})

// Genesis Imaging kapatıldı: kullanıcısı yok (operatör 2026-10-14 07:4x, AYNEN "genesis imaging kısmını kapatabiliriz su anda kullanıcısı yok.").
test('Genesis Imaging izi yok: index.html, src/main.ts ve public/genesis-imaging', () => {
  assert.ok(!/Genesis Imaging|genesis-imaging/i.test(readFileSync(join(kok, 'index.html'), 'utf8')), 'index.html (og:description dahil) Genesis Imaging anıyor')
  assert.ok(!/imaging/i.test(readFileSync(join(kok, 'src', 'main.ts'), 'utf8')), 'src/main.ts Genesis Imaging kodu taşıyor')
  assert.ok(!existsSync(join(kok, 'public', 'genesis-imaging')), 'public/genesis-imaging (appcast + ekran görüntüsü) duruyor')
})

test('dist (varsa): genesis-imaging dizini ve Genesis Imaging metni yok', { skip: !existsSync(join(kok, 'dist', 'index.html')) }, () => {
  assert.ok(!existsSync(join(kok, 'dist', 'genesis-imaging')), 'dist/genesis-imaging duruyor')
  const assets = join(kok, 'dist', 'assets')
  for (const f of readdirSync(assets)) if (f.endsWith('.js')) assert.ok(!/Genesis Imaging|genesis-imaging/i.test(readFileSync(join(assets, f), 'utf8')), `${f}: Genesis Imaging metni var`)
})
