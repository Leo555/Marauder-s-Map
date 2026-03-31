/**
 * floors.js — 4个楼层的SVG绘制
 * 每层布局根据小说/电影描述设计，各具特色
 */
import { W, S, drawRoom, drawTower, drawStairs, drawCorridor, drawDoor, addLabel, drawBorder, drawCompass, drawPoly, drawCurvedCorridor, drawLRoom, drawHouseCrest, drawHouseGlow } from './svg-draw.js?v=1.7';

export const FLOOR_DRAW = {

// ===== 1F：地面层 — 大礼堂为核心的不对称布局 =====
1: function(svg) {
  const b = 0;
  drawBorder(svg, 15, 15, 1970, 1570, b);
  drawCompass(svg, 1880, 100, 35, b + 0.5);
  addLabel(svg, 1000, 140, 'GROUND FLOOR — HOGWARTS CASTLE', 'ls', b + 0.3);

  // ── 大礼堂（巨大的梯形/不规则形，原著中是长长的石厅） ──
  drawPoly(svg, [[200, 180], [620, 170], [640, 460], [180, 470]], { thick: true, delay: b + 0.2 });
  // 四张长桌
  for (let i = 0; i < 4; i++) {
    S('path', { d: `M ${W(240, 210 + i * 60)} L ${W(590, 208 + i * 60)}`, class: 'rp', style: `animation-delay:${b + 0.8}s;stroke-width:.7;opacity:.35` }, svg);
  }
  // 教师高台
  S('path', { d: `M ${W(250, 440)} L ${W(580, 442)}`, class: 'rpt', style: `animation-delay:${b + 0.9}s;stroke-width:1.5;opacity:.5` }, svg);
  drawDoor(svg, 200, 180, 440, 290, 'right', 0.3, b + 0.4);
  addLabel(svg, 410, 310, 'Great Hall', 'll', b + 0.5);
  addLabel(svg, 410, 330, '大礼堂', 'ls', b + 0.55);
  // 星空天花板装饰
  for (let i = 0; i < 8; i++) {
    S('circle', { cx: 250 + Math.random() * 350, cy: 190 + Math.random() * 40, r: 1, fill: '#8a6a4a', opacity: 0, style: `animation:ikf 3s ease ${b + 1.2 + i * 0.1}s forwards` }, svg);
  }

  // ── 入口大厅（宽阔的八边形空间） ──
  drawPoly(svg, [[680, 200], [830, 180], [910, 250], [920, 380], [840, 460], [690, 470], [650, 390], [640, 270]], { delay: b + 0.35 });
  drawDoor(svg, 680, 200, 250, 280, 'left', 0.4, b + 0.4);
  drawDoor(svg, 680, 200, 250, 280, 'bottom', 0.5, b + 0.45);
  addLabel(svg, 785, 330, 'Entrance', 'lt', b + 0.5);
  addLabel(svg, 785, 348, 'Hall', 'lt', b + 0.5);
  addLabel(svg, 785, 366, '入口大厅', 'ls', b + 0.55);

  // ── 弯曲走廊：入口大厅 → 右翼 ──
  drawCurvedCorridor(svg, [[920, 310], [980, 290], [1050, 300], [1100, 280]], 28, b + 0.5);

  // ── 奖杯陈列室（狭长的展厅） ──
  drawRoom(svg, 1100, 210, 250, 110, { delay: b + 0.55 });
  for (let i = 0; i < 5; i++) {
    S('rect', { x: 1115 + i * 45, y: 230, width: 20, height: 8, rx: 2, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.5, opacity: 0, style: `animation:ikf 2s ease ${b + 1 + i * 0.08}s forwards` }, svg);
  }
  addLabel(svg, 1225, 270, 'Trophy Room', 'lt', b + 0.65);
  addLabel(svg, 1225, 285, '奖杯陈列室', 'ls', b + 0.7);

  // ── 费尔奇办公室（紧挨奖杯室的小间） ──
  drawRoom(svg, 1360, 220, 110, 90, { delay: b + 0.65 });
  addLabel(svg, 1415, 270, "Filch's", 'ls', b + 0.75);

  // ── 教工休息室（不规则五边形） ──
  drawPoly(svg, [[1100, 370], [1280, 360], [1310, 430], [1250, 490], [1080, 480]], { delay: b + 0.6 });
  addLabel(svg, 1190, 430, 'Staff Room', 'lt', b + 0.7);
  addLabel(svg, 1190, 448, '教工休息室', 'ls', b + 0.75);

  // ── 弯曲走廊：入口 → 中庭 ──
  drawCurvedCorridor(svg, [[780, 470], [800, 530], [790, 590], [770, 640]], 25, b + 0.5);

  // ── 中庭（开放的不规则多边形，中心有喷泉） ──
  drawPoly(svg, [[680, 640], [900, 630], [920, 760], [880, 850], [700, 860], [660, 780]], { delay: b + 0.5 });
  drawTower(svg, 790, 745, 18, { delay: b + 0.9 });
  S('circle', { cx: 790, cy: 745, r: 6, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.5, opacity: 0.3 }, svg);
  addLabel(svg, 790, 725, 'Courtyard', 'lt', b + 0.6);
  addLabel(svg, 790, 742, '中庭', 'ls', b + 0.65);

  // ── 弯曲走廊：入口 → 厨房/地牢区（向下弯曲） ──
  drawCurvedCorridor(svg, [[680, 400], [600, 480], [520, 560], [460, 610]], 22, b + 0.5);
  addLabel(svg, 540, 540, 'to dungeons ↓', 'hw', b + 1.5);

  // ── 厨房（大型不规则空间，在大礼堂正下方） ──
  drawPoly(svg, [[180, 540], [480, 530], [500, 680], [460, 720], [200, 730]], { delay: b + 0.5 });
  for (let i = 0; i < 4; i++) S('circle', { cx: 240 + i * 60, cy: 620, r: 10, class: 'dl', 'stroke-width': 0.7, style: `opacity:0;animation:ikf 2s ease ${b + 1.1 + i * 0.06}s forwards` }, svg);
  drawDoor(svg, 180, 540, 300, 190, 'top', 0.5, b + 0.6);
  addLabel(svg, 340, 635, 'Kitchen', 'lt', b + 0.65);
  addLabel(svg, 340, 652, '厨房', 'ls', b + 0.7);
  addLabel(svg, 180, 710, 'Tickle the pear...', 'hw', b + 1.5);

  // ── 赫奇帕奇公共休息室（圆形地窖入口，在厨房旁） ──
  drawTower(svg, 300, 850, 80, { delay: b + 0.7, thick: true });
  drawTower(svg, 300, 850, 45, { delay: b + 0.8 });
  S('ellipse', { cx: 300, cy: 780, rx: 15, ry: 8, class: 'da', style: `opacity:0;animation:ikf 2s ease ${b + 1.1}s forwards` }, svg);
  addLabel(svg, 300, 845, 'Hufflepuff', 'lt', b + 0.85);
  addLabel(svg, 300, 862, '赫奇帕奇', 'ls', b + 0.9);
  drawHouseGlow(svg, 300, 850, 80, 'hufflepuff', b + 1);
  drawHouseCrest(svg, 300, 850, 'hufflepuff', 22, b + 1.1);

  // ── 斯莱特林公共休息室（地牢风格，右侧的不规则洞穴形） ──
  drawPoly(svg, [[480, 800], [620, 780], [660, 830], [650, 920], [580, 950], [470, 930], [450, 870]], { delay: b + 0.75, thick: true });
  S('path', { d: 'M 480,800 Q 465,860 480,930', class: 'dl', 'stroke-width': '0.8', style: `opacity:0;animation:ikf 2s ease ${b + 1.2}s forwards` }, svg);
  addLabel(svg, 560, 870, 'Slytherin', 'lt', b + 0.85);
  addLabel(svg, 560, 888, '斯莱特林', 'ls', b + 0.9);
  drawHouseGlow(svg, 560, 870, 70, 'slytherin', b + 1);
  drawHouseCrest(svg, 560, 870, 'slytherin', 20, b + 1.1);
  addLabel(svg, 600, 940, 'Dungeons below', 'hw', b + 1.6);

  // ── 医疗翼（L型房间，在右上方远离人群） ──
  drawLRoom(svg, 1350, 380, 200, 100, 130, 200, 'br', { delay: b + 0.7 });
  for (let i = 0; i < 3; i++) S('rect', { x: 1370 + i * 55, y: 410, width: 35, height: 14, rx: 3, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.5, opacity: 0, style: `animation:ikf 2s ease ${b + 1.1 + i * 0.1}s forwards` }, svg);
  addLabel(svg, 1450, 460, 'Hospital Wing', 'lt', b + 0.85);
  addLabel(svg, 1450, 478, '医疗翼', 'ls', b + 0.9);

  // ── 移动楼梯（高高的竖井） ──
  drawStairs(svg, 1500, 180, 100, 500, 22, b + 0.7);
  // 楼梯间的小平台
  for (let i = 0; i < 3; i++) {
    S('rect', { x: 1500, y: 280 + i * 150, width: 100, height: 5, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.4, opacity: 0, style: `animation:ikf 2s ease ${b + 1 + i * 0.15}s forwards` }, svg);
  }
  addLabel(svg, 1550, 430, 'Moving', 'ls', b + 0.9);
  addLabel(svg, 1550, 445, 'Staircase', 'ls', b + 0.95);
  addLabel(svg, 1550, 460, '移动楼梯', 'ls', b + 1);

  // ── 装饰 ──
  S('path', { d: 'M 150, 160 Q 500,148 850,162 Q 1200,176 1600,158', class: 'dl', style: `opacity:0;animation:ikf 3s ease ${b + 0.5}s forwards` }, svg);
  S('path', { d: 'M 150,980 Q 500,994 850,978 Q 1200,964 1600,982', class: 'dl', style: `opacity:0;animation:ikf 3s ease ${b + 1.5}s forwards` }, svg);
  for (let i = 0; i < 10; i++) S('circle', { cx: 200 + i * 150, cy: 157 + Math.sin(i * 0.9) * 3, r: 1.5, fill: '#8a6a4a', opacity: 0, style: `animation:ikf 2s ease ${b + 0.8 + i * 0.08}s forwards` }, svg);
  addLabel(svg, 1000, 1020, '✦  Mischief Managed  ✦', 'hw', b + 2);
  addLabel(svg, 1420, 320, 'Confiscated items', 'hw', b + 1.6);
},

// ===== 2F：教室与图书馆层 — 弯曲走廊串联不同形状教室 =====
2: function(svg) {
  const b = 0;
  drawBorder(svg, 15, 15, 1970, 1570, b);
  drawCompass(svg, 1880, 100, 35, b + 0.5);
  addLabel(svg, 1000, 140, 'SECOND FLOOR — CLASSROOMS & LIBRARY', 'ls', b + 0.3);

  // ── 主走廊（S型弯曲，贯穿整层） ──
  drawCurvedCorridor(svg, [[200, 420], [350, 400], [550, 430], [750, 410], [950, 440], [1150, 420], [1350, 440], [1500, 420]], 30, b + 0.3);
  addLabel(svg, 750, 455, '—— 二层走廊 ——', 'ls', b + 0.6);

  // ── 变形术教室（梯形，在走廊北侧左端） ──
  drawPoly(svg, [[180, 200], [420, 190], [430, 370], [170, 380]], { thick: true, delay: b + 0.2 });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) S('rect', { x: 210 + c * 50, y: 230 + r * 40, width: 28, height: 10, rx: 1, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.4, opacity: 0, style: `animation:ikf 2s ease ${b + 0.8 + (r * 4 + c) * 0.04}s forwards` }, svg);
  drawDoor(svg, 180, 200, 250, 180, 'bottom', 0.5, b + 0.35);
  addLabel(svg, 300, 285, 'Transfiguration', 'll', b + 0.4);
  addLabel(svg, 300, 305, '变形术教室', 'ls', b + 0.45);

  // ── 魔咒学教室（六边形，独特形状） ──
  drawPoly(svg, [[520, 200], [660, 180], [740, 250], [720, 370], [590, 380], [500, 310]], { delay: b + 0.3 });
  for (let i = 0; i < 6; i++) S('rect', { x: 550 + (i % 3) * 50, y: 240 + Math.floor(i / 3) * 50, width: 30, height: 12, rx: 1, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.4, opacity: 0, style: `animation:ikf 2s ease ${b + 0.9 + i * 0.05}s forwards` }, svg);
  drawDoor(svg, 520, 200, 220, 180, 'bottom', 0.4, b + 0.4);
  addLabel(svg, 630, 285, 'Charms', 'll', b + 0.45);
  addLabel(svg, 630, 305, '魔咒学教室', 'ls', b + 0.5);

  // ── 黑魔法防御术教室（不规则五边形，在走廊南侧） ──
  drawPoly(svg, [[200, 500], [430, 490], [450, 620], [380, 680], [180, 670]], { delay: b + 0.35 });
  // 骷髅装饰
  S('path', { d: `M ${W(250, 580)} L ${W(280, 540)} L ${W(310, 580)}`, class: 'dl', 'stroke-width': '0.8', style: `opacity:0;animation:ikf 2s ease ${b + 1}s forwards` }, svg);
  drawDoor(svg, 200, 500, 250, 180, 'top', 0.4, b + 0.45);
  addLabel(svg, 310, 575, 'Defence Against', 'lt', b + 0.5);
  addLabel(svg, 310, 592, 'the Dark Arts', 'lt', b + 0.55);
  addLabel(svg, 310, 612, '黑魔法防御术', 'ls', b + 0.6);

  // ── 魔药学教室（地牢风格，拱形天花板感） ──
  drawPoly(svg, [[520, 500], [720, 490], [740, 550], [750, 680], [700, 700], [530, 700], [500, 640], [490, 540]], { thick: true, delay: b + 0.4 });
  for (let i = 0; i < 5; i++) drawTower(svg, 560 + i * 35, 600, 9, { delay: b + 0.9 + i * 0.05 });
  drawDoor(svg, 520, 500, 220, 200, 'top', 0.5, b + 0.5);
  addLabel(svg, 625, 580, 'Potions', 'll', b + 0.55);
  addLabel(svg, 625, 600, '魔药学教室', 'ls', b + 0.6);

  // ── 图书馆（巨大的 L 型空间，原著中横跨多个区域） ──
  drawLRoom(svg, 870, 180, 400, 120, 250, 300, 'bl', { thick: true, delay: b + 0.3 });
  // 书架
  for (let i = 0; i < 8; i++) S('line', { x1: 900 + i * 42, y1: 200, x2: 900 + i * 42, y2: 290, stroke: '#8a6a4a', 'stroke-width': 0.5, opacity: 0, style: `animation:ikf 2s ease ${b + 0.9 + i * 0.06}s forwards` }, svg);
  for (let i = 0; i < 4; i++) S('line', { x1: 900 + i * 55, y1: 310, x2: 900 + i * 55, y2: 460, stroke: '#8a6a4a', 'stroke-width': 0.5, opacity: 0, style: `animation:ikf 2s ease ${b + 1 + i * 0.08}s forwards` }, svg);
  addLabel(svg, 1070, 250, 'Library', 'll', b + 0.5);
  addLabel(svg, 1070, 268, '图书馆', 'ls', b + 0.55);

  // ── 禁书区（图书馆深处，用铁栏隔开的区域） ──
  drawRoom(svg, 1100, 340, 160, 120, { delay: b + 0.55 });
  S('path', { d: `M 1100,340 L 1100,460`, class: 'rpt', style: `animation-delay:${b + 0.7}s;stroke-width:2;stroke-dasharray:4 6` }, svg);
  addLabel(svg, 1180, 400, '⚠ RESTRICTED', 'hw', b + 1.2);
  addLabel(svg, 1180, 420, '禁书区', 'ls', b + 0.7);

  // ── 麦格办公室（圆角房间，图书馆旁） ──
  drawPoly(svg, [[1320, 200], [1480, 195], [1490, 310], [1330, 320]], { delay: b + 0.5 });
  addLabel(svg, 1405, 258, "McGonagall", 'lt', b + 0.65);
  addLabel(svg, 1405, 276, '麦格办公室', 'ls', b + 0.7);

  // ── 哭泣的桃金娘盥洗室（走廊尽头的圆形空间） ──
  drawTower(svg, 280, 830, 70, { delay: b + 0.6 });
  // 水管装饰
  S('path', { d: `M ${W(240, 800)} Q ${W(280, 790)} ${W(320, 810)} Q ${W(350, 800)} ${W(340, 830)}`, class: 'dl', 'stroke-width': '.8', style: `opacity:0;animation:ikf 2s ease ${b + 1.3}s forwards` }, svg);
  addLabel(svg, 280, 825, "Myrtle's", 'lt', b + 0.75);
  addLabel(svg, 280, 843, '桃金娘盥洗室', 'ls', b + 0.8);
  addLabel(svg, 350, 865, 'Do NOT enter...', 'hw', b + 1.4);

  // ── 移动楼梯 ──
  drawStairs(svg, 1500, 180, 100, 480, 20, b + 0.7);
  addLabel(svg, 1550, 420, 'Moving', 'ls', b + 0.9);
  addLabel(svg, 1550, 435, 'Staircase', 'ls', b + 0.95);

  // ── 装饰 ──
  S('path', { d: 'M 150,160 Q 600,148 1050,160 Q 1400,172 1550,160', class: 'dl', style: `opacity:0;animation:ikf 3s ease ${b + 0.5}s forwards` }, svg);
  addLabel(svg, 1330, 400, 'Irma Pince watches.', 'hw', b + 1.5);
},

