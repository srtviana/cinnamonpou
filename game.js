// ======================================================
// ᑕIᑎᑎᗩᗰOᑎᖇOᒪᒪ ☁️
// ======================================================


// ======================================================
// ELEMENTOS
// ======================================================

const character = document.querySelector("#cinna");
const message = document.querySelector("#message");
const room = document.querySelector(".room");

const effectLayer = document.querySelector("#effect-layer");
const dirtOverlay = document.querySelector("#dirt-overlay");

const menuButtons = document.querySelectorAll(".menu-button");

const happinessBar = document.querySelector("#happiness-bar");
const hungerBar = document.querySelector("#hunger-bar");
const energyBar = document.querySelector("#energy-bar");
const hygieneBar = document.querySelector("#hygiene-bar");

const foodTray = document.querySelector("#food-tray");
const foodItems = document.querySelectorAll(".food-item");

const bathTray = document.querySelector("#bath-tray");
const bathItems = document.querySelectorAll(".bath-item");

const sleepTray = document.querySelector("#sleep-tray");
const sleepButton = document.querySelector("#sleep-button");


// ======================================================
// CENÁRIOS — DIA / NOITE
// ======================================================

const sceneBackgrounds = {
  home: {
    day: "assets/scenarios/inicio-dia.PNG",
    night: "assets/scenarios/inicio-noite.PNG"
  },

  kitchen: {
    day: "assets/scenarios/cozinha-dia.PNG",
    night: "assets/scenarios/cozinha-noite.PNG"
  },

  bathroom: {
    day: "assets/scenarios/banheiro.PNG",
    night: "assets/scenarios/banheiro.PNG"
  },

  bedroom: {
    day: "assets/scenarios/quarto-dia.PNG",
    night: "assets/scenarios/quarto-noite.PNG"
  },

  games: {
    day: "assets/scenarios/jogos-dia.PNG",
    night: "assets/scenarios/jogos-noite.PNG"
  }
};

function getTimePeriod() {
  const hour = new Date().getHours();

  // 06:00 até 17:59 = dia
  if (hour >= 6 && hour < 18) {
    return "day";
  }

  // 18:00 até 05:59 = noite
  return "night";
}

function updateRoomBackground() {
  const currentRoom = room.dataset.room || "home";
  const period = getTimePeriod();

  const scene =
    sceneBackgrounds[currentRoom]?.[period] ||
    sceneBackgrounds[currentRoom]?.day;

  if (!scene) {
    return;
  }

  room.style.backgroundImage = `url("${scene}")`;
  room.style.backgroundSize = "100% 100%";
  room.style.backgroundPosition = "center";
  room.style.backgroundRepeat = "no-repeat";
}


// ======================================================
// ESTADOS
// ======================================================

let isSleeping = false;
let isPlayingAction = false;

let sleepInterval = null;
let sleepEffectInterval = null;
let dirtInterval = null;

let animationStep = 0;
let dirtStep = 0;
let lastMood = "idle";


// ======================================================
// SPRITES
// ======================================================

const idleFrames = [
  "assets/sprites/cinna-idle-1.PNG",
  "assets/sprites/cinna-idle-2.PNG",
  "assets/sprites/cinna-idle-3.PNG",
  "assets/sprites/cinna-idle-4.PNG"
];

const sadFrames = [
  "assets/sprites/cinna-triste-1.PNG",
  "assets/sprites/cinna-triste-2.PNG",
  "assets/sprites/cinna-triste-3.PNG",
  "assets/sprites/cinna-triste-4.PNG"
];

const sleepFrame =
  "assets/sprites/cinna-dormindo.PNG";

const bathFrames = [
  "assets/sprites/cinna-banho-1.PNG",
  "assets/sprites/cinna-banho-2.PNG",
  "assets/sprites/cinna-banho-3.PNG",
  "assets/sprites/cinna-banho-4.PNG"
];

const cakeFrames = [
  "assets/sprites/cinna-bolo-1.PNG",
  "assets/sprites/cinna-bolo-2.PNG",
  "assets/sprites/cinna-bolo-3.PNG",
  "assets/sprites/cinna-bolo-4.PNG"
];

const milkFrames = [
  "assets/sprites/cinna-leite-1.PNG",
  "assets/sprites/cinna-leite-2.PNG"
];

const appleFrames = [
  "assets/sprites/cinna-maca-1.PNG",
  "assets/sprites/cinna-maca-2.PNG",
  "assets/sprites/cinna-maca-3.PNG",
  "assets/sprites/cinna-maca-4.PNG"
];

const strawberryFrames = [
  "assets/sprites/cinna-morango-1.PNG",
  "assets/sprites/cinna-morango-2.PNG",
  "assets/sprites/cinna-morango-3.PNG",
  "assets/sprites/cinna-morango-4.PNG"
];

const dirtFrames = [
  "assets/sprites/sujeira-1.PNG",
  "assets/sprites/sujeira-2.PNG",
  "assets/sprites/sujeira-3.PNG"
];


// ======================================================
// EFEITOS
// ======================================================

const heartImage =
  "assets/sprites/coracao.PNG";

