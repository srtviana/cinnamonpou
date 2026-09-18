// ======================================================
// CENTRAL DE MINIJOGOS
// ======================================================

const gamesRoom = document.querySelector(".room");
const gamesMenuButtons = document.querySelectorAll(".menu-button");


// ======================================================
// CENTRAL
// ======================================================

const gameHub = document.createElement("section");

gameHub.id = "game-hub";
gameHub.className = "game-hub";

gameHub.innerHTML = `

  <h2 class="game-hub-title">
    🎮 Minijogos
  </h2>

  <p class="game-hub-subtitle">
    Escolha uma brincadeira!
  </p>


  <div class="game-cards">

    <button
      class="game-card available"
      id="star-game-button"
      type="button"
    >

      <span class="game-card-icon">
        ⭐
      </span>

      <span class="game-card-info">

        <strong class="game-card-name">
          Pega Estrelinhas
        </strong>

        <small class="game-card-description">
          Pegue o máximo de estrelas antes do tempo acabar.
        </small>

      </span>

      <span class="game-card-status">
        JOGAR
      </span>

    </button>


    <button
      class="game-card locked"
      type="button"
      disabled
    >

      <span class="game-card-icon">
        ☁️
      </span>

      <span class="game-card-info">

        <strong class="game-card-name">
          Cloud Jump
        </strong>

        <small class="game-card-description">
          Pule entre as nuvens sem cair.
        </small>

      </span>

      <span class="game-card-status">
        EM BREVE
      </span>

    </button>


    <button
      class="game-card locked"
      type="button"
      disabled
    >

      <span class="game-card-icon">
        🧠
      </span>

      <span class="game-card-info">

        <strong class="game-card-name">
          Memória
        </strong>

        <small class="game-card-description">
          Encontre todos os pares.
        </small>

      </span>

      <span class="game-card-status">
        EM BREVE
      </span>

    </button>

  </div>


  <p
    id="game-hub-message"
    class="game-hub-message"
  >
    Qual vamos jogar? ☁️
  </p>

`;

gamesRoom.appendChild(gameHub);


// ======================================================
// PEGA ESTRELINHAS — TELA
// ======================================================

const starGameScreen =
  document.createElement(
    "section"
  );

starGameScreen.id =
  "star-game-screen";

starGameScreen.className =
  "star-game-screen";


starGameScreen.innerHTML = `

  <div class="star-game-topbar">

    <div class="star-stat">
      <span>⭐</span>
      <strong id="star-score">
        0
      </strong>
    </div>


    <div class="star-game-title">
      Pega Estrelinhas
    </div>


    <div class="star-stat">
      <span>⏱️</span>
      <strong id="star-time">
        30
      </strong>
    </div>

  </div>


  <div
    id="star-game-board"
    class="star-game-board"
  >

    <button
      id="catch-star"
      class="catch-star"
      type="button"
      aria-label="Pegar estrela"
    >
      ⭐
    </button>


    <!-- TELA INICIAL -->

    <div
      id="star-start-overlay"
      class="star-game-overlay"
    >

      <div class="star-game-overlay-card">

        <div class="star-big-icon">
          ⭐
        </div>


        <h3>
          Pega Estrelinhas
        </h3>


        <p>
          Toque nas estrelas o mais rápido que conseguir!
        </p>


        <button
          id="star-start-button"
          class="star-primary-button"
          type="button"
        >
          COMEÇAR
        </button>

      </div>

    </div>


    <!-- RESULTADO -->

    <div
      id="star-result-overlay"
      class="star-game-overlay"
      hidden
    >

      <div
        class="star-game-overlay-card result-card"
      >

        <div class="star-big-icon">
          🌟
        </div>


        <h3>
          Fim de jogo!
        </h3>


        <p
          id="star-result-text"
          class="star-result-text"
        ></p>


        <p
          id="star-reward-text"
          class="star-reward-text"
        ></p>


        <div class="star-result-buttons">

          <button
            id="star-replay-button"
            class="star-primary-button"
            type="button"
          >
            JOGAR DE NOVO
          </button>


          <button
            id="star-back-button"
            class="star-secondary-button"
            type="button"
          >
            VOLTAR
          </button>

        </div>

      </div>

    </div>

  </div>


  <button
    id="star-exit-button"
    class="star-exit-button"
    type="button"
  >
    ← Voltar aos jogos
  </button>

`;

