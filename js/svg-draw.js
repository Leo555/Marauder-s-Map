/**
 * svg-draw.js — SVG 手绘风格绘图工具函数
 * 提供 wobble 线条、房间、塔楼、楼梯、走廊、门道、边框、指南针等绘制能力
 */

// 手绘抖动坐标
export function W(x, y) {
  return `${(x + (Math.random() - 0.5) * 2.5).toFixed(1)},${(y + (Math.random() - 0.5) * 2.5).toFixed(1)}`;
}

// SVG 元素创建器
export function S(tag, attrs, parent) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  if (parent) parent.appendChild(el);
  return el;
}

// 手绘矩形房间
export function drawRoom(svg, x, y, w, h, opts = {}) {
  const { thick = false, delay = 0, fill = true } = opts;
  const g = S('g', {}, svg);
  if (fill) {
    const c = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]
      .map(([a, b]) => `${a + (Math.random() - 0.5) * 1.5},${b + (Math.random() - 0.5) * 1.5}`);
    S('polygon', { points: c.join(' '), class: 'rf' }, g);
  }
  const p = [], seg = 6;
  for (let i = 0; i <= seg; i++) p.push(W(x + w * i / seg, y));
  for (let i = 1; i <= seg; i++) p.push(W(x + w, y + h * i / seg));
  for (let i = 1; i <= seg; i++) p.push(W(x + w - w * i / seg, y + h));
  for (let i = 1; i <= seg; i++) p.push(W(x, y + h - h * i / seg));
  S('path', {
    d: `M ${p[0]} ` + p.slice(1).map(t => `L ${t}`).join(' ') + ' Z',
    class: thick ? 'rpt' : 'rp',
    style: `animation-delay:${delay}s`
  }, g);
  return g;
}

// 手绘圆形塔楼
export function drawTower(svg, cx, cy, r, opts = {}) {
  const { delay = 0, thick = false } = opts;
  const g = S('g', {}, svg), pts = 24, d = [];
  S('circle', { cx, cy, r: r - 1, class: 'rf' }, g);
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * Math.PI * 2, wr = r + (Math.random() - 0.5) * 3;
    d.push(`${i === 0 ? 'M' : 'L'} ${(cx + Math.cos(a) * wr).toFixed(1)},${(cy + Math.sin(a) * wr).toFixed(1)}`);
  }
  d.push('Z');
  S('path', { d: d.join(' '), class: thick ? 'rpt' : 'rp', style: `animation-delay:${delay}s` }, g);
  return g;
}

// 楼梯纹
export function drawStairs(svg, x, y, w, h, n, delay) {
  const g = S('g', { style: `opacity:0;animation:ikf 2s ease ${delay}s forwards` }, svg);
  for (let i = 0; i < n; i++) {
    const sy = y + h * (i / n);
    S('line', {
      x1: x + w * 0.1 + (Math.random() - 0.5), y1: sy + (Math.random() - 0.5),
      x2: x + w * 0.9 + (Math.random() - 0.5), y2: sy + (Math.random() - 0.5),
      class: 'sm'
    }, g);
  }
  S('path', { d: `M ${W(x, y)} L ${W(x + w, y)} L ${W(x + w, y + h)} L ${W(x, y + h)} Z`, class: 'rp', 'stroke-dasharray': '4 3' }, g);
  return g;
}

// 走廊
export function drawCorridor(svg, x, y, w, h, delay) {
  const g = S('g', {}, svg), p = [], seg = Math.max(4, Math.floor(w / 30));
  for (let i = 0; i <= seg; i++) p.push(W(x + w * i / seg, y));
  for (let i = seg; i >= 0; i--) p.push(W(x + w * i / seg, y + h));
  S('path', {
    d: `M ${p[0]} ` + p.slice(1).map(t => `L ${t}`).join(' ') + ' Z',
    class: 'rp', style: `animation-delay:${delay}s;stroke-width:1.5;stroke-dasharray:6 3`
  }, g);
  return g;
}

