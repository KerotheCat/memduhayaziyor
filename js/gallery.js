// Galerileri manifest JSON'larından oluşturur + basit lightbox
(function () {
  var galleries = document.querySelectorAll('[data-gallery]');
  var allImages = [];

  function buildLightbox() {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<button class="lb-close" aria-label="Kapat">&times;</button>' +
      '<button class="lb-prev" aria-label="Önceki">&#8249;</button>' +
      '<img alt="">' +
      '<button class="lb-next" aria-label="Sonraki">&#8250;</button>';
    document.body.appendChild(lb);

    var imgEl = lb.querySelector('img');
    var current = 0;

    function show(i) {
      current = (i + allImages.length) % allImages.length;
      imgEl.src = allImages[current];
    }
    function open(i) { show(i); lb.classList.add('open'); }
    function close() { lb.classList.remove('open'); imgEl.src = ''; }

    lb.querySelector('.lb-close').onclick = close;
    lb.querySelector('.lb-prev').onclick = function (e) { e.stopPropagation(); show(current - 1); };
    lb.querySelector('.lb-next').onclick = function (e) { e.stopPropagation(); show(current + 1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    return { open: open };
  }

  var box = buildLightbox();

  galleries.forEach(function (el) {
    var base = el.getAttribute('data-base');
    var manifest = el.getAttribute('data-manifest');
    fetch(manifest)
      .then(function (r) { return r.json(); })
      .then(function (names) {
        names.forEach(function (name) {
          var src = base + '/' + name;
          var globalIndex = allImages.length;
          allImages.push(src);
          var img = document.createElement('img');
          img.src = src;
          img.loading = 'lazy';
          img.alt = '';
          img.addEventListener('click', function () { box.open(globalIndex); });
          el.appendChild(img);
        });
      })
      .catch(function (e) { console.error('Galeri yüklenemedi:', manifest, e); });
  });
})();
