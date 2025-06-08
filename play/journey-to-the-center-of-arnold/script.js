const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// INITIAL SETUP
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
updateCanvasSize();

const defaults = {
  paused: false,
  card: {
    width: 100,
    height: 160,
  },
  run: {
    roundsSurvived: 0,
    globsKlobbed: 0,
    gemsCollected: 0,
    mostCoinsHeld: 0,
    cardsPlayed: 0,
  },
  player: {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    speed: 2,
    maxHealth: 10,
    health: 10,
    gems: 0,
    levelThreshold: 50,
    coins: 0,
    handSize: 5,
    size: 20,
    pickupRange: 100,
    upgrades: {
      damage: 1,
      roundLength: 1,
    },
    iframes: 0,
    controls: {
      active: false,
      x: 0,
      y: 0,
    },
    keys: [false, false, false, false],
  },
};

const upgrades = [
  {
    title: "Caffeine",
    description: "+10% movement speed",
    onClick: () => { player.speed *= 1.1; closeMenu(); },
  },
  {
    title: "Calcium",
    description: "+5 health",
    onClick: () => { player.health += 5; closeMenu(); },
  },
  {
    title: "Absorption",
    description: "+10% pickup range",
    onClick: () => { player.pickupRange *= 1.1; closeMenu(); },
  },
  {
    title: "Protein",
    description: "+10% damage",
    onClick: () => { player.upgrades.damage *= 1.1; closeMenu(); },
  },
  {
    title: "Hand size",
    description: "Hold 1 more card in hand",
    onClick: () => { player.handSize += 1; draw(1); closeMenu(); },
  },
  {
    title: "Round duration",
    description: "Rounds last 10% longer",
    onClick: () => { player.upgrades.roundLength += 0.1; closeMenu(); }
  }
];

let run = { ...defaults.run };
let player = { ...defaults.player };

const palettes = [
  {
    bg0: "#330000",
    bg1: "#4B0000",
    bg2: "#770000",
    nest: "red",
    enemy: "pink",
    bullet: "yellow",
    highlight: "yellow", 
  },
  {
    bg0: "#003D0E",
    bg1: "#006417",
    bg2: "#00801E",
    nest: "teal",
    enemy: "lightgreen",
    bullet: "gold",
    highlight: "red",
  },
  {
    bg0: "#53420C",
    bg1: "#745B0A",
    bg2: "#A37F0A",
    nest: "orange",
    enemy: "gold",
    bullet: "white",
    highlight: "black",
  },
];

const round = {
  number: 0,
  seconds: 30,
  left: 30,
  startedAt: 0,
  palette: palettes[0],
};

const menu = {
  visible: false,
  title: "",
  options: [],
  shoptions: [],
  timeOpened: 0,
  onLoad: () => {},
};

const menus = {
  newGame: {
    title: "New Game",
    options: [
      [
        {
          title: "Melee Deck",
          onClick: () => {
            loadStarterDeck(starterDecks.melee);
            startRound(1);
          },
        },
      ],
      [
        {
          title: "Ranged Deck",
          onClick: () => {
            loadStarterDeck(starterDecks.ranged);
            startRound(1);
          },
        },
      ],
      [
        {
          title: "Bombs Deck",
          onClick: () => {
            loadStarterDeck(starterDecks.bombs);
            startRound(1);
          },
        },
      ],
    ],
    onLoad: () => {
      round.number = 0;
      run = { ...defaults.run };
      player = { ...defaults.player };
    },
  },
  paused: {
    title: "Paused",
    options: [
      [
        {
          title: "Resume",
          onClick: () => closeMenu(),
        },
      ],
      [],
      [
        {
          title: "End Run",
          onClick: () => {
            player.health = -1;
            closeMenu();
          },
        },
      ],
    ],
    onLoad: () => {
      displayPlayerResources(1);
    },
  },
  endOfRound: {
    title: "End of Round",
    options: [
      [],
      [],
      [
        {
          title: "Next Round",
          onClick: () => startRound(round.number + 1),
        },
      ],
    ],
    onLoad: () => {
      menu.title = `You Cleared Round ${round.number}!`;
      displayPlayerResources(0);
      reloadShop();
      displayShop(1);
    },
  },
  endOfRun: {
    title: "Defeat...",
    options: [
      [],
      [],
      [],
      [],
      [{ title: "New Game", onClick: () => openMenu(menus.newGame) }],
    ],
    onLoad: () => {
      menu.options[0] = [
        { title: `${run.roundsSurvived} Rounds` },
      ];
      menu.options[1] = [
        { title: `Peaked at ${run.mostCoinsHeld} Coins` },];
      menu.options[2] = [
        { title: `Played ${run.cardsPlayed} Cards` },
        { title: `Beat ${run.globsKlobbed} Enemies` },
      ];
      menu.options[3] = [
        { title: `Collected ${run.gemsCollected} Gems` },
      ]
    },
  },
  levelUp : {
    title: "Level up!",
    options: [
      [{ title: "Select an upgrade:" }],
      [],
      [],
    ],
    onLoad: () => {
      menu.options[1] = [];
      menu.options[2] = [];
      player.gems = 0;
      player.levelThreshold *= 1.1;
      const options = [];
      let possible = [...upgrades];
      for (let i = 1; i <= 4; i++) {
        const sel = possible[Math.floor(Math.random() * possible.length)];
        menu.options[Math.ceil(i/2)].push({...sel});
        possible = possible.filter((p) => p != sel);
      }
    }
  }
};

