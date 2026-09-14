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
}, 600);

function petCinna() {
  pets++;

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
