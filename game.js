const character = document.querySelector(".character");
const message = document.querySelector("#message");

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

// Quantas vezes já fizemos carinho nele
let pets = Number(localStorage.getItem("cinnaPets")) || 0;

function randomMessage(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function petCinna() {
  pets++;

  localStorage.setItem("cinnaPets", pets);

  message.textContent = randomMessage(petMessages);

  character.animate(
    [
      { transform: "translateY(0) scale(1)" },
      { transform: "translateY(-15px) scale(1.12)" },
      { transform: "translateY(0) scale(1)" }
    ],
    {
      duration: 350,
      easing: "ease-out"
    }
  );
}

// Funciona tanto com toque quanto clique
character.addEventListener("click", petCinna);

// De vez em quando ele fala sozinho
setInterval(() => {
  message.textContent = randomMessage(idleMessages);
}, 12000);