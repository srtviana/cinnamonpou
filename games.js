// ======================================================
// CENTRAL DE MINIJOGOS
// ======================================================

const gamesRoom =
  document.querySelector(
    ".room"
  );

const gamesMenuButtons =
  document.querySelectorAll(
    ".menu-button"
  );


// ======================================================
// CRIA A CENTRAL
// ======================================================

const gameHub =
  document.createElement(
    "section"
  );

gameHub.id =
  "game-hub";

gameHub.className =
  "game-hub";


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

gamesRoom.appendChild(
  gameHub
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


// ======================================================
// MOSTRAR / ESCONDER
// ======================================================

function updateGamesHub() {

  const currentRoom =
    gamesRoom.dataset.room;


  if (
    currentRoom ===
    "games"
  ) {

    gamesRoom.classList.add(
      "games-open"
    );

  }

  else {

    gamesRoom.classList.remove(
      "games-open"
    );

  }

}


// ======================================================
// BOTÕES PRINCIPAIS
// ======================================================

gamesMenuButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        /*
          O game.js troca primeiro
          o data-room.

          Logo depois,
          este arquivo verifica
          se estamos em Jogos.
        */

        setTimeout(
          updateGamesHub,
          0
        );

      }
    );

  }
);


// ======================================================
// OBSERVADOR
// ======================================================

const roomObserver =
  new MutationObserver(
    () => {

      updateGamesHub();

    }
  );


roomObserver.observe(
  gamesRoom,
  {
    attributes: true,

    attributeFilter: [
      "data-room"
    ]
  }
);


// ======================================================
// PEGA ESTRELINHAS
// ======================================================

starGameButton.addEventListener(
  "click",
  () => {

    gameHubMessage.textContent =
      "⭐ Pega Estrelinhas selecionado!";

    /*
      No próximo passo,
      daqui vai abrir
      o minijogo de verdade.
    */

  }
);


// ======================================================
// INICIALIZAÇÃO
// ======================================================

updateGamesHub();
