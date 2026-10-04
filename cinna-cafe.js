// ======================================================
// CINNA CAFÉ ☕️🍰
// V1 — Estrutura visual do minijogo
// ======================================================

(() => {

  // ====================================================
  // ASSETS
  // ====================================================

  const CAFE_ASSETS = {

    background:
      "assets/cafe/background/cafe-background.PNG",

    clientCounter:
      "assets/cafe/furniture/cafe-client-counter.PNG",

    prepCounter:
      "assets/cafe/furniture/cafe-prep-counter.PNG",

    cinnaIdle:
      "assets/cafe/characters/cinna-chef-idle.PNG",

    cinnaBlink:
      "assets/cafe/characters/cinna-chef-blink.PNG"

  };


  // ====================================================
  // ELEMENTOS DO JOGO PRINCIPAL
  // ====================================================

  const gamesRoom =
    document.querySelector(".room");

  const gameCards =
    document.querySelector(
      "#game-hub .game-cards"
    );


  if (
    !gamesRoom ||
    !gameCards
  ) {

    console.warn(
      "Cinna Café: Games Hub ainda não está disponível."
    );

    return;

  }


  // ====================================================
  // EVITA DUPLICAR
  // ====================================================

  if (
    document.querySelector(
      "#cinna-cafe-button"
    )
  ) {

    return;

  }


  // ====================================================
  // CARD NO GAMES HUB
  // ====================================================

  const cafeCard =
    document.createElement(
      "button"
    );


  cafeCard.id =
    "cinna-cafe-button";


  cafeCard.className =
    "game-card available";


  cafeCard.type =
    "button";


  cafeCard.innerHTML = `

    <span class="game-card-icon">
      ☕
    </span>

    <span class="game-card-info">

      <strong class="game-card-name">
        Cinna Café
      </strong>

      <small class="game-card-description">
        Prepare doces e bebidas para os clientes!
      </small>

    </span>

    <span class="game-card-status">
      JOGAR
    </span>

  `;


  // Coloca depois do Pega Estrelinhas
  const starCard =
    document.querySelector(
      "#star-game-button"
    );


  if (
    starCard
  ) {

    starCard.insertAdjacentElement(
      "afterend",
      cafeCard
    );

  }

  else {

    gameCards.appendChild(
      cafeCard
    );

  }


  // ====================================================
  // TELA DO CINNA CAFÉ
  // ====================================================

  const cafeOverlay =
    document.createElement(
      "section"
    );


  cafeOverlay.id =
    "cinna-cafe-screen";


  cafeOverlay.className =
    "cinna-cafe-screen";


  cafeOverlay.setAttribute(
    "aria-hidden",
    "true"
  );


  cafeOverlay.innerHTML = `

    <div class="cinna-cafe-topbar">

      <button
        id="cinna-cafe-back"
        class="cinna-cafe-back"
        type="button"
        aria-label="Voltar aos jogos"
      >
        ←
      </button>


      <div class="cinna-cafe-topbar-title">

        <strong>
          ☕ Cinna Café
        </strong>

        <small>
          Doces & Sorrisos ♡
        </small>

      </div>


      <div class="cinna-cafe-coins">

        <span>
          🪙
        </span>

        <strong
          id="cinna-cafe-coins-value"
        >
          0
        </strong>

      </div>

    </div>


    <div class="cinna-cafe-stage-wrapper">

      <div
        id="cinna-cafe-stage"
        class="cinna-cafe-stage"
      >


        <!-- ======================================= -->
        <!-- FUNDO -->
        <!-- ======================================= -->

        <img
          class="cinna-cafe-background"
          src="${CAFE_ASSETS.background}"
          alt=""
          draggable="false"
        >


        <!-- ======================================= -->
        <!-- BALCÃO DOS CLIENTES -->
        <!-- ======================================= -->

        <img
          class="cinna-cafe-client-counter"
          src="${CAFE_ASSETS.clientCounter}"
          alt=""
          draggable="false"
        >


        <!-- ======================================= -->
        <!-- ÁREA ONDE ENTRARÃO OS CLIENTES -->
        <!-- ======================================= -->

        <div class="cinna-cafe-customer-area">

          <div
            class="cinna-cafe-customer-slot"
            data-slot="1"
          ></div>

          <div
            class="cinna-cafe-customer-slot"
            data-slot="2"
          ></div>

          <div
            class="cinna-cafe-customer-slot"
            data-slot="3"
          ></div>

        </div>


        <!-- ======================================= -->
        <!-- CINNA COZINHEIRO -->
        <!-- ======================================= -->

        <img
          id="cinna-cafe-chef"
          class="cinna-cafe-chef"
          src="${CAFE_ASSETS.cinnaIdle}"
          alt="Cinna cozinheiro"
          draggable="false"
        >


        <!-- ======================================= -->
        <!-- BANCADA DE PREPARO -->
        <!-- ======================================= -->

        <img
          class="cinna-cafe-prep-counter"
          src="${CAFE_ASSETS.prepCounter}"
          alt=""
          draggable="false"
        >


        <!-- ======================================= -->
        <!-- TEXTO TEMPORÁRIO DA V1 -->
        <!-- ======================================= -->

        <div class="cinna-cafe-ready-message">

          <span>
            ☁️
          </span>

          <strong>
            Cafeteria pronta!
          </strong>

          <small>
            Agora só faltam os clientes ♡
          </small>

        </div>


      </div>

    </div>

  `;


  document.body.appendChild(
    cafeOverlay
  );


  // ====================================================
  // ELEMENTOS
  // ====================================================

  const cafeBackButton =
    cafeOverlay.querySelector(
      "#cinna-cafe-back"
    );


  const cafeChef =
    cafeOverlay.querySelector(
      "#cinna-cafe-chef"
    );


  const cafeCoins =
    cafeOverlay.querySelector(
      "#cinna-cafe-coins-value"
    );


  // ====================================================
  // MOEDAS
  // ====================================================

  function updateCafeCoins() {

    if (
      !cafeCoins
    ) {

      return;

    }


    if (
      window.CinnaCoins &&
      typeof window.CinnaCoins.getBalance ===
        "function"
    ) {

      cafeCoins.textContent =
        window.CinnaCoins.getBalance();

    }

    else {

      cafeCoins.textContent =
        "0";

    }

  }


  // ====================================================
  // ANIMAÇÃO IDLE / PISCAR
  // ====================================================

  let blinkTimeout =
    null;


  let blinkReturnTimeout =
    null;


  function scheduleBlink() {

    clearTimeout(
      blinkTimeout
    );


    clearTimeout(
      blinkReturnTimeout
    );


    const delay =
      2500 +
      Math.random() * 2500;


    blinkTimeout =
      setTimeout(
        () => {

          if (
            !cafeOverlay.classList.contains(
              "is-open"
            )
          ) {

            return;

          }


          cafeChef.src =
            CAFE_ASSETS.cinnaBlink;


          blinkReturnTimeout =
            setTimeout(
              () => {

                cafeChef.src =
                  CAFE_ASSETS.cinnaIdle;


                scheduleBlink();

              },
              180
            );

        },
        delay
      );

  }


  function stopBlink() {

    clearTimeout(
      blinkTimeout
    );


    clearTimeout(
      blinkReturnTimeout
    );


    cafeChef.src =
      CAFE_ASSETS.cinnaIdle;

  }


  // Se o sprite de blink não existir,
  // mantém o idle normalmente.
  cafeChef.addEventListener(
    "error",
    () => {

      cafeChef.src =
        CAFE_ASSETS.cinnaIdle;

    }
  );


  // ====================================================
  // ABRIR CAFÉ
  // ====================================================

  function openCafe() {

    updateCafeCoins();


    cafeOverlay.classList.add(
      "is-open"
    );


    cafeOverlay.setAttribute(
      "aria-hidden",
      "false"
    );


    gamesRoom.classList.add(
      "cinna-cafe-open"
    );


    document.body.classList.add(
      "cinna-cafe-body-open"
    );


    scheduleBlink();

  }


  // ====================================================
  // FECHAR CAFÉ
  // ====================================================

  function closeCafe() {

    stopBlink();


    cafeOverlay.classList.remove(
      "is-open"
    );


    cafeOverlay.setAttribute(
      "aria-hidden",
      "true"
    );


    gamesRoom.classList.remove(
      "cinna-cafe-open"
    );


    document.body.classList.remove(
      "cinna-cafe-body-open"
    );


    updateCafeCoins();

  }


  // ====================================================
  // EVENTOS
  // ====================================================

  cafeCard.addEventListener(
    "click",
    openCafe
  );


  cafeBackButton.addEventListener(
    "click",
    closeCafe
  );


  // ====================================================
  // ESC
  // ====================================================

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
          "Escape" &&
        cafeOverlay.classList.contains(
          "is-open"
        )
      ) {

        closeCafe();

      }

    }
  );


  // ====================================================
  // API DO CAFÉ
  // ====================================================

  window.CinnaCafe = {

    open() {

      openCafe();

    },


    close() {

      closeCafe();

    },


    refreshCoins() {

      updateCafeCoins();

    }

  };


  // ====================================================
  // INICIALIZA
  // ====================================================

  updateCafeCoins();

})();
