// ======================================================
// CINNA CAFÉ ☕️🍰
// V3 — Idle fluido + piscada natural + reações
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
      "assets/cafe/characters/cinna-chef-blink.PNG",

    cinnaHappy:
      "assets/cafe/characters/cinna-chef-happy.PNG",

    cinnaSad:
      "assets/cafe/characters/cinna-chef-sad.PNG"

  };


  // ====================================================
  // PRÉ-CARREGA OS SPRITES
  // Evita engasgo na primeira troca de imagem
  // ====================================================

  function preloadCafeAssets() {

    Object.values(
      CAFE_ASSETS
    ).forEach(src => {

      const image =
        new Image();

      image.src =
        src;

    });

  }


  preloadCafeAssets();


  // ====================================================
  // ELEMENTOS DO JOGO PRINCIPAL
  // ====================================================

  const gamesRoom =
    document.querySelector(
      ".room"
    );


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
  // EVITA DUPLICAR O CARD
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


  const starCard =
    document.querySelector(
      "#star-game-button"
    );


  if (starCard) {

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
        <!-- ÁREA DOS CLIENTES -->
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
        <!-- MENSAGEM TEMPORÁRIA -->
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

    if (!cafeCoins) {
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
  // ESTADO DA RODADA
  // ====================================================

  let roundErrors =
    0;


  // ====================================================
  // ESTADO DO CINNA
  // ====================================================

  let chefMood =
    "idle";


  let blinkTimeout =
    null;


  let blinkReturnTimeout =
    null;


  let chefReactionTimeout =
    null;


  // ====================================================
  // LIMPA TIMERS DA PISCADA
  // ====================================================

  function clearBlinkTimers() {

    clearTimeout(
      blinkTimeout
    );


    clearTimeout(
      blinkReturnTimeout
    );


    blinkTimeout =
      null;


    blinkReturnTimeout =
      null;

  }


  // ====================================================
  // DEFINE O SPRITE
  // ====================================================

  function setChefMood(
    mood
  ) {

    chefMood =
      mood;


    if (
      mood === "happy"
    ) {

      cafeChef.src =
        CAFE_ASSETS.cinnaHappy;

      return;

    }


    if (
      mood === "sad"
    ) {

      cafeChef.src =
        CAFE_ASSETS.cinnaSad;

      return;

    }


    chefMood =
      "idle";


    cafeChef.src =
      CAFE_ASSETS.cinnaIdle;

  }


  // ====================================================
  // FAZ UMA PISCADA
  // ====================================================

  function performBlink(
    allowDoubleBlink = true
  ) {

    if (
      chefMood !== "idle"
    ) {

      return;

    }


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

          if (
            chefMood !== "idle"
          ) {

            return;

          }


          cafeChef.src =
            CAFE_ASSETS.cinnaIdle;


          /*
            Às vezes ele dá uma piscadinha dupla.
            Fica bem mais natural e menos mecânico.
          */

          const doubleBlink =
            allowDoubleBlink &&
            Math.random() < 0.18;


          if (
            doubleBlink
          ) {

            blinkTimeout =
              setTimeout(
                () => {

                  performBlink(
                    false
                  );

                },
                130
              );

          }

          else {

            scheduleBlink();

          }

        },
        135
      );

  }


  // ====================================================
  // AGENDA A PRÓXIMA PISCADA
  // ====================================================

  function scheduleBlink() {

    clearBlinkTimers();


    if (
      chefMood !== "idle"
    ) {

      return;

    }


    if (
      !cafeOverlay.classList.contains(
        "is-open"
      )
    ) {

      return;

    }


    /*
      Tempo aleatório para não parecer robótico.

      Entre aproximadamente
      3 e 5,5 segundos.
    */

    const delay =
      3000 +
      Math.random() * 2500;


    blinkTimeout =
      setTimeout(
        () => {

          performBlink();

        },
        delay
      );

  }


  // ====================================================
  // PARA A PISCADA
  // ====================================================

  function stopBlink(
    resetSprite = true
  ) {

    clearBlinkTimers();


    if (
      resetSprite
    ) {

      chefMood =
        "idle";


      cafeChef.src =
        CAFE_ASSETS.cinnaIdle;

    }

  }


  // ====================================================
  // VOLTA PARA O IDLE
  // ====================================================

  function returnChefToIdle() {

    clearTimeout(
      chefReactionTimeout
    );


    chefReactionTimeout =
      null;


    setChefMood(
      "idle"
    );


    if (
      cafeOverlay.classList.contains(
        "is-open"
      )
    ) {

      scheduleBlink();

    }

  }


  // ====================================================
  // REAÇÃO FELIZ
  // Pedido correto
  // ====================================================

  function showChefHappy(
    duration = 1100
  ) {

    clearTimeout(
      chefReactionTimeout
    );


    stopBlink(
      false
    );


    setChefMood(
      "happy"
    );


    chefReactionTimeout =
      setTimeout(
        () => {

          returnChefToIdle();

        },
        duration
      );

  }


  // ====================================================
  // REAÇÃO TRISTE
  // Pedido errado
  // ====================================================

  function showChefSad(
    duration = 1000
  ) {

    clearTimeout(
      chefReactionTimeout
    );


    stopBlink(
      false
    );


    setChefMood(
      "sad"
    );


    chefReactionTimeout =
      setTimeout(
        () => {

          returnChefToIdle();

        },
        duration
      );

  }


  // ====================================================
  // PEDIDO CERTO
  // ====================================================

  function registerCorrectOrder() {

    showChefHappy(
      1100
    );

  }


  // ====================================================
  // PEDIDO ERRADO
  // ====================================================

  function registerWrongOrder() {

    roundErrors +=
      1;


    showChefSad(
      1000
    );

  }


  // ====================================================
  // FINAL DA RODADA
  // ====================================================

  function finishRound(
    errors = roundErrors
  ) {

    clearTimeout(
      chefReactionTimeout
    );


    chefReactionTimeout =
      null;


    stopBlink(
      false
    );


    /*
      REGRA DO CINNA CAFÉ:

      0 a 5 erros
      → feliz

      mais de 5 erros
      → triste
    */


    if (
      errors > 5
    ) {

      setChefMood(
        "sad"
      );

    }

    else {

      setChefMood(
        "happy"
      );

    }

  }


  // ====================================================
  // RESETA A RODADA
  // ====================================================

  function resetRound() {

    roundErrors =
      0;


    clearTimeout(
      chefReactionTimeout
    );


    chefReactionTimeout =
      null;


    stopBlink(
      false
    );


    setChefMood(
      "idle"
    );


    if (
      cafeOverlay.classList.contains(
        "is-open"
      )
    ) {

      scheduleBlink();

    }

  }


  // ====================================================
  // FALLBACK DOS SPRITES
  // ====================================================

  cafeChef.addEventListener(
    "error",
    () => {

      const currentSrc =
        cafeChef.getAttribute(
          "src"
        ) || "";


      if (
        currentSrc ===
        CAFE_ASSETS.cinnaIdle
      ) {

        return;

      }


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


    resetRound();

  }


  // ====================================================
  // FECHAR CAFÉ
  // ====================================================

  function closeCafe() {

    clearTimeout(
      chefReactionTimeout
    );


    chefReactionTimeout =
      null;


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
  // API DO CINNA CAFÉ
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

    },


    // ----------------------------------------------
    // PEDIDO CORRETO
    // ----------------------------------------------

    correctOrder() {

      registerCorrectOrder();

    },


    // Compatibilidade

    happy(
      duration = 1100
    ) {

      showChefHappy(
        duration
      );

    },


    // ----------------------------------------------
    // PEDIDO ERRADO
    // ----------------------------------------------

    wrongOrder() {

      registerWrongOrder();

    },


    // Compatibilidade

    sad(
      duration = 1000
    ) {

      showChefSad(
        duration
      );

    },


    // ----------------------------------------------
    // FINALIZA RODADA
    // ----------------------------------------------

    finishRound(
      errors
    ) {

      if (
        typeof errors ===
        "number"
      ) {

        finishRound(
          errors
        );

      }

      else {

        finishRound(
          roundErrors
        );

      }

    },


    // ----------------------------------------------
    // NOVA RODADA
    // ----------------------------------------------

    resetRound() {

      resetRound();

    },


    // ----------------------------------------------
    // DEBUG
    // ----------------------------------------------

    getMood() {

      return chefMood;

    },


    getErrors() {

      return roundErrors;

    }

  };


  // ====================================================
  // INICIALIZA
  // ====================================================

  updateCafeCoins();

})();
