/**
 * rooms.js — 房间边界数据（角色移动范围）
 * 与 floors.js 中的布局对应，画布 1400×1100
 */
export const ROOM_BOUNDS = {
  1: [
    { x: 115, y: 145, w: 300, h: 210 },   // Great Hall
    { x: 460, y: 160, w: 180, h: 190 },   // Entrance Hall
    { x: 800, y: 165, w: 170, h: 68 },    // Trophy Room
    { x: 790, y: 290, w: 155, h: 82 },    // Staff Room
    { x: 100, y: 420, w: 230, h: 130 },   // Kitchen
    { x: 128, y: 612, w: 104, h: 106 },   // Hufflepuff
    { x: 340, y: 608, w: 120, h: 112 },   // Slytherin
    { x: 998, y: 170, w: 70, h: 58 },     // Filch
    { x: 990, y: 300, w: 140, h: 140 },   // Hospital Wing
    { x: 480, y: 500, w: 168, h: 158 },   // Courtyard
    { x: 975, y: 295, w: 80, h: 62 },     // Potions Store
    { x: 500, y: 640, w: 88, h: 68 },     // Snape's Office
    { x: 680, y: 500, w: 68, h: 105 },    // Clock Tower
    { x: 780, y: 410, w: 78, h: 58 },     // Caretaker
    { x: 595, y: 660, w: 105, h: 62 },    // Chamber hint area
  ],
  2: [
    { x: 100, y: 150, w: 180, h: 138 },   // Transfiguration
    { x: 370, y: 148, w: 160, h: 135 },   // Charms
    { x: 100, y: 398, w: 190, h: 132 },   // DADA
    { x: 370, y: 398, w: 170, h: 148 },   // Potions
    { x: 640, y: 142, w: 270, h: 78 },    // Library upper
    { x: 640, y: 225, w: 160, h: 115 },   // Library lower L
    { x: 800, y: 265, w: 108, h: 78 },    // Restricted Section
    { x: 118, y: 608, w: 85, h: 85 },     // Myrtle's
    { x: 978, y: 155, w: 115, h: 82 },    // McGonagall
    { x: 580, y: 398, w: 98, h: 75 },     // Herbology
    { x: 975, y: 265, w: 88, h: 58 },     // Flitwick
    { x: 612, y: 630, w: 148, h: 78 },    // Nick's Hall
    { x: 270, y: 620, w: 58, h: 45 },     // W.C.
    { x: 370, y: 590, w: 72, h: 52 },     // Storage
  ],
  3: [
    { x: 115, y: 195, w: 190, h: 190 },   // Gryffindor Tower
    { x: 168, y: 458, w: 84, h: 80 },     // Gryffindor Dorm
    { x: 515, y: 178, w: 170, h: 165 },   // Ravenclaw Tower
    { x: 562, y: 418, w: 76, h: 74 },     // Ravenclaw Dorm
    { x: 805, y: 208, w: 130, h: 125 },   // Astronomy Tower
    { x: 840, y: 398, w: 60, h: 60 },     // Owlery
    { x: 1010, y: 225, w: 100, h: 100 },  // Headmaster's Office
    { x: 362, y: 575, w: 178, h: 85 },    // Room of Requirement
    { x: 108, y: 440, w: 68, h: 58 },     // Gryffindor Common Room
    { x: 365, y: 118, w: 70, h: 58 },     // Divination
    { x: 1118, y: 340, w: 68, h: 58 },    // Deputy Head
    { x: 692, y: 412, w: 56, h: 56 },     // Prefect Bath
    { x: 712, y: 580, w: 78, h: 62 },     // Mirror of Erised
  ],
  4: [
    { x: 588, y: 162, w: 84, h: 76 },     // Hagrid's Hut
    { x: 575, y: 325, w: 310, h: 275 },   // Forbidden Forest
    { x: 115, y: 435, w: 400, h: 165 },   // Black Lake area
    { x: 952, y: 148, w: 165, h: 115 },   // Greenhouse
    { x: 958, y: 345, w: 65, h: 65 },     // Whomping Willow area
    { x: 220, y: 398, w: 78, h: 45 },     // Changing Rooms
    { x: 360, y: 398, w: 75, h: 38 },     // Stands
    { x: 1148, y: 518, w: 128, h: 78 },   // Hogsmeade
    { x: 1168, y: 638, w: 100, h: 58 },   // Shrieking Shack
    { x: 1148, y: 165, w: 62, h: 62 },    // Greenhouse 2
  ]
};