// 门道拱形
export function drawDoor(svg, x, y, w, h, side, pos, delay) {
  const g = S('g', {}, svg);
  let dx, dy, r = 8;
  if (side === 'top') { dx = x + w * pos; dy = y; }
  else if (side === 'bottom') { dx = x + w * pos; dy = y + h; }
  else if (side === 'left') { dx = x; dy = y + h * pos; }
  else { dx = x + w; dy = y + h * pos; }
  const arc = (side === 'top' || side === 'left') ? 1 : -1;
  S('path', {
    d: side === 'top' || side === 'bottom'
      ? `M ${dx - r},${dy} A ${r},${r} 0 0 ${arc > 0 ? 1 : 0} ${dx + r},${dy}`
      : `M ${dx},${dy - r} A ${r},${r} 0 0 ${arc > 0 ? 1 : 0} ${dx},${dy + r}`,
    class: 'da',
    style: `animation-delay:${delay + 0.3}s;opacity:0;animation:ikf 1.5s ease forwards`
  }, g);
  return g;
}

// 不规则多边形房间（传入顶点数组 [[x,y], ...]）
export function drawPoly(svg, points, opts = {}) {
  const { thick = false, delay = 0, fill = true } = opts;
  const g = S('g', {}, svg);
  if (fill) {
    const fp = points.map(([x, y]) => `${x + (Math.random() - 0.5) * 1.5},${y + (Math.random() - 0.5) * 1.5}`);
    S('polygon', { points: fp.join(' '), class: 'rf' }, g);
  }
  // 在每条边上加入中间抖动点
  const p = [];
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    p.push(W(x1, y1));
    // 边的中点加抖动
    p.push(W((x1 + x2) / 2, (y1 + y2) / 2));
  }
  S('path', {
    d: `M ${p[0]} ` + p.slice(1).map(t => `L ${t}`).join(' ') + ' Z',
    class: thick ? 'rpt' : 'rp',
    style: `animation-delay:${delay}s`
  }, g);
  return g;
}

// 弯曲走廊（传入路径控制点 [[x,y], ...] 和宽度）
export function drawCurvedCorridor(svg, pathPoints, width, delay) {
  const g = S('g', {}, svg);
  const hw = width / 2;
  // 生成上下两条边
  const upper = [], lower = [];
  for (let i = 0; i < pathPoints.length; i++) {
    const [px, py] = pathPoints[i];
    let nx, ny;
    if (i < pathPoints.length - 1) {
      nx = pathPoints[i + 1][0] - px;
      ny = pathPoints[i + 1][1] - py;
    } else {
      nx = px - pathPoints[i - 1][0];
      ny = py - pathPoints[i - 1][1];
    }
    const len = Math.sqrt(nx * nx + ny * ny) || 1;
    const perpX = -ny / len * hw, perpY = nx / len * hw;
    upper.push(W(px + perpX, py + perpY));
    lower.unshift(W(px - perpX, py - perpY));
  }
  const allPts = [...upper, ...lower];
  S('path', {
    d: `M ${allPts[0]} ` + allPts.slice(1).map(t => `L ${t}`).join(' ') + ' Z',
    class: 'rp',
    style: `animation-delay:${delay}s;stroke-width:1.2`
  }, g);
  return g;
}

// L型房间（两个相连的矩形）
export function drawLRoom(svg, x, y, w1, h1, w2, h2, corner, opts = {}) {
  const { thick = false, delay = 0 } = opts;
  let pts;
  if (corner === 'bl') { // 左下角缺口
    pts = [[x, y], [x + w1, y], [x + w1, y + h1], [x + w2, y + h1], [x + w2, y + h2], [x, y + h2]];
  } else if (corner === 'br') { // 右下角缺口
    pts = [[x, y], [x + w1, y], [x + w1, y + h2], [x + w1 - w2, y + h2], [x + w1 - w2, y + h1], [x, y + h1]];
  } else if (corner === 'tl') { // 左上角缺口
    pts = [[x + w2, y], [x + w1, y], [x + w1, y + h2], [x, y + h2], [x, y + h1], [x + w2, y + h1]];
  } else { // tr 右上角缺口
    pts = [[x, y], [x + w1 - w2, y], [x + w1 - w2, y + h1], [x + w1, y + h1], [x + w1, y + h2], [x, y + h2]];
  }
  return drawPoly(svg, pts, { thick, delay, fill: true });
}
export function addLabel(svg, x, y, text, cls, delay) {
  const t = S('text', { x, y, class: cls, style: `animation-delay:${delay}s`, 'text-anchor': 'middle' }, svg);
  t.textContent = text;
  return t;
}

