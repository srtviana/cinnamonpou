const cinna = document.getElementById("cinna");
const room = document.getElementById("room");
const message = document.getElementById("message");
const effectsLayer = document.getElementById("effects-layer");
const dirtOverlay = document.getElementById("dirt-overlay");

const happinessBar = document.getElementById("happiness-bar");
const hungerBar = document.getElementById("hunger-bar");
const energyBar = document.getElementById("energy-bar");
const hygieneBar = document.getElementById("hygiene-bar");

const menuButtons = document.querySelectorAll(".menu-button");
const foodTray = document.getElementById("food-tray");
const bathTray = document.getElementById("bath-tray");
const sleepTray = document.getElementById("sleep-tray");
const foodItems = document.querySelectorAll(".food-item");
const bathItems = document.querySelectorAll(".bath-item");
const sleepAction = document.getElementById("sleep-action");

const stats = {
  happiness: 90,
  hunger: 80,
  energy: 100,
  hygiene: 90
};

const normalIdleFrames = [
  "assets/sprites/cinna-idle-1.PNG",
  "assets/sprites/cinna-idle-2.PNG",
  "assets/sprites/cinna-idle-3.PNG",
  "assets/sprites/cinna-idle-4.PNG"
];

const sadIdleFrames = [
  "assets/sprites/cinna-triste-1.PNG",
  "assets/sprites/cinna-triste-2.PNG",
  "assets/sprites/cinna-triste-3.PNG",
  "assets/sprites/cinna-triste-4.PNG"
];

const bathFrames = [
  "assets/sprites/cinna-banho-1.PNG",
  "assets/sprites/cinna-banho-2.PNG",
  "assets/sprites/cinna-banho-3.PNG",
  "assets/sprites/cinna-banho-4.PNG"
];

const foodSequences = {
  bolo: [
    "assets/sprites/cinna-bolo-1.PNG",
    "assets/sprites/cinna-bolo-2.PNG",
    "assets/sprites/cinna-bolo-3.PNG",
    "assets/sprites/cinna-bolo-4.PNG"
  ],
  maca: [
    "assets/sprites/cinna-maca-1.PNG",
    "assets/sprites/cinna-maca-2.PNG",
    "assets/sprites/cinna-maca-3.PNG",
    "assets/sprites/cinna-maca-4.PNG"
  ],
  morango: [
    "assets/sprites/cinna-morango-1.PNG",
    "assets/sprites/cinna-morango-2.PNG",
    "assets/sprites/cinna-morango-3.PNG",
    "assets/sprites/cinna-morango-4.PNG"
  ],
  leite: [
    "assets/sprites/cinna-leite-1.PNG",
    "assets/sprites/cinna-leite-2.PNG"
  ]
};

const sleepingFrame = "assets/sprites/cinna-dormindo.PNG";

const dirtFrames = [
  "assets/sprites/sujeira-1.PNG",
  "assets/sprites/sujeira-2.PNG",
  "assets/sprites/sujeira-3.PNG"
];

const effectAssets = {
  heart: "assets/sprites/coracao.PNG",
  bubble: "assets/sprites/bolha.PNG",
  zzz: "assets/sprites/zzz.PNG"
};

let currentRoom = "home";
let idleInterval = null;
let dirtInterval = null;
let currentIdleFrameIndex = 0;
let dirtFrameIndex = 0;
let isPlayingAction = false;
let isSleeping = false;
let sleepTimeout = null;

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function isAnyNeedLow() {
  return (
    stats.happiness < 45 ||
    stats.hunger < 45 ||
    stats.energy < 45 ||
    stats.hygiene < 45
  );
}

function getCurrentIdleFrames() {
  if (isSleeping) {
    return [sleepingFrame];
  }

  if (isAnyNeedLow()) {
    return sadIdleFrames;
  }

  return normalIdleFrames;
}

function stopIdleAnimation() {
  clearInterval(idleInterval);
  idleInterval = null;
}

function startIdleAnimation() {
  if (isPlayingAction) return;

  stopIdleAnimation();

  const frames = getCurrentIdleFrames();
  currentIdleFrameIndex = 0;
  cinna.src = frames[0];

  if (frames.length === 1) {
    return;
  }

  idleInterval = setInterval(() => {
    const currentFrames = getCurrentIdleFrames();
    currentIdleFrameIndex = (currentIdleFrameIndex + 1) % currentFrames.length;
    cinna.src = currentFrames[currentIdleFrameIndex];
  }, 260);
}

function playSequence(frames, speed = 220, onComplete = null) {
  if (!frames || frames.length === 0) return;
  if (isPlayingAction) return;

  isPlayingAction = true;
  stopIdleAnimation();

  let index = 0;
  cinna.src = frames[index];

  const sequenceInterval = setInterval(() => {
    index++;

    if (index >= frames.length) {
      clearInterval(sequenceInterval);
      isPlayingAction = false;

      if (typeof onComplete === "function") {
        onComplete();
      }

      startIdleAnimation();
      return;
    }

    cinna.src = frames[index];
  }, speed);
}

function updateBars() {
  happinessBar.style.width = `${stats.happiness}%`;
  hungerBar.style.width = `${stats.hunger}%`;
  energyBar.style.width = `${stats.energy}%`;
  hygieneBar.style.width = `${stats.hygiene}%`;

  updateDirtState();

  if (!isPlayingAction && !isSleeping) {
    startIdleAnimation();
  }
}

function setMessage(text) {
  message.textContent = text;
}

function showTray(roomName) {
  foodTray.hidden = roomName !== "kitchen";
  bathTray.hidden = roomName !== "bathroom";
  sleepTray.hidden = roomName !== "bedroom";
}

