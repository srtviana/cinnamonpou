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

const foodTray = document.querySelector("#food-tray");
const foodItems = document.querySelectorAll(".food-item");


// ===========================
// SPRITES / ANIMAÇÃO IDLE
// ===========================

const idleFrames = [
  "assets/sprites/cinna-idle-1.PNG",
  "assets/sprites/cinna-idle-2.PNG",
  "assets/sprites/cinna-idle-3.PNG"
];

// Faz 1 → 2 → 3 → 2 → 1
const idleSequence = [0, 1, 2, 1];

let idleStep = 0;


// Pré-carrega as imagens
idleFrames.forEach((src) => {
  const image = new Image();
  image.src = src;
});


// Troca os frames
setInterval(() => {
  idleStep = (idleStep + 1) % idleSequence.length;

  const frame = idleSequence[idleStep];

  character.src = idleFrames[frame];
}, 500);


// ===========================
// FRASES DO CINNA
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

// Essa função evita que um status salvo como 0
// volte automaticamente para o valor inicial.
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
  energy: loadStatus("cinnaEnergy", 100)
};


function limitStatus(value) {
  return Math.max(0, Math.min(100, value));
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
}


function updateStatusBars() {
  happinessBar.style.width =
    `${cinnaStatus.happiness}%`;

  hungerBar.style.width =
    `${cinnaStatus.hunger}%`;

  energyBar.style.width =
    `${cinnaStatus.energy}%`;
}


// Mostra os valores assim que abre o jogo
updateStatusBars();


// TEMPORÁRIO PARA TESTES
// Depois aumentamos bastante esse tempo.
function decreaseStatus() {
  cinnaStatus.happiness = limitStatus(
    cinnaStatus.happiness - 1
  );

  cinnaStatus.hunger = limitStatus(
    cinnaStatus.hunger - 2
  );

  cinnaStatus.energy = limitStatus(
    cinnaStatus.energy - 1
  );

  saveStatus();
  updateStatusBars();
}


setInterval(decreaseStatus, 10000);


// ===========================
// CARINHO
// ===========================

let pets =
  Number(localStorage.getItem("cinnaPets")) || 0;


function petCinna() {
  pets++;

  localStorage.setItem(
    "cinnaPets",
    pets
  );

  // aumenta felicidade
  cinnaStatus.happiness = limitStatus(
    cinnaStatus.happiness + 3
  );

  saveStatus();
  updateStatusBars();

  message.textContent =
    randomMessage(petMessages);

  character.animate(
    [
      {
        transform: "scale(1)"
      },

      {
        transform: "scale(1.08)"
      },

      {
        transform: "scale(1)"
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


// ===========================
// CÔMODO INICIAL
// ===========================

room.dataset.room = "home";


// ===========================
// MENU DE CÔMODOS
// ===========================

menuButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedRoom =
      button.dataset.room;


    // Remove seleção antiga
    menuButtons.forEach((btn) => {
      btn.classList.remove("active");
    });


    // Seleciona botão atual
    button.classList.add("active");


    // Salva cômodo atual
    room.dataset.room = selectedRoom;


    // =====================
    // BANDEJA DE COMIDA
    // =====================

    if (foodTray) {
      foodTray.hidden =
        selectedRoom !== "kitchen";
    }


    // =====================
    // MENSAGENS
    // =====================

    if (selectedRoom === "home") {
      message.textContent =
        "Cinna está esperando você ♡";
    }


    if (selectedRoom === "kitchen") {
      message.textContent =
        "O que vamos comer? 🍰";
    }


    if (selectedRoom === "bathroom") {
      message.textContent =
        "Hora do banho! 🫧";
    }


    if (selectedRoom === "bedroom") {
      message.textContent =
        "Cinna está ficando com soninho... 🌙";
    }


    if (selectedRoom === "games") {
      message.textContent =
        "Vamos brincar? 🎮";
    }

  });

});


// ===========================
// COMIDA
// ===========================

foodItems.forEach((food) => {

  food.addEventListener("click", () => {

    const foodName =
      food.dataset.food;

    const foodValue =
      Number(food.dataset.value);


    // Valor antes de comer
    const before =
      cinnaStatus.hunger;


    // Aumenta saciedade
    cinnaStatus.hunger = limitStatus(
      cinnaStatus.hunger + foodValue
    );


    // Descobre quanto realmente aumentou
    const gained =
      cinnaStatus.hunger - before;


    saveStatus();
    updateStatusBars();


    // Se já estiver cheio
    if (gained === 0) {

      message.textContent =
        "Cinna já está de barriguinha cheia ♡";

      return;
    }


    // Mensagem após comer
    message.textContent =
      `${foodName} delicioso! +${gained}% 🍽️`;


    // Pequena reação
    character.animate(
      [
        {
          transform: "scale(1)"
        },

        {
          transform: "scale(1.1)"
        },

        {
          transform: "scale(0.97)"
        },

        {
          transform: "scale(1)"
        }
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

// Só fala sozinho quando estiver
// na tela inicial.
setInterval(() => {

  const currentRoom =
    room.dataset.room || "home";


  if (currentRoom === "home") {

    message.textContent =
      randomMessage(idleMessages);

  }

}, 12000);