// 华丽边框
export function drawBorder(svg, x, y, w, h, delay) {
  const g = S('g', { style: `opacity:0;animation:ikf 3s ease ${delay}s forwards` }, svg), f = 40;
  [{ cx: x, cy: y, dx: 1, dy: 1 }, { cx: x + w, cy: y, dx: -1, dy: 1 },
   { cx: x, cy: y + h, dx: 1, dy: -1 }, { cx: x + w, cy: y + h, dx: -1, dy: -1 }]
    .forEach(({ cx, cy, dx, dy }) => {
      S('path', { d: `M ${cx},${cy} C ${cx + dx * f * 0.5},${cy} ${cx + dx * f},${cy + dy * f * 0.3} ${cx + dx * f},${cy + dy * f * 0.6}`, class: 'dl', 'stroke-width': '1.2' }, g);
      S('path', { d: `M ${cx},${cy} C ${cx},${cy + dy * f * 0.5} ${cx + dx * f * 0.3},${cy + dy * f} ${cx + dx * f * 0.6},${cy + dy * f}`, class: 'dl', 'stroke-width': '1.2' }, g);
      S('circle', { cx: cx + dx * 5, cy: cy + dy * 5, r: 2, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.8, opacity: 0.4 }, g);
    });
  S('rect', { x: x + 8, y: y + 8, width: w - 16, height: h - 16, rx: 2, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.6, opacity: 0.3 }, g);
  S('rect', { x: x + 12, y: y + 12, width: w - 24, height: h - 24, rx: 2, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.4, opacity: 0.2 }, g);
  return g;
}

