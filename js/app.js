/**
 * app.js — 主程序入口
 * 地图控制、角色移动动画、信息卡片、事件绑定
 */

import { FLOOR_DRAW } from './floors.js?v=1.13';
import { CHARS, AVATARS } from './characters.js?v=1.13';
import { ROOM_BOUNDS } from '../data/rooms.js?v=1.13';
import { pickRandom, getResponse } from './chat.js?v=1.13';
import { startMusic, stopMusic, toggleMusic, isMusicPlaying } from './music.js?v=1.13';

// ===== 全局状态 =====
let curFloor = 1;
let mapOpen = false;
let selChar = null;
let raf = null;

// ===== 咒语验证 =====
function castSpell() {
  const v = document.getElementById('si').value.trim().toLowerCase();
  if (!v) {
    document.getElementById('serr').textContent = '你需要说出正确的咒语...';
    setTimeout(() => document.getElementById('serr').textContent = '', 3000);
    return;
  }
  if (v.includes('solemnly') || v.includes('swear') || v.includes('宣誓') || v.includes('好事') || v.includes('no good')) {
    openMap();
  } else {
    document.getElementById('serr').textContent = '"这张羊皮纸只是一张羊皮纸" — 纸上缓缓浮现字迹';
    setTimeout(() => document.getElementById('serr').textContent = '', 3000);
  }
}

// ===== 开启地图 =====
function openMap() {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const s = document.createElement('div');
      s.className = 'mp';
      s.style.left = Math.random() * innerWidth + 'px';
      s.style.top = Math.random() * innerHeight + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1500);
    }, i * 50);
  }
  setTimeout(() => {
    document.getElementById('opening-screen').classList.add('fade-out');
    document.getElementById('mc').classList.add('visible');
    document.getElementById('fn').style.display = 'flex';
    document.getElementById('cmb').style.display = 'block';
    document.getElementById('mm').style.display = 'block';
    document.getElementById('music-btn').style.display = 'flex';
    mapOpen = true;
    startMusic();
    updateMusicBtn();
    renderFloor(curFloor);
    startMove();
    updateMM();
    const c = document.getElementById('mc');
    c.scrollLeft = (2000 - c.clientWidth) / 2;
    c.scrollTop = (1600 - c.clientHeight) / 2;
  }, 800);
}

// ===== 关闭地图 =====
function closeMap() {
  document.getElementById('mc').classList.remove('visible');
  document.getElementById('fn').style.display = 'none';
  document.getElementById('cmb').style.display = 'none';
  document.getElementById('mm').style.display = 'none';
  document.getElementById('music-btn').style.display = 'none';
  mapOpen = false;
  stopMusic();
  closeCard();
  setTimeout(() => {
    document.getElementById('opening-screen').classList.remove('fade-out');
    startTypeSpell();
  }, 1500);
}

// ===== 楼层渲染 =====
function renderFloor(f) {
  curFloor = f;
  document.querySelectorAll('.fb').forEach(b =>
    b.classList.toggle('active', parseInt(b.dataset.floor) === f));
  const svg = document.getElementById('svg-map');
  svg.innerHTML = '';
  document.getElementById('tl').innerHTML = '';
  FLOOR_DRAW[f](svg);
  renderChars(f);
}

function renderChars(f) {
  const cl = document.getElementById('cl');
  cl.innerHTML = '';
  CHARS.filter(c => c.f === f).forEach(c => {
    const el = document.createElement('div');
    el.className = 'ch';
    el.id = `c-${c.id}`;
    el.style.cssText = `left:${c.x}px;top:${c.y}px`;
    el.onclick = e => { e.stopPropagation(); showInfo(c.id); };
    el.innerHTML = `<div class="fps"><div class="fp l"><div class="t"></div><div class="t"></div><div class="t"></div></div><div class="fp r"><div class="t"></div><div class="t"></div><div class="t"></div></div></div><div class="cn">${c.cn}</div>`;
    cl.appendChild(el);
  });
}

function switchFloor(f) { closeCard(); renderFloor(f); }

// ===== 角色移动动画 =====
// 金色飞贼状态
const snitchState = {
  x: 450, y: 350, // 球场中心
  tx: 450, ty: 350,
  moving: false,
  pauseUntil: 0,
  cx: 450, cy: 350, // 球场椭圆中心
  rx: 180, ry: 115  // 球场椭圆半径
};

