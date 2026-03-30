# 🗺️ The Marauder's Map — 活点地图

一个基于《哈利·波特》的交互式霍格沃茨活点地图网站。

## ✨ 功能

- **咒语开启** — 输入 "I solemnly swear that I am up to no good" 打开地图
- **4个楼层** — 一层大厅、二层教室、三层塔楼、户外场地
- **SVG 手绘风格** — 所有建筑用抖动线条模拟墨水手绘效果
- **12个角色** — 以脚印形态在地图上自动移动
- **智能对话** — 点击角色可查看状态并进行对话互动
- **电影级装饰** — 羊皮纸质感、指南针、花纹边框、手写批注

## 📁 项目结构

```
marauders-map/
├── index.html              # 主入口页面
├── css/
│   └── style.css           # 所有样式（羊皮纸、动画、UI组件）
├── js/
│   ├── app.js              # 主程序（状态管理、事件绑定、动画循环）
│   ├── svg-draw.js         # SVG 手绘绘图工具函数
│   ├── floors.js           # 4个楼层的绘制逻辑
│   ├── characters.js       # 角色数据（信息、对话、头像）
│   └── chat.js             # 对话引擎（匹配、记忆、情感检测）
├── data/
│   └── rooms.js            # 房间边界数据（角色移动范围）
└── README.md               # 本文件
```

## 🧩 模块说明

| 文件 | 职责 | 修改场景 |
|------|------|----------|
| `css/style.css` | 视觉样式 | 调整颜色、字体、动画 |
| `js/svg-draw.js` | 绘图基础函数 | 改变线条风格、添加新图形类型 |
| `js/floors.js` | 楼层布局 | 增删房间、调整位置 |
| `js/characters.js` | 角色配置 | 添加新角色、修改对话内容 |
| `js/chat.js` | 对话逻辑 | 改善 AI 匹配算法、添加新意图检测 |
| `data/rooms.js` | 移动边界 | 配合 floors.js 调整房间区域 |
| `js/app.js` | 主控制器 | 修改交互逻辑、UI 行为 |

## 🚀 运行

```bash
# 任意静态服务器即可，例如：
cd marauders-map
python3 -m http.server 8787
# 然后打开 http://localhost:8787
```

> ⚠️ 需要使用 HTTP 服务器（因为 ES Modules 不支持 file:// 协议）

## 🔧 技术栈

- 纯前端，零依赖
- HTML5 + CSS3 + ES Modules
- SVG 动态生成（手绘风格）
- Google Fonts（Cinzel Decorative、IM Fell English、Homemade Apple）

## 📝 添加新角色

在 `js/characters.js` 中的 `CHARS` 数组里添加新对象：

```javascript
{
  id: 'ginny',                    // 唯一ID
  n: 'Ginny Weasley',            // 英文名
  cn: '金妮·韦斯莱',              // 中文名
  h: 'gryffindor',               // 学院
  f: 3,                           // 所在楼层
  x: 350, y: 350,                // 初始坐标
  acts: ['...'],                  // 活动描述数组
  topics: [                       // 对话话题
    { keys: ['你好'], r: ['...'], greet: true },
    { keys: ['魁地奇'], r: ['...'] },
  ],
  _: ['兜底闲聊台词...']          // 无匹配时的回复
}
```

然后在 `AVATARS` 中添加对应头像配置即可。