// 指南针
export function drawCompass(svg, cx, cy, sz, delay) {
  const g = S('g', { style: `opacity:0;animation:ikf 3s ease ${delay}s forwards` }, svg);
  let d = [];
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * Math.PI * 2, r = sz + (Math.random() - 0.5) * 2;
    d.push(`${i === 0 ? 'M' : 'L'} ${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  S('path', { d: d.join(' ') + ' Z', class: 'dl', 'stroke-width': '1' }, g);
  d = [];
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * Math.PI * 2, r = sz * 0.6 + (Math.random() - 0.5) * 1.5;
    d.push(`${i === 0 ? 'M' : 'L'} ${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  S('path', { d: d.join(' ') + ' Z', class: 'dl', 'stroke-width': '.8' }, g);
  [{ a: -Math.PI / 2, l: 'N', len: sz * 1.4 }, { a: Math.PI / 2, l: 'S', len: sz * 1.2 },
   { a: 0, l: 'E', len: sz * 1.2 }, { a: Math.PI, l: 'W', len: sz * 1.2 }]
    .forEach(({ a, l, len }) => {
      const tx = cx + Math.cos(a) * len, ty = cy + Math.sin(a) * len;
      const pa = a + Math.PI / 2, sl = sz * 0.15;
      const mx = cx + Math.cos(a) * sz * 0.3, my = cy + Math.sin(a) * sz * 0.3;
      S('path', {
        d: `M ${tx.toFixed(1)},${ty.toFixed(1)} L ${(mx + Math.cos(pa) * sl).toFixed(1)},${(my + Math.sin(pa) * sl).toFixed(1)} L ${cx},${cy} L ${(mx - Math.cos(pa) * sl).toFixed(1)},${(my - Math.sin(pa) * sl).toFixed(1)} Z`,
        fill: l === 'N' ? '#5a3a1a' : 'none', stroke: '#5a3a1a', 'stroke-width': 0.8, opacity: 0.5
      }, g);
      S('text', {
        x: cx + Math.cos(a) * (len + 12), y: cy + Math.sin(a) * (len + 12) + 4,
        'text-anchor': 'middle', 'font-family': "'Cinzel',serif", 'font-size': '10',
        fill: '#5a3a1a', opacity: '.6'
      }, g).textContent = l;
    });
  return g;
}

// ===== 学院装饰 =====

const HOUSE_COLORS = {
  gryffindor: { primary: '#740001', secondary: '#d3a625', name: 'GRYFFINDOR' },
  slytherin:  { primary: '#1a472a', secondary: '#aaaaaa', name: 'SLYTHERIN' },
  ravenclaw:  { primary: '#0e1a40', secondary: '#946b2d', name: 'RAVENCLAW' },
  hufflepuff: { primary: '#ecb939', secondary: '#372e29', name: 'HUFFLEPUFF' },
};

/** 绘制学院盾形徽章 + 动物符号 + 光晕 */
export function drawHouseCrest(svg, cx, cy, house, size, delay) {
  const c = HOUSE_COLORS[house];
  if (!c) return;
  const g = S('g', { style: `opacity:0;animation:ikf 2.5s ease ${delay}s forwards` }, svg);
  const s = size;

  // 光晕
  S('circle', { cx, cy, r: s * 2.5, fill: c.primary, opacity: 0.1 }, g);
  S('circle', { cx, cy, r: s * 1.8, fill: c.primary, opacity: 0.15 }, g);

  // 盾形
  const sd = `M ${cx},${cy - s} Q ${cx + s * 0.95},${cy - s * 0.8} ${cx + s},${cy - s * 0.15} Q ${cx + s * 0.85},${cy + s * 0.55} ${cx},${cy + s} Q ${cx - s * 0.85},${cy + s * 0.55} ${cx - s},${cy - s * 0.15} Q ${cx - s * 0.95},${cy - s * 0.8} ${cx},${cy - s} Z`;
  S('path', { d: sd, fill: c.primary, opacity: 0.25, stroke: c.primary, 'stroke-width': 1.8 }, g);
  S('path', { d: sd, fill: 'none', stroke: c.secondary, 'stroke-width': 1, opacity: 0.8 }, g);

  // 盾内横线（分区装饰）
  S('line', { x1: cx - s * 0.6, y1: cy - s * 0.1, x2: cx + s * 0.6, y2: cy - s * 0.1, stroke: c.secondary, 'stroke-width': 0.6, opacity: 0.5 }, g);

  // 动物符号（简化几何图形）
  drawHouseAnimal(g, cx, cy + s * 0.15, house, s * 0.4, c);

  // 学院名
  S('text', { x: cx, y: cy + s + 16, 'text-anchor': 'middle', 'font-family': "'Cinzel',serif", 'font-size': '9', 'letter-spacing': '3', fill: c.primary, opacity: 0.8, 'font-weight': 'bold' }, g).textContent = c.name;

  return g;
}

function drawHouseAnimal(parent, cx, cy, house, size, colors) {
  const s = size;
  if (house === 'gryffindor') {
    // 狮子：鬃毛 + 头 + 尾巴
    S('circle', { cx, cy, r: s * 0.7, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.8, opacity: 0.8 }, parent);
    S('circle', { cx, cy, r: s * 0.4, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.6, opacity: 0.6 }, parent);
    // 眼睛
    S('circle', { cx: cx - s * 0.15, cy: cy - s * 0.1, r: 1.5, fill: colors.secondary, opacity: 0.8 }, parent);
    S('circle', { cx: cx + s * 0.15, cy: cy - s * 0.1, r: 1.5, fill: colors.secondary, opacity: 0.8 }, parent);
    // 尾巴
    S('path', { d: `M ${cx + s * 0.4},${cy + s * 0.2} Q ${cx + s * 0.8},${cy - s * 0.3} ${cx + s * 0.6},${cy - s * 0.6}`, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.7, opacity: 0.7 }, parent);
  } else if (house === 'slytherin') {
    // 蛇：蜿蜒的S形
    S('path', { d: `M ${cx - s * 0.5},${cy - s * 0.4} Q ${cx - s * 0.1},${cy - s * 0.7} ${cx + s * 0.2},${cy - s * 0.3} Q ${cx + s * 0.5},${cy + s * 0.1} ${cx + s * 0.1},${cy + s * 0.4} Q ${cx - s * 0.3},${cy + s * 0.7} ${cx - s * 0.5},${cy + s * 0.4}`, fill: 'none', stroke: colors.secondary, 'stroke-width': 1, opacity: 0.8 }, parent);
    // 蛇头
    S('circle', { cx: cx - s * 0.5, cy: cy - s * 0.4, r: 2.5, fill: colors.secondary, opacity: 0.7 }, parent);
    // 舌头
    S('path', { d: `M ${cx - s * 0.5},${cy - s * 0.4} L ${cx - s * 0.7},${cy - s * 0.55} M ${cx - s * 0.5},${cy - s * 0.4} L ${cx - s * 0.6},${cy - s * 0.6}`, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.5, opacity: 0.7 }, parent);
  } else if (house === 'ravenclaw') {
    // 鹰：展翅
    S('path', { d: `M ${cx},${cy - s * 0.1} L ${cx - s * 0.7},${cy - s * 0.5} Q ${cx - s * 0.4},${cy - s * 0.2} ${cx},${cy - s * 0.1} Q ${cx + s * 0.4},${cy - s * 0.2} ${cx + s * 0.7},${cy - s * 0.5} L ${cx},${cy - s * 0.1}`, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.8, opacity: 0.8 }, parent);
    // 身体
    S('path', { d: `M ${cx},${cy - s * 0.1} L ${cx},${cy + s * 0.5}`, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.7, opacity: 0.7 }, parent);
    // 头
    S('circle', { cx, cy: cy - s * 0.25, r: 2, fill: colors.secondary, opacity: 0.8 }, parent);
    // 尾羽
    S('path', { d: `M ${cx - s * 0.15},${cy + s * 0.5} L ${cx},${cy + s * 0.7} L ${cx + s * 0.15},${cy + s * 0.5}`, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.6, opacity: 0.7 }, parent);
  } else if (house === 'hufflepuff') {
    // 獾：圆润身体 + 条纹脸
    S('ellipse', { cx, cy, rx: s * 0.5, ry: s * 0.35, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.8, opacity: 0.8 }, parent);
    // 脸部条纹
    S('line', { x1: cx - s * 0.15, y1: cy - s * 0.35, x2: cx - s * 0.15, y2: cy + s * 0.1, stroke: colors.secondary, 'stroke-width': 0.5, opacity: 0.7 }, parent);
    S('line', { x1: cx + s * 0.15, y1: cy - s * 0.35, x2: cx + s * 0.15, y2: cy + s * 0.1, stroke: colors.secondary, 'stroke-width': 0.5, opacity: 0.7 }, parent);
    // 耳朵
    S('circle', { cx: cx - s * 0.35, cy: cy - s * 0.25, r: 2.5, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.6, opacity: 0.7 }, parent);
    S('circle', { cx: cx + s * 0.35, cy: cy - s * 0.25, r: 2.5, fill: 'none', stroke: colors.secondary, 'stroke-width': 0.6, opacity: 0.7 }, parent);
    // 眼睛
    S('circle', { cx: cx - s * 0.12, cy: cy - s * 0.08, r: 1.5, fill: colors.secondary, opacity: 0.8 }, parent);
    S('circle', { cx: cx + s * 0.12, cy: cy - s * 0.08, r: 1.5, fill: colors.secondary, opacity: 0.8 }, parent);
  }
}

/** 学院色圆形光晕边框 */
export function drawHouseGlow(svg, cx, cy, radius, house, delay) {
  const c = HOUSE_COLORS[house];
  if (!c) return;
  const g = S('g', { style: `opacity:0;animation:ikf 3s ease ${delay}s forwards` }, svg);
  for (let i = 3; i >= 1; i--) {
    S('circle', { cx, cy, r: radius + i * 14, fill: 'none', stroke: c.primary, 'stroke-width': 0.6, opacity: 0.12 * i }, g);
  }
  S('circle', { cx, cy, r: radius + 6, fill: 'none', stroke: c.secondary, 'stroke-width': 0.8, 'stroke-dasharray': '4 6', opacity: 0.45 }, g);
  return g;
}
