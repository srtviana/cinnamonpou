// ======================================================
// CINNAMONPOU
// ======================================================


// ===========================
// ELEMENTOS PRINCIPAIS
// ===========================

const character =
  document.querySelector("#cinna");

const message =
  document.querySelector("#message");

const room =
  document.querySelector(".room");

const effectLayer =
  document.querySelector("#effect-layer");


const menuButtons =
  document.querySelectorAll(".menu-button");


const happinessBar =
  document.querySelector("#happiness-bar");

const hungerBar =
  document.querySelector("#hunger-bar");

const energyBar =
  document.querySelector("#energy-bar");

const hygieneBar =
  document.querySelector("#hygiene-bar");


const foodTray =
  document.querySelector("#food-tray");

const foodItems =
  document.querySelectorAll(".food-item");


const bathTray =
  document.querySelector("#bath-tray");

const bathItems =
  document.querySelectorAll(".bath-item");


const sleepTray =
  document.querySelector("#sleep-tray");

const sleepButton =
  document.querySelector("#sleep-button");


// ======================================================
// ESTADOS
// ======================================================

let isSleeping = false;

let isPlayingAction = false;

let sleepInterval = null;

let sleepEffectInterval = null;

let animationStep = 0;

let lastMood = "idle";


// ======================================================
// SPRITES NORMAIS
// ======================================================

const idleFrames = [
  "assets/sprites/cinna-idle-1.PNG",
  "assets/sprites/cinna-idle-2.PNG",
  "assets/sprites/cinna-idle-3.PNG",
  "assets/sprites/cinna-idle-4.PNG"
];


// ======================================================
// SPRITES TRISTES
// ======================================================

const sadFrames = [
  "assets/sprites/cinna-triste-1.PNG",
  "assets/sprites/cinna-triste-2.PNG",
  "assets/sprites/cinna-triste-3.PNG",
  "assets/sprites/cinna-triste-4.PNG"
];


// ======================================================
// DORMINDO
// ======================================================

const sleepFrame =
  "assets/sprites/cinna-dormindo.PNG";


// ======================================================
// BANHO
// ======================================================

const bathFrames = [
  "assets/sprites/cinna-banho-1.PNG",
  "assets/sprites/cinna-banho-2.PNG",
  "assets/sprites/cinna-banho-3.PNG",
  "assets/sprites/cinna-banho-4.PNG"
];


// ======================================================
// BOLO
// ======================================================

const cakeFrames = [
  "assets/sprites/cinna-bolo-1.PNG",
  "assets/sprites/cinna-bolo-2.PNG",
  "assets/sprites/cinna-bolo-3.PNG",
  "assets/sprites/cinna-bolo-4.PNG"
];


// ======================================================
// LEITE
// ======================================================

// Atualmente temos dois frames.
// O ciclo fica:
// 1 → 2 → 1 → 2

const milkFrames = [
  "assets/sprites/cinna-leite-1.PNG",
  "assets/sprites/cinna-leite-2.PNG"
];


// ======================================================
// MAÇÃ
// ======================================================

const appleFrames = [
  "assets/sprites/cinna-maca-1.PNG",
  "assets/sprites/cinna-maca-2.PNG",
  "assets/sprites/cinna-maca-3.PNG",
  "assets/sprites/cinna-maca-4.PNG"
];


// ======================================================
// MORANGO
// ======================================================

const strawberryFrames = [
  "assets/sprites/cinna-morango-1.PNG",
  "assets/sprites/cinna-morango-2.PNG",
  "assets/sprites/cinna-morango-3.PNG",
  "assets/sprites/cinna-morango-4.PNG"
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
// SEQUÊNCIAS IDLE
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

  heartImage,
  bubbleImage,
  zzzImage
];


