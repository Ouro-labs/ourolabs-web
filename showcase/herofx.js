// Home hero: the horizon light breathes and faint glints drift on the water. Nothing else moves.

const PALETTE = [[156, 134, 255], [228, 138, 176], [95, 194, 201], [201, 198, 106]];
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export const heroFx = () => '<div class="hero-fx" aria-hidden="true"><canvas></canvas></div>';

let stop = () => {};

export function mountHeroFx(root) {
  stop();
  stop = () => {};
  const host = root.querySelector('.hero-fx');
  if (host && !reduced()) stop = horizon(host);
}

// Run a frame loop only while the hero is on screen and the tab is visible.
function loop(host, frame) {
  let raf = 0, visible = true;
  const tick = now => { frame(now); raf = requestAnimationFrame(tick); };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
  const sync = () => { cancelAnimationFrame(raf); raf = 0; if (visible && !document.hidden) raf = requestAnimationFrame(tick); };
  io.observe(host);
  document.addEventListener('visibilitychange', sync);
  sync();
  return () => { cancelAnimationFrame(raf); io.disconnect(); document.removeEventListener('visibilitychange', sync); };
}

function horizon(host) {
  const canvas = host.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  const size = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = host.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const ro = new ResizeObserver(size); ro.observe(host); size();

  // A soft band of the horizon's own colours, drawn with a slowly changing alpha and a slight drift.
  const band = (() => {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 64;
    const g = cv.getContext('2d');
    const h = g.createLinearGradient(0, 0, 512, 0);
    h.addColorStop(0, 'rgba(110,90,200,0)'); h.addColorStop(0.18, 'rgba(140,120,230,1)'); h.addColorStop(0.5, 'rgba(90,180,190,1)'); h.addColorStop(0.82, 'rgba(200,190,110,1)'); h.addColorStop(1, 'rgba(150,150,70,0)');
    g.fillStyle = h; g.fillRect(0, 0, 512, 64);
    g.globalCompositeOperation = 'destination-in';
    const v = g.createLinearGradient(0, 0, 0, 64);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(0.5, 'rgba(0,0,0,1)'); v.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = v; g.fillRect(0, 0, 512, 64);
    return cv;
  })();

  // Glints on the water: short horizontal lines below the horizon that drift and fade.
  const sprites = PALETTE.map(c => {
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 4;
    const g = cv.getContext('2d'), lin = g.createLinearGradient(0, 0, 256, 0);
    const lit = c.map(v => Math.round(v + (255 - v) * 0.5));
    lin.addColorStop(0, 'rgba(' + lit + ',0)'); lin.addColorStop(0.5, 'rgba(' + lit + ',1)'); lin.addColorStop(1, 'rgba(' + lit + ',0)');
    g.fillStyle = lin; g.fillRect(0, 0, 256, 4);
    return cv;
  });
  const glints = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), len: 0.02 + Math.random() * 0.07, sp: (Math.random() - 0.5) * 0.000004, ph: Math.random() * 6.28, per: 5000 + Math.random() * 7000 }));

  const draw = now => {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.05 + 0.05 * (Math.sin(now / 18000 * 6.283) + 1) / 2;
    ctx.drawImage(band, -W * 0.05 + Math.sin(now / 23000 * 6.283) * W * 0.012, H * 0.43, W * 1.1, H * 0.1);
    const top = H * 0.475, depth = H * 0.3;
    for (const g of glints) {
      const life = (Math.sin(now / g.per * 6.283 + g.ph) + 1) / 2;
      if (life < 0.25) continue;
      const yy = top + Math.pow(g.y, 1.6) * depth;
      const persp = 0.35 + (yy - top) / depth;
      const x = ((g.x + now * g.sp) % 1 + 1) % 1 * W;
      const l = g.len * W * persp;
      ctx.globalAlpha = (life - 0.25) / 0.75 * 0.09 * (1.1 - persp * 0.4);
      ctx.drawImage(sprites[Math.min(3, Math.floor(x / W * 4))], x - l / 2, yy, l, 1 + persp);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  };

  const end = loop(host, draw);
  return () => { end(); ro.disconnect(); };
}

