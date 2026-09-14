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


// ===========================
// SPRITES / IDLE
// ===========================

const idleFrames = [
  "assets/sprites/cinna-idle-1.PNG",
  "assets/sprites/cinna-idle-2.PNG",
  "assets/sprites/cinna-idle-3.PNG"
];

const idleSequence = [0, 1, 2, 1];

let idleStep = 0;


// pré-carrega sprites
idleFrames.forEach((src) => {
  const image = new Image();
  image.src = src;
});


setInterval(() => {
  idleStep =
    (idleStep + 1) % idleSequence.length;

  const frame =
    idleSequence[idleStep];

  character.src =
    idleFrames[frame];

}, 500);


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

  const index =
    Math.floor(
      Math.random() * list.length
    );

  return list[index];

}


// ===========================
// STATUS
// ===========================

function loadStatus(
  key,
  defaultValue
) {

  const savedValue =
    localStorage.getItem(key);

  if (savedValue === null) {
    return defaultValue;
  }

  return Number(savedValue);

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
    Math.min(100, value)
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


updateStatusBars();


// ===========================
// DIMINUI STATUS
// ===========================

// ainda está rápido só para teste

function decreaseStatus() {

  cinnaStatus.happiness =
    limitStatus(
      cinnaStatus.happiness - 1
    );

  cinnaStatus.hunger =
    limitStatus(
      cinnaStatus.hunger - 2
    );

  cinnaStatus.energy =
    limitStatus(
      cinnaStatus.energy - 1
    );

  cinnaStatus.hygiene =
    limitStatus(
      cinnaStatus.hygiene - 2
    );

  saveStatus();

  updateStatusBars();

}


setInterval(
  decreaseStatus,
  10000
);


// ===========================
// CARINHO
// ===========================

let pets =
  Number(
    localStorage.getItem(
      "cinnaPets"
    )
  ) || 0;


function petCinna() {

  pets++;

  localStorage.setItem(
    "cinnaPets",
    pets
  );

  cinnaStatus.happiness =
    limitStatus(
      cinnaStatus.happiness + 3
    );

  saveStatus();

  updateStatusBars();

  message.textContent =
    randomMessage(
      petMessages
    );

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

room.dataset.room =
  "home";


// ===========================
// MENU DE CÔMODOS
// ===========================

menuButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selectedRoom =
          button.dataset.room;


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


        // comida

        if (foodTray) {

          foodTray.hidden =
            selectedRoom !==
            "kitchen";

        }


        // banho

        if (bathTray) {

          bathTray.hidden =
            selectedRoom !==
            "bathroom";

        }


        // mensagens

        if (
          selectedRoom === "home"
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

          message.textContent =
            "Cinna está ficando com soninho... 🌙";

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


// ===========================
// COMIDA
// ===========================

foodItems.forEach(
  (food) => {

    food.addEventListener(
      "click",
      () => {

        const foodName =
          food.dataset.food;

        const foodValue =
          Number(
            food.dataset.value
          );


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


        if (gained === 0) {

          message.textContent =
            "Cinna já está de barriguinha cheia ♡";

          return;

        }


        message.textContent =
          `${foodName} delicioso! +${gained}% 🍽️`;


        character.animate(
          [
            {
              transform:
                "scale(1)"
            },

            {
              transform:
                "scale(1.1)"
            },

            {
              transform:
                "scale(0.97)"
            },

            {
              transform:
                "scale(1)"
            }
          ],
          {
            duration: 450,
            easing: "ease-out"
          }
        );

      }
    );

  }
);


// ===========================
// BANHO / HIGIENE
// ===========================

bathItems.forEach(
  (item) => {

    item.addEventListener(
      "click",
      () => {

        const careName =
          item.dataset.care;

        const careValue =
          Number(
            item.dataset.value
          );


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


        if (gained === 0) {

          message.textContent =
            "Cinna já está limpinho! 🫧";

          return;

        }


        message.textContent =
          `${careName}! +${gained}% higiene 🫧`;


        character.animate(
          [
            {
              transform:
                "rotate(0deg)"
            },

            {
              transform:
                "rotate(-3deg)"
            },

            {
              transform:
                "rotate(3deg)"
            },

            {
              transform:
                "rotate(0deg)"
            }
          ],
          {
            duration: 450,
            easing: "ease-out"
          }
        );

      }
    );

  }
);


// ===========================
// FALAS ALEATÓRIAS
// ===========================

setInterval(
  () => {

    const currentRoom =
      room.dataset.room ||
      "home";


    if (
      currentRoom === "home"
    ) {

      message.textContent =
        randomMessage(
          idleMessages
        );

    }

  },
  12000
);
