/**
 * chat.js — 对话引擎
 * 包含话题匹配、回复去重、对话记忆、情感检测
 * 支持中英文双语
 */
import { getLang, charName } from './i18n.js?v=1.16';

const chatHistory = {};   // charId -> [{role, text}]
const usedResponses = {}; // charId -> Set<string>

/** 从数组中随机选取一条，避免短期内重复 */
export function pickRandom(arr, charId) {
  if (!arr || arr.length === 0) return null;
  if (!usedResponses[charId]) usedResponses[charId] = new Set();
  const unused = arr.filter(r => !usedResponses[charId].has(r));
  const pool = unused.length > 0 ? unused : arr;
  if (unused.length === 0) usedResponses[charId].clear();
  const pick = pool[Math.floor(Math.random() * pool.length)];
  usedResponses[charId].add(pick);
  return pick;
}

/** 根据语言获取角色话题列表 */
function getTopics(char) {
  return getLang() === 'en' && char.topics_en ? char.topics_en : char.topics;
}

/** 根据语言获取角色兜底台词 */
function getFallback(char) {
  return getLang() === 'en' && char._en ? char._en : char._;
}

// 通用情感回复（中英双语）
const GENERIC = {
  zh: {
    repeat: char => [
      `你已经问过这个了。${charName(char)}看起来有点不耐烦。`,
      '*挑了挑眉* 你刚才不是问过一样的问题吗？',
      '嗯...你是在测试我的耐心吗？'
    ],
    questionKeys: ['为什么', '怎么', '什么'],
    question: char => [
      `*想了想* 这个问题...要看你问的是谁了。你觉得呢？`,
      `好问题。但在霍格沃茨，答案往往比你想象的更复杂。`,
      `*${charName(char)}歪了歪头* 你为什么想知道这个？`
    ],
    laughKeys: ['哈哈', '笑', '有趣', '好玩', 'funny', 'haha'],
    laugh: char => [
      `*${charName(char)}也笑了* 是啊，霍格沃茨总是不缺笑料。`,
      `*微笑* 很高兴你觉得好玩。`,
      `哈哈！在这个学校里，好笑的事情可太多了。`
    ],
    boredKeys: ['无聊', '没意思', 'boring'],
    bored: () => [
      `无聊？在霍格沃茨？你一定是在开玩笑。这里每天都有意想不到的事情发生。`,
      `你可以去探索一下七楼的走廊。有一个房间，只有你真正需要它的时候才会出现。`,
      `要不去看看魁地奇训练？或者去海格那里喝杯茶？`
    ],
    fearKeys: ['害怕', '可怕', '吓', '恐惧'],
    fear: () => [
      `*认真地看着你* 每个人都会害怕。勇敢不是不害怕，而是害怕了还继续前进。`,
      `在霍格沃茨，最好的对抗恐惧的方法是——呼神护卫！想一个最快乐的记忆。`,
      `别担心。在这里，你不是一个人。`
    ],
    flirtKeys: ['喜欢你', '爱你', 'love', '好看', '帅', '漂亮'],
    flirt: char => [
      `*${charName(char)}有点不好意思* 哈...谢谢？这还是第一次有人这样说。`,
      `*脸红* 我...我不太知道该怎么回应这个...`,
      `*尴尬地笑了笑* 你是认真的吗？在霍格沃茨表白可是会被到处传的。`
    ]
  },
  en: {
    repeat: char => [
      `You already asked that. ${charName(char)} looks a bit impatient.`,
      '*raises an eyebrow* Didn\'t you just ask the same question?',
      'Hmm... are you testing my patience?'
    ],
    questionKeys: ['why', 'how', 'what', 'who', 'where'],
    question: char => [
      `*thinks* That question... depends on who you ask. What do you think?`,
      `Good question. But at Hogwarts, the answer is often more complicated than you'd expect.`,
      `*${charName(char)} tilts their head* Why do you want to know?`
    ],
    laughKeys: ['haha', 'lol', 'funny', 'hilarious', 'laugh'],
    laugh: char => [
      `*${charName(char)} laughs too* Yes, Hogwarts never lacks for laughs.`,
      `*smiles* Glad you find it amusing.`,
      `Ha! There's never a dull moment at this school.`
    ],
    boredKeys: ['bored', 'boring', 'dull'],
    bored: () => [
      `Bored? At Hogwarts? You must be joking. Something unexpected happens every day here.`,
      `You could explore the seventh-floor corridor. There's a room that only appears when you truly need it.`,
      `Why not watch some Quidditch practice? Or have tea at Hagrid's?`
    ],
    fearKeys: ['afraid', 'scared', 'fear', 'frightened', 'terrified'],
    fear: () => [
      `*looks at you seriously* Everyone feels fear. Courage isn't about not being afraid — it's about carrying on despite the fear.`,
      `At Hogwarts, the best way to fight fear is — Expecto Patronum! Think of your happiest memory.`,
      `Don't worry. You're not alone here.`
    ],
    flirtKeys: ['love you', 'like you', 'cute', 'handsome', 'beautiful', 'pretty'],
    flirt: char => [
      `*${charName(char)} blushes* Ha... thanks? That's the first time anyone's said that.`,
      `*blushing* I... I don't quite know how to respond to that...`,
      `*laughs awkwardly* Are you serious? Confessions at Hogwarts spread like wildfire.`
    ]
  }
};

/** 根据用户输入和角色数据生成回复 */
export function getResponse(char, userText) {
  const low = userText.toLowerCase();
  const lang = getLang();
  const g = GENERIC[lang] || GENERIC.zh;
  if (!chatHistory[char.id]) chatHistory[char.id] = [];
  chatHistory[char.id].push({ role: 'user', text: userText });

  // 1. 话题关键词匹配（最长匹配优先）
  const topics = getTopics(char);
  let bestMatch = null, bestScore = 0;
  for (const topic of topics) {
    let score = 0;
    for (const key of topic.keys) {
      if (low.includes(key.toLowerCase())) score += key.length;
    }
    if (score > bestScore) { bestScore = score; bestMatch = topic; }
  }
  if (bestMatch && bestScore > 0) {
    const resp = pickRandom(bestMatch.r, char.id);
    chatHistory[char.id].push({ role: 'char', text: resp });
    return resp;
  }

  // 2. 重复提问检测
  const hist = chatHistory[char.id];
  if (hist.length >= 4) {
    const lastTwoUser = hist.filter(h => h.role === 'user').slice(-2);
    if (lastTwoUser.length === 2 && lastTwoUser[0].text === lastTwoUser[1].text) {
      return pickRandom(g.repeat(char), char.id + '_repeat');
    }
  }

  // 3. 通用情感/意图识别
  if (/[?？]/.test(userText) && g.questionKeys.some(k => low.includes(k))) {
    return pickRandom(g.question(char), char.id + '_question');
  }
  if (g.laughKeys.some(k => low.includes(k))) {
    return pickRandom(g.laugh(char), char.id + '_laugh');
  }
  if (g.boredKeys.some(k => low.includes(k))) {
    return pickRandom(g.bored(char), char.id + '_bored');
  }
  if (g.fearKeys.some(k => low.includes(k))) {
    return pickRandom(g.fear(char), char.id + '_fear');
  }
  if (g.flirtKeys.some(k => low.includes(k))) {
    return pickRandom(g.flirt(char), char.id + '_flirt');
  }

  // 4. 兜底：角色闲聊
  const fallback = getFallback(char);
  const resp = pickRandom(fallback, char.id);
  chatHistory[char.id].push({ role: 'char', text: resp });
  return resp;
}
