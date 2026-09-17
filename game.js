// ======================================================
// ᑕIᑎᑎᗩᗰOᑎᖇOᒪᒪ ☁️
// ======================================================

// -------------------- ELEMENTOS --------------------

const character = document.querySelector("#cinna");
const message = document.querySelector("#message");
const room = document.querySelector(".room");

const effectLayer = document.querySelector("#effect-layer");
const dirtOverlay = document.querySelector("#dirt-overlay");

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
// CENÁRIOS
// ======================================================

const sceneBackgrounds = {

  home: {
    day:
      "assets/scenarios/inicio-dia.PNG",

    night:
      "assets/scenarios/inicio-noite.PNG"
  },

  kitchen: {
    day:
      "assets/scenarios/cozinha-dia.PNG",

    night:
      "assets/scenarios/cozinha-noite.PNG"
  },

  bathroom: {
    day:
      "assets/scenarios/banheiro.PNG",

    night:
      "assets/scenarios/banheiro.PNG"
  },

  bedroom: {
    day:
      "assets/scenarios/quarto-dia.PNG",

    night:
      "assets/scenarios/quarto-noite.PNG"
  },

  games: {
    day:
      "assets/scenarios/jogos-dia.PNG",

    night:
      "assets/scenarios/jogos-noite.PNG"
  }

};


function getTimePeriod() {

  const hour =
    new Date().getHours();

  return (
    hour >= 6 &&
    hour < 18
  )
    ? "day"
    : "night";

}


function updateRoomBackground() {

  const currentRoom =
    room.dataset.room ||
    "home";

  const period =
    getTimePeriod();

  const scene =
    sceneBackgrounds[
      currentRoom
    ]?.[period]
    ||
    sceneBackgrounds[
      currentRoom
    ]?.day;


  if (!scene) {
    return;
  }


  room.style.backgroundImage =
    `url("${scene}")`;

  room.style.backgroundSize =
    "100% 100%";

  room.style.backgroundPosition =
    "center";

  room.style.backgroundRepeat =
    "no-repeat";

}


// ======================================================
// ESTADOS
// ======================================================

let isSleeping =
  false;

let isPlayingAction =
  false;

let sleepInterval =
  null;

let sleepEffectInterval =
  null;

let dirtInterval =
  null;

let animationStep =
  0;

let dirtStep =
  0;

let lastMood =
  "idle";


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

  0,
  1,
  2,
  1,

  0,
  1,
  2,
  1,

  0,
  3,
  0,
  1

];


const sadSequence = [

  0,
  1,
  2,
  1,

  0,
  1,
  2,
  1,

  0,
  3,
  0,
  1

];


// ======================================================
// PRÉ-CARREGAMENTO
// ======================================================

const allAssets = [

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

  zzzImage,

  ...new Set(

    Object
      .values(
        sceneBackgrounds
      )
      .flatMap(
        scene => [
          scene.day,
          scene.night
        ]
      )

  )

];


allAssets.forEach(

  src => {

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


// ======================================================
// UTILIDADES
// ======================================================

function randomMessage(
  list
) {

  return list[

    Math.floor(
      Math.random() *
      list.length
    )

  ];

}


function randomBetween(
  min,
  max
) {

  return (
    Math.random() *
    (
      max -
      min
    )
    +
    min
  );

}


function wait(
  milliseconds
) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        milliseconds
      )
  );

}


function limitStatus(
  value
) {

  return Math.max(
    0,
    Math.min(
      100,
      value
    )
  );

}


// ======================================================
// STATUS SALVO
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


  const value =
    Number(
      saved
    );


  return Number.isNaN(
    value
  )
    ? defaultValue
    : value;

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

    cinnaStatus.happiness <
    45

    ||

    cinnaStatus.hunger <
    45

    ||

    cinnaStatus.energy <
    45

    ||

    cinnaStatus.hygiene <
    45

  );

}


function getCurrentMood() {

  return hasLowNeeds()
    ? "sad"
    : "idle";

}


// ======================================================
// SPRITE ATUAL
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
    resetStep
    ||
    mood !==
    lastMood
  ) {

    animationStep =
      0;

    lastMood =
      mood;

  }


  const frames =

    mood === "sad"
      ? sadFrames
      : idleFrames;


  const sequence =

    mood === "sad"
      ? sadSequence
      : idleSequence;


  character.src =

    frames[
      sequence[
        animationStep
      ]
    ];

}