function reloadShop() {
  menu.shoptions = [];
  for (let i = 0; i < 3; i++) {
    menu.shoptions.push(allCards[Math.floor(Math.random() * allCards.length)]);
  }
}

function displayShop(row = 1) {
  menu.options[row] = menu.shoptions.map((opt, index) => {
    if (!opt.name) return {};
    return {
      title: `${opt.name} ($${opt.value})`,
      onClick: () => {
        if (player.coins >= opt.value) {
          player.coins -= opt.value;
          deck.cards.push({ ...opt });
          menu.shoptions[index] = [];
          displayPlayerResources(row - 1);
          displayShop(row);
        }
      },
    };
  });
}

function displayPlayerResources(row = 1) {
  menu.options[row] = [
    {
      title: `💎 ${player.gems}/${player.levelThreshold}`,
    },
    {
      title: `$${player.coins}`,
    },
  ];
}

const cursor = {
  x: 0,
  y: 0,
  clicked: false,
  canSelect: true,
};

const enemy = {
  nests: [],
  all: [],
};
let newNest;

// WHAT THE PLAYER SHOOTS
let bullets = [];

// EVERY CARD IN THE GAME
const allCards = [
  {
    name: "🔫",
    value: 1,
  },
  {
    name: "🗡️",
    value: 2,
  },
  {
    name: "💣",
    value: 3,
  },
  {
    name: "🧲",
    value: 5,
  },
];

// STARTER DECKS
const starterDecks = {
  ranged: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3],
  melee: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  bombs: [2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3],
};

// THINGS THE PLAYER CAN GET
const pickups = {
  gems: [],
  coins: [],
};
const lootTypes = [
  {
    type: "coins",
    value: 1,
    size: 10,
    weight: 5,
  },
  {
    type: "gems",
    value: 1,
    size: 15,
    weight: 10,
  },
];
const loot = [];
lootTypes.forEach((t) => {
  for (let i = 0; i < t.weight; i++) {
    loot.push({ ...t });
  }
});

// CARDS IN THE PLAYER'S DECK
const deck = {
  x: canvasWidth - defaults.card.width - 10,
  y: canvasHeight - defaults.card.height / 2,
  cards: [],
};

// THE PLAYER'S HAND
const hand = {
  x: canvasWidth / 2,
  y: canvasHeight - defaults.card.height,
  hovering: -1,
  cards: [],
};

// THE PLAYER'S DISCARDED CARDS THIS GAME
const discards = [];