const bubbleImage =
  "assets/sprites/bolha.PNG";

const zzzImage =
  "assets/sprites/zzz.PNG";


// ======================================================
// SEQUÊNCIAS DE IDLE
// ======================================================

const idleSequence = [
  0, 1, 2, 1,
  0, 1, 2, 1,
  0, 3, 0, 1
];

const sadSequence = [
  0, 1, 2, 1,
  0, 1, 2, 1,
  0, 3, 0, 1
];


// ======================================================
// PRÉ-CARREGAMENTO
// ======================================================

const allSprites = [
  ...idleFrames,
  ...sadFrames,
  sleepFrame,
  ...bathFrames,
  ...cakeFrames,
  ...milkFrames,
  ...appleFrames,
  ...strawberryFrames,
  ...dirtFrames,
  heartImage,
  bubbleImage,
  zzzImage
];

const allScenes = [
  ...new Set(
    Object.values(sceneBackgrounds).flatMap(
      (scene) => [scene.day, scene.night]
    )
  )
];

[...allSprites, ...allScenes].forEach(
  (src) => {
    const image = new Image();
    image.src = src;
  }
);


// ======================================================
// FRASES
// ======================================================

const petMessages = [
  "Cinna gostou do carinho ♡",
  "Hehe ♡",
  "Cinna está feliz!",
  "Mais carinho!! ☁️",
  "♡ +3 felicidade"
];

const idleMessages = [
  "Cinna está esperando você ♡",
  "Cinna está olhando pra você 👀",
  "Cinna quer brincar...",
  "Que tal um docinho? 🍰",
  "☁️ ♡ ☁️"
];


// ======================================================
// UTILIDADES
// ======================================================

function randomMessage(list) {
  const index =
    Math.floor(
      Math.random() * list.length
    );

  return list[index];
}

function randomBetween(min, max) {
  return (
    Math.random() *
    (max - min) +
    min
  );
}

function wait(milliseconds) {
  return new Promise(
    (resolve) => {
      setTimeout(
        resolve,
        milliseconds
      );
    }
  );
}


// ======================================================
// STATUS SALVO
// ======================================================

function loadStatus(
  key,
  defaultValue
) {
  const savedValue =
    localStorage.getItem(key);

  if (savedValue === null) {
    return defaultValue;
  }

  const value =
    Number(savedValue);

  if (Number.isNaN(value)) {
    return defaultValue;
  }

  return value;
}

const cinnaStatus = {
  happiness:
    loadStatus(
      "cinnaHappiness",
      90
    ),

  hunger:
    loadStatus(
      "cinnaHunger",
      80
    ),

  energy:
    loadStatus(
      "cinnaEnergy",
      100
    ),

  hygiene:
    loadStatus(
      "cinnaHygiene",
      90
    )
};


// ======================================================
// LIMITAR STATUS ENTRE 0 E 100
// ======================================================

function limitStatus(value) {
  return Math.max(
    0,
    Math.min(
      100,
      value
    )
  );
}


// ======================================================
// SALVAR STATUS
// ======================================================

function saveStatus() {
  localStorage.setItem(
    "cinnaHappiness",
    cinnaStatus.happiness
  );

  localStorage.setItem(
    "cinnaHunger",
    cinnaStatus.hunger
  );

  localStorage.setItem(
    "cinnaEnergy",
    cinnaStatus.energy
  );

  localStorage.setItem(
    "cinnaHygiene",
    cinnaStatus.hygiene
  );
}


// ======================================================
// BARRAS
// ======================================================

function updateStatusBars() {
  happinessBar.style.width =
    `${cinnaStatus.happiness}%`;

  hungerBar.style.width =
    `${cinnaStatus.hunger}%`;

  energyBar.style.width =
    `${cinnaStatus.energy}%`;

  hygieneBar.style.width =
    `${cinnaStatus.hygiene}%`;

  updateDirtState();
}


// ======================================================
// HUMOR
// ======================================================

function hasLowNeeds() {
  return (
    cinnaStatus.happiness < 45 ||
    cinnaStatus.hunger < 45 ||
    cinnaStatus.energy < 45 ||
    cinnaStatus.hygiene < 45
  );
}

function getCurrentMood() {
  if (hasLowNeeds()) {
    return "sad";
  }

  return "idle";
}


// ======================================================
// SPRITE ATUAL
// ======================================================

function updateCharacterSprite(
  resetStep = false
) {
  if (isSleeping) {
    character.src =
      sleepFrame;

    return;
  }

  if (isPlayingAction) {
    return;
  }

  const mood =
    getCurrentMood();

  if (
    resetStep ||
    mood !== lastMood
  ) {
    animationStep = 0;
    lastMood = mood;
  }

  const frames =
    mood === "sad"
      ? sadFrames
      : idleFrames;

  const sequence =
    mood === "sad"
      ? sadSequence
      : idleSequence;

  const frameIndex =
    sequence[
      animationStep
    ];

  character.src =
    frames[
      frameIndex
    ];
}


// ======================================================
// LOOP DO IDLE
// ======================================================