gamesRoom.appendChild(
  starGameScreen
);


// ======================================================
// ELEMENTOS
// ======================================================

const starGameButton =
  document.querySelector(
    "#star-game-button"
  );

const gameHubMessage =
  document.querySelector(
    "#game-hub-message"
  );


const starScoreElement =
  document.querySelector(
    "#star-score"
  );

const starTimeElement =
  document.querySelector(
    "#star-time"
  );

const starGameBoard =
  document.querySelector(
    "#star-game-board"
  );

const catchStar =
  document.querySelector(
    "#catch-star"
  );


const starStartOverlay =
  document.querySelector(
    "#star-start-overlay"
  );

const starResultOverlay =
  document.querySelector(
    "#star-result-overlay"
  );


const starStartButton =
  document.querySelector(
    "#star-start-button"
  );

const starReplayButton =
  document.querySelector(
    "#star-replay-button"
  );

const starBackButton =
  document.querySelector(
    "#star-back-button"
  );

const starExitButton =
  document.querySelector(
    "#star-exit-button"
  );


const starResultText =
  document.querySelector(
    "#star-result-text"
  );

const starRewardText =
  document.querySelector(
    "#star-reward-text"
  );


// ======================================================
// ESTADO DO MINIJOGO
// ======================================================

const STAR_GAME_DURATION =
  30;

let starScore =
  0;

let starTimeLeft =
  STAR_GAME_DURATION;

let starGameRunning =
  false;

let starTimerInterval =
  null;

let starMoveInterval =
  null;


// ======================================================
// CENTRAL
// ======================================================

function updateGamesHub() {

  const currentRoom =
    gamesRoom.dataset.room;


  if (
    currentRoom === "games"
  ) {

    gamesRoom.classList.add(
      "games-open"
    );

  }

  else {

    stopStarGame(
      false
    );

    closeStarGame();

    gamesRoom.classList.remove(
      "games-open"
    );

  }

}


// ======================================================
// ABRIR O MINIJOGO
// ======================================================

function openStarGame() {

  stopStarGame(
    false
  );


  starScore =
    0;

  starTimeLeft =
    STAR_GAME_DURATION;


  starScoreElement.textContent =
    starScore;

  starTimeElement.textContent =
    starTimeLeft;


  starResultOverlay.hidden =
    true;

  starStartOverlay.hidden =
    false;

  catchStar.hidden =
    true;


  gamesRoom.classList.add(
    "star-game-open"
  );

}


// ======================================================
// FECHAR O MINIJOGO
// ======================================================

function closeStarGame() {

  stopStarGame(
    false
  );


  gamesRoom.classList.remove(
    "star-game-open"
  );


  starResultOverlay.hidden =
    true;

  starStartOverlay.hidden =
    false;

  catchStar.hidden =
    true;

}


// ======================================================
// POSIÇÃO ALEATÓRIA
// ======================================================

function moveStar() {

  if (
    !starGameRunning
  ) {

    return;

  }


  const boardRect =
    starGameBoard
      .getBoundingClientRect();


  const starRect =
    catchStar
      .getBoundingClientRect();


  const padding =
    10;


  const maxX =
    Math.max(

      padding,

      boardRect.width -
      starRect.width -
      padding

    );


  const maxY =
    Math.max(

      padding,

      boardRect.height -
      starRect.height -
      padding

    );


  const x =

    padding +
    Math.random() *
    (
      maxX -
      padding
    );


  const y =

    padding +
    Math.random() *
    (
      maxY -
      padding
    );


  catchStar.style.left =
    `${x}px`;

  catchStar.style.top =
    `${y}px`;

}