function moveSnitch() {
  const el = document.getElementById('golden-snitch');
  if (!el || curFloor !== 4) return;
  const s = snitchState;
  const now = Date.now();

  // 暂停状态：偶尔悬停一下
  if (now < s.pauseUntil) return;

  if (!s.moving) {
    // 在椭圆范围内随机选一个目标点
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 0.85 + 0.1; // 0.1~0.95 避免太靠边或中心
    s.tx = s.cx + Math.cos(angle) * s.rx * dist;
    s.ty = s.cy + Math.sin(angle) * s.ry * dist;
    s.moving = true;
  }

  const dx = s.tx - s.x;
  const dy = s.ty - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 5) {
    s.moving = false;
    // 随机暂停 200~1500ms（飞贼会短暂悬停）
    s.pauseUntil = now + Math.random() * 1300 + 200;
    return;
  }

  // 飞贼速度比角色快一点，且有轻微随机抖动
  const speed = 0.5 + Math.random() * 0.3;
  const jitterX = (Math.random() - 0.5) * 0.8;
  const jitterY = (Math.random() - 0.5) * 0.8;
  s.x += (dx / dist) * speed + jitterX;
  s.y += (dy / dist) * speed + jitterY;

  el.setAttribute('transform', `translate(${s.x.toFixed(1)}, ${s.y.toFixed(1)})`);
}

function startMove() {
  function step() {
    if (!mapOpen) return;
    CHARS.forEach(c => {
      if (c.f !== curFloor) return;
      const el = document.getElementById(`c-${c.id}`);
      if (!el) return;
      if (!c._m) c._m = { tx: c.x, ty: c.y, mv: false, pu: Date.now() + Math.random() * 5000 + 2000, st: false };
      const m = c._m, now = Date.now();
      if (now < m.pu) { if (!m.st) { el.classList.add('stopped'); m.st = true; } return; }
      if (!m.mv) {
        // 有自定义边界的角色只在边界内移动，否则在全楼层房间间移动
        let area;
        if (c.bounds) {
          area = c.bounds;
        } else {
          const rooms = ROOM_BOUNDS[c.f];
          if (!rooms || !rooms.length) return;
          area = rooms[Math.floor(Math.random() * rooms.length)];
        }
        m.tx = area.x + Math.random() * (area.w - 30) + 15;
        m.ty = area.y + Math.random() * (area.h - 30) + 15;
        m.mv = true; el.classList.remove('stopped'); m.st = false;
      }
      const dx = m.tx - c.x, dy = m.ty - c.y, dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) { m.mv = false; m.pu = now + Math.random() * 8000 + 3000; return; }
      const sp = 0.3;
      c.x += dx / dist * sp;
      c.y += dy / dist * sp;
      el.style.left = c.x + 'px';
      el.style.top = c.y + 'px';
      const ang = Math.atan2(dy, dx) * (180 / Math.PI) - 90;
      el.querySelector('.fps').style.transform = `rotate(${ang}deg)`;
      // 脚印轨迹
      if (Math.random() < 0.04) {
        const t = document.getElementById('tl');
        const p = document.createElement('div');
        p.className = 'tp';
        p.style.cssText = `left:${c.x + 14}px;top:${c.y + 19}px;transform:rotate(${ang}deg);opacity:.35`;
        t.appendChild(p);
        setTimeout(() => p.style.opacity = '0', 100);
        setTimeout(() => p.remove(), 3000);
      }
    });
    moveSnitch();
    updateMMDots();
    raf = requestAnimationFrame(step);
  }
  raf = requestAnimationFrame(step);
}

// ===== 角色自我介绍 =====

function closeIntroBubble() {
  const bubble = document.getElementById('intro-bubble');
  if (bubble) {
    bubble.classList.remove('ib-visible');
    clearTimeout(bubble._timer);
  }
}

function speakIntro(c) {
  if (!c.intro) return;

  // 创建气泡
  let bubble = document.getElementById('intro-bubble');
  if (!bubble) {
    bubble = document.createElement('div');
    bubble.id = 'intro-bubble';
    document.body.appendChild(bubble);
  }
  const av = AVATARS[c.id];
  const avHtml = av ? `<img class="ib-avatar" src="${av.img}" alt="${c.cn}" onerror="this.outerHTML='<span class=\\'ib-avatar ib-avatar-fallback\\'>${av.icon||'🧙'}</span>'">` : '';
  bubble.innerHTML = `<div class="ib-close">&times;</div>${avHtml}<div class="ib-name">${c.cn}</div><div class="ib-text">${c.intro}</div>`;
  bubble.querySelector('.ib-close').addEventListener('click', e => {
    e.stopPropagation();
    closeIntroBubble();
  });
  bubble.classList.remove('ib-visible');
  void bubble.offsetWidth; // 触发 reflow
  bubble.classList.add('ib-visible');


}

