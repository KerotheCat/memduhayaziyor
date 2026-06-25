// Gezi & İlham — her klasör için tek sıra film şeridi (önizleme) + "Devamı" lightbox
(function () {
  // Ortak lightbox
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    '<button class="lb-close" aria-label="Kapat">&times;</button>' +
    '<button class="lb-prev" aria-label="Önceki">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-next" aria-label="Sonraki">&#8250;</button>';
  document.body.appendChild(lb);
  var imgEl = lb.querySelector('img');
  var list = [], idx = 0;

  function show(i) { idx = (i + list.length) % list.length; imgEl.src = list[idx]; }
  function open(arr, i) { list = arr; show(i); lb.classList.add('open'); }
  function close() { lb.classList.remove('open'); imgEl.src = ''; }

  lb.querySelector('.lb-close').onclick = close;
  lb.querySelector('.lb-prev').onclick = function (e) { e.stopPropagation(); show(idx - 1); };
  lb.querySelector('.lb-next').onclick = function (e) { e.stopPropagation(); show(idx + 1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  document.querySelectorAll('.gezi-strip').forEach(function (strip) {
    var base = strip.getAttribute('data-base');
    var manifest = strip.getAttribute('data-manifest');
    var preview = parseInt(strip.getAttribute('data-preview') || '8', 10);
    var more = strip.parentElement.querySelector('.gezi-more');

    fetch(manifest).then(function (r) { return r.json(); }).then(function (names) {
      var full = names.map(function (n) { return base + '/' + n; });
      names.slice(0, preview).forEach(function (n, i) {
        var img = document.createElement('img');
        img.src = base + '/' + n;
        img.loading = 'lazy';
        img.alt = '';
        img.addEventListener('click', function () { open(full, i); });
        strip.appendChild(img);
      });
      if (more) {
        if (names.length > preview) {
          more.addEventListener('click', function (e) { e.preventDefault(); open(full, preview); });
        } else {
          more.style.display = 'none';
        }
      }
    }).catch(function (e) { console.error('Gezi şeridi yüklenemedi:', manifest, e); });
  });
})();
