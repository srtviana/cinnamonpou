// ======================================================
// EXPANSÃO DE COMIDAS 🍫🥛
// ======================================================
//
// Este arquivo adiciona:
//
// - Achocolatado
// - 3 sprites de animação
// - item na Loja do Cinna
// - estoque máximo de 10
// - bandeja com no máximo 4 tipos
// - alimento some da bandeja quando acaba
// - alimento volta quando é reposto
//
// NÃO substitui game.js nem shop.js.
// ======================================================


(() => {

  // ====================================================
  // CONFIGURAÇÃO
  // ====================================================

  const FOOD_NAME =
    "Achocolatado";

  const FOOD_ID =
    "achocolatado";

  const FOOD_VALUE =
    30;

  const FOOD_PRICE =
    25;

  const FOOD_MAX_VISIBLE =
    4;

  const FOOD_SLOTS_KEY =
    "cinnaFoodTraySlots";


  const FOOD_ICON =
    "assets/sprites/achocolatado.PNG";


  const chocolateFrames = [

    "assets/sprites/cinna-achocolatado-1.PNG",

    "assets/sprites/cinna-achocolatado-2.PNG",

    "assets/sprites/cinna-achocolatado-3.PNG"

  ];


  // ====================================================
  // CRIA O BOTÃO DO ACHOCOLATADO
  //
  // Esta parte roda ANTES do game.js.
  // Assim o game.js já encontra esse botão normalmente.
  // ====================================================

  function createChocolateButton() {

    const tray =
      document.querySelector(
        "#food-tray"
      );


    if (!tray) {

      return;

    }


    const existing =
      tray.querySelector(
        '[data-food="Achocolatado"]'
      );


    if (existing) {

      return;

    }


    const button =
      document.createElement(
        "button"
      );


    button.className =
      "food-item";


    button.dataset.food =
      FOOD_NAME;


    button.dataset.value =
      String(
        FOOD_VALUE
      );


    button.type =
      "button";


    button.innerHTML = `

      <span class="chocolate-food-icon">

        <img
          src="${FOOD_ICON}"
          alt="Achocolatado"
        >

      </span>

      <small>
        +${FOOD_VALUE}%
      </small>

    `;


    // Mensagem mais natural:
    // "tomando" em vez de "comendo".

    button.addEventListener(

      "click",

      () => {

        setTimeout(

          () => {

            if (
              typeof isPlayingAction !==
                "undefined"
              &&
              isPlayingAction
              &&
              typeof message !==
                "undefined"
            ) {

              message.textContent =
                "Cinna está tomando achocolatado... ♡";

            }

          },

          0

        );

      }

    );


    tray.appendChild(
      button
    );

  }


  // ====================================================
  // CSS DO ÍCONE
  // ====================================================

  function createChocolateStyles() {

    if (
      document.querySelector(
        "#chocolate-food-styles"
      )
    ) {

      return;

    }


    const style =
      document.createElement(
        "style"
      );


    style.id =
      "chocolate-food-styles";


    style.textContent = `

      .chocolate-food-icon {

        width: 38px;
        height: 38px;

        display: flex;

        align-items: center;
        justify-content: center;

      }


      .chocolate-food-icon img {

        width: 100%;
        height: 100%;

        display: block;

        object-fit: contain;

      }


      .shop-chocolate-icon {

        width: 100%;
        height: 100%;

        display: block;

        object-fit: contain;

      }


      .inventory-icon
      .shop-chocolate-icon {

        width: 100%;
        height: 100%;

        object-fit: contain;

      }

    `;


    document.head.appendChild(
      style
    );

  }


  createChocolateButton();

  createChocolateStyles();


  // ====================================================
  // ESPERA GAME.JS + SHOP.JS CARREGAREM
  // ====================================================

  function initializeFoodExpansion() {

    const coreReady =

      typeof getFoodFrames !==
        "undefined"

      &&

      typeof shopItems !==
        "undefined"

      &&

      typeof foodTrayIds !==
        "undefined"

      &&

      typeof cinnaFoodTray !==
        "undefined"

      &&

      typeof updateFoodTrayStockDisplay !==
        "undefined"

      &&

      typeof refillFoodTray !==
        "undefined";


    if (!coreReady) {

      setTimeout(
        initializeFoodExpansion,
        50
      );

      return;

    }


    // ==================================================
    // ADICIONA ACHOCOLATADO À LOJA
    // ==================================================

    const alreadyInShop =
      shopItems.some(

        item =>
          item.id ===
          FOOD_ID

      );


    if (!alreadyInShop) {

      const chocolateItem = {

        id:
          FOOD_ID,

        category:
          "food",

        icon: `

          <img
            class="shop-chocolate-icon"
            src="${FOOD_ICON}"
            alt="Achocolatado"
          >

        `,

        name:
          FOOD_NAME,

        description:
          "Uma caixinha geladinha de achocolatado para o Cinna.",

        price:
          FOOD_PRICE,

        stackable:
          true

      };


      // As quatro primeiras posições atuais
      // são Morango, Maçã, Leite e Bolo.
      // Colocamos o Achocolatado logo depois.

      shopItems.splice(
        4,
        0,
        chocolateItem
      );

    }


    // ==================================================
    // REGISTRA NO SISTEMA DE ESTOQUE
    // ==================================================

    foodTrayIds[
      FOOD_NAME
    ] =
      FOOD_ID;


    foodTrayNames[
      FOOD_ID
    ] =
      FOOD_NAME;


    foodTrayIcons[
      FOOD_ID
    ] =
      "🥤";


    // Usuários que já possuem save
    // começam com zero achocolatado na bandeja.

    if (
      !Object.prototype.hasOwnProperty.call(
        cinnaFoodTray,
        FOOD_ID
      )
    ) {

      cinnaFoodTray[
        FOOD_ID
      ] =
        0;


      saveFoodTray();

    }


    // ==================================================
    // ANIMAÇÃO DO ACHOCOLATADO
    // ==================================================

    const originalGetFoodFrames =
      getFoodFrames;


    getFoodFrames =
      function (
        foodName
      ) {

        if (
          foodName ===
          FOOD_NAME
        ) {

          return chocolateFrames;

        }


        return originalGetFoodFrames(
          foodName
        );

      };


    // Pré-carrega as imagens.

    chocolateFrames.forEach(

      src => {

        const image =
          new Image();


        image.src =
          src;

      }

    );


    // Pré-carrega o ícone.

    const chocolateIcon =
      new Image();


    chocolateIcon.src =
      FOOD_ICON;


    // ==================================================
    // ORDEM DAS COMIDAS
    // ==================================================

    const foodOrder = [

      "morango",

      "maca",

      "leite",

      "bolo",

      FOOD_ID

    ];


    // ==================================================
    // SLOTS VISÍVEIS DA BANDEJA
    // ==================================================

    function loadVisibleFoodSlots() {

      const saved =
        localStorage.getItem(
          FOOD_SLOTS_KEY
        );


      if (saved) {

        try {

          const parsed =
            JSON.parse(
              saved
            );


          if (
            Array.isArray(
              parsed
            )
          ) {

            return parsed;

          }

        }

        catch {

          // Ignora save inválido.

        }

      }


      // Primeira criação:
      // pega até quatro comidas
      // que já possuem estoque.

      return foodOrder
        .filter(

          foodId =>
            getFoodTrayAmount(
              foodId
            ) > 0

        )
        .slice(
          0,
          FOOD_MAX_VISIBLE
        );

    }


    let visibleFoodSlots =
      loadVisibleFoodSlots();


    // ==================================================
    // SALVAR SLOTS
    // ==================================================

    function saveVisibleFoodSlots() {

      localStorage.setItem(

        FOOD_SLOTS_KEY,

        JSON.stringify(
          visibleFoodSlots
        )

      );

    }


    // ==================================================
    // NORMALIZAR SLOTS
    // ==================================================

    function normalizeVisibleFoodSlots() {

      // Remove:
      // - duplicados
      // - comidas inexistentes
      // - comidas que zeraram

      visibleFoodSlots =

        [
          ...new Set(
            visibleFoodSlots
          )
        ]

          .filter(

            foodId =>

              foodOrder.includes(
                foodId
              )

              &&

              getFoodTrayAmount(
                foodId
              ) > 0

          )

          .slice(
            0,
            FOOD_MAX_VISIBLE
          );


      // Se abriu uma vaga e existe alguma
      // comida que já possui estoque,
      // ela pode ocupar a vaga automaticamente.

      for (
        const foodId
        of foodOrder
      ) {

        if (
          visibleFoodSlots.length >=
          FOOD_MAX_VISIBLE
        ) {

          break;

        }


        if (
          visibleFoodSlots.includes(
            foodId
          )
        ) {

          continue;

        }


        if (
          getFoodTrayAmount(
            foodId
          ) > 0
        ) {

          visibleFoodSlots.push(
            foodId
          );

        }

      }


      saveVisibleFoodSlots();

    }


    // ==================================================
    // ESCONDER / MOSTRAR COMIDAS
    // ==================================================

    function applyFoodTrayVisibility() {

      normalizeVisibleFoodSlots();


      const buttons =
        document.querySelectorAll(
          ".food-item"
        );


      buttons.forEach(

        button => {

          const foodName =
            button.dataset.food;


          const foodId =
            foodTrayIds[
              foodName
            ];


          if (!foodId) {

            return;

          }


          const amount =
            getFoodTrayAmount(
              foodId
            );


          const isVisible =
            amount > 0

            &&

            visibleFoodSlots.includes(
              foodId
            );


          // Se acabou, desaparece.
          // Se não ocupa um dos quatro slots,
          // também não aparece.

          button.hidden =
            !isVisible;

        }

      );

    }


    // ==================================================
    // SUBSTITUI A ATUALIZAÇÃO VISUAL
    // ==================================================

    const originalUpdateFoodTrayStockDisplay =
      updateFoodTrayStockDisplay;


    updateFoodTrayStockDisplay =
      function () {

        // Mantém o contador x10, x9 etc.

        originalUpdateFoodTrayStockDisplay();


        // Depois controla quem aparece.

        applyFoodTrayVisibility();

      };


    // ==================================================
    // REPOR COMIDA
    // ==================================================

    const originalRefillFoodTray =
      refillFoodTray;


    refillFoodTray =
      function (
        foodId
      ) {

        const inventoryAmount =
          getItemAmount(
            foodId
          );


        const trayAmount =
          getFoodTrayAmount(
            foodId
          );


        const alreadyVisible =
          visibleFoodSlots.includes(
            foodId
          );


        // Sem item no inventário:
        // usa a mensagem original.

        if (
          inventoryAmount <=
          0
        ) {

          originalRefillFoodTray(
            foodId
          );

          return;

        }


        // A comida ainda não está na bandeja
        // e os quatro slots estão ocupados.

        if (
          !alreadyVisible

          &&

          trayAmount <= 0

          &&

          visibleFoodSlots.length >=
            FOOD_MAX_VISIBLE
        ) {

          shopMessage.textContent =

            "A bandeja já tem 4 tipos de comida. Espere uma acabar para colocar outra 🍽️";


          return;

        }


        // Existe uma vaga.
        // Reserva o slot antes de repor.

        if (
          !alreadyVisible

          &&

          visibleFoodSlots.length <
            FOOD_MAX_VISIBLE
        ) {

          visibleFoodSlots.push(
            foodId
          );


          saveVisibleFoodSlots();

        }


        originalRefillFoodTray(
          foodId
        );


        normalizeVisibleFoodSlots();

        updateFoodTrayStockDisplay();

      };


    // ==================================================
    // PRIMEIRA ATUALIZAÇÃO
    // ==================================================

    normalizeVisibleFoodSlots();

    updateFoodTrayStockDisplay();


    // ==================================================
    // API PARA O FUTURO
    // ==================================================

    window.CinnaFoodExpansion = {

      getVisibleFoods() {

        return [
          ...visibleFoodSlots
        ];

      },


      refreshTray() {

        updateFoodTrayStockDisplay();

      }

    };

  }


  // Dá tempo para game.js e shop.js
  // terminarem de carregar.

  setTimeout(
    initializeFoodExpansion,
    0
  );

})();
