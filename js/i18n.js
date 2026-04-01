/**
 * i18n.js — 国际化模块
 * 支持中英文切换，自动检测浏览器语言
 */

let currentLang = 'zh';
const listeners = [];

const UI = {
  zh: {
    title: '活点地图 - The Marauder\'s Map',
    subtitle: '活点地图 — 霍格沃茨魔法学校',
    spellHint: '请说出咒语以打开地图...',
    castBtn: '施咒 ✦',
    emptySpell: '你需要说出正确的咒语...',
    wrongSpell: '"这张羊皮纸只是一张羊皮纸" — 纸上缓缓浮现字迹',
    floor4: '地',
    chatPlaceholder: '与此人对话...',
    sendBtn: '发送',
    musicTitle: '背景音乐',
    musicOn: '关闭音乐',
    musicOff: '开启音乐',
    viewIntro: '点击查看自我介绍',
    movingOnMap: '在地图上移动中',
    you: '你',
    typing: '正在输入...',
    houses: {
      gryffindor: '格兰芬多',
      slytherin: '斯莱特林',
      ravenclaw: '拉文克劳',
      hufflepuff: '赫奇帕奇',
      staff: '教职员工'
    }
  },
  en: {
    title: 'The Marauder\'s Map',
    subtitle: 'The Marauder\'s Map — Hogwarts School',
    spellHint: 'Speak the spell to open the map...',
    castBtn: 'Cast ✦',
    emptySpell: 'You need to speak the correct spell...',
    wrongSpell: '"This parchment is just a parchment" — words slowly appear on the surface',
    floor4: 'GD',
    chatPlaceholder: 'Talk to this character...',
    sendBtn: 'Send',
    musicTitle: 'Background Music',
    musicOn: 'Mute Music',
    musicOff: 'Play Music',
    viewIntro: 'Click to view introduction',
    movingOnMap: 'Moving on the map',
    you: 'You',
    typing: 'Typing...',
    houses: {
      gryffindor: 'Gryffindor',
      slytherin: 'Slytherin',
      ravenclaw: 'Ravenclaw',
      hufflepuff: 'Hufflepuff',
      staff: 'Staff'
    }
  }
};

export function getLang() { return currentLang; }

export function t(key) {
  const keys = key.split('.');
  let val = UI[currentLang];
  for (const k of keys) {
    if (!val) return key;
    val = val[k];
  }
  return val || key;
}

export function setLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('map-lang', lang);
  listeners.forEach(fn => fn(lang));
}

export function onLangChange(fn) { listeners.push(fn); }

export function initLang() {
  const saved = localStorage.getItem('map-lang');
  if (saved) {
    currentLang = saved;
  } else {
    const nav = navigator.language || 'zh';
    currentLang = nav.startsWith('zh') ? 'zh' : 'en';
  }
  return currentLang;
}

/** 获取角色的显示名称（中文用 cn，英文用 n） */
export function charName(c) {
  return currentLang === 'zh' ? c.cn : c.n;
}
