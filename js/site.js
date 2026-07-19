  document.querySelectorAll('.ba-view').forEach(function(v){
    var range = v.querySelector('.ba-range');
    var after = v.querySelector('.ba-after');
    var div = v.querySelector('.ba-divider');
    if(!range || !after || !div) return;
    function upd(val){ after.style.clipPath = 'inset(0 0 0 ' + val + '%)'; div.style.left = val + '%'; }
    range.addEventListener('input', function(){ upd(this.value); });
    upd(range.value);
  });
  var mnav = document.querySelector('.mnav');
  var mobilMq = matchMedia('(max-width:820px)');
  function syncNav(){ if(mnav) mnav.open = !mobilMq.matches; }
  syncNav();
  if(mobilMq.addEventListener){ mobilMq.addEventListener('change', syncNav); }
  else if(mobilMq.addListener){ mobilMq.addListener(syncNav); }
  document.querySelectorAll('.mnav .nav-links a').forEach(function(a){
    a.addEventListener('click', function(){ if(mnav && mobilMq.matches) mnav.open = false; });
  });
  if (window.matchMedia && matchMedia('(prefers-reduced-motion:no-preference)').matches && 'IntersectionObserver' in window){
    document.body.classList.add('js');
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    var sayaclar = new WeakMap();
    document.querySelectorAll('.sec-head,.val,.ba,.paket,.step,.hikaye-in,.kurucu').forEach(function(el){
      var p = el.parentNode, i = sayaclar.get(p) || 0;
      sayaclar.set(p, i + 1);
      el.style.transitionDelay = (Math.min(i,5) * .11) + 's';
      el.classList.add('reveal'); io.observe(el);
      el.addEventListener('transitionend', function(){
        el.classList.remove('reveal'); el.style.transitionDelay = '';
      }, { once: true });
    });

    var pImgs = document.querySelectorAll('.band img,.hero-bg');
    if(pImgs.length){
      var tik = false;
      var paralaks = function(){
        tik = false;
        pImgs.forEach(function(im){
          var r = im.parentNode.getBoundingClientRect();
          if(r.bottom < 0 || r.top > innerHeight) return;
          var oran = (r.top + r.height/2 - innerHeight/2) / innerHeight;
          im.style.transform = 'translateY(' + (oran * -44).toFixed(1) + 'px)';
        });
      };
      addEventListener('scroll', function(){ if(!tik){ tik = true; requestAnimationFrame(paralaks); } }, {passive:true});
      paralaks();
    }

    if(matchMedia('(pointer:fine)').matches){
      document.querySelectorAll('.ba').forEach(function(kart){
        var view = kart.querySelector('.ba-view'), bekliyor = false;
        if(!view) return;
        kart.addEventListener('mousemove', function(ev){
          if(bekliyor) return;
          bekliyor = true;
          requestAnimationFrame(function(){
            var r = kart.getBoundingClientRect();
            var x = (ev.clientX - r.left) / r.width - .5;
            var y = (ev.clientY - r.top) / r.height - .5;
            view.style.transform = 'perspective(900px) rotateX(' + (-y*5).toFixed(2) + 'deg) rotateY(' + (x*5).toFixed(2) + 'deg)';
            bekliyor = false;
          });
        });
        kart.addEventListener('mouseleave', function(){ view.style.transform = ''; });
      });
    }

    var navEl = document.querySelector('nav');
    addEventListener('scroll', function(){ navEl.classList.toggle('scrolled', scrollY > 12); }, {passive:true});
  }

// Ölçüm: CTA tıklama olayları (GoatCounter, çerezsiz)
addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('a[href^="https://wa.me"],a[href^="mailto:"]');
  if(!a || !window.goatcounter || !window.goatcounter.count) return;
  var bolum = a.closest('section,header,nav,footer');
  var yer = bolum ? (bolum.id || (bolum.className || '').split(' ')[0] || bolum.tagName.toLowerCase()) : 'sayfa';
  var tur = a.href.indexOf('mailto:') === 0 ? 'eposta' : 'whatsapp';
  window.goatcounter.count({ path: 'cta-' + tur + '-' + yer, title: 'CTA: ' + tur + ' (' + yer + ')', event: true });
});