// EVERY FRAME
function game() {
  // LOOT
  for (const gem of pickups.gems) {
    lootCollisions(gem);
    if (gem.active) move(gem, angle(gem, player), distance(gem, player) / 12);
    if (distance(gem, player) < player.size) {
      player.gems += gem.value;
      pickups.gems = pickups.gems.filter((g) => g !== gem);
      run.gemsCollected++;
      if (player.gems >= player.levelThreshold) openMenu(menus.levelUp);
    }
  }
  for (const coin of pickups.coins) {
    lootCollisions(coin);
    if (coin.active)
      move(coin, angle(coin, player), distance(coin, player) / 10);
    if (distance(coin, player) < player.size) {
      player.coins += coin.value;
      pickups.coins = pickups.coins.filter((c) => c !== coin);
      if (player.coins > run.mostCoinsHeld) run.mostCoinsHeld = player.coins;
    }
  }

  // BULLETS
  for (const bullet of bullets) {
    bulletCollisions(bullet);
    if (bullet.seeking) {
      const closestEnemy = enemy.all.sort(
        (a, b) => distance(bullet, a) - distance(bullet, b)
      )[0];
      if (closestEnemy) bullet.angle = angle(bullet, closestEnemy);
    }
    if (bullet.angle && bullet.speed) move(bullet, bullet.angle, bullet.speed);
    if (bullet.sticky) {
      if (bullet.speed > 0) {
        move(player, bullet.angle, bullet.speed);
      }
      bullet.x = player.x;
      bullet.y = player.y;
    }
    bullet.life--;
    if (bullet.life <= 0) bullets = bullets.filter((b) => b !== bullet);
  }

  // ENEMY SPAWN POINTS
  for (const nest of enemy.nests) {
    nest.timer--;
    if (nest.timer <= 0) {
      while (nest.enemies > 0) {
        const bigness = Math.min(
          Math.max(1, round.number - 5),
          Math.ceil(Math.random() * nest.enemies)
        );
        enemy.all.push({
          x: nest.x + Math.random(),
          y: nest.y + Math.random(),
          size: 15 * bigness,
          speed: 1 / bigness,
          life: bigness,
          damage: bigness,
          iframes: 0,
          loot: bigness,
        });
        nest.enemies -= bigness;
      }
      enemy.nests = enemy.nests.filter((n) => n !== nest);
      newNest = setTimeout(function () {
        createNest();
      }, 2500 - (round.number * 250) );
    }
  }
  // ENEMIES
  for (const en of enemy.all) {
    if (en.iframes > 0) en.iframes--;
    if (distance(en, player) > player.size + en.size) {
      move(en, angle(en, player), en.speed);
    } else if (player.iframes == 0) {
      player.health -= en.damage;
      player.iframes = 60;
    }
    enemyCollisions(en);
    if (en.life <= 0) {
      drop(en.loot, en.x, en.y);
      enemy.all = enemy.all.filter((e) => e !== en);
      run.globsKlobbed++;
    }
  }

  // MOVE THE PLAYER
  if (player.iframes > 0) player.iframes--;
  if (player.health <= 0) endRound();
  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  if (player.x > canvasWidth) player.x = canvasWidth;
  if (player.y > canvasHeight) player.y = canvasHeight;
  if (player.controls.active) {
    move(
      player,
      angle(player.controls, cursor),
      Math.min(distance(player.controls, cursor) / 10, player.speed)
    );
  }
  for (const [index, key] of player.keys.entries()) {
    if (key) move(player, (Math.PI * index) / 2, player.speed);
  }

  // UPDATE THE TIMER
  round.left =
    round.seconds - Math.round((Date.now() - round.startedAt) / 1000);
  if (round.left <= 0) endRound();

  renderGame();
  if (!menu.visible) window.requestAnimationFrame(game);
}

