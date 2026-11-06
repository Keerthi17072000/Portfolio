(() => {
  gsap.registerPlugin(ScrollTrigger);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('loading');

  /* ---------- smooth scroll (Lenis <-> ScrollTrigger) ---------- */
  let lenis;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      lenis ? lenis.scrollTo(t, { offset: 0, duration: 1.6 }) : t.scrollIntoView({ behavior: 'smooth' });
    })
  );

  /* ---------- text splitting ---------- */
  document.querySelectorAll('[data-split="chars"]').forEach(el => {
    const nodes = [...el.childNodes];
    el.textContent = '';
    nodes.forEach(n => {
      if (n.nodeType === 3) {
        [...n.textContent].forEach(c => {
          const s = document.createElement('span');
          s.className = 'char'; s.textContent = c; el.appendChild(s);
        });
      } else {
        const s = n.cloneNode(true); s.classList.add('char'); el.appendChild(s);
      }
    });
  });
  const about = document.getElementById('aboutText');
  about.innerHTML = about.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');

  // headline line-mask reveal helper: wrap each .reveal-lines in a mask
  document.querySelectorAll('.reveal-lines').forEach(h => {
    h.innerHTML = `<span class="line"><span class="rl" style="display:inline-block">${h.innerHTML}</span></span>`;
  });
  document.querySelectorAll('.contact__title .line > span').forEach(s => (s.style.display = 'inline-block'));

  /* ---------- cursor + magnetic ---------- */
  const cur = document.getElementById('cursor');
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const xTo = gsap.quickTo(cur, 'x', { duration: .35, ease: 'power3' });
    const yTo = gsap.quickTo(cur, 'y', { duration: .35, ease: 'power3' });
    addEventListener('mousemove', e => { xTo(e.clientX); yTo(e.clientY); });
    document.querySelectorAll('a,[data-magnetic],.card,.proj').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cur.classList.remove('is-hover'));
    });
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      const mx = gsap.quickTo(el, 'x', { duration: .5, ease: 'elastic.out(1,.5)' });
      const my = gsap.quickTo(el, 'y', { duration: .5, ease: 'elastic.out(1,.5)' });
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * .3);
        my((e.clientY - r.top - r.height / 2) * .3);
      });
      el.addEventListener('mouseleave', () => { mx(0); my(0); });
    });
  }

  /* ---------- counters ---------- */
  const countUp = el => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '';
    const o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: () => (el.textContent = Math.round(o.v) + suf) });
  };

  /* ---------- intro timeline ---------- */
  const intro = () => {
    document.body.classList.remove('loading');
    lenis && lenis.start();
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero__title .char', { yPercent: 120, rotate: 8, duration: 1.4, stagger: .04 })
      .from('.nav', { yPercent: -100, opacity: 0, duration: 1 }, 0.3)
      .from('.hero__meta > *', { y: 20, opacity: 0, duration: 1, stagger: .12 }, 0.5)
      .from('.hero__role, .hero__scroll', { y: 30, opacity: 0, duration: 1.1, stagger: .1 }, 0.7)
      .add(() => countUp(document.querySelector('.hero__stat b')), 0.8)
      .from('.hero__stat', { y: 30, opacity: 0, duration: 1.1 }, 0.8);
    setupScroll();
  };

  /* ---------- loader ---------- */
  const num = document.getElementById('loadNum'), bar = document.getElementById('loadBar');
  const lo = { v: 0 };
  const loadTL = gsap.timeline();
  loadTL.to(lo, { v: 100, duration: 1.8, ease: 'power2.inOut',
      onUpdate: () => { num.textContent = Math.round(lo.v); bar.style.width = lo.v + '%'; } })
    .to('.loader__count, .loader__name', { opacity: 0, y: -40, duration: .5, ease: 'power2.in' })
    .to('#loader', { yPercent: -100, duration: 1, ease: 'expo.inOut' })
    .add(intro, '-=0.6')
    .set('#loader', { display: 'none' });

  /* ---------- scroll animations ---------- */
  function setupScroll() {
    // progress bar
    gsap.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.2, start: 0, end: 'max' } });

    // nav hide/show
    const nav = document.getElementById('nav');
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: s => {
        nav.classList.toggle('is-solid', s.scroll() > 80);
        nav.classList.toggle('is-hidden', s.direction === 1 && s.scroll() > 400);
      }
    });

    // hero parallax / fade
    gsap.to('.hero__title', { yPercent: -18, scale: .94, opacity: .2, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.orb1', { y: 200, x: -80, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' } });
    gsap.to('.orb2', { y: -160, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' } });

    // marquee: speed reacts to scroll direction/velocity
    const track = document.querySelector('.marquee__track');
    const mq = gsap.to(track, { xPercent: -50, repeat: -1, duration: 28, ease: 'none' });
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: s => {
        const v = gsap.utils.clamp(-6, 6, s.getVelocity() / 300);
        gsap.to(mq, { timeScale: (s.direction === 1 ? 1 : -1) * (1 + Math.abs(v)), duration: .3, overwrite: true });
        gsap.to(mq, { timeScale: s.direction === 1 ? 1 : -1, duration: 1.2, delay: .3 });
      }
    });

    // about: scrubbed word-by-word reveal
    gsap.to('.about__text .w', { opacity: 1, stagger: .1, ease: 'none',
      scrollTrigger: { trigger: '.about__text', start: 'top 80%', end: 'bottom 45%', scrub: true } });
    gsap.from('.fact', { y: 60, opacity: 0, duration: 1, stagger: .12, ease: 'expo.out',
      scrollTrigger: { trigger: '.about__facts', start: 'top 85%' } });
    document.querySelectorAll('.fact b[data-count]').forEach(b =>
      ScrollTrigger.create({ trigger: b, start: 'top 90%', once: true, onEnter: () => countUp(b) }));

    // section labels + big headlines (masked slide-up)
    gsap.utils.toArray('.sec-label').forEach(l =>
      gsap.from(l, { x: -30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 90%' } }));
    gsap.utils.toArray('.reveal-lines .rl').forEach(el =>
      gsap.from(el, { yPercent: 115, rotate: 3, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));

    // skill cards stagger with tilt
    gsap.from('.skill', { y: 120, opacity: 0, rotateX: -15, transformOrigin: '50% 100%', duration: 1.2, stagger: .12, ease: 'expo.out',
      scrollTrigger: { trigger: '.skills__grid', start: 'top 85%' } });
    gsap.utils.toArray('.skill li').forEach(li => null);
    gsap.from('.skill li', { x: -20, opacity: 0, duration: .8, stagger: .04, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills__grid', start: 'top 70%' } });

    // projects: pinned horizontal scroll (desktop) / vertical reveal (mobile)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (min-height: 621px)', () => {
      const trackEl = document.getElementById('workTrack');
      const dist = () => trackEl.scrollWidth - innerWidth + 40;
      const h = gsap.to(trackEl, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.work__pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true } });
      gsap.utils.toArray('.proj:not(.proj--end)').forEach(p => {
        gsap.from(p.querySelector('.proj__visual b'), { xPercent: 40, rotate: 10, ease: 'none',
          scrollTrigger: { trigger: p, containerAnimation: h, start: 'left 100%', end: 'right 30%', scrub: true } });
        gsap.from(p, { scale: .88, opacity: .4, ease: 'none',
          scrollTrigger: { trigger: p, containerAnimation: h, start: 'left 110%', end: 'left 60%', scrub: true } });
      });
      gsap.from('.work__head', { y: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.work', start: 'top 70%' } });
    });
    mm.add('(max-width: 900px), (max-height: 620px)', () => {
      gsap.utils.toArray('.proj').forEach(p =>
        gsap.from(p, { y: 80, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 88%' } }));
    });

    // experience: rail fill + line reveals
    gsap.to('#railFill', { scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.exp__wrap', start: 'top 60%', end: 'bottom 70%', scrub: true } });
    gsap.utils.toArray('.exp__list li').forEach(li => {
      gsap.from(li, { y: 50, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: li, start: 'top 88%' } });
      gsap.fromTo(li, { color: '#6b6b70' }, { color: '#f2f0ea', ease: 'none',
        scrollTrigger: { trigger: li, start: 'top 85%', end: 'top 50%', scrub: true } });
    });
    gsap.from('.exp__meta', { x: -40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.exp__meta', start: 'top 85%' } });

    // education
    gsap.from('.edu__card', { y: 100, opacity: 0, scale: .94, duration: 1.2, stagger: .18, ease: 'expo.out',
      scrollTrigger: { trigger: '.edu__grid', start: 'top 85%' } });

    // contact
    gsap.from('.contact__title .line > span', { yPercent: 110, duration: 1.4, stagger: .15, ease: 'expo.out',
      scrollTrigger: { trigger: '.contact__title', start: 'top 85%' } });
    gsap.from('.btn', { y: 40, opacity: 0, duration: 1, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: '.contact__links', start: 'top 90%' } });
    gsap.from('.contact__ghost', { yPercent: 40, ease: 'none',
      scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom bottom', scrub: true } });
    gsap.from('.contact', { borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: 'none',
      scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 50%', scrub: true } });

    ScrollTrigger.refresh();
  }

  addEventListener('load', () => ScrollTrigger.refresh());
})();