// ===== 3F：塔楼与寝室层 — 以圆形塔楼和螺旋楼梯为主 =====
3: function(svg) {
  const b = 0;
  drawBorder(svg, 15, 15, 1970, 1570, b);
  drawCompass(svg, 1880, 100, 35, b + 0.5);
  addLabel(svg, 1000, 140, 'UPPER FLOORS — TOWERS & DORMITORIES', 'ls', b + 0.3);

  // ── 格兰芬多塔（西北方向，大型同心圆塔楼） ──
  drawTower(svg, 320, 380, 150, { delay: b + 0.2, thick: true });
  drawTower(svg, 320, 380, 95, { delay: b + 0.35 });
  drawTower(svg, 320, 380, 45, { delay: b + 0.45 });
  // 壁炉
  S('rect', { x: 305, y: 365, width: 30, height: 30, rx: 3, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.6, opacity: 0, style: `animation:ikf 2s ease ${b + 1}s forwards` }, svg);
  addLabel(svg, 320, 340, 'Gryffindor', 'll', b + 0.4);
  addLabel(svg, 320, 358, 'Tower', 'lt', b + 0.45);
  addLabel(svg, 320, 378, '格兰芬多塔', 'ls', b + 0.5);
  drawHouseGlow(svg, 320, 380, 150, 'gryffindor', b + 0.55);
  drawHouseCrest(svg, 320, 380, 'gryffindor', 25, b + 0.6);
  addLabel(svg, 180, 280, 'Password: Fat Lady', 'hw', b + 1.4);

  // 螺旋楼梯 → 寝室
  drawStairs(svg, 300, 530, 40, 40, 8, b + 0.55);

  // ── 格兰芬多寝室（圆形，塔楼下方连接的小圆） ──
  drawTower(svg, 320, 640, 70, { delay: b + 0.5 });
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 - Math.PI / 4;
    S('rect', { x: 310 + Math.cos(a) * 35, y: 630 + Math.sin(a) * 35, width: 20, height: 30, rx: 3, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.4, opacity: 0, transform: `rotate(${a * 180 / Math.PI + 90} ${320 + Math.cos(a) * 35} ${640 + Math.sin(a) * 35})`, style: `animation:ikf 2s ease ${b + 1 + i * 0.1}s forwards` }, svg);
  }
  addLabel(svg, 320, 635, 'Dormitory', 'lt', b + 0.6);
  addLabel(svg, 320, 652, '寝室', 'ls', b + 0.65);

  // ── 拉文克劳塔（东北方向，另一座大型塔楼） ──
  drawTower(svg, 850, 340, 140, { delay: b + 0.25, thick: true });
  drawTower(svg, 850, 340, 85, { delay: b + 0.4 });
  drawTower(svg, 850, 340, 35, { delay: b + 0.5 });
  addLabel(svg, 850, 305, 'Ravenclaw', 'll', b + 0.45);
  addLabel(svg, 850, 323, 'Tower', 'lt', b + 0.5);
  addLabel(svg, 850, 343, '拉文克劳塔', 'ls', b + 0.55);
  drawHouseGlow(svg, 850, 340, 140, 'ravenclaw', b + 0.6);
  drawHouseCrest(svg, 850, 340, 'ravenclaw', 25, b + 0.65);
  addLabel(svg, 720, 250, 'Answer the riddle', 'hw', b + 1.5);

  // 螺旋楼梯 → 寝室
  drawStairs(svg, 830, 480, 40, 40, 8, b + 0.55);

  // ── 拉文克劳寝室 ──
  drawTower(svg, 850, 590, 65, { delay: b + 0.5 });
  addLabel(svg, 850, 585, 'Dormitory', 'lt', b + 0.6);
  addLabel(svg, 850, 602, '寝室', 'ls', b + 0.65);

  // ── 弯曲走廊连接两塔 ──
  drawCurvedCorridor(svg, [[470, 380], [560, 360], [650, 370], [710, 350]], 22, b + 0.5);

  // ── 天文塔（东南方，最高的塔，嵌套3层圆） ──
  drawTower(svg, 1200, 350, 110, { delay: b + 0.35, thick: true });
  drawTower(svg, 1200, 350, 60, { delay: b + 0.5 });
  drawTower(svg, 1200, 350, 25, { delay: b + 0.6 });
  // 望远镜
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    S('line', { x1: 1200 + Math.cos(a) * 65, y1: 350 + Math.sin(a) * 65, x2: 1200 + Math.cos(a) * 90, y2: 350 + Math.sin(a) * 90, stroke: '#8a6a4a', 'stroke-width': 0.5, opacity: 0, style: `animation:ikf 2s ease ${b + 1.1 + i * 0.08}s forwards` }, svg);
  }
  addLabel(svg, 1200, 340, 'Astronomy', 'll', b + 0.55);
  addLabel(svg, 1200, 358, 'Tower', 'lt', b + 0.6);
  addLabel(svg, 1200, 376, '天文塔', 'ls', b + 0.65);

  // ── 猫头鹰棚屋（天文塔旁的小圆形建筑） ──
  drawTower(svg, 1200, 550, 55, { delay: b + 0.6 });
  addLabel(svg, 1200, 545, 'Owlery', 'lt', b + 0.75);
  addLabel(svg, 1200, 562, '猫头鹰棚屋', 'ls', b + 0.8);

  // ── 校长办公室（西南，独立的圆形+方形组合） ──
  drawTower(svg, 1450, 350, 80, { delay: b + 0.4, thick: true });
  drawRoom(svg, 1400, 420, 100, 100, { delay: b + 0.5 });
  drawStairs(svg, 1430, 300, 40, 50, 10, b + 0.65);
  addLabel(svg, 1450, 340, "Headmaster's", 'll', b + 0.6);
  addLabel(svg, 1450, 358, 'Office', 'lt', b + 0.65);
  addLabel(svg, 1450, 376, '校长办公室', 'ls', b + 0.7);
  addLabel(svg, 1380, 530, 'Lemon drops', 'hw', b + 1.6);

  // ── 有求必应屋（虚线标记，七楼走廊） ──
  // 用虚线表示它"时隐时现"的特性
  const rrPts = [[500, 750], [750, 740], [760, 860], [490, 870]];
  const rrG = S('g', {}, svg);
  const rrP = rrPts.map(([x, y]) => W(x, y));
  S('path', {
    d: `M ${rrP[0]} ` + rrP.slice(1).map(t => `L ${t}`).join(' ') + ' Z',
    class: 'rp', style: `animation-delay:${b + 0.7}s;stroke-dasharray:8 6;opacity:0.5`
  }, rrG);
  svg.appendChild(rrG);
  addLabel(svg, 625, 795, '...appears only', 'hw', b + 1.4);
  addLabel(svg, 625, 810, 'when needed', 'hw', b + 1.45);
  addLabel(svg, 625, 835, 'Room of Requirement', 'lt', b + 0.85);
  addLabel(svg, 625, 852, '有求必应屋', 'ls', b + 0.9);

  // ── 装饰 ──
  S('path', { d: 'M 150,160 Q 600,148 1050,160 Q 1400,172 1550,160', class: 'dl', style: `opacity:0;animation:ikf 3s ease ${b + 0.5}s forwards` }, svg);
},