// RENDER ALL THE THINGS
function renderGame() {
  hand.x = canvasWidth / 2;
  hand.y = canvasHeight - defaults.card.height * 0.8;
  const gap = canvasWidth / 100;
  defaults.card.width = Math.min(100, canvasWidth / 10 - gap);
  defaults.card.height = defaults.card.width * 1.5;

  // BACKGROUND
  ctx.fillStyle = round.palette.bg0;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight + 1);
  renderBackground();

  // NESTS
  for (const nest of enemy.nests) {
    renderCircle(
      nest.x,
      nest.y,
      50 * (Math.max(300 - nest.timer) / 300),
      round.palette.nest,
      false
    );
    renderCircle(nest.x, nest.y, 50, round.palette.nest, true);
  }

  // PICKUPS
  for (const coin of pickups.coins) {
    renderCircle(coin.x, coin.y, coin.size, "gold", false);
  }
  for (const gem of pickups.gems) {
    renderDiamond(gem.x, gem.y, gem.size, "yellow", false);
  }

  // BULLETS
  for (const bullet of bullets) {
    renderCircle(bullet.x, bullet.y, bullet.size, round.palette.bullet, false);
  }

  // ENEMIES
  for (const en of enemy.all)
    renderCircle(en.x, en.y, en.size, round.palette.enemy, en.iframes % 5 != 0);

  // LINE BETWEEN PLAYER AND CURSOR
  if(!cursor.clicked && !menu.visible) {
    ctx.strokeStyle = round.palette.highlight;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(cursor.x, cursor.y);
    ctx.closePath();
    ctx.stroke();
  }
  
  // PLAYER
  renderCircle(
    player.x,
    player.y,
    player.size,
    "lightgrey",
    player.iframes % 5 != 0
  );

  // DECK
  text(
    "deck",
    canvasWidth - gap - (defaults.card.width/2),
    deck.y - 8,
    16,
    "white"
  )
  deck.x = canvasWidth - defaults.card.width - gap;
  deck.y = canvasHeight - defaults.card.height / 2 + gap;
  renderCard({
    x: deck.x,
    y: deck.y,
    name: deck.cards.length,
  });

  // HEALTH
  text(
    "health",
    gap + (defaults.card.width/2),
    deck.y - 8,
    16,
    "red"
  )
  renderCard({
    x: gap,
    y: deck.y,
    name: player.health,
    background: "red",
    foreground: "white",
  });

  // CARDS
  if(!menu.visible) {
    for (const [index, card] of hand.cards.entries()) {
      if(!card.played) {
        card.target.x =
          hand.x -
          (hand.cards.length / 2) * (defaults.card.width + gap) +
          index * (defaults.card.width + gap);
        card.target.y = card.selected ? hand.y - defaults.card.height / 3 : hand.y;
      }
      if (distance(card, card.target) <= 1) {
        card.x = card.target.x;
        card.y = card.target.y;
      } else {
        move(card, angle(card, card.target), distance(card, card.target) / 10);
      }
      if (card.x < -1 * defaults.card.width) {
        discardCard(card);
      }
      renderCard(card);
    }
  }

  // CONTROLS
  if (player.controls.active) {
    renderCircle(
      player.controls.x,
      player.controls.y,
      50,
      "rgba(255,255,255,0.5)",
      false
    );
  }

  //TIMER
  if (round.left && !menu.visible) {
    ctx.font = `${defaults.card.height / 3}px monospace`;
    ctx.fillStyle = round.palette.highlight;
    ctx.fillText(round.left, canvasWidth / 2, defaults.card.height / 2.5);
  }

  // CURSOR
  if (hand.cards.filter((c) => c.selected).length) {
    renderDiamond(cursor.x, cursor.y, 15, round.palette.highlight, false);
  } else {
    const fakeCursor = { ...cursor };
    if (player.controls.active) {
      fakeCursor.x = player.controls.x;
      fakeCursor.y = player.controls.y;
      move(
        fakeCursor,
        angle(player.controls, cursor),
        Math.min(distance(player.controls, cursor), 40)
      );
    }
    renderCircle(fakeCursor.x, fakeCursor.y, 10, "white", !cursor.clicked);
  }
}

