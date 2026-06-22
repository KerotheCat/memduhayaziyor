# Memduha Uluevli — Kişisel Site

Statik (derleme gerektirmeyen) bir site. Tüm dosyalar düz HTML/CSS/JS; bu `site/` klasörü olduğu gibi yayınlanır.

## Yayında

- **Canlı adres:** https://kerothecat.github.io/memduhayaziyor/
- **Depo:** https://github.com/KerotheCat/memduhayaziyor (GitHub Pages, `main` dalı, kök)

### Güncelleme (yayındaki site nasıl değişir?)
Bu `site/` klasörü deponun kökü. Bir dosyayı değiştirip şu komutları çalıştırınca site birkaç dakikada otomatik güncellenir:
```
cd site
git add -A
git commit -m "güncelleme"
git push
```

## Cloudflare Pages'e yayınlama

İki yol var:

**A) Sürükle-bırak (en kolay)**
1. [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Pages → "Upload assets".
2. Bu `site` klasörünün **içeriğini** yükle (klasörün kendisini değil, içindeki dosyaları).
3. Projeye bir ad ver, Deploy.

**B) Git ile (otomatik güncelleme)**
1. Bu klasörü bir GitHub deposuna koy.
2. Cloudflare Pages → Create → Connect to Git → depoyu seç.
3. Build command: **boş bırak**. Build output directory: **`site`** (deponun kökünde `site/` varsa) ya da **`/`** (sadece site dosyalarını koyduysan).

Özel alan adı: Pages projesi → Custom domains.

## İçerik nasıl güncellenir?

- **Kendi kitapların** → `kitaplarim.html` içindeki "Kendi Kitaplarım" bölümü. Kapakları `img/books/` klasörüne ekle.
- **Instagram görselleri** → her gönderinin kapağını `img/instagram/` klasörüne `post-1.jpg … post-4.jpg` adıyla bırak. (Linkler ve açıklamalar `instagram.html` içinde hazır.)
- **Substack adresi** → `yazilar.html` içinde `data-todo="substack-url"` işaretli `<a>` etiketinin `href`'ini güncelle.
- **Galeri foto ekleme/çıkarma** → görselleri `img/gallery/istanbul/` veya `img/gallery/bozcaada/` klasörüne koy ve aynı klasördeki `istanbul.json` / `bozcaada.json` listesine dosya adını ekle.

## Klasör yapısı

```
site/
  index.html, hakkimda.html, kitaplarim.html, atolyeler.html,
  yazilar.html, gezi.html, instagram.html, iletisim.html, 404.html
  css/style.css
  js/main.js, js/gallery.js
  img/hero/        → hero görseli
  img/books/       → okuma önerisi kapakları
  img/gallery/     → istanbul/ + bozcaada/ + *.json manifestleri
  img/instagram/   → post-1..4.jpg (sen ekleyeceksin)
```

## Yerelde önizleme

Galeriler JSON dosyalarını `fetch` ile yüklediği için dosyayı çift tıklayarak değil, küçük bir sunucuyla açmak gerekir:

```
cd site
python3 -m http.server 8000
# tarayıcıda: http://localhost:8000
```
