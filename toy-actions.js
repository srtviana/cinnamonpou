// ======================================================
// BRINQUEDOS DO CINNA 🧸⚽
// ======================================================
//
// Brinquedos atuais:
//
// 🧸 Ursinho
// ⚽ Bola
//
// - comprados uma única vez
// - ficam permanentemente no inventário
// - botão BRINCAR no inventário
// - aumentam felicidade
// - não são consumidos
//
// ======================================================

(() => {

  // ====================================================
  // CONFIGURAÇÃO DOS BRINQUEDOS
  // ====================================================

  const TOYS = {

    // ==================================================
    // 🧸 URSINHO
    // ==================================================

    ursinho: {

      id:
        "ursinho",

      name:
        "Ursinho",

      happiness:
        20,

      startMessage:
        "Cinna pegou o ursinho 🧸♡",

      finishMessage:
        "Cinna amou abraçar o ursinho!",

      frames: [

        "assets/sprites/cinna-ursinho-1.PNG",

        "assets/sprites/cinna-ursinho-2.PNG",

        "assets/sprites/cinna-ursinho-3.PNG",

        "assets/sprites/cinna-ursinho-4.PNG",

        "assets/sprites/cinna-ursinho-5.PNG",


        // Segura o abraço

        "assets/sprites/cinna-ursinho-5.PNG",

        "assets/sprites/cinna-ursinho-5.PNG",


        // Volta suavemente

        "assets/sprites/cinna-ursinho-4.PNG",

        "assets/sprites/cinna-ursinho-3.PNG",

        "assets/sprites/cinna-ursinho-2.PNG",

        "assets/sprites/cinna-ursinho-1.PNG"

      ]

    },


    // ==================================================
    // ⚽ BOLA
    // ==================================================

    bola: {

      id:
        "bola",

      name:
        "Bola",

      happiness:
        15,

      startMessage:
        "Cinna começou a brincar com a bola! ⚽♡",

      finishMessage:
        "Cinna se divertiu com a bola!",

      /*
        Sequência pedida:

        1
        2
        3
        4
        5
        6
        7
        1

        O último frame 1 faz a animação
        fechar o ciclo de forma mais natural.
      */

      frames: [

        "assets/sprites/cinna-bola-1.PNG",

        "assets/sprites/cinna-bola-2.PNG",

        "assets/sprites/cinna-bola-3.PNG",

        "assets/sprites/cinna-bola-4.PNG",

        "assets/sprites/cinna-bola-5.PNG",

        "assets/sprites/cinna-bola-6.PNG",

        "assets/sprites/cinna-bola-7.PNG",

        "assets/sprites/cinna-bola-1.PNG"

      ]

    }

  };


  // ====================================================
  // PRÉ-CARREGAMENTO
  // ====================================================

  Object
    .values(
      TOYS
    )
    .forEach(

      toy => {

        toy.frames.forEach(

          src => {

            const image =
              new Image();


            image.src =
              src;

          }

        );

      }

    );


  // ====================================================
  // CSS DO BOTÃO
  // ====================================================

  function createToyStyles() {

    if (
      document.querySelector(
        "#cinna-toy-styles"
      )
    ) {

      return;

    }


    const style =
      document.createElement(
        "style"
      );


    style.id =
      "cinna-toy-styles";


    style.textContent = `

      .inventory-toy-actions {

        display: flex;

        align-items: center;

        justify-content: center;

      }


      .inventory-toy-button {

        min-width: 64px;

        min-height: 31px;

        border: none;

        border-radius: 11px;

        padding: 6px 9px;

        font-family: inherit;

        font-size: 8px;

        font-weight: 900;

        cursor: pointer;

        touch-action: manipulation;

        background: #dff3ff;

        color: #5382a5;

      }


      .inventory-toy-button:active {

        transform: scale(0.94);

      }


      .inventory-toy-button:disabled {

        opacity: 0.55;

        cursor: default;

      }


      @media (max-width: 500px) {

        .inventory-toy-button {

          min-width: 58px;

          font-size: 7px;

        }

      }

    `;


    document.head.appendChild(
      style
    );

  }


  createToyStyles();


  // ====================================================
  // ESPERA O JOGO + LOJA
  // ====================================================

  function initializeToySystem() {

    const ready =

      typeof renderInventory ===
        "function"

      &&

      typeof getItemAmount ===
        "function"

      &&

      typeof playActionAnimation ===
        "function"

      &&

      typeof limitStatus ===
        "function"

      &&

      typeof saveStatus ===
        "function"

      &&

      typeof updateStatusBars ===
        "function"

      &&

      typeof cinnaStatus !==
        "undefined";


    if (!ready) {

      setTimeout(
        initializeToySystem,
        50
      );


      return;

    }


    // ==================================================
    // FUNÇÃO GENÉRICA DE BRINCADEIRA
    // ==================================================

    async function playWithToy(
      toyId
    ) {

      const toy =
        TOYS[
          toyId
        ];


      if (!toy) {

        return;

      }


      // -----------------------------------------------
      // Confere se foi comprado
      // -----------------------------------------------

      if (
        getItemAmount(
          toy.id
        ) <= 0
      ) {

        return;

      }


      // -----------------------------------------------
      // Não interrompe outra ação
      // -----------------------------------------------

      if (
        typeof isPlayingAction !==
          "undefined"

        &&

        isPlayingAction
      ) {

        return;

      }


      // -----------------------------------------------
      // Não brinca dormindo
      // -----------------------------------------------

      if (
        typeof isSleeping !==
          "undefined"

        &&

        isSleeping
      ) {

        if (
          typeof shopMessage !==
            "undefined"
        ) {

          shopMessage.textContent =
            "Acorda o Cinna primeiro 😴";

        }


        return;

      }


      // -----------------------------------------------
      // Fecha loja
      // -----------------------------------------------

      if (
        typeof closeShop ===
          "function"
      ) {

        closeShop();

      }


      // -----------------------------------------------
      // Vai para o início
      // -----------------------------------------------

      if (
        typeof setRoom ===
          "function"
      ) {

        setRoom(
          "home"
        );

      }


      // -----------------------------------------------
      // Mensagem inicial
      // -----------------------------------------------

      if (
        typeof message !==
          "undefined"
      ) {

        message.textContent =
          toy.startMessage;

      }


      // -----------------------------------------------
      // Animação
      // -----------------------------------------------

      await playActionAnimation(

        toy.frames,

        () => {

          const before =
            cinnaStatus.happiness;


          cinnaStatus.happiness =
            limitStatus(

              cinnaStatus.happiness +
              toy.happiness

            );


          const gained =
            cinnaStatus.happiness -
            before;


          saveStatus();

          updateStatusBars();


          // ===========================================
          // CORAÇÕES
          // ===========================================

          if (
            typeof spawnHeart ===
              "function"
          ) {

            spawnHeart();


            setTimeout(
              spawnHeart,
              180
            );


            setTimeout(
              spawnHeart,
              360
            );

          }


          // ===========================================
          // MENSAGEM FINAL
          // ===========================================

          if (
            typeof message !==
              "undefined"
          ) {

            if (
              gained > 0
            ) {

              message.textContent =
                `${toy.finishMessage} +${gained}% ❤️`;

            }

            else {

              message.textContent =
                `Cinna já está felicíssimo! ❤️`;

            }

          }

        }

      );

    }


    // ==================================================
    // DECORA O INVENTÁRIO
    // ==================================================

    function decorateToyInventory() {

      const cards =
        shopContent.querySelectorAll(
          ".inventory-item"
        );


      cards.forEach(

        card => {

          const nameElement =
            card.querySelector(
              ".inventory-info strong"
            );


          if (!nameElement) {

            return;

          }


          const itemName =
            nameElement
              .textContent
              .trim();


          // -------------------------------------------
          // Descobre qual brinquedo é
          // -------------------------------------------

          const toy =
            Object
              .values(
                TOYS
              )
              .find(

                item =>
                  item.name ===
                  itemName

              );


          if (!toy) {

            return;

          }


          // -------------------------------------------
          // Evita botão duplicado
          // -------------------------------------------

          if (
            card.querySelector(
              ".inventory-toy-button"
            )
          ) {

            return;

          }


          // -------------------------------------------
          // Remove ✓ antigo
          // -------------------------------------------

          const oldCheck =
            card.querySelector(
              ".inventory-check"
            );


          if (oldCheck) {

            oldCheck.remove();

          }


          // -------------------------------------------
          // Área do botão
          // -------------------------------------------

          const actions =
            document.createElement(
              "div"
            );


          actions.className =
            "inventory-toy-actions";


          actions.innerHTML = `

            <button
              class="inventory-toy-button"
              type="button"
            >
              BRINCAR
            </button>

          `;


          const button =
            actions.querySelector(
              ".inventory-toy-button"
            );


          // -------------------------------------------
          // Clique
          // -------------------------------------------

          button.addEventListener(

            "click",

            async () => {

              button.disabled =
                true;


              try {

                await playWithToy(
                  toy.id
                );

              }

              finally {

                button.disabled =
                  false;

              }

            }

          );


          card.appendChild(
            actions
          );

        }

      );

    }


    // ==================================================
    // ENVOLVE O INVENTÁRIO ATUAL
    // ==================================================

    const renderInventoryBeforeToys =
      renderInventory;


    renderInventory =
      function () {

        /*
          Primeiro deixa o sistema normal
          montar tudo.
        */

        renderInventoryBeforeToys();


        /*
          Depois troca o ✓ dos brinquedos
          pelo botão BRINCAR.
        */

        decorateToyInventory();

      };


    // ==================================================
    // INVENTÁRIO JÁ ABERTO
    // ==================================================

    const activeCategory =
      document.querySelector(
        ".shop-category.active"
      );


    if (
      activeCategory

      &&

      activeCategory.dataset.category ===
        "inventory"
    ) {

      renderInventory();

    }


    // ==================================================
    // API
    // ==================================================

    window.CinnaToys = {

      play(
        toyId
      ) {

        return playWithToy(
          toyId
        );

      },


      playTeddy() {

        return playWithToy(
          "ursinho"
        );

      },


      playBall() {

        return playWithToy(
          "bola"
        );

      }

    };

  }


  setTimeout(
    initializeToySystem,
    0
  );

})();