// DISPLAY MENU WHEN PAUSED
let menuFrame = 0;
function paused() {
  menuFrame++;
  if (round.number > 0) {
    renderGame();
  } else {
    if (menuFrame%2==0) renderBackground();
  }

  const menuWidth = Math.min(400, canvasWidth * 0.9);
  const menuHeight = canvasHeight - 120;
  const menuX = canvasWidth / 2 - menuWidth / 2;
  const menuY = canvasHeight / 2 - menuHeight / 2 + 10;
  
  ctx.lineWidth = 3;
  ctx.fillStyle = round.palette.highlight;
  ctx.strokeStyle = "white";
  ctx.font = "50px monospace bold";
  ctx.textAlign = "center";
  ctx.fillText(menu.title, canvasWidth / 2, menuY - 10);

  // MENU BUTTONS
  const gap = 10;
  for (const [i, row] of menu.options.entries()) {
    const rowHeight = (menuHeight / menu.options.length) - gap;
    const rowY = menuY + (rowHeight * i) + (gap * i); 
    for (const [j, item] of row.entries()) {
      ctx.fillStyle = "black";
      if (!item.title) continue;
      const itemWidth = menuWidth / row.length - gap + gap / row.length;
      const itemX = menuX + itemWidth * j + gap * j;
      if (
        cursor.x > itemX &&
        cursor.x < itemX + itemWidth &&
        cursor.y > rowY &&
        cursor.y < rowY + rowHeight
      ) {
        if (item.onClick && cursor.clicked && cursor.canSelect) {
          item.onClick();
          cursor.canSelect = false;
        } else {
          if (item.onClick) {
            ctx.fillStyle = round.palette.bg2;
          } else {
            ctx.fillStyle = "black";
          }
        }
      }
      const offX = i%2==0 ? 1 : -1;
      const offY = i > row.length/1 ? 1 : -1;
      ctx.beginPath()
      ctx.roundRect(itemX + offX, rowY + offY, itemWidth, rowHeight, gap * 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      text(
        item.title, 
        itemX + itemWidth / 2, 
        rowY + rowHeight / 2,
        rowHeight / 6,
        "white"
      );
    }
  }

  if (
    round.number == 0 ||
    (cursor.x > menuX &&
      cursor.x < menuX + menuWidth &&
      cursor.y > menuY &&
      cursor.y < menuY + menuHeight)
  )
    renderCircle(cursor.x, cursor.y, 10, "white", !cursor.clicked);

  if (menu.visible) window.requestAnimationFrame(paused);
}

// PLAY ONE OR MORE CARDS FROM YOUR HAND
function play() {
  hand.hovering -= 1;
  const playedCards = [...hand.cards.filter((card) => card.selected)];
  for (const card of hand.cards) {
    if (card.selected) {
      run.cardsPlayed++;
      card.played = true;
      card.target.x = -1.2 * defaults.card.width;
      card.target.y = canvasHeight;
    }
  }

  const bullet = {
    x: cursor.x,
    y: cursor.y,
    sticky: false,
    angle: Math.random() * 360,
    projectiles: 1,
    size: 10,
    speed: 0,
    damage: 1,
    passthrough: false,
    regen: false,
    seeking: false,
    life: 30,
  };

  for (const card of playedCards) {
    switch (card.name) {
      case "🔫":
        (bullet.projectiles = playedCards.filter((c) => c.name == "🔫").length),
          (bullet.x = player.x);
        bullet.y = player.y;
        bullet.speed = 3;
        bullet.life += 120;
        bullet.angle = angle(player, cursor);
        break;
      case "🗡️":
        bullet.sticky = true;
        bullet.damage += 1;
        bullet.passthrough = true;
        bullet.life += 60;
        bullet.size = Math.max(bullet.size, player.size + 10);
        break;
      case "💣":
        bullet.size += 20;
        bullet.damage += 10;
        bullet.life += 10;
        bullet.passthrough = true;
        break;
      case "🧲":
        bullet.speed = Math.max(bullet.speed, 1);
        bullet.passthrough = true;
        bullet.seeking = true;
        break;
      default:
        continue;
    }
  }
  
  bullet.damage *= player.upgrades.damage;

  for (let i = 0; i < bullet.projectiles; i++) {
    setTimeout(() => {
      bullets.push({ ...bullet });
    }, 200 * i);
  }
}

// DRAW A CARD FROM THE DECK
function draw(n) {
  for (let i = 0; i < n; i++) {
    const card = deck.cards.pop();
    if (card)
      hand.cards.push({
        ...card,
        target: { x: 0, y: 0 },
        x: canvasWidth,
        y: canvasHeight,
      });
  }
}

// REMOVE A CARD FROM THE HAND 
function discardCard(card) {
  discards.push({ ...card, selected: false, played: false });
  hand.cards = hand.cards.filter((c) => c != card);
  draw(1);
}

// DRAW UNTIL THE HAND IS FULL
function fillHand() {
  const n = player.handSize - hand.cards.length;
  if (n > 0) draw(n);
}

// LOAD A STARTER DECK
function loadStarterDeck(d) {
  for (const c of d) {
    deck.cards.push({ ...allCards[c] });
  }
}

// CREATE A NEW NEST OF ENEMIES
function createNest() {
  enemy.nests.push({
    x: Math.max(50, Math.random() * (canvasWidth - 50)),
    y: Math.max(50, Math.random() * (hand.y - 50)),
    timer: 300,
    enemies: Math.ceil(Math.random() * 10) + 5,
  });
}

// MOVE AN OBJECT IN A DIRECTION AT A SPEED
function move(o, a, s) {
  o.x += Math.cos(a) * s;
  o.y += Math.sin(a) * s;
}

// FIND THE ANGLE BETWEEN TWO OBJECTS
function angle(from, to) {
  const a = from || { x: 0, y: 0 };
  const b = to || { x: 0, y: 0 };
  return Math.atan2(b.y - a.y, b.x - a.x);
}

// FIND THE DISTANCE BETWEEN TWO OBJECTS
function distance(from, to) {
  return Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
}

// HANDLE COLLISIONS FOR ENEMIES
function enemyCollisions(o) {
  const ec = enemy.all.filter(
    (e) => distance(o, e) < o.size + e.size && e !== o
  );
  ec.forEach((e) => {
    move(o, angle(e, o), o.size + e.size - distance(o, e));
  });
  const bc = bullets.filter((b) => distance(b, o) < o.size + b.size);
  bc.forEach((b) => {
    if (!b.passthrough) b.life = 0;
    if (o.iframes <= 0) {
      o.life -= b.damage;
      o.iframes = 30;
    }
  });
}

// HANDLE COLLISIONS FOR BULLETS
function bulletCollisions(o) {
  const bc = bullets.filter((b) => distance(b, o) < o.size + b.size && b != o);
  bc.forEach((e) => {
    move(o, angle(e, o), o.size + e.size - distance(o, e));
  });
  const r = Math.PI * 0; //right
  const d = Math.PI * 0.5; //down
  const l = Math.PI * 1; //left
  const u = Math.PI * 1.5; //up
  if (o.y <= 0 && (o.angle >= l || o.angle <= r)) o.angle *= -1; //up
  if (o.y >= canvasHeight && (o.angle <= l || o.angle >= r)) o.angle *= -1; //down
  if (o.x <= 0 && (o.angle <= u || o.angle >= d)) o.angle = Math.PI - o.angle; //left
  if (o.x >= canvasWidth && (o.angle <= d || o.angle >= u))
    o.angle = Math.PI - o.angle; //right
}

// LOOT DROPS WHEN ENEMIES DIE
function drop(n, x, y) {
  for (let i = 0; i < n; i++) {
    const d = loot[Math.floor(Math.random() * loot.length)];
    pickups[d.type].push({
      ...d,
      value:
        d.type == "cards"
          ? { ...allCards[Math.floor(Math.random() * allCards.length)] }
          : d.value,
      x: x + Math.random(),
      y: y + Math.random(),
      active: false,
    });
  }
}

// HANDLE COLLISIONS FOR DROPPED LOOT
function lootCollisions(o) {
  // GEMS MOVE OTHER LOOT OUT OF THE WAY
  const gc = pickups.gems.filter(
    (g) => distance(o, g) < g.size + o.size && g !== o
  );
  gc.forEach((g) => {
    move(o, angle(g, o), g.size + o.size - distance(o, g));
  });

  // COINS MOVE OTHER LOOT OUT OF THE WAY
  const co = pickups.coins.filter(
    (c) => distance(o, c) < c.size + o.size && c !== o
  );
  co.forEach((c) => {
    move(o, angle(c, o), c.size + o.size - distance(o, c));
  });

  if (!o.active && distance(player, o) < player.size + player.pickupRange)
    o.active = true;
}

// UPDATE THE CURSOR POSITION
function findCursor(e) {
  const rect = e.target.getBoundingClientRect();
  cursor.x = e.pageX - canvas.offsetLeft;
  cursor.y = e.pageY - rect.top;
  if (cursor.clicked) cursor.canSelect = false;

  for (const [index, card] of hand.cards.entries()) {
    if (
      cursor.x > card.x &&
      cursor.x < card.x + defaults.card.width &&
      cursor.y > card.y &&
      cursor.y < card.y + defaults.card.height
    ) {
      hand.hovering = index;
    }
  }
}

// TEXT DRAWING HELPER
function text(string, x, y, size=12, color="black") {
  ctx.fillStyle = color;
  ctx.font = `${size}px monospace`;
  ctx.textAlign = "center";
  ctx.fillText(
    string,
    x,
    y
  );
}

// RENDER A FULL-SIZED CARD
function renderCard(card) {
  ctx.fillStyle = card.background || "lightgrey";
  ctx.beginPath();
  ctx.roundRect(card.x, card.y, defaults.card.width, defaults.card.height, 10);
  ctx.closePath();
  ctx.fill();
  if (hand.cards[hand.hovering] == card) {
    ctx.strokeStyle = round.palette.highlight;
    ctx.lineWidth = 5;
    ctx.stroke();
  }
  text(
    card.name,
    card.x + defaults.card.width / 2,
    card.y + defaults.card.height / 3,
    defaults.card.height / 3,
    card.foreground || "black"
  );
  if (hand.cards[hand.hovering] == card) {
    ctx.strokeStyle = round.palette.highlight;
    ctx.lineWidth = 5;
    ctx.stroke();
  }
}

function selectHoveredCard() {
  if (hand.hovering > -1 && hand.hovering < hand.cards.length)
    hand.cards[hand.hovering].selected = !hand.cards[hand.hovering].selected;
}

function hoverOnCard(n) {
  if (n >= hand.cards.length) n = 0;
  if (n < 0) n = hand.cards.length;
  hand.hovering = n;
}

// SHUFFLE THE DISCARDS INTO THE DECK
function resetDeck() {
  while (discards.length > 0) {
    const card = discards.pop();
    deck.cards.push({ ...card, selected: false });
  }
  while (hand.cards.length > 0) {
    const card = hand.cards.pop();
    deck.cards.push({ ...card });
  }
  for (const card of deck.cards) {
    card.shuffle = Math.random();
  }
  deck.cards = deck.cards.sort((a, b) => a.shuffle - b.shuffle);
  fillHand();
}

// RENDER A DIAMOND SHAPE
function renderDiamond(x, y, r, c, s) {
  ctx.fillStyle = c;
  ctx.strokeStyle = c;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r * 0.75, y);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r * 0.75, y);
  ctx.lineTo(x, y - r);
  ctx.closePath();
  s ? ctx.stroke() : ctx.fill();
}