// ======================================================
// RECOMPENSA
// ======================================================

function getStarReward(
  score
) {

  if (
    score <= 5
  ) {

    return 3;

  }


  if (
    score <= 10
  ) {

    return 5;

  }


  if (
    score <= 20
  ) {

    return 10;

  }


  return 15;

}


function giveStarReward(
  reward
) {

  if (
    typeof cinnaStatus ===
    "undefined"
  ) {

    return;

  }


  cinnaStatus.happiness =

    limitStatus(

      cinnaStatus.happiness +
      reward

    );


  saveStatus();

  updateStatusBars();

}


// ======================================================
// COMEÇAR
// ======================================================

function startStarGame() {

  clearInterval(
    starTimerInterval
  );

  clearInterval(
    starMoveInterval
  );


  starScore =
    0;

  starTimeLeft =
    STAR_GAME_DURATION;

  starGameRunning =
    true;


  starScoreElement.textContent =
    starScore;

  starTimeElement.textContent =
    starTimeLeft;


  starStartOverlay.hidden =
    true;

  starResultOverlay.hidden =
    true;

  catchStar.hidden =
    false;


  moveStar();


  // A estrela muda de posição
  // mesmo se você não clicar nela.

  starMoveInterval =

    setInterval(

      moveStar,

      850

    );


  starTimerInterval =

    setInterval(

      () => {

        starTimeLeft -=
          1;


        starTimeElement.textContent =
          starTimeLeft;


        if (
          starTimeLeft <=
          0
        ) {

          finishStarGame();

        }

      },

      1000

    );

}


// ======================================================
// PEGAR ESTRELA
// ======================================================

function catchCurrentStar() {

  if (
    !starGameRunning
  ) {

    return;

  }


  starScore +=
    1;


  starScoreElement.textContent =
    starScore;


  catchStar.classList.remove(
    "star-pop"
  );


  // Reinicia a animação

  void catchStar.offsetWidth;


  catchStar.classList.add(
    "star-pop"
  );


  moveStar();

}


// ======================================================
// FINALIZAR
// ======================================================

function finishStarGame() {

  if (
    !starGameRunning
  ) {

    return;

  }


  starGameRunning =
    false;


  clearInterval(
    starTimerInterval
  );

  clearInterval(
    starMoveInterval
  );


  starTimerInterval =
    null;

  starMoveInterval =
    null;


  catchStar.hidden =
    true;


  const reward =
    getStarReward(
      starScore
    );


  const previousBest =

    Number(

      localStorage.getItem(
        "cinnaStarBest"
      )

    )

    ||

    0;


  const bestScore =
    Math.max(

      previousBest,

      starScore

    );


  localStorage.setItem(

    "cinnaStarBest",

    bestScore

  );


  giveStarReward(
    reward
  );


  starResultText.textContent =

    `Você pegou ${starScore} estrela${starScore === 1 ? "" : "s"}! Recorde: ${bestScore} ⭐`;


  starRewardText.textContent =

    `Cinna ganhou +${reward}% de felicidade ❤️`;


  starResultOverlay.hidden =
    false;

}


// ======================================================
// PARAR
// ======================================================

function stopStarGame(
  showStart = true
) {

  starGameRunning =
    false;


  clearInterval(
    starTimerInterval
  );

  clearInterval(
    starMoveInterval
  );


  starTimerInterval =
    null;

  starMoveInterval =
    null;


  catchStar.hidden =
    true;


  if (
    showStart
  ) {

    starStartOverlay.hidden =
      false;

    starResultOverlay.hidden =
      true;

  }

}


// ======================================================
// EVENTOS
// ======================================================

starGameButton.addEventListener(

  "click",

  () => {

    gameHubMessage.textContent =
      "⭐ Preparando o Pega Estrelinhas...";


    openStarGame();

  }

);


starStartButton.addEventListener(

  "click",

  startStarGame

);


starReplayButton.addEventListener(

  "click",

  startStarGame

);


starBackButton.addEventListener(

  "click",

  closeStarGame

);


