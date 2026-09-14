// ===========================
// ELEMENTOS PRINCIPAIS
// ===========================

const character = document.querySelector("#cinna");
const message = document.querySelector("#message");
const room = document.querySelector(".room");

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


// ===========================
// ESTADO DO SONO
// ===========================

let isSleeping = false;
let sleepInterval = null;


// ===========================
// SPRITES
// ===========================

// neutro
const idleFrames = [
  "assets/sprites/cinna-idle-1.PNG",
  "assets/sprites/cinna-idle-2.PNG",
  "assets/sprites/cinna-idle-3.PNG",
  "assets/sprites/cinna-idle-4.PNG"
];

// triste
const sadFrames = [
  "assets/sprites/cinna-triste-1.PNG",
  "assets/sprites/cinna-triste-2.PNG",
  "assets/sprites/cinna-triste-3.PNG",
  "assets/sprites/cinna-triste-4.PNG"
];

// sequência neutra com piscada
const idleSequence = [
  0, 1, 2, 1,
  0, 1, 2, 1,
  0, 3, 0, 1
];

// sequência triste com piscada
const sadSequence = [
  0, 1, 2, 1,
  0, 1, 2, 1,
  0, 3, 0, 1
];

let idleStep = 0;
let lastMood = "idle";


// pré-carrega sprites
[...idleFrames, ...sadFrames].forEach((src) => {
  const image = new Image();
  image.src = src;
});


// ===========================
// FRASES
// ===========================

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
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}


// ===========================
// STATUS
// ===========================

function loadStatus(key, defaultValue) {
  const savedValue = localStorage.getItem(key);

  if (savedValue === null) {
    return defaultValue;
  }

  return Number(savedValue);
}

const cinnaStatus = {
  happiness: loadStatus("cinnaHappiness", 90),
  hunger: loadStatus("cinnaHunger", 80),
  energy: loadStatus("cinnaEnergy", 100),
  hygiene: loadStatus("cinnaHygiene", 90)
};

function limitStatus(value) {
  return Math.max(0, Math.min(100, value));
}

function saveStatus() {
  localStorage.setItem("cinnaHappiness", cinnaStatus.happiness);
  localStorage.setItem("cinnaHunger", cinnaStatus.hunger);
  localStorage.setItem("cinnaEnergy", cinnaStatus.energy);
  localStorage.setItem("cinnaHygiene", cinnaStatus.hygiene);
}

function updateStatusBars() {
  happinessBar.style.width = `${cinnaStatus.happiness}%`;
  hungerBar.style.width = `${cinnaStatus.hunger}%`;
  energyBar.style.width = `${cinnaStatus.energy}%`;
  hygieneBar.style.width = `${cinnaStatus.hygiene}%`;
}


// ===========================
// MODO TRISTE
// ===========================

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

function updateCharacterSprite(resetStep = false) {
  if (isSleeping) return;

  const mood = getCurrentMood();

  if (resetStep || mood !== lastMood) {
    idleStep = 0;
    lastMood = mood;
  }

  let activeFrames;
  let activeSequence;

  if (mood === "sad") {
    activeFrames = sadFrames;
    activeSequence = sadSequence;
  } else {
    activeFrames = idleFrames;
    activeSequence = idleSequence;
  }

  const frameIndex = activeSequence[idleStep];
  character.src = activeFrames[frameIndex];
}


// mostra sprite certo logo ao abrir
updateStatusBars();
updateCharacterSprite(true);


// loop da animação
setInterval(() => {
  if (isSleeping) return;

  const mood = getCurrentMood();

  if (mood !== lastMood) {
    idleStep = 0;
    lastMood = mood;
  } else {
    const sequenceLength =
      mood === "sad"
        ? sadSequence.length
        : idleSequence.length;

    idleStep = (idleStep + 1) % sequenceLength;
  }

  updateCharacterSprite();
}, 350);


// ===========================
// DIMINUIÇÃO DOS STATUS
// ===========================

function decreaseStatus() {
  cinnaStatus.happiness = limitStatus(cinnaStatus.happiness - 1);
  cinnaStatus.hunger = limitStatus(cinnaStatus.hunger - 2);
  cinnaStatus.hygiene = limitStatus(cinnaStatus.hygiene - 2);

  if (!isSleeping) {
    cinnaStatus.energy = limitStatus(cinnaStatus.energy - 1);
  }

  saveStatus();
  updateStatusBars();
  updateCharacterSprite();
}

setInterval(decreaseStatus, 10000);


// ===========================
// CARINHO
// ===========================

let pets = Number(localStorage.getItem("cinnaPets")) || 0;

function petCinna() {
  if (isSleeping) {
    message.textContent = "Shhh... Cinna está dormindo 😴";
    return;
  }

  pets++;
  localStorage.setItem("cinnaPets", pets);

  cinnaStatus.happiness = limitStatus(cinnaStatus.happiness + 3);

  saveStatus();
  updateStatusBars();
  updateCharacterSprite();

  message.textContent = randomMessage(petMessages);

  character.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.08)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 300,
      easing: "ease-out"
    }
  );
}

