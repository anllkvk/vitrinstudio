# Vitrin Studio — Site Denetim Raporu

Tarih: 2026-07-19 · Kapsam: index.html, sitemap.xml, robots.txt, img/

## Bulgular

| # | Önem | Bulgu | Durum |
|---|------|-------|-------|
| 1 | 🔴 Kritik | **Masaüstünde menü linkleri hiç görünmüyor.** Nav linkleri kapalı `<details class="mnav">` içinde; tarayıcılar kapalı `details` içeriğini CSS'e rağmen render etmez. `.mnav>summary{display:none}` kuralı da masaüstünde özeti gizlediği için menüye ulaşmanın hiçbir yolu kalmıyor. | ✅ Düzeltildi: `details` artık `open` ile başlıyor, JS ekran genişliğine göre aç/kapa senkronize ediyor |
| 2 | 🟠 Orta | **Bölüm numaraları atlıyor (01, 02, 03, 05, 06).** Sayaç `section[id]` üzerinde artıyor ama Hikayemiz bölümünde numara gösteren `.sec-head` yok; görünen numaralar 04'ü atlıyordu. | ✅ Düzeltildi: sayaç `.sec-head`'e taşındı, numaralar artık kesintisiz 01–05 |
| 3 | 🟠 Orta | **SSS için FAQPage yapısal verisi yoktu.** Google'da zengin sonuç (rich result) şansı kullanılmıyordu. | ✅ Eklendi: 5 soruluk `FAQPage` JSON-LD |
| 4 | 🟡 Düşük | **Twitter Card etiketleri eksikti** (yalnızca `twitter:card` vardı; og fallback'ine güveniliyordu). | ✅ Eklendi: `twitter:title`, `twitter:description`, `twitter:image` |
| 5 | 🟡 Düşük | **JSON-LD `ProfessionalService` şemasında `image` alanı yoktu.** | ✅ Eklendi |
| 6 | 🟡 Düşük | **404 sayfası yoktu.** GitHub Pages'te kırık linke gelen ziyaretçi çıplak hata sayfası görüyordu. | ✅ Eklendi: markaya uygun `404.html` |
| 7 | 🟡 Düşük | **Masaüstünde menü linkine tıklayınca menü kapanıp kayboluyordu** (link-tıkla-kapat davranışı viewport kontrolü yapmıyordu). | ✅ Düzeltildi: kapatma yalnızca mobilde çalışıyor |
| 8 | ℹ️ Bilgi | sitemap.xml `lastmod` eskiydi (2026-07-11). | ✅ Güncellendi |

## Sağlam bulunanlar

- Görseller optimize: 52–80 KB, doğru boyutlar (900×600, og 1200×630), `loading="lazy"` + `width/height` mevcut (CLS koruması) ✓
- Erişilebilirlik temeli iyi: skip-link, `focus-visible`, `prefers-reduced-motion`, `aria-label`'lı kaydırıcılar ✓
- SEO temeli iyi: canonical, og etiketleri, JSON-LD, sitemap, robots.txt ✓
- Tek dosyalık inline CSS/JS — ek istek yok, hızlı ilk boya ✓

## Bilinen açık konular (sonraki iterasyon)

1. ~~**Analitik yok**~~ → **Kuruldu (2026-07-19):** GoatCounter (çerezsiz, KVKK dostu) her iki
   sayfada; tüm WhatsApp/e-posta CTA'ları bölüm bazlı olay olarak ölçülüyor
   (`cta-whatsapp-hero`, `cta-eposta-iletisim` vb.). Verilerin akması için
   goatcounter.com hesabı **anllkvk** koduyla açıldı;
   pano: https://anllkvk.goatcounter.com
2. **Sosyal kanıt yok** — ilk müşteri yorumları geldikçe eklenecek bölüm. → `donusum-analisti`, Skill 4
3. WebP dönüşümü ~%25 ek kazanç sağlayabilir (mevcut boyutlar zaten kabul edilebilir). → `performans-muhendisi`, Skill 2

## Ajan yapısı

Bu repo `.claude/agents/` altında 5 uzman ajanla yönetilir. Her ajanın skill'leri
**Input data → Data quality → Funnel analysis → CTR → Output** hattıyla çalışır:

| Ajan | Alan |
|------|------|
| `seo-analist` | Meta/yapısal veri, sitemap, içerik SEO |
| `ux-erisilebilirlik` | UX, WCAG, mobil deneyim |
| `performans-muhendisi` | Sayfa ağırlığı, görseller, Core Web Vitals |
| `donusum-analisti` | Funnel, CTA/CTR, analitik, sosyal kanıt |
| `qa-test` | Fonksiyonel test, çapraz tarayıcı, yayın öncesi regresyon |
