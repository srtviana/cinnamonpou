// ======================================================
// BRINQUEDOS DO CINNA 🧸
// ======================================================
//
// PRIMEIRO BRINQUEDO:
// Ursinho
//
// - comprado uma única vez
// - fica permanentemente no inventário
// - botão BRINCAR aparece no inventário
// - toca os 5 frames
// - aumenta felicidade
// - não consome o brinquedo
//
// ======================================================

(() => {

  // ====================================================
  // CONFIGURAÇÃO
  // ====================================================

  const TEDDY_ID =
    "ursinho";

  const TEDDY_NAME =
    "Ursinho";

  const TEDDY_HAPPINESS =
    20;


  // ====================================================
  // FRAMES
  // ====================================================

  /*
    Fazemos ida e volta:

    1
    2
    3
    4
    5

    segura um pouquinho no abraço

    5
    4
    3
    2
    1

    Assim não corta do abraço direto
    para o idle normal.
  */

  const teddyFrames = [

    "assets/sprites/cinna-ursinho-1.PNG",

    "assets/sprites/cinna-ursinho-2.PNG",

    "assets/sprites/cinna-ursinho-3.PNG",

    "assets/sprites/cinna-ursinho-4.PNG",

    "assets/sprites/cinna-ursinho-5.PNG",


    "assets/sprites/cinna-ursinho-5.PNG",

    "assets/sprites/cinna-ursinho-5.PNG",


    "assets/sprites/cinna-ursinho-4.PNG",

    "assets/sprites/cinna-ursinho-3.PNG",

    "assets/sprites/cinna-ursinho-2.PNG",

    "assets/sprites/cinna-ursinho-1.PNG"

  ];


  // ====================================================
  // PRÉ-CARREGAMENTO
  // ====================================================

  teddyFrames.forEach(

    src => {

      const image =
        new Image();


      image.src =
        src;

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
  // ESPERA O JOGO + LOJA CARREGAREM
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
    // BRINCAR COM O URSINHO
    // ==================================================

    async function playWithTeddy() {

      // -----------------------------------------------
      // Confirma que o item foi comprado
      // -----------------------------------------------

      if (
        getItemAmount(
          TEDDY_ID
        ) <= 0
      ) {

        return;

      }


      // -----------------------------------------------
      // Não interrompe outras ações
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
      // Fecha a loja
      // -----------------------------------------------

      if (
        typeof closeShop ===
        "function"
      ) {

        closeShop();

      }


      // -----------------------------------------------
      // Leva pro cômodo inicial
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
      // Mensagem
      // -----------------------------------------------

      if (
        typeof message !==
          "undefined"
      ) {

        message.textContent =
          "Cinna pegou o ursinho 🧸♡";

      }


      // -----------------------------------------------
      // Animação
      // -----------------------------------------------

      await playActionAnimation(

        teddyFrames,

        () => {

          const before =
            cinnaStatus.happiness;


          cinnaStatus.happiness =
            limitStatus(

              cinnaStatus.happiness +
              TEDDY_HAPPINESS

            );


          const gained =
            cinnaStatus.happiness -
            before;


          saveStatus();

          updateStatusBars();


          // -------------------------------------------
          // Corações
          // -------------------------------------------

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


          // -------------------------------------------
          // Mensagem final
          // -------------------------------------------

          if (
            typeof message !==
              "undefined"
          ) {

            if (
              gained > 0
            ) {

              message.textContent =
                `Cinna amou abraçar o ursinho! +${gained}% ❤️`;

            }

            else {

              message.textContent =
                "Cinna já está felicíssimo com o ursinho 🧸❤️";

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


          if (
            itemName !==
            TEDDY_NAME
          ) {

            return;

          }


          // Evita duplicar botão

          if (
            card.querySelector(
              ".inventory-toy-button"
            )
          ) {

            return;

          }


          // Remove o ✓ padrão

          const oldCheck =
            card.querySelector(
              ".inventory-check"
            );


          if (oldCheck) {

            oldCheck.remove();

          }


          // -------------------------------------------
          // Cria área de ação
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


          button.addEventListener(

            "click",

            async () => {

              button.disabled =
                true;


              try {

                await playWithTeddy();

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
          Primeiro deixa:
          - comida
          - acessórios
          - achocolatado
          - reposição

          fazerem tudo normalmente.
        */

        renderInventoryBeforeToys();


        /*
          Depois adicionamos BRINCAR
          somente ao Ursinho.
        */

        decorateToyInventory();

      };


    // ==================================================
    // SE O INVENTÁRIO JÁ ESTIVER ABERTO
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
    // API PARA OS PRÓXIMOS BRINQUEDOS
    // ==================================================

    window.CinnaToys = {

      playTeddy() {

        return playWithTeddy();

      }

    };

  }


  setTimeout(
    initializeToySystem,
    0
  );

})();
