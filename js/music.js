/**
 * music.js — 背景音乐
 * 播放 Hedwig's Theme（哈利·波特片头曲）
 */

const MUSIC_URL = '../assets/hedwigs-theme.mp3';

let audio = null;
let isPlaying = false;

function initAudio() {
  if (audio) return;
  audio = new Audio(MUSIC_URL);
  audio.loop = true;
  audio.volume = 0;
  audio.preload = 'auto';
}

/** 淡入/淡出音量 */
function fadeTo(target, duration = 1000) {
  if (!audio) return;
  const start = audio.volume;
  const diff = target - start;
  const steps = 30;
  const stepTime = duration / steps;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    audio.volume = Math.max(0, Math.min(1, start + diff * (step / steps)));
    if (step >= steps) clearInterval(timer);
  }, stepTime);
}

/** 开始/继续播放 */
export function startMusic() {
  initAudio();
  if (isPlaying) return;
  isPlaying = true;
  audio.play().then(() => {
    fadeTo(0.35, 2000);
  }).catch(() => {
    // 浏览器可能阻止自动播放，等用户交互后重试
    isPlaying = false;
  });
}

/** 暂停（可继续） */
export function stopMusic() {
  if (!isPlaying || !audio) return;
  isPlaying = false;
  fadeTo(0, 1000);
  setTimeout(() => {
    if (!isPlaying) audio.pause();
  }, 1050);
}

/** 切换播放/暂停 */
export function toggleMusic() {
  if (isPlaying) stopMusic();
  else startMusic();
  return isPlaying;
}

/** 获取当前播放状态 */
export function isMusicPlaying() {
  return isPlaying;
}

/** 设置音量 (0-1) */
export function setVolume(v) {
  if (audio) audio.volume = v * 0.35;
}