// RENDER A CIRCLE SHAPE
function renderCircle(x, y, r, c, s) {
  ctx.fillStyle = c;
  ctx.strokeStyle = c;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  s ? ctx.stroke() : ctx.fill();
}

// CREATE BACKGROUND BLOBBIES
let backgroundBlobbies = [];
function createBackground() {
  backgroundBlobbies = [];
  let side = ["top", "bottom", "left", "right"];
  let size = 8;
  let color = round.palette.bg1;
  for (let i = 0; i < 4; i++) {
    for (let ii = 0; ii <= size; ii++) {
      backgroundBlobbies.push({
        x:
          side[i] == "top"
            ? ii * (canvasWidth / size)
            : side[i] == "bottom"
            ? ii * (canvasWidth / size)
            : side[i] == "left"
            ? 0
            : canvasWidth,
        y:
          side[i] == "top"
            ? 0
            : side[i] == "bottom"
            ? canvasHeight
            : side[i] == "left"
            ? ii * (canvasWidth / size)
            : ii * (canvasWidth / size),
        size: canvasWidth / size,
        color: color,
        altX: Math.round(Math.random()),
        altY: Math.round(Math.random()),
      });
    }
  }
  size = 13;
  color = round.palette.bg2;
  for (let i = 0; i < 4; i++) {
    for (let ii = 0; ii <= size; ii++) {
      backgroundBlobbies.push({
        x:
          side[i] == "top"
            ? ii * (canvasWidth / size)
            : side[i] == "bottom"
            ? ii * (canvasWidth / size)
            : side[i] == "left"
            ? 0
            : canvasWidth,
        y:
          side[i] == "top"
            ? 0
            : side[i] == "bottom"
            ? canvasHeight
            : side[i] == "left"
            ? ii * (canvasWidth / size)
            : ii * (canvasWidth / size),
        size: canvasWidth / size,
        color: color,
        altX: Math.round(Math.random()),
        altY: Math.round(Math.random()),
      });
    }
  }
}