setInterval(
  () => {
    if (
      isSleeping ||
      isPlayingAction
    ) {
      return;
    }

    const mood =
      getCurrentMood();

    if (
      mood !== lastMood
    ) {
      animationStep = 0;
      lastMood = mood;
    } else {
      const sequenceLength =
        mood === "sad"
          ? sadSequence.length
          : idleSequence.length;

      animationStep =
        (
          animationStep + 1
        ) %
        sequenceLength;
    }

    updateCharacterSprite();
  },
  350
);


// ======================================================
// SUJEIRA
// ======================================================

function startDirtAnimation() {
  if (dirtInterval) {
    return;
  }

  dirtOverlay.hidden =
    false;

  dirtStep = 0;

  dirtOverlay.src =
    dirtFrames[
      dirtStep
    ];

  dirtInterval =
    setInterval(
      () => {
        dirtStep =
          (
            dirtStep + 1
          ) %
          dirtFrames.length;

        dirtOverlay.src =
          dirtFrames[
            dirtStep
          ];
      },
      320
    );
}

function stopDirtAnimation() {
  if (dirtInterval) {
    clearInterval(
      dirtInterval
    );

    dirtInterval = null;
  }

  dirtStep = 0;

  dirtOverlay.src =
    dirtFrames[0];

  dirtOverlay.hidden =
    true;
}

function updateDirtState() {
  if (
    cinnaStatus.hygiene < 40
  ) {
    startDirtAnimation();
  } else {
    stopDirtAnimation();
  }
}


// ======================================================
// EFEITOS VISUAIS
// ======================================================

function createEffect(type) {
  if (!effectLayer) {
    return;
  }

  const effect =
    document.createElement(
      "img"
    );

  effect.classList.add(
    "effect"
  );

  // CORAÇÃO
  if (type === "heart") {
    effect.src =
      heartImage;

    effect.classList.add(
      "effect-heart"
    );

    effect.style.setProperty(
      "--effect-left",
      `${randomBetween(27, 73)}%`
    );

    effect.style.setProperty(
      "--effect-bottom",
      `${randomBetween(18, 42)}%`
    );

    effect.style.setProperty(
      "--effect-size",
      `${randomBetween(26, 45)}px`
    );

    effect.style.setProperty(
      "--effect-drift",
      `${randomBetween(-50, 50)}px`
    );

    effect.style.setProperty(
      "--effect-duration",
      `${randomBetween(1.05, 1.55)}s`
    );
  }

  // BOLHA
  if (type === "bubble") {
    effect.src =
      bubbleImage;

    effect.classList.add(
      "effect-bubble"
    );

    effect.style.setProperty(
      "--effect-left",
      `${randomBetween(13, 87)}%`
    );

    effect.style.setProperty(
      "--effect-bottom",
      `${randomBetween(3, 35)}%`
    );

    effect.style.setProperty(
      "--effect-size",
      `${randomBetween(17, 45)}px`
    );

    effect.style.setProperty(
      "--effect-drift",
      `${randomBetween(-55, 55)}px`
    );

    effect.style.setProperty(
      "--effect-duration",
      `${randomBetween(1.3, 2)}s`
    );
  }

  // ZZZ
  if (type === "zzz") {
    effect.src =
      zzzImage;

    effect.classList.add(
      "effect-zzz"
    );

    effect.style.setProperty(
      "--effect-left",
      `${randomBetween(65, 77)}%`
    );

    effect.style.setProperty(
      "--effect-bottom",
      `${randomBetween(54, 67)}%`
    );

    effect.style.setProperty(
      "--effect-size",
      `${randomBetween(35, 55)}px`
    );

    effect.style.setProperty(
      "--effect-duration",
      `${randomBetween(1.7, 2.2)}s`
    );
  }

  effectLayer.appendChild(
    effect
  );

  effect.addEventListener(
    "animationend",
    () => {
      effect.remove();
    }
  );
}


// ======================================================
// CORAÇÃO
// ======================================================

function spawnHeart() {
  createEffect(
    "heart"
  );
}


// ======================================================
// BOLHAS
// ======================================================

function spawnBubbles(
  amount = 8
) {
  for (
    let i = 0;
    i < amount;
    i++
  ) {
    setTimeout(
      () => {
        createEffect(
          "bubble"
        );
      },
      i * 100
    );
  }
}


// ======================================================
// ZZZ
// ======================================================

function spawnZzz() {
  createEffect(
    "zzz"
  );
}

function startSleepEffects() {
  stopSleepEffects();

  spawnZzz();

  sleepEffectInterval =
    setInterval(
      () => {
        if (isSleeping) {
          spawnZzz();
        }
      },
      1100
    );
}

function stopSleepEffects() {
  if (sleepEffectInterval) {
    clearInterval(
      sleepEffectInterval
    );

    sleepEffectInterval =
      null;
  }
}


// ======================================================
// BLOQUEAR CONTROLES DURANTE AÇÕES
// ======================================================

function lockControls(locked) {
  foodItems.forEach(
    (button) => {
      button.disabled =
        locked;
    }
  );

  bathItems.forEach(
    (button) => {
      button.disabled =
        locked;
    }
  );

  menuButtons.forEach(
    (button) => {
      button.disabled =
        locked;
    }
  );