// ======================================================
// LOOP DO IDLE
// ======================================================

setInterval(

  () => {

    if (
      isSleeping
      ||
      isPlayingAction
    ) {

      return;

    }


    const mood =
      getCurrentMood();


    if (
      mood !==
      lastMood
    ) {

      animationStep =
        0;

      lastMood =
        mood;

    }

    else {

      const sequence =

        mood ===
        "sad"

          ? sadSequence

          : idleSequence;


      animationStep =

        (
          animationStep +
          1
        )

        %

        sequence.length;

    }


    updateCharacterSprite();

  },

  350

);


// ======================================================
// SUJEIRA
// ======================================================

function startDirtAnimation() {

  if (
    dirtInterval
  ) {

    return;

  }


  dirtOverlay.hidden =
    false;


  dirtStep =
    0;


  dirtOverlay.src =
    dirtFrames[
      dirtStep
    ];


  dirtInterval =

    setInterval(

      () => {

        dirtStep =

          (
            dirtStep +
            1
          )

          %

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

  if (
    dirtInterval
  ) {

    clearInterval(
      dirtInterval
    );

    dirtInterval =
      null;

  }


  dirtStep =
    0;


  dirtOverlay.src =
    dirtFrames[
      0
    ];


  dirtOverlay.hidden =
    true;

}


function updateDirtState() {

  if (
    cinnaStatus.hygiene <
    40
  ) {

    startDirtAnimation();

  }

  else {

    stopDirtAnimation();

  }

}


// ======================================================
// EFEITOS
// ======================================================

function createEffect(
  type
) {

  if (
    !effectLayer
  ) {

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
    type ===
    "heart"
  ) {

    effect.src =
      heartImage;


    effect.classList.add(
      "effect-heart"
    );


    effect.style.setProperty(
      "--effect-left",
      `${randomBetween(
        27,
        73
      )}%`
    );


    effect.style.setProperty(
      "--effect-bottom",
      `${randomBetween(
        18,
        42
      )}%`
    );


    effect.style.setProperty(
      "--effect-size",
      `${randomBetween(
        26,
        45
      )}px`
    );


    effect.style.setProperty(
      "--effect-drift",
      `${randomBetween(
        -50,
        50
      )}px`
    );


    effect.style.setProperty(
      "--effect-duration",
      `${randomBetween(
        1.05,
        1.55
      )}s`
    );

  }


  if (
    type ===
    "bubble"
  ) {

    effect.src =
      bubbleImage;


    effect.classList.add(
      "effect-bubble"
    );


    effect.style.setProperty(
      "--effect-left",
      `${randomBetween(
        13,
        87
      )}%`
    );


    effect.style.setProperty(
      "--effect-bottom",
      `${randomBetween(
        3,
        35
      )}%`
    );


    effect.style.setProperty(
      "--effect-size",
      `${randomBetween(
        17,
        45
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
    type ===
    "zzz"
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
        77
      )}%`
    );


    effect.style.setProperty(
      "--effect-bottom",
      `${randomBetween(
        54,
        67
      )}%`
    );


    effect.style.setProperty(
      "--effect-size",
      `${randomBetween(
        35,
        55
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


function spawnHeart() {

  createEffect(
    "heart"
  );

}


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

      i *
      100

    );

  }

}


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
// BLOQUEAR CONTROLES
// ======================================================

function lockControls(
  locked
) {

  foodItems.forEach(
    button =>
      button.disabled =
        locked
  );


  bathItems.forEach(
    button =>
      button.disabled =
        locked
  );


  menuButtons.forEach(
    button =>
      button.disabled =
        locked
  );


  if (
    sleepButton
  ) {

    sleepButton.disabled =
      locked;

  }

}


// ======================================================
// ANIMAÇÕES DE AÇÃO
// ======================================================

async function playActionAnimation(
  frames,
  afterAction
) {

  if (
    isPlayingAction
    ||
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


  const sequence =

    frames.length ===
    2

      ? [
          0,
          1,
          0,
          1
        ]

      : frames.map(
          (
            _,
            index
          ) =>
            index
        );


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
    100
  );


  if (
    typeof afterAction ===
    "function"
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
// QUEDA DOS STATUS
// ======================================================

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


// Continua rápido enquanto estamos testando.

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
  )

  ||

  0;


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
          "scale(1.07)"
      },

      {
        transform:
          "scale(1)"
      }

    ],

    {

      duration:
        260,

      easing:
        "ease-out"

    }

  );


  updateCharacterSprite();

}


character.addEventListener(
  "click",
  petCinna
);


// ======================================================
// BOTÃO DE SONO
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

  }

  else {

    icon.textContent =
      "💡";


    label.textContent =
      "Dormir";

  }

}


// ======================================================
// DORMIR
// ======================================================

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


// ======================================================
// ACORDAR
// ======================================================

function stopSleeping(
  fullyRested = false
) {

  isSleeping =
    false;


  if (
    sleepInterval
  ) {

    clearInterval(
      sleepInterval
    );


    sleepInterval =
      null;

  }


  stopSleepEffects();


  room.classList.remove(
    "sleeping"
  );


  updateSleepButton();


  updateCharacterSprite(
    true
  );


  message.textContent =

    fullyRested

      ? "Cinna acordou descansado! ☀️⚡"

      : "Bom dia, Cinna! ☀️";

}


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

    }

    else {

      startSleeping();

    }

  }

);


// ======================================================
// TROCA DE CÔMODO
// ======================================================

function setRoom(
  selectedRoom
) {

  if (
    isPlayingAction
  ) {

    return;

  }


  if (
    isSleeping
    &&
    selectedRoom !==
    "bedroom"
  ) {

    stopSleeping();

  }


  menuButtons.forEach(

    button => {

      button.classList.toggle(

        "active",

        button.dataset.room ===
        selectedRoom

      );

    }

  );


  room.dataset.room =
    selectedRoom;


  // TROCA O CENÁRIO
  updateRoomBackground();


  // BANDEJAS

  foodTray.hidden =
    selectedRoom !==
    "kitchen";


  bathTray.hidden =
    selectedRoom !==
    "bathroom";


  sleepTray.hidden =
    selectedRoom !==
    "bedroom";


  // MENSAGENS

  const messages = {

    home:
      "Cinna está esperando você ♡",

    kitchen:
      "O que vamos comer? 🍰",

    bathroom:
      "Hora do banho! 🫧",

    bedroom:

      isSleeping

        ? "Zzz... 😴💤"

        : "Cinna está ficando com soninho... 🌙",

    games:
      "Vamos brincar? 🎮"

  };


  message.textContent =

    messages[
      selectedRoom
    ]

    ||

    "Cinna está aqui ♡";

}


menuButtons.forEach(

  button => {

    button.addEventListener(

      "click",

      () =>
        setRoom(
          button.dataset.room
        )

    );

  }

);


// ======================================================
// COMIDA
// ======================================================

function getFoodFrames(
  foodName
) {

  const foods = {

    Morango:
      strawberryFrames,

    "Maçã":
      appleFrames,

    Leite:
      milkFrames,

    Bolo:
      cakeFrames

  };


  return (
    foods[
      foodName
    ]

    ||

    idleFrames
  );

}


foodItems.forEach(

  food => {

    food.addEventListener(

      "click",

      async () => {

        if (
          isPlayingAction
          ||
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


        message.textContent =

          `Cinna está comendo ${foodName.toLowerCase()}... ♡`;


        await playActionAnimation(

          getFoodFrames(
            foodName
          ),

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

              `${foodName}, que delícia! +${gained}% 🍽️`;

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

  item => {

    item.addEventListener(

      "click",

      async () => {

        if (
          isPlayingAction
          ||
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


        spawnBubbles(
          9
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

    if (

      room.dataset.room ===
      "home"

      &&

      !isSleeping

      &&

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


// ======================================================
// INICIALIZAÇÃO
// ======================================================

room.dataset.room =
  "home";


updateStatusBars();


updateCharacterSprite(
  true
);


updateSleepButton();


setRoom(
  "home"
);


// Se der 18h com o jogo aberto,
// ele troca para a versão noturna.
// Se der 6h, volta para a versão diurna.

setInterval(
  updateRoomBackground,
  60000
);
