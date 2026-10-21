// Scena interaktywna z konceptu Landing v2: róża kompasu, celownik, ślad kursora,
// odczyt współrzędnych i paralaksa. Ruch wyłącznie jako odpowiedź na działanie użytkownika.
// Uruchamiana tylko na urządzeniach z precyzyjnym wskaźnikiem i bez preferencji ograniczenia ruchu.

const fmt = (v: number, hemi: string) => {
  const deg = Math.floor(v);
  const min = Math.round((v - deg) * 60);
  return `${String(deg).padStart(2, '0')}°${String(min).padStart(2, '0')}′${hemi}`;
};

function trail(scene: HTMLElement, cv: HTMLCanvasElement) {
  const ink = cv.dataset.ink || '46,110,133';
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const pts: { x: number; y: number; t: number }[] = [];
  const MAX = 7;
  const LIFE = 1600;
  const STEP = 54;
  let raf = 0;

  const size = () => {
    const r = scene.getBoundingClientRect();
    const d = window.devicePixelRatio || 1;
    const w = Math.round(r.width * d);
    const h = Math.round(r.height * d);
    if (!w || !h) return;
    if (cv.width !== w || cv.height !== h) {
      cv.width = w;
      cv.height = h;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    }
  };
  new ResizeObserver(size).observe(scene);

  const draw = () => {
    const now = performance.now();
    while (pts.length && now - pts[0].t > LIFE) pts.shift();
    const r = scene.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const al = Math.max(0, 1 - (now - a.t) / LIFE) * 0.75;
      ctx.strokeStyle = `rgba(${ink},${al.toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    for (const p of pts) {
      const al = Math.max(0, 1 - (now - p.t) / LIFE);
      ctx.fillStyle = `rgba(${ink},${(al * 0.9).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = pts.length ? requestAnimationFrame(draw) : 0;
  };

  scene.addEventListener('pointermove', (e) => {
    const r = scene.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const last = pts[pts.length - 1];
    if (!last || Math.hypot(x - last.x, y - last.y) > STEP) {
      pts.push({ x, y, t: performance.now() });
      if (pts.length > MAX + 1) pts.shift();
      if (!raf) raf = requestAnimationFrame(draw);
    }
  });
  scene.addEventListener('pointerleave', () => {
    pts.length = 0;
  });
}

function wire(scene: HTMLElement) {
  const rose = scene.querySelector<HTMLElement>('[data-rose]');
  const cx = scene.querySelector<HTMLElement>('[data-cross-x]');
  const cy = scene.querySelector<HTMLElement>('[data-cross-y]');
  const readout = scene.querySelector<HTMLElement>('[data-readout]');
  const pars = Array.from(scene.querySelectorAll<HTMLElement>('[data-par]'));
  const canvas = scene.querySelector<HTMLCanvasElement>('[data-trail]');
  if (canvas) trail(scene, canvas);

  let raf = 0;
  let mx = 0;
  let my = 0;
  let rect = scene.getBoundingClientRect();

  const paint = () => {
    raf = 0;
    if (rose) rose.style.transform = `translate(${mx}px,${my}px)`;
    if (cx) cx.style.transform = `translateX(${mx}px)`;
    if (cy) cy.style.transform = `translateY(${my}px)`;
    for (const p of pars) {
      const d = parseFloat(p.dataset.depth || '8');
      const nx = (mx / rect.width - 0.5) * d;
      const ny = (my / rect.height - 0.5) * d * 0.6;
      p.style.transform = `translate3d(${nx.toFixed(2)}px,${ny.toFixed(2)}px,0)`;
    }
    if (readout) {
      const lat = 54 + (1 - my / rect.height) * 1.4;
      const lon = 18 + (mx / rect.width) * 1.6;
      const brg = Math.round((mx / rect.width) * 359);
      readout.textContent = `${fmt(lat, 'N')} ${fmt(lon, 'E')} — KURS ${String(brg).padStart(3, '0')}°`;
    }
  };

  scene.addEventListener('pointerenter', () => {
    rect = scene.getBoundingClientRect();
    scene.classList.add('is-tracking');
  });
  scene.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    rect = scene.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
    if (!raf) raf = requestAnimationFrame(paint);
  });
  scene.addEventListener('pointerleave', () => {
    scene.classList.remove('is-tracking');
    for (const p of pars) p.style.transform = '';
  });
}

export function initScenes() {
  const ok =
    window.matchMedia('(pointer: fine) and (hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!ok) return;
  document.querySelectorAll<HTMLElement>('[data-scene]').forEach((scene) => {
    if (scene.dataset.wired) return;
    scene.dataset.wired = '1';
    wire(scene);
  });
}