starExitButton.addEventListener(

  "click",

  closeStarGame

);


catchStar.addEventListener(

  "click",

  catchCurrentStar

);


// ======================================================
// OBSERVA TROCA DE CÔMODO
// ======================================================

const roomObserver =

  new MutationObserver(

    updateGamesHub

  );


roomObserver.observe(

  gamesRoom,

  {

    attributes:
      true,

    attributeFilter: [
      "data-room"
    ]

  }

);


// ======================================================
// BOTÕES DO MENU
// ======================================================

gamesMenuButtons.forEach(

  button => {

    button.addEventListener(

      "click",

      () => {

        setTimeout(
          updateGamesHub,
          0
        );

      }

    );

  }

);


// ======================================================
// INICIALIZAÇÃO
// ======================================================

updateGamesHub();


// ======================================================
// CINNA COINS 🪙
// ======================================================

const CINNA_COINS_KEY =
  "cinnaCoins";


// ======================================================
// CARREGAR SALDO
// ======================================================

function loadCinnaCoins() {

  const saved =
    localStorage.getItem(
      CINNA_COINS_KEY
    );


  // Primeira vez jogando:
  // começa com 50 Cinna Coins.

  if (saved === null) {

    localStorage.setItem(
      CINNA_COINS_KEY,
      "50"
    );

    return 50;

  }


  const value =
    Number(saved);


  if (
    Number.isNaN(value)
  ) {

    localStorage.setItem(
      CINNA_COINS_KEY,
      "50"
    );

    return 50;

  }


  return value;

}


let cinnaCoins =
  loadCinnaCoins();


// ======================================================
// VISUAL DO CONTADOR
// ======================================================

const coinStyles =
  document.createElement(
    "style"
  );


coinStyles.textContent = `

  .cinna-coins-area {

    width: 100%;

    display: flex;

    justify-content: flex-end;

    padding:
      0
      18px
      10px;

    margin-top: -5px;

  }


  .cinna-coins-wallet {

    display: inline-flex;

    align-items: center;

    gap: 7px;

    padding:
      7px
      12px;

    border-radius:
      999px;

    background:
      rgba(
        255,
        255,
        255,
        0.9
      );

    box-shadow:
      0
      5px
      15px
      rgba(
        84,
        143,
        177,
        0.14
      );

    color:
      #587b97;

    font-weight:
      800;

    user-select:
      none;

    -webkit-user-select:
      none;

  }


  .cinna-coins-icon {

    font-size:
      20px;

    line-height:
      1;

  }


  .cinna-coins-number {

    font-size:
      15px;

    min-width:
      20px;

    text-align:
      center;

  }


  .cinna-coins-name {

    font-size:
      10px;

    color:
      #7994a9;

    font-weight:
      700;

  }


  .cinna-coins-wallet.coin-bump {

    animation:
      cinnaCoinBump
      0.45s
      ease;

  }


  @keyframes cinnaCoinBump {

    0% {

      transform:
        scale(1);

    }


    35% {

      transform:
        scale(1.16)
        rotate(-3deg);

    }


    70% {

      transform:
        scale(0.96)
        rotate(2deg);

    }


    100% {

      transform:
        scale(1)
        rotate(0deg);

    }

  }


  @media (
    max-width: 390px
  ) {

    .cinna-coins-area {

      padding:
        0
        16px
        8px;

    }


    .cinna-coins-wallet {

      padding:
        6px
        10px;

    }


    .cinna-coins-name {

      font-size:
        9px;

    }

  }

`;


document.head.appendChild(
  coinStyles
);


// ======================================================
// CRIA O CONTADOR
// ======================================================

const coinArea =
  document.createElement(
    "div"
  );


coinArea.className =
  "cinna-coins-area";


coinArea.innerHTML = `

  <div
    id="cinna-coins-wallet"
    class="cinna-coins-wallet"
  >

    <span class="cinna-coins-icon">
      🪙
    </span>

    <span
      id="cinna-coins-number"
      class="cinna-coins-number"
    >
      ${cinnaCoins}
    </span>

    <span class="cinna-coins-name">
      Cinna Coins
    </span>

  </div>

`;