// RENDER BACKGROUND BLOBBIES
let blobbyFrame = 0;
function renderBackground() {
  ctx.fillStyle = round.palette.bg0;
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
  blobbyFrame++;
  for (const blobby of backgroundBlobbies) {
    renderCircle(blobby.x, blobby.y, blobby.size, blobby.color, false);
    if (blobbyFrame >= 5) {
      blobby.x = blobby.altX ? blobby.x + 2 : blobby.x - 2;
      blobby.y = blobby.altY ? blobby.y + 2 : blobby.y - 2;
      blobby.altX = !blobby.altX;
      blobby.altY = !blobby.altY;
    }
  }
  if (blobbyFrame >= 5) blobbyFrame = 0;
}

// OPEN MENU
function openMenu(m = menus.paused) {
  menu.visible = true;
  menu.title = m.title;
  menu.options = m.options;
  menu.timeOpened = Date.now();
  m.onLoad();
  window.requestAnimationFrame(paused);
}

// CLOSE MENU
function closeMenu() {
  menu.visible = false;
  round.startedAt += Date.now() - menu.timeOpened;
  window.requestAnimationFrame(game);
}

// BEGIN NEW ROUND
function startRound(n) {
  resetDeck();
  player.x = canvasWidth / 2;
  player.y = canvasHeight / 2;
  round.number = n;
  round.seconds = 30 * player.upgrades.roundLength;
  round.startedAt = Date.now();
  if (round.number > 1) round.palette = palettes[Math.floor(Math.random() * palettes.length)];
  createBackground();
  closeMenu();
  createNest();
  fillHand();
}