character.addEventListener("click", petCinna);


// ===========================
// SISTEMA DE SONO
// ===========================

function updateSleepButton() {
  if (!sleepButton) return;

  const icon = sleepButton.querySelector("span");
  const label = sleepButton.querySelector("small");

  if (isSleeping) {
    icon.textContent = "☀️";
    label.textContent = "Acordar";
  } else {
    icon.textContent = "😴";
    label.textContent = "Dormir";
  }
}

function startSleeping() {
  if (cinnaStatus.energy >= 100) {
    message.textContent = "Cinna já está cheio de energia! ⚡";
    return;
  }

  isSleeping = true;

  room.classList.add("sleeping");
  updateSleepButton();

  message.textContent = "Boa noite, Cinna... 😴💤";

  clearInterval(sleepInterval);

  sleepInterval = setInterval(() => {
    cinnaStatus.energy = limitStatus(cinnaStatus.energy + 5);

    saveStatus();
    updateStatusBars();

    if (cinnaStatus.energy >= 100) {
      stopSleeping(true);
    }
  }, 5000);
}

function stopSleeping(fullyRested = false) {
  isSleeping = false;

  clearInterval(sleepInterval);
  sleepInterval = null;

  room.classList.remove("sleeping");
  updateSleepButton();

  updateCharacterSprite(true);

  if (fullyRested) {
    message.textContent = "Cinna acordou descansado! ☀️⚡";
  } else {
    message.textContent = "Bom dia, Cinna! ☀️";
  }
}

if (sleepButton) {
  sleepButton.addEventListener("click", () => {
    if (isSleeping) {
      stopSleeping();
    } else {
      startSleeping();
    }
  });
}


// ===========================
// CÔMODO INICIAL
// ===========================

room.dataset.room = "home";


// ===========================
// MENU DE CÔMODOS
// ===========================

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedRoom = button.dataset.room;

    if (isSleeping && selectedRoom !== "bedroom") {
      stopSleeping();
    }

    menuButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    room.dataset.room = selectedRoom;

    if (foodTray) {
      foodTray.hidden = selectedRoom !== "kitchen";
    }

    if (bathTray) {
      bathTray.hidden = selectedRoom !== "bathroom";
    }

    if (sleepTray) {
      sleepTray.hidden = selectedRoom !== "bedroom";
    }

    if (selectedRoom === "home") {
      message.textContent = "Cinna está esperando você ♡";
    }

    if (selectedRoom === "kitchen") {
      message.textContent = "O que vamos comer? 🍰";
    }

    if (selectedRoom === "bathroom") {
      message.textContent = "Hora do banho! 🫧";
    }

    if (selectedRoom === "bedroom") {
      if (isSleeping) {
        message.textContent = "Zzz... 😴💤";
      } else {
        message.textContent = "Cinna está ficando com soninho... 🌙";
      }
    }

    if (selectedRoom === "games") {
      message.textContent = "Vamos brincar? 🎮";
    }
  });
});


// ===========================
// COMIDA
// ===========================

foodItems.forEach((food) => {
  food.addEventListener("click", () => {
    const foodName = food.dataset.food;
    const foodValue = Number(food.dataset.value);

    const before = cinnaStatus.hunger;

    cinnaStatus.hunger = limitStatus(cinnaStatus.hunger + foodValue);

    const gained = cinnaStatus.hunger - before;

    saveStatus();
    updateStatusBars();
    updateCharacterSprite(true);

    if (gained === 0) {
      message.textContent = "Cinna já está de barriguinha cheia ♡";
      return;
    }

    message.textContent = `${foodName} delicioso! +${gained}% 🍽️`;

    character.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.1)" },
        { transform: "scale(0.97)" },
        { transform: "scale(1)" }
      ],
      {
        duration: 450,
        easing: "ease-out"
      }
    );
  });
});


// ===========================
// BANHO / HIGIENE
// ===========================

bathItems.forEach((item) => {
  item.addEventListener("click", () => {
    const careName = item.dataset.care;
    const careValue = Number(item.dataset.value);

    const before = cinnaStatus.hygiene;

    cinnaStatus.hygiene = limitStatus(cinnaStatus.hygiene + careValue);

    const gained = cinnaStatus.hygiene - before;

    saveStatus();
    updateStatusBars();
    updateCharacterSprite(true);

    if (gained === 0) {
      message.textContent = "Cinna já está limpinho! 🫧";
      return;
    }

    message.textContent = `${careName}! +${gained}% higiene 🫧`;

    character.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(-3deg)" },
        { transform: "rotate(3deg)" },
        { transform: "rotate(0deg)" }
      ],
      {
        duration: 450,
        easing: "ease-out"
      }
    );
  });
});


// ===========================
// FALAS ALEATÓRIAS
// ===========================

setInterval(() => {
  const currentRoom = room.dataset.room || "home";

  if (currentRoom === "home" && !isSleeping) {
    message.textContent = randomMessage(idleMessages);
  }
}, 12000);