const statusPanel =
  document.querySelector(
    ".status-panel"
  );


statusPanel.insertAdjacentElement(
  "beforebegin",
  coinArea
);


// ======================================================
// ATUALIZAR CONTADOR
// ======================================================

function updateCinnaCoinsDisplay(
  animate = false
) {

  const number =
    document.querySelector(
      "#cinna-coins-number"
    );


  const wallet =
    document.querySelector(
      "#cinna-coins-wallet"
    );


  if (number) {

    number.textContent =
      cinnaCoins;

  }


  if (
    animate &&
    wallet
  ) {

    wallet.classList.remove(
      "coin-bump"
    );


    void wallet.offsetWidth;


    wallet.classList.add(
      "coin-bump"
    );

  }

}


// ======================================================
// GANHAR MOEDAS
// ======================================================

function addCinnaCoins(
  amount
) {

  const value =
    Math.max(
      0,
      Math.floor(
        Number(amount) || 0
      )
    );


  cinnaCoins +=
    value;


  localStorage.setItem(
    CINNA_COINS_KEY,
    cinnaCoins
  );


  updateCinnaCoinsDisplay(
    true
  );


  return cinnaCoins;

}


// ======================================================
// GASTAR MOEDAS
// ======================================================

function spendCinnaCoins(
  amount
) {

  const value =
    Math.max(
      0,
      Math.floor(
        Number(amount) || 0
      )
    );


  if (
    cinnaCoins <
    value
  ) {

    return false;

  }


  cinnaCoins -=
    value;


  localStorage.setItem(
    CINNA_COINS_KEY,
    cinnaCoins
  );


  updateCinnaCoinsDisplay(
    true
  );


  return true;

}


// ======================================================
// RECOMPENSA DO PEGA ESTRELINHAS
// ======================================================

function getStarCoinReward(
  score
) {

  if (
    score <= 5
  ) {

    return 5;

  }


  if (
    score <= 10
  ) {

    return 10;

  }


  if (
    score <= 20
  ) {

    return 20;

  }


  if (
    score <= 30
  ) {

    return 30;

  }


  return 40;

}


// ======================================================
// GUARDA A FUNÇÃO ORIGINAL DO MINIJOGO
// ======================================================

const originalFinishStarGame =
  finishStarGame;


// ======================================================
// NOVO FINAL DO PEGA ESTRELINHAS
// ======================================================

finishStarGame =
  function () {

    if (
      !starGameRunning
    ) {

      return;

    }


    // Guardamos a pontuação
    // antes da função original terminar.

    const finalScore =
      starScore;


    // A função original continua cuidando:
    // - cronômetro
    // - recorde
    // - felicidade
    // - tela de resultado

    originalFinishStarGame();


    // Recompensa de moedas.

    const coinReward =
      getStarCoinReward(
        finalScore
      );


    addCinnaCoins(
      coinReward
    );


    // Recompensa de felicidade
    // que o próprio jogo já calcula.

    const happinessReward =
      getStarReward(
        finalScore
      );


    // Atualiza o texto final.

    starRewardText.innerHTML = `

      ❤️ +${happinessReward}% felicidade

      <br>

      🪙 +${coinReward} Cinna Coins

      <br><br>

      <small>
        Saldo: 🪙 ${cinnaCoins}
      </small>

    `;

  };


// ======================================================
// API DAS CINNA COINS
// Para nossa futura lojinha 🌝
// ======================================================

window.CinnaCoins = {

  getBalance() {

    return cinnaCoins;

  },


  add(amount) {

    return addCinnaCoins(
      amount
    );

  },


  spend(amount) {

    return spendCinnaCoins(
      amount
    );

  },


  refresh() {

    updateCinnaCoinsDisplay();

  }

};


// ======================================================
// INICIALIZAÇÃO
// ======================================================

updateCinnaCoinsDisplay();