// END THE ROUND
function endRound() {
  for (const card in hand.cards) {
    card.selected = false;
  }
  clearTimeout(newNest);
  enemy.nests = [];
  enemy.all = [];
  bullets = [];
  pickups.gems = [];
  pickups.coins = [];
  if (player.health > 0) {
    player.gems = Math.round(player.gems);
    player.coins = Math.round(player.coins);
    run.roundsSurvived++;
    openMenu(menus.endOfRound);
  } else {
    deck.cards = [];
    hand.cards = [];
    round.number = 0;
    openMenu(menus.endOfRun);
  }
}

// HANDLE CLICK EVENTS
function mousedown(e) {
  e.preventDefault();
  if (!menu.visible) {
    let selectingCard = false;
    const selectedCards = hand.cards.filter((card) => card.selected);
    if (!cursor.clicked) {
      for (const [index, card] of hand.cards.entries()) {
        if (
          (card.selected || selectedCards.length < 5) &&
          cursor.x > card.x &&
          cursor.x < card.x + defaults.card.width &&
          cursor.y > card.y &&
          cursor.y < card.y + defaults.card.height
        ) {
          card.selected = !card.selected;
          selectingCard = true;
        }
      }
    }
    if (!selectingCard) {
      if (selectedCards.length > 0) play();
      player.controls.active = true;
      player.controls.x = cursor.x;
      player.controls.y = cursor.y;
    }
  }
  cursor.clicked = true;
}

// HANDLE UN-CLICK EVENTS
function mouseup(e) {
  cursor.clicked = false;
  cursor.canSelect = true;
  player.controls.active = false;
}

// HANDLE KEYBOARD EVENTS
function keydown(e) {
  const keys = ["Escape", " ", "w", "a", "s", "d", "q", "e"];

  if (!keys.includes(e.key)) return;

  e.preventDefault();

  if (e.key == "Escape") {
    if (menu.visible) {
      if (menu.title == "Paused") closeMenu();
    } else {
      openMenu();
    }
  }
  if (e.key == "d") player.keys[0] = true;
  if (e.key == "s") player.keys[1] = true;
  if (e.key == "a") player.keys[2] = true;
  if (e.key == "w") player.keys[3] = true;
  if (e.key == "e") hoverOnCard(hand.hovering + 1);
  if (e.key == "q") hoverOnCard(hand.hovering - 1);
  if (e.key == " ") selectHoveredCard();
}
function keyup(e) {
  if (e.key == "d") player.keys[0] = false;
  if (e.key == "s") player.keys[1] = false;
  if (e.key == "a") player.keys[2] = false;
  if (e.key == "w") player.keys[3] = false;
}

function updateCanvasSize() {
  const rect = canvas.getBoundingClientRect();
  canvasWidth = rect.width;
  canvasHeight = rect.height;

  const scale = 3;

  canvas.width = canvasWidth * scale;
  canvas.height = canvasHeight * scale;
  ctx.scale(scale, scale);
}

// SET UP EVENT LISTENERS
canvas.addEventListener("mousemove", findCursor);
canvas.addEventListener("mousedown", mousedown);
canvas.addEventListener("mouseup", mouseup);
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);
window.addEventListener("resize", updateCanvasSize);
window.addEventListener("load", updateCanvasSize);

// RUN THE GAME
createBackground();
openMenu(menus.newGame);
window.requestAnimationFrame(paused);