function setRoomVisual(roomName) {
  room.classList.remove(
    "room-home",
    "room-kitchen",
    "room-bathroom",
    "room-bedroom",
    "room-games"
  );

  const roomMap = {
    home: "room-home",
    kitchen: "room-kitchen",
    bathroom: "room-bathroom",
    bedroom: "room-bedroom",
    games: "room-games"
  };

  room.classList.add(roomMap[roomName]);
}

function setActiveMenuButton(roomName) {
  menuButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.room === roomName);
  });
}

function switchRoom(roomName) {
  currentRoom = roomName;
  showTray(roomName);
  setRoomVisual(roomName);
  setActiveMenuButton(roomName);

  if (roomName === "home") {
    setMessage("Cinna está esperando você ♡");
  }

  if (roomName === "kitchen") {
    setMessage("O que vamos comer? 🍰");
  }

  if (roomName === "bathroom") {
    setMessage("Hora do banho! 🫧");
  }

  if (roomName === "bedroom") {
    setMessage("Hora de descansar... 💡");
  }

  if (roomName === "games") {
    setMessage("Vamos brincar um pouco? 🎮");
  }
}

function createEffect(type, count = 1) {
  const src = effectAssets[type];
  if (!src) return;

  for (let i = 0; i < count; i++) {
    const effect = document.createElement("img");
    effect.src = src;
    effect.classList.add("effect");

    if (type === "heart") {
      effect.classList.add("effect-heart");
    }

    if (type === "bubble") {
      effect.classList.add("effect-bubble");
    }

    if (type === "zzz") {
      effect.classList.add("effect-zzz");
    }

    const left = 38 + Math.random() * 24;
    const top = 48 + Math.random() * 18;
    const size = 24 + Math.random() * 16;

    effect.style.left = `${left}%`;
    effect.style.top = `${top}%`;
    effect.style.width = `${size}px`;
    effect.style.height = `${size}px`;

    effectsLayer.appendChild(effect);

    setTimeout(() => {
      effect.remove();
    }, 2000);
  }
}

function startDirtAnimation() {
  if (dirtInterval) return;

  dirtOverlay.hidden = false;
  dirtOverlay.src = dirtFrames[0];
  dirtFrameIndex = 0;

  dirtInterval = setInterval(() => {
    dirtFrameIndex = (dirtFrameIndex + 1) % dirtFrames.length;
    dirtOverlay.src = dirtFrames[dirtFrameIndex];
  }, 240);
}

function stopDirtAnimation() {
  clearInterval(dirtInterval);
  dirtInterval = null;
  dirtFrameIndex = 0;
  dirtOverlay.hidden = true;
  dirtOverlay.src = dirtFrames[0];
}

function updateDirtState() {
  if (stats.hygiene < 40) {
    startDirtAnimation();
  } else {
    stopDirtAnimation();
  }
}

function updateAllStats(delta = {}) {
  if (typeof delta.happiness === "number") {
    stats.happiness = clamp(stats.happiness + delta.happiness);
  }

  if (typeof delta.hunger === "number") {
    stats.hunger = clamp(stats.hunger + delta.hunger);
  }

  if (typeof delta.energy === "number") {
    stats.energy = clamp(stats.energy + delta.energy);
  }

  if (typeof delta.hygiene === "number") {
    stats.hygiene = clamp(stats.hygiene + delta.hygiene);
  }

  updateBars();
}

function wakeUp() {
  isSleeping = false;
  clearTimeout(sleepTimeout);
  sleepTimeout = null;
  startIdleAnimation();
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchRoom(button.dataset.room);
  });
});

cinna.addEventListener("click", () => {
  if (isPlayingAction || isSleeping) return;

  updateAllStats({
    happiness: 4
  });

  createEffect("heart", 1 + Math.floor(Math.random() * 2));
  setMessage("Cinna gostou do carinho ♡");
});

foodItems.forEach((button) => {
  button.addEventListener("click", () => {
    if (isPlayingAction || isSleeping) return;

    const food = button.dataset.food;
    const value = Number(button.dataset.value || 0);
    const sequenceName = button.dataset.sequence;
    const frames = foodSequences[sequenceName];

    updateAllStats({
      hunger: value,
      happiness: 3
    });

    setMessage(`Cinna amou ${food}! ✨`);

    playSequence(frames, 220, () => {
      setMessage(`Cinna terminou de comer ${food}! ♡`);
    });
  });
});

bathItems.forEach((button) => {
  button.addEventListener("click", () => {
    if (isPlayingAction || isSleeping) return;

    const care = button.dataset.care;
    const value = Number(button.dataset.value || 0);

    updateAllStats({
      hygiene: value,
      happiness: 2
    });

    createEffect("bubble", 4);

    setMessage(`Cinna ficou limpinho com ${care}! 🫧`);

    playSequence(bathFrames, 220, () => {
      setMessage("Cinna está cheirosinho e limpinho! 🫧");
    });
  });
});

sleepAction.addEventListener("click", () => {
  if (isPlayingAction || isSleeping) return;

  isSleeping = true;
  stopIdleAnimation();
  cinna.src = sleepingFrame;

  setMessage("Shhh... Cinna está dormindo... 💤");

  createEffect("zzz", 3);

  sleepTimeout = setTimeout(() => {
    updateAllStats({
      energy: 40,
      happiness: 5
    });

    wakeUp();
    setMessage("Cinna acordou descansado! ☀️⚡");
  }, 3200);
});

setInterval(() => {
  if (isSleeping || isPlayingAction) return;

  updateAllStats({
    happiness: -1,
    hunger: -2,
    energy: -2,
    hygiene: -2
  });
}, 10000);

switchRoom("home");
updateBars();
startIdleAnimation();