// ===== 角色信息卡片 =====
function showInfo(id) {
  const c = CHARS.find(ch => ch.id === id);
  if (!c) return;
  selChar = id;

  // 头像（优先使用电影剧照，失败时回退到 emoji）
  const av = document.getElementById('cavatar');
  const a = AVATARS[c.id];
  if (a) {
    av.style.background = a.bg;
    av.style.borderColor = a.color;
    if (a.img) {
      av.innerHTML = `<img src="${a.img}" alt="${c.cn}" onerror="this.parentElement.innerHTML='<span style=\\'font-size:22px;line-height:1\\'>${a.icon}</span>'">`;
    } else {
      av.innerHTML = `<span style="font-size:22px;line-height:1">${a.icon}</span>`;
    }
    // 头像点击 → 自我介绍
    av.style.cursor = 'pointer';
    av.title = '点击查看自我介绍';
    av.onclick = e => {
      e.stopPropagation();
      speakIntro(c);
    };
  }

  document.getElementById('cn').textContent = c.cn;
  const b = document.getElementById('ch');
  const hn = { gryffindor: '格兰芬多', slytherin: '斯莱特林', ravenclaw: '拉文克劳', hufflepuff: '赫奇帕奇', staff: '教职员工' };
  b.textContent = hn[c.h] || c.h;
  b.className = 'hb h' + c.h[0];

  document.getElementById('cloc').textContent = '在地图上移动中';
  document.getElementById('cact').textContent = `「${c.acts[Math.floor(Math.random() * c.acts.length)]}」`;
  document.getElementById('cms').innerHTML = '';

  // 卡片定位（桌面端浮在角色旁，移动端由CSS固定在底部）
  const card = document.getElementById('ic');
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    const cel = document.getElementById(`c-${id}`);
    if (cel) {
      const rect = cel.getBoundingClientRect();
      let cl = rect.right + 20, ct = rect.top - 50;
      if (cl + 360 > innerWidth) cl = rect.left - 370;
      if (ct + 400 > innerHeight) ct = innerHeight - 420;
      if (ct < 10) ct = 10;
      card.style.left = cl + 'px';
      card.style.top = ct + 'px';
    }
  }
  card.classList.add('visible');

  // 打招呼
  setTimeout(() => {
    const greetTopic = c.topics.find(t => t.greet);
    const greeting = greetTopic ? pickRandom(greetTopic.r, c.id) : pickRandom(c._, c.id);
    addMsg(c.cn, greeting, false);
  }, 400);
}

function closeCard() {
  document.getElementById('ic').classList.remove('visible');
  selChar = null;
  const bubble = document.getElementById('intro-bubble');
  if (bubble) { bubble.classList.remove('ib-visible'); clearTimeout(bubble._timer); }
}

// ===== 聊天 =====
function sendChat() {
  const inp = document.getElementById('ci');
  const txt = inp.value.trim();
  if (!txt || !selChar) return;
  const c = CHARS.find(ch => ch.id === selChar);
  if (!c) return;
  addMsg('你', txt, true);
  inp.value = '';

  // 打字指示器
  const dots = document.createElement('div');
  dots.className = 'cm';
  dots.innerHTML = `<span class="s">${c.cn}:</span> <span class="tx" style="opacity:0.5">正在输入...</span>`;
  document.getElementById('cms').appendChild(dots);
  document.getElementById('cms').scrollTop = document.getElementById('cms').scrollHeight;

  const delay = 600 + Math.random() * 1000 + txt.length * 20;
  setTimeout(() => {
    dots.remove();
    const resp = getResponse(c, txt);
    addMsg(c.cn, resp, false);
  }, Math.min(delay, 2500));
}

function addMsg(sender, text, isUser) {
  const ct = document.getElementById('cms');
  const m = document.createElement('div');
  m.className = `cm${isUser ? ' u' : ''}`;
  m.innerHTML = `<span class="s">${sender}:</span> <span class="tx">${text}</span>`;
  ct.appendChild(m);
  ct.scrollTop = ct.scrollHeight;
}

