// ======================================================
// BRINQUEDOS DO CINNA 🧸⚽
// ======================================================
//
// Brinquedos funcionando:
//
// 🧸 Ursinho
// ⚽ Bola
//
// - comprados uma única vez
// - ficam permanentemente no inventário
// - possuem botão BRINCAR
// - não são consumidos
// - aumentam felicidade
// - verifica os sprites ANTES da animação
//
// Se algum PNG estiver faltando,
// o Cinna NÃO desaparece.
//
// ======================================================

(() => {

  // ====================================================
  // CONFIGURAÇÃO
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

      missingMessage:
        "Não achei todos os sprites do Ursinho ;-;",

      frames: [

        "assets/sprites/cinna-ursinho-1.PNG",

        "assets/sprites/cinna-ursinho-2.PNG",

        "assets/sprites/cinna-ursinho-3.PNG",

        "assets/sprites/cinna-ursinho-4.PNG",

        "assets/sprites/cinna-ursinho-5.PNG",


        // segura o abraço

        "assets/sprites/cinna-ursinho-5.PNG",

        "assets/sprites/cinna-ursinho-5.PNG",


        // volta suavemente

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

      missingMessage:
        "Não achei os 7 sprites da Bola 🥲",

      /*
        Sequência:

        1
        2
        3
        4
        5
        6
        7
        1

        O frame 1 volta no final
        para fechar o movimento.
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
  // CSS DOS BOTÕES
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

          padding: 6px;

        }

      }

    `;


    document.head.appendChild(
      style
    );

  }


  createToyStyles();


  // ====================================================
  // TESTAR SE UMA IMAGEM EXISTE
  // ====================================================

  function checkImage(
    src
  ) {

    return new Promise(

      resolve => {

        const image =
          new Image();


        let finished =
          false;


        const finish =
          result => {

            if (
              finished
            ) {

              return;

            }


            finished =
              true;


            resolve(
              result
            );

          };


        image.onload =
          () => {

            finish(
              true
            );

          };


        image.onerror =
          () => {

            console.error(
              "Sprite não encontrado:",
              src
            );


            finish(
              false
            );

          };


        image.src =
          src;


        /*
          Segurança:
          se o navegador ficar esperando
          eternamente por alguma imagem.
        */

        setTimeout(

          () => {

            finish(
              false
            );

          },

          5000

        );

      }

    );

  }


  // ====================================================
  // VERIFICAR TODOS OS FRAMES
  // ====================================================

  async function validateToyFrames(
    toy
  ) {

    /*
      Remove repetidos.

      Exemplo:
      bola usa o frame 1 duas vezes,
      mas só precisamos testar o arquivo uma vez.
    */

    const uniqueFrames = [

      ...new Set(
        toy.frames
      )

    ];


    const results =
      await Promise.all(

        uniqueFrames.map(
          checkImage
        )

      );


    return results.every(
      result =>
        result === true
    );

  }


  // ====================================================
  // PRÉ-CARREGAMENTO
  // ====================================================

  function preloadToyFrames() {

    Object
      .values(
        TOYS
      )
      .forEach(

        toy => {

          [

            ...new Set(
              toy.frames
            )

          ]
            .forEach(

              src => {

                const image =
                  new Image();


                image.src =
                  src;

              }

            );

        }

      );

  }


  preloadToyFrames();


  // ====================================================
  // ESPERA JOGO + LOJA
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
        "undefined"

      &&

      typeof shopContent !==
        "undefined";


    if (
      !ready
    ) {

      setTimeout(
        initializeToySystem,
        50
      );


      return;

    }


    // ==================================================
    // MOSTRAR MENSAGEM
    // ==================================================

    function setGameMessage(
      text
    ) {

      if (
        typeof message !==
          "undefined"

        &&

        message
      ) {

        message.textContent =
          text;

      }

    }


    function setShopMessage(
      text
    ) {

      if (
        typeof shopMessage !==
          "undefined"

        &&

        shopMessage
      ) {

        shopMessage.textContent =
          text;

      }

    }


    // ==================================================
    // BRINCAR
    // ==================================================

    async function playWithToy(
      toyId
    ) {

      const toy =
        TOYS[
          toyId
        ];


      if (
        !toy
      ) {

        return;

      }


      // -----------------------------------------------
      // CONFERE SE O JOGADOR TEM O ITEM
      // -----------------------------------------------

      if (
        getItemAmount(
          toy.id
        ) <= 0
      ) {

        setShopMessage(
          "Você ainda não comprou esse brinquedo 👀"
        );


        return;

      }


      // -----------------------------------------------
      // NÃO INTERROMPE OUTRA AÇÃO
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
      // NÃO BRINCA DORMINDO
      // -----------------------------------------------

      if (
        typeof isSleeping !==
          "undefined"

        &&

        isSleeping
      ) {

        setShopMessage(
          "Acorda o Cinna primeiro 😴"
        );


        return;

      }


      // -----------------------------------------------
      // MUITO IMPORTANTE:
      //
      // verifica os sprites ANTES
      // de fechar a loja e antes
      // de trocar a imagem do Cinna.
      // -----------------------------------------------

      setShopMessage(
        "Preparando a brincadeira... ♡"
      );


      const validFrames =
        await validateToyFrames(
          toy
        );


      if (
        !validFrames
      ) {

        setShopMessage(
          toy.missingMessage
        );


        console.error(
          `A animação "${toy.name}" não iniciou porque há sprites ausentes.`
        );


        return;

      }


      // -----------------------------------------------
      // FECHA A LOJA
      // -----------------------------------------------

      if (
        typeof closeShop ===
          "function"
      ) {

        closeShop();

      }


      // -----------------------------------------------
      // VOLTA PARA O INÍCIO
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
      // MENSAGEM INICIAL
      // -----------------------------------------------

      setGameMessage(
        toy.startMessage
      );


      // -----------------------------------------------
      // ANIMAÇÃO
      // -----------------------------------------------

      try {

        await playActionAnimation(

          toy.frames,

          () => {

            /*
              Tudo dentro do callback fica
              protegido por try/catch.

              Assim, mesmo que dê algum erro
              no aumento da felicidade,
              o game.js consegue terminar
              a animação e devolver o idle.
            */

            try {

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


              // ---------------------------------------
              // CORAÇÕES
              // ---------------------------------------

              if (
                typeof spawnHeart ===
                  "function"
              ) {

                spawnHeart();


                setTimeout(
                  () => {

                    spawnHeart();

                  },
                  180
                );


                setTimeout(
                  () => {

                    spawnHeart();

                  },
                  360
                );

              }


              // ---------------------------------------
              // MENSAGEM FINAL
              // ---------------------------------------

              if (
                gained > 0
              ) {

                setGameMessage(

                  `${toy.finishMessage} +${gained}% ❤️`

                );

              }

              else {

                setGameMessage(
                  "Cinna já está felicíssimo! ❤️"
                );

              }

            }

            catch (
              error
            ) {

              console.error(
                "Erro ao finalizar a brincadeira:",
                error
              );


              setGameMessage(
                "Cinna terminou de brincar ♡"
              );

            }

          }

        );

      }

      catch (
        error
      ) {

        console.error(
          "Erro durante a animação do brinquedo:",
          error
        );


        /*
          Recuperação extra.

          Se qualquer coisa absurda acontecer,
          devolvemos o sprite normal.
        */

        if (
          typeof character !==
            "undefined"

          &&

          character
        ) {

          character.src =
            "assets/sprites/cinna-idle-1.PNG";

        }


        if (
          typeof isPlayingAction !==
            "undefined"
        ) {

          isPlayingAction =
            false;

        }


        if (
          typeof lockControls ===
            "function"
        ) {

          lockControls(
            false
          );

        }


        setGameMessage(
          "Ops, a brincadeira deu uma tropeçada ;-;"
        );

      }

    }


    // ==================================================
    // DECORAR INVENTÁRIO
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


          if (
            !nameElement
          ) {

            return;

          }


          const itemName =
            nameElement
              .textContent
              .trim();


          // -------------------------------------------
          // DESCOBRE QUAL BRINQUEDO É
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


          /*
            Bolhas e videogame ainda
            não têm animação.

            Então eles continuam com
            o ✓ normal por enquanto.
          */

          if (
            !toy
          ) {

            return;

          }


          // -------------------------------------------
          // NÃO DUPLICA BOTÃO
          // -------------------------------------------

          if (
            card.querySelector(
              ".inventory-toy-button"
            )
          ) {

            return;

          }


          // -------------------------------------------
          // REMOVE O ✓
          // -------------------------------------------

          const oldCheck =
            card.querySelector(
              ".inventory-check"
            );


          if (
            oldCheck
          ) {

            oldCheck.remove();

          }


          // -------------------------------------------
          // ÁREA DO BOTÃO
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
          // CLIQUE
          // -------------------------------------------

          button.addEventListener(

            "click",

            async () => {

              button.disabled =
                true;


              const originalText =
                button.textContent;


              button.textContent =
                "...";


              try {

                await playWithToy(
                  toy.id
                );

              }

              finally {

                /*
                  O card pode ter desaparecido
                  quando a loja fechar.

                  Mesmo assim não tem problema.
                */

                button.disabled =
                  false;


                button.textContent =
                  originalText;

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

          montarem o inventário normalmente.
        */

        renderInventoryBeforeToys();


        /*
          Depois adicionamos BRINCAR
          aos brinquedos que já possuem
          animação pronta.
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


  // ====================================================
  // INICIAR
  // ====================================================

  setTimeout(
    initializeToySystem,
    0
  );

})();
