const character = document.querySelector("#cinna");
const message = document.querySelector("#message");

const idleFrames = [
  "assets/sprites/cinna-idle-1.PNG",
  "assets/sprites/cinna-idle-2.PNG",
  "assets/sprites/cinna-idle-3.PNG"
];

// Faz 1 → 2 → 3 → 2 → 1 para o movimento não "pular"
const idleSequence = [0, 1, 2, 1];

let idleStep = 0;

const petMessages = [
  "Cinna gostou do carinho ♡",
  "Hehe ♡",
  "Cinna está feliz!",
  "Mais carinho!! ☁️",
  "♡ +1 felicidade"
];

const idleMessages = [
  "Cinna está esperando você ♡",
  "Cinna está olhando pra você 👀",
  "Cinna quer brincar...",
  "Que tal um docinho? 🍰",
  "☁️ ♡ ☁️"
];

let pets = Number(localStorage.getItem("cinnaPets")) || 0;

function randomMessage(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

// Pré-carrega os sprites
idleFrames.forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Animação idle
setInterval(() => {
  idleStep = (idleStep + 1) % idleSequence.length;

  const frame = idleSequence[idleStep];

  character.src = idleFrames[frame];

  character.style.transform =
    idleStep % 2 === 0
      ? "translateY(0px)"
      : "translateY(-12px)";
}, 500);

function petCinna() {
  pets++;
  cinnaStatus.happiness = limitStatus(cinnaStatus.happiness + 3);

saveStatus();
updateStatusBars();

  localStorage.setItem("cinnaPets", pets);

  message.textContent = randomMessage(petMessages);

  character.animate(
    [
      { transform: "translateY(0) scale(1)" },
      { transform: "translateY(-12px) scale(1.08)" },
      { transform: "translateY(0) scale(1)" }
    ],
    {
      duration: 350,
      easing: "ease-out"
    }
  );
}

character.addEventListener("click", petCinna);

setInterval(() => {
  message.textContent = randomMessage(idleMessages);
}, 12000);

// ===========================
// STATUS DO CINNA
// ===========================

const happinessBar = document.querySelector("#happiness-bar");
const hungerBar = document.querySelector("#hunger-bar");
const energyBar = document.querySelector("#energy-bar");

const cinnaStatus = {
  happiness: Number(localStorage.getItem("cinnaHappiness")) || 90,
  hunger: Number(localStorage.getItem("cinnaHunger")) || 80,
  energy: Number(localStorage.getItem("cinnaEnergy")) || 100
};

function limitStatus(value) {
  return Math.max(0, Math.min(100, value));
}

function saveStatus() {
  localStorage.setItem("cinnaHappiness", cinnaStatus.happiness);
  localStorage.setItem("cinnaHunger", cinnaStatus.hunger);
  localStorage.setItem("cinnaEnergy", cinnaStatus.energy);
}

function updateStatusBars() {
  happinessBar.style.width = `${cinnaStatus.happiness}%`;
  hungerBar.style.width = `${cinnaStatus.hunger}%`;
  energyBar.style.width = `${cinnaStatus.energy}%`;
}

function decreaseStatus() {
  cinnaStatus.happiness = limitStatus(cinnaStatus.happiness - 1);
  cinnaStatus.hunger = limitStatus(cinnaStatus.hunger - 2);
  cinnaStatus.energy = limitStatus(cinnaStatus.energy - 1);

  saveStatus();
  updateStatusBars();
}

// Mostra os valores salvos assim que o jogo abre
updateStatusBars();

// TEMPORÁRIO: diminui a cada 10 segundos para testarmos
setInterval(decreaseStatus, 10000);


// ===========================
// MENU DE CÔMODOS
// ===========================

const room = document.querySelector(".room");
const menuButtons = document.querySelectorAll(".menu-button");

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedRoom = button.dataset.room;

    // tira o destaque do botão anterior
    menuButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // destaca o botão atual
    button.classList.add("active");

    // informa qual cômodo está aberto
    room.dataset.room = selectedRoom;

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
      message.textContent = "Cinna está ficando com soninho... 🌙";
    }

    if (selectedRoom === "games") {
      message.textContent = "Vamos brincar? 🎮";
    }
  });
});
