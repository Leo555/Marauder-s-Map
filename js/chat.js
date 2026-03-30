/**
 * chat.js — 对话引擎
 * 包含话题匹配、回复去重、对话记忆、情感检测
 */

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

/** 根据用户输入和角色数据生成回复 */
export function getResponse(char, userText) {
  const low = userText.toLowerCase();
  if (!chatHistory[char.id]) chatHistory[char.id] = [];
  chatHistory[char.id].push({ role: 'user', text: userText });

  // 1. 话题关键词匹配（最长匹配优先）
  let bestMatch = null, bestScore = 0;
  for (const topic of char.topics) {
    let score = 0;
    for (const key of topic.keys) {
      if (low.includes(key)) score += key.length;
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
      return pickRandom([
        `你已经问过这个了。${char.cn}看起来有点不耐烦。`,
        '*挑了挑眉* 你刚才不是问过一样的问题吗？',
        '嗯...你是在测试我的耐心吗？'
      ], char.id + '_repeat');
    }
  }

  // 3. 通用情感/意图识别
  if (/[?？]/.test(userText) && (low.includes('为什么') || low.includes('怎么') || low.includes('什么') || low.includes('who') || low.includes('why') || low.includes('how'))) {
    return pickRandom([
      `*想了想* 这个问题...要看你问的是谁了。你觉得呢？`,
      `好问题。但在霍格沃茨，答案往往比你想象的更复杂。`,
      `*${char.cn}歪了歪头* 你为什么想知道这个？`
    ], char.id + '_question');
  }
  if (low.includes('哈哈') || low.includes('笑') || low.includes('有趣') || low.includes('好玩') || low.includes('funny')) {
    return pickRandom([
      `*${char.cn}也笑了* 是啊，霍格沃茨总是不缺笑料。`,
      `*微笑* 很高兴你觉得好玩。`,
      `哈哈！在这个学校里，好笑的事情可太多了。`
    ], char.id + '_laugh');
  }
  if (low.includes('无聊') || low.includes('没意思') || low.includes('boring')) {
    return pickRandom([
      `无聊？在霍格沃茨？你一定是在开玩笑。这里每天都有意想不到的事情发生。`,
      `你可以去探索一下七楼的走廊。有一个房间，只有你真正需要它的时候才会出现。`,
      `要不去看看魁地奇训练？或者去海格那里喝杯茶？`
    ], char.id + '_bored');
  }
  if (low.includes('害怕') || low.includes('可怕') || low.includes('吓') || low.includes('恐惧')) {
    return pickRandom([
      `*认真地看着你* 每个人都会害怕。勇敢不是不害怕，而是害怕了还继续前进。`,
      `在霍格沃茨，最好的对抗恐惧的方法是——呼神护卫！想一个最快乐的记忆。`,
      `别担心。在这里，你不是一个人。`
    ], char.id + '_fear');
  }
  if (low.includes('喜欢你') || low.includes('爱你') || low.includes('love') || low.includes('好看') || low.includes('帅') || low.includes('漂亮')) {
    return pickRandom([
      `*${char.cn}有点不好意思* 哈...谢谢？这还是第一次有人这样说。`,
      `*脸红* 我...我不太知道该怎么回应这个...`,
      `*尴尬地笑了笑* 你是认真的吗？在霍格沃茨表白可是会被到处传的。`
    ], char.id + '_flirt');
  }

  // 4. 兜底：角色闲聊
  const resp = pickRandom(char._, char.id);
  chatHistory[char.id].push({ role: 'char', text: resp });
  return resp;
}