// ===== 小地图 =====
function updateMM() {
  const c = document.getElementById('mc');
  const vp = document.getElementById('mmv');
  const mm = document.getElementById('mm');
  if (!mm || mm.style.display === 'none') return;
  const sx = 160 / 2000, sy = 130 / 1600;
  (function u() {
    if (!mapOpen) return;
    const vw = c.clientWidth * sx, vh = c.clientHeight * sy;
    const vx = c.scrollLeft * sx, vy = c.scrollTop * sy;
    vp.style.cssText = `left:${vx}px;top:${vy}px;width:${vw}px;height:${vh}px`;
    requestAnimationFrame(u);
  })();
}

function updateMMDots() {
  const mm = document.getElementById('mm');
  if (!mm || mm.style.display === 'none') return;
  const sx = 160 / 1400, sy = 130 / 900;
  const floorChars = CHARS.filter(c => c.f === curFloor);
  let dots = mm.querySelectorAll('.md');
  while (dots.length > floorChars.length) { dots[dots.length - 1].remove(); dots = mm.querySelectorAll('.md'); }
  while (dots.length < floorChars.length) { const d = document.createElement('div'); d.className = 'md'; mm.appendChild(d); dots = mm.querySelectorAll('.md'); }
  floorChars.forEach((c, i) => { dots[i].style.left = c.x * sx + 'px'; dots[i].style.top = c.y * sy + 'px'; });
}

// ===== 地图拖拽 =====
const mc = document.getElementById('mc');
let isDragging = false, hasDragged = false, dragStartX, dragStartY, scrollStartX, scrollStartY;

mc.addEventListener('mousedown', e => {
  if (e.target.closest('.ch') || e.target.closest('.ic')) return; // 不拦截角色点击和卡片
  isDragging = true;
  hasDragged = false;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  scrollStartX = mc.scrollLeft;
  scrollStartY = mc.scrollTop;
  mc.style.cursor = 'grabbing';
  e.preventDefault();
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX, dy = e.clientY - dragStartY;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasDragged = true;
  mc.scrollLeft = scrollStartX - dx;
  mc.scrollTop = scrollStartY - dy;
});

window.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    mc.style.cursor = 'grab';
  }
});

// 设置默认光标
mc.style.cursor = 'grab';

// 点击关闭卡片（非拖拽 + 非卡片区域 + 用户没在打字时才关闭）
mc.addEventListener('click', e => {
  if (hasDragged) return;
  const card = document.getElementById('ic');
  if (card && card.contains(document.activeElement)) return; // 焦点在卡片内（正在打字）
  if (selChar && !e.target.closest('.ch')) closeCard();
});
document.addEventListener('keydown', e => {
  if (!mapOpen) return;
  // 在输入框内打字时，不触发快捷键
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (e.key === 'Escape') { if (selChar) closeCard(); else closeMap(); }
  if (e.key >= '1' && e.key <= '4') switchFloor(parseInt(e.key));
});
document.getElementById('sbtn').addEventListener('click', castSpell);
document.getElementById('si').addEventListener('keypress', e => { if (e.key === 'Enter') castSpell(); });
document.querySelectorAll('.fb').forEach(b => b.addEventListener('click', () => switchFloor(parseInt(b.dataset.floor))));
document.getElementById('ccb').addEventListener('click', closeCard);
document.getElementById('csb').addEventListener('click', sendChat);
document.getElementById('ci').addEventListener('keypress', e => { if (e.key === 'Enter') sendChat(); });
document.getElementById('cmb').addEventListener('click', closeMap);
document.getElementById('music-btn').addEventListener('click', () => {
  toggleMusic();
  updateMusicBtn();
});

function updateMusicBtn() {
  const btn = document.getElementById('music-btn');
  const playing = isMusicPlaying();
  btn.textContent = playing ? '🔊' : '🔇';
  btn.classList.toggle('playing', playing);
  btn.title = playing ? '关闭音乐' : '开启音乐';
}

// ===== 咒语自动填充（打字机效果）=====
const siEl = document.getElementById('si');
const spell = 'I solemnly swear that I am up to no good';

function startTypeSpell() {
  siEl.value = '';
  let i = 0;
  (function step() {
    if (i < spell.length) {
      siEl.value += spell[i];
      i++;
      setTimeout(step, 50 + Math.random() * 40);
    } else {
      siEl.focus();
    }
  })();
}

startTypeSpell();