allSprites.forEach(
  (src) => {

    const image =
      new Image();

    image.src =
      src;

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


function randomMessage(list) {

  const index =
    Math.floor(
      Math.random() *
      list.length
    );

  return list[index];

}


// ======================================================
// UTILIDADES
// ======================================================

function randomBetween(
  min,
  max
) {

  return (
    Math.random() *
    (max - min) +
    min
  );

}


function wait(ms) {

  return new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        ms
      )
  );

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


  if (
    type === "heart"
  ) {

    effect.src =
      heartImage;

    effect.classList.add(
      "effect-heart"
    );


    effect.style.setProperty(
      "--effect-left",
      `${randomBetween(
        30,
        70
      )}%`
    );


    effect.style.setProperty(
      "--effect-bottom",
      `${randomBetween(
        24,
        42
      )}%`
    );


    effect.style.setProperty(
      "--effect-size",
      `${randomBetween(
        28,
        46
      )}px`
    );


    effect.style.setProperty(
      "--effect-drift",
      `${randomBetween(
        -45,
        45
      )}px`
    );


    effect.style.setProperty(
      "--effect-duration",
      `${randomBetween(
        1.1,
        1.55
      )}s`
    );

  }


  if (
    type === "bubble"
  ) {

    effect.src =
      bubbleImage;

    effect.classList.add(
      "effect-bubble"
    );


    effect.style.setProperty(
      "--effect-left",
      `${randomBetween(
        15,
        85
      )}%`
    );


    effect.style.setProperty(
      "--effect-bottom",
      `${randomBetween(
        4,
        32
      )}%`
    );


    effect.style.setProperty(
      "--effect-size",
      `${randomBetween(
        18,
        46
      )}px`
    );


    effect.style.setProperty(
      "--effect-drift",
      `${randomBetween(
        -55,
        55
      )}px`
    );


    effect.style.setProperty(
      "--effect-duration",
      `${randomBetween(
        1.3,
        2
      )}s`
    );

  }


  if (
    type === "zzz"
  ) {

    effect.src =
      zzzImage;

    effect.classList.add(
      "effect-zzz"
    );


    effect.style.setProperty(
      "--effect-left",
      `${randomBetween(
        65,
        75
      )}%`
    );


    effect.style.setProperty(
      "--effect-bottom",
      `${randomBetween(
        55,
        70
      )}%`
    );


    effect.style.setProperty(
      "--effect-size",
      `${randomBetween(
        36,
        58
      )}px`
    );


    effect.style.setProperty(
      "--effect-duration",
      `${randomBetween(
        1.7,
        2.2
      )}s`
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


// ===========================
// CORAÇÕES
// ===========================

function spawnHeart() {

  createEffect(
    "heart"
  );

}


// ===========================
// BOLHAS
// ===========================

function spawnBubbles(
  amount = 5
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
      i * 110
    );

  }

}


// ===========================
// ZZZ
// ===========================

function spawnZzz() {

  createEffect(
    "zzz"
  );

}


function startSleepEffects() {

  stopSleepEffects();


  // Primeiro aparece imediatamente.

  spawnZzz();


  sleepEffectInterval =
    setInterval(
      () => {

        if (
          isSleeping
        ) {

          spawnZzz();

        }

      },
      1100
    );

}


function stopSleepEffects() {

  if (
    sleepEffectInterval
  ) {

    clearInterval(
      sleepEffectInterval
    );


    sleepEffectInterval =
      null;

  }

}


// ======================================================
// STATUS
// ======================================================

function loadStatus(
  key,
  defaultValue
) {

  const saved =
    localStorage.getItem(
      key
    );


  if (
    saved === null
  ) {

    return defaultValue;

  }


  return Number(
    saved
  );

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


function limitStatus(value) {

  return Math.max(
    0,
    Math.min(
      100,
      value
    )
  );

}


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


function updateStatusBars() {

  happinessBar.style.width =
    `${cinnaStatus.happiness}%`;


  hungerBar.style.width =
    `${cinnaStatus.hunger}%`;


  energyBar.style.width =
    `${cinnaStatus.energy}%`;


  hygieneBar.style.width =
    `${cinnaStatus.hygiene}%`;

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

  if (
    hasLowNeeds()
  ) {

    return "sad";

  }


  return "idle";

}


// ======================================================
// SPRITE NORMAL / TRISTE
// ======================================================

function updateCharacterSprite(
  resetStep = false
) {

  if (
    isSleeping
  ) {

    character.src =
      sleepFrame;

    return;

  }


  if (
    isPlayingAction
  ) {

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


  let frames;

  let sequence;


  if (
    mood === "sad"
  ) {

    frames =
      sadFrames;

    sequence =
      sadSequence;

  } else {

    frames =
      idleFrames;

    sequence =
      idleSequence;

  }


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
// INICIALIZAÇÃO
// ======================================================

updateStatusBars();

updateCharacterSprite(
  true
);


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
// BLOQUEAR CONTROLES
// ======================================================

function lockControls(
  locked
) {

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


  if (
    sleepButton
  ) {

    sleepButton.disabled =
      locked;

  }

}


// ======================================================
// ANIMAÇÃO DE AÇÃO
// ======================================================

async function playActionAnimation(
  frames,
  afterAction
) {

  if (
    isPlayingAction ||
    isSleeping
  ) {

    return;

  }


  isPlayingAction =
    true;


  lockControls(
    true
  );


  character.classList.add(
    "action-playing"
  );


  let sequence;


  if (
    frames.length === 2
  ) {

    sequence = [
      0,
      1,
      0,
      1
    ];

  } else {

    sequence =
      frames.map(
        (
          _,
          index
        ) =>
          index
      );

  }


  for (
    const index
    of sequence
  ) {

    character.src =
      frames[
        index
      ];


    await wait(
      250
    );

  }


  await wait(
    120
  );


  if (
    afterAction
  ) {

    afterAction();

  }


  isPlayingAction =
    false;


  lockControls(
    false
  );


  character.classList.remove(
    "action-playing"
  );


  updateCharacterSprite(
    true
  );

}


// ======================================================
// DIMINUI STATUS
// ======================================================

// Continua rápido para testes.

function decreaseStatus() {

  cinnaStatus.happiness =
    limitStatus(
      cinnaStatus.happiness -
      1
    );


  cinnaStatus.hunger =
    limitStatus(
      cinnaStatus.hunger -
      2
    );


  cinnaStatus.hygiene =
    limitStatus(
      cinnaStatus.hygiene -
      2
    );


  if (
    !isSleeping
  ) {

    cinnaStatus.energy =
      limitStatus(
        cinnaStatus.energy -
        1
      );

  }


  saveStatus();

  updateStatusBars();

  updateCharacterSprite();

}


setInterval(
  decreaseStatus,
  10000
);


// ======================================================
// CARINHO
// ======================================================

let pets =
  Number(
    localStorage.getItem(
      "cinnaPets"
    )
  ) || 0;


function petCinna() {

  if (
    isSleeping
  ) {

    message.textContent =
      "Shhh... Cinna está dormindo 😴";


    return;

  }


  if (
    isPlayingAction
  ) {

    return;

  }


  pets++;


  localStorage.setItem(
    "cinnaPets",
    pets
  );


  cinnaStatus.happiness =
    limitStatus(
      cinnaStatus.happiness +
      3
    );


  saveStatus();

  updateStatusBars();

  updateCharacterSprite();


  /*
    Cada clique cria UM coração.

    Logo:
    1 clique = 1 coração
    6 cliques = 6 corações
  */

  spawnHeart();


  message.textContent =
    randomMessage(
      petMessages
    );


  character.animate(
    [
      {
        transform:
          "scale(1)"
      },

      {
        transform:
          "scale(1.08)"
      },

      {
        transform:
          "scale(1)"
      }
    ],
    {
      duration: 300,
      easing: "ease-out"
    }
  );

}


character.addEventListener(
  "click",
  petCinna
);


// ======================================================
// SONO
// ======================================================

function updateSleepButton() {

  if (
    !sleepButton
  ) {

    return;

  }


  const icon =
    sleepButton.querySelector(
      "span"
    );


  const label =
    sleepButton.querySelector(
      "small"
    );


  if (
    isSleeping
  ) {

    icon.textContent =
      "☀️";


    label.textContent =
      "Acordar";

  } else {

    icon.textContent =
      "😴";


    label.textContent =
      "Dormir";

  }

}


// ===========================
// COMEÇAR A DORMIR
// ===========================

function startSleeping() {

  if (
    isPlayingAction
  ) {

    return;

  }


  if (
    cinnaStatus.energy >=
    100
  ) {

    message.textContent =
      "Cinna já está cheio de energia! ⚡";


    return;

  }


  isSleeping =
    true;


  character.src =
    sleepFrame;


  room.classList.add(
    "sleeping"
  );


  updateSleepButton();


  message.textContent =
    "Boa noite, Cinna... 😴💤";


  startSleepEffects();


  clearInterval(
    sleepInterval
  );


  sleepInterval =
    setInterval(
      () => {

        cinnaStatus.energy =
          limitStatus(
            cinnaStatus.energy +
            5
          );


        saveStatus();

        updateStatusBars();


        if (
          cinnaStatus.energy >=
          100
        ) {

          stopSleeping(
            true
          );

        }

      },
      5000
    );

}


// ===========================
// ACORDAR
// ===========================

function stopSleeping(
  fullyRested = false
) {

  isSleeping =
    false;


  clearInterval(
    sleepInterval
  );


  sleepInterval =
    null;


  stopSleepEffects();


  room.classList.remove(
    "sleeping"
  );


  updateSleepButton();


  updateCharacterSprite(
    true
  );


  if (
    fullyRested
  ) {

    message.textContent =
      "Cinna acordou descansado! ☀️⚡";

  } else {

    message.textContent =
      "Bom dia, Cinna! ☀️";

  }

}


if (
  sleepButton
) {

  sleepButton.addEventListener(
    "click",
    () => {

      if (
        isPlayingAction
      ) {

        return;

      }


      if (
        isSleeping
      ) {

        stopSleeping();

      } else {

        startSleeping();

      }

    }
  );

}


// ======================================================
// CÔMODO INICIAL
// ======================================================

room.dataset.room =
  "home";


// ======================================================
// MENU DE CÔMODOS
// ======================================================

menuButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        if (
          isPlayingAction
        ) {

          return;

        }


        const selectedRoom =
          button.dataset.room;


        if (
          isSleeping &&
          selectedRoom !==
            "bedroom"
        ) {

          stopSleeping();

        }


        menuButtons.forEach(
          (btn) => {

            btn.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        room.dataset.room =
          selectedRoom;


        // =====================
        // BANDEJAS
        // =====================

        if (
          foodTray
        ) {

          foodTray.hidden =
            selectedRoom !==
            "kitchen";

        }


        if (
          bathTray
        ) {

          bathTray.hidden =
            selectedRoom !==
            "bathroom";

        }


        if (
          sleepTray
        ) {

          sleepTray.hidden =
            selectedRoom !==
            "bedroom";

        }


        // =====================
        // MENSAGENS
        // =====================

        if (
          selectedRoom ===
          "home"
        ) {

          message.textContent =
            "Cinna está esperando você ♡";

        }


        if (
          selectedRoom ===
          "kitchen"
        ) {

          message.textContent =
            "O que vamos comer? 🍰";

        }


        if (
          selectedRoom ===
          "bathroom"
        ) {

          message.textContent =
            "Hora do banho! 🫧";

        }


        if (
          selectedRoom ===
          "bedroom"
        ) {

          if (
            isSleeping
          ) {

            message.textContent =
              "Zzz... 😴💤";

          } else {

            message.textContent =
              "Cinna está ficando com soninho... 🌙";

          }

        }


        if (
          selectedRoom ===
          "games"
        ) {

          message.textContent =
            "Vamos brincar? 🎮";

        }

      }
    );

  }
);


// ======================================================
// ESCOLHER SPRITES DA COMIDA
// ======================================================

function getFoodFrames(
  foodName
) {

  if (
    foodName ===
    "Morango"
  ) {

    return strawberryFrames;

  }


  if (
    foodName ===
    "Maçã"
  ) {

    return appleFrames;

  }


  if (
    foodName ===
    "Leite"
  ) {

    return milkFrames;

  }


  if (
    foodName ===
    "Bolo"
  ) {

    return cakeFrames;

  }


  return idleFrames;

}


// ======================================================
// COMIDA
// ======================================================

foodItems.forEach(
  (food) => {

    food.addEventListener(
      "click",
      async () => {

        if (
          isPlayingAction ||
          isSleeping
        ) {

          return;

        }


        const foodName =
          food.dataset.food;


        const foodValue =
          Number(
            food.dataset.value
          );


        if (
          cinnaStatus.hunger >=
          100
        ) {

          message.textContent =
            "Cinna já está de barriguinha cheia ♡";


          return;

        }


        const frames =
          getFoodFrames(
            foodName
          );


        message.textContent =
          `Cinna está comendo ${foodName.toLowerCase()}... ♡`;


        await playActionAnimation(
          frames,
          () => {

            const before =
              cinnaStatus.hunger;


            cinnaStatus.hunger =
              limitStatus(
                cinnaStatus.hunger +
                foodValue
              );


            const gained =
              cinnaStatus.hunger -
              before;


            saveStatus();

            updateStatusBars();


            message.textContent =
              `${foodName} delicioso! +${gained}% 🍽️`;

          }
        );

      }
    );

  }
);


// ======================================================
// BANHO
// ======================================================

bathItems.forEach(
  (item) => {

    item.addEventListener(
      "click",
      async () => {

        if (
          isPlayingAction ||
          isSleeping
        ) {

          return;

        }


        const careName =
          item.dataset.care;


        const careValue =
          Number(
            item.dataset.value
          );


        if (
          cinnaStatus.hygiene >=
          100
        ) {

          message.textContent =
            "Cinna já está limpinho! 🫧";


          return;

        }


        message.textContent =
          "Hora de ficar limpinho! 🫧";


        /*
          As bolhas começam imediatamente
          e continuam aparecendo enquanto
          os frames do banho rodam.
        */

        spawnBubbles(
          8
        );


        await playActionAnimation(
          bathFrames,
          () => {

            const before =
              cinnaStatus.hygiene;


            cinnaStatus.hygiene =
              limitStatus(
                cinnaStatus.hygiene +
                careValue
              );


            const gained =
              cinnaStatus.hygiene -
              before;


            saveStatus();

            updateStatusBars();


            message.textContent =
              `${careName}! +${gained}% higiene 🫧`;

          }
        );

      }
    );

  }
);


// ======================================================
// FALAS ALEATÓRIAS
// ======================================================

setInterval(
  () => {

    const currentRoom =
      room.dataset.room ||
      "home";


    if (
      currentRoom ===
        "home" &&
      !isSleeping &&
      !isPlayingAction
    ) {

      message.textContent =
        randomMessage(
          idleMessages
        );

    }

  },
  12000
);