// ===== 4F：户外场地 — 完全有机的自然形态 =====
4: function(svg) {
  const b = 0;
  drawBorder(svg, 15, 15, 1970, 1570, b);
  drawCompass(svg, 1880, 100, 35, b + 0.5);
  addLabel(svg, 1000, 140, 'HOGWARTS GROUNDS', 'ls', b + 0.3);

  // ── 魁地奇球场（大型椭圆） ──
  const qx = 450, qy = 350;
  let od = [];
  for (let i = 0; i <= 36; i++) { const a = (i / 36) * Math.PI * 2; od.push(`${i === 0 ? 'M' : 'L'} ${(qx + Math.cos(a) * (200 + (Math.random() - 0.5) * 5)).toFixed(1)},${(qy + Math.sin(a) * (130 + (Math.random() - 0.5) * 4)).toFixed(1)}`); }
  S('path', { d: od.join(' ') + ' Z', class: 'rpt', style: `animation-delay:${b + 0.2}s` }, svg);
  od = [];
  for (let i = 0; i <= 36; i++) { const a = (i / 36) * Math.PI * 2; od.push(`${i === 0 ? 'M' : 'L'} ${(qx + Math.cos(a) * 160).toFixed(1)},${(qy + Math.sin(a) * 100).toFixed(1)}`); }
  S('path', { d: od.join(' ') + ' Z', class: 'rp', style: `animation-delay:${b + 0.4}s;stroke-dasharray:8 4` }, svg);
  // 球门
  [-180, 180].forEach(ox => { for (let i = -1; i <= 1; i++) S('circle', { cx: qx + ox, cy: qy + i * 28, r: 7, fill: 'none', stroke: '#5a3a1a', 'stroke-width': 1, opacity: 0, style: `animation:ikf 2s ease ${b + 0.8}s forwards` }, svg); });
  S('circle', { cx: qx, cy: qy, r: 28, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.6, opacity: 0, style: `animation:ikf 2s ease ${b + 0.6}s forwards` }, svg);
  addLabel(svg, qx, qy - 8, 'Quidditch Pitch', 'll', b + 0.5);
  addLabel(svg, qx, qy + 10, '魁地奇球场', 'ls', b + 0.55);

  // ── 金色飞贼（Golden Snitch） ──
  const snitch = S('g', { id: 'golden-snitch', class: 'snitch', style: `opacity:0;animation:ikf 2s ease ${b + 1.2}s forwards` }, svg);
  // 金色球体
  S('circle', { cx: 0, cy: 0, r: 4, fill: '#d4a017', stroke: '#b8860b', 'stroke-width': 0.6 }, snitch);
  // 高光
  S('circle', { cx: -1.5, cy: -1.5, r: 1.5, fill: '#f5d442', opacity: 0.8 }, snitch);
  // 左翅膀
  S('path', { d: 'M -3,-1 Q -9,-8 -14,-5 Q -11,-2 -8,-4 Q -12,-10 -16,-7 Q -12,-1 -4,0', fill: 'rgba(255,248,220,0.7)', stroke: '#d4a017', 'stroke-width': 0.4, class: 'snitch-wing-l' }, snitch);
  // 右翅膀
  S('path', { d: 'M 3,-1 Q 9,-8 14,-5 Q 11,-2 8,-4 Q 12,-10 16,-7 Q 12,-1 4,0', fill: 'rgba(255,248,220,0.7)', stroke: '#d4a017', 'stroke-width': 0.4, class: 'snitch-wing-r' }, snitch);
  // 初始位置在球场中心
  snitch.setAttribute('transform', `translate(${qx}, ${qy})`);

  // ── 海格小屋（圆形小屋 + 南瓜田 + 烟囱） ──
  drawTower(svg, 880, 260, 70, { delay: b + 0.35, thick: true });
  S('path', { d: 'M 880,190 Q 875,170 885,155 Q 878,140 888,125', class: 'dl', 'stroke-width': '1', style: `opacity:0;animation:ikf 2s ease ${b + 1}s forwards` }, svg);
  for (let i = 0; i < 4; i++) S('circle', { cx: 930 + i * 20, cy: 325, r: 5 + Math.random() * 4, fill: 'none', stroke: '#8a6a4a', 'stroke-width': 0.6, opacity: 0, style: `animation:ikf 2s ease ${b + 1.1 + i * 0.1}s forwards` }, svg);
  addLabel(svg, 880, 255, "Hagrid's Hut", 'll', b + 0.55);
  addLabel(svg, 880, 273, '海格小屋', 'ls', b + 0.6);

  // ── 禁林（有机不规则边界 + 大量树木） ──
  const fg = S('g', { style: `opacity:0;animation:ikf 3s ease ${b + 0.4}s forwards` }, svg);
  S('path', { d: 'M 780,400 Q 830,375 880,405 Q 940,370 1000,400 Q 1060,375 1120,410 Q 1160,390 1200,420 L 1200,780 Q 1140,810 1060,780 Q 980,810 900,780 Q 830,810 780,790 Z', fill: 'rgba(45,90,39,.06)', stroke: '#5a3a1a', 'stroke-width': 1.5, 'stroke-linejoin': 'round', opacity: 0.6 }, fg);
  [[830, 450], [890, 470], [940, 440], [1000, 460], [1060, 445], [1120, 465], [860, 510], [920, 530], [980, 515], [1040, 505], [1100, 525], [1160, 510], [880, 580], [940, 600], [1000, 585], [1060, 575], [1120, 595], [900, 650], [960, 670], [1020, 655], [1080, 645], [1140, 665], [940, 720], [1000, 735], [1060, 720]].forEach(([tx, ty]) => {
    S('line', { x1: tx, y1: ty, x2: tx, y2: ty - 14, stroke: '#5a3a1a', 'stroke-width': 0.8, opacity: 0.4 }, fg);
    S('circle', { cx: tx, cy: ty - 18, r: 5 + Math.random() * 5, fill: 'none', stroke: '#5a3a1a', 'stroke-width': 0.6, opacity: 0.3 }, fg);
  });
  addLabel(svg, 990, 590, 'Forbidden Forest', 'll', b + 0.7);
  addLabel(svg, 990, 608, '禁林', 'ls', b + 0.75);
  addLabel(svg, 990, 660, 'Here be dangers...', 'hw', b + 1.4);

  // ── 黑湖（大型有机水体形状） ──
  S('path', { d: 'M 200,580 Q 260,530 380,555 Q 500,520 620,565 Q 690,540 720,580 Q 740,660 700,740 Q 630,790 500,770 Q 370,800 250,760 Q 190,720 180,660 Q 170,610 200,580 Z', fill: 'rgba(30,50,80,.07)', stroke: '#5a3a1a', 'stroke-width': 1.5, 'stroke-linejoin': 'round', opacity: 0, style: `animation:ikd 2.5s ease ${b + 0.5}s forwards` }, svg);
  for (let i = 0; i < 6; i++) {
    const ry = 610 + i * 25;
    S('path', { d: `M ${290 + i * 8},${ry} Q ${400},${ry - 6} ${480 - i * 5},${ry} Q ${550},${ry + 6} ${620 - i * 8},${ry}`, class: 'dl', 'stroke-width': '.4', style: `opacity:0;animation:ikf 2.5s ease ${b + 1 + i * 0.12}s forwards` }, svg);
  }
  addLabel(svg, 440, 665, 'Black Lake', 'll', b + 0.65);
  addLabel(svg, 440, 683, '黑湖', 'ls', b + 0.7);
  addLabel(svg, 440, 725, 'Giant Squid below', 'hw', b + 1.5);

  // ── 温室（玻璃屋顶的长形建筑） ──
  drawPoly(svg, [[1280, 190], [1500, 185], [1510, 330], [1290, 340]], { delay: b + 0.45 });
  for (let i = 0; i < 6; i++) S('line', { x1: 1300 + i * 35, y1: 195, x2: 1300 + i * 35, y2: 335, stroke: '#8a6a4a', 'stroke-width': 0.4, opacity: 0, style: `animation:ikf 2s ease ${b + 0.9 + i * 0.07}s forwards` }, svg);
  addLabel(svg, 1395, 265, 'Greenhouse', 'll', b + 0.65);
  addLabel(svg, 1395, 283, '温室', 'ls', b + 0.7);

  // ── 打人柳（独立的大树） ──
  const wx = 1350, wy = 480;
  S('path', { d: `M ${wx},${wy + 35} Q ${wx - 6},${wy} ${wx + 3},${wy - 30}`, stroke: '#5a3a1a', 'stroke-width': 3.5, fill: 'none', opacity: 0, style: `animation:ikf 2s ease ${b + 0.7}s forwards` }, svg);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2, len = 40 + Math.random() * 25;
    S('path', { d: `M ${wx},${wy - 25} Q ${wx + Math.cos(a) * len * 0.5 + (Math.random() - 0.5) * 18},${wy - 25 + Math.sin(a) * len * 0.5 + (Math.random() - 0.5) * 12} ${wx + Math.cos(a) * len},${wy - 25 + Math.sin(a) * len}`, stroke: '#5a3a1a', 'stroke-width': 0.8, fill: 'none', opacity: 0, style: `animation:ikf 2s ease ${b + 0.9 + i * 0.04}s forwards` }, svg);
  }
  addLabel(svg, wx, wy + 55, 'Whomping Willow', 'lt', b + 0.85);
  addLabel(svg, wx, wy + 72, '打人柳', 'ls', b + 0.9);
  addLabel(svg, wx + 70, wy + 88, 'Secret passage', 'hw', b + 1.6);

  // ── 通往霍格莫德的小路（蜿蜒虚线） ──
  S('path', { d: 'M 1280,600 Q 1350,580 1420,610 Q 1490,590 1560,620 Q 1600,610 1650,620', class: 'rp', style: `animation-delay:${b + 0.65}s;stroke-dasharray:8 6` }, svg);
  addLabel(svg, 1460, 590, 'To Hogsmeade →', 'ls', b + 0.85);
  addLabel(svg, 1460, 630, '通往霍格莫德', 'ls', b + 0.9);

  // ── 装饰 ──
  S('path', { d: 'M 150,160 Q 600,148 1050,160 Q 1400,172 1550,160', class: 'dl', style: `opacity:0;animation:ikf 3s ease ${b + 0.5}s forwards` }, svg);
}
};
