// ======================================================
// EXPANSÃO DE COMIDAS 🍫🥛
// ======================================================
//
// ACHOCOLATADO
//
// - aparece na loja
// - vai para o inventário
// - pode ser colocado na bandeja
// - máximo de 10 unidades
// - usa 3 frames de animação
// - bandeja mostra no máximo 4 tipos
// - alimento some quando chega a x0
// - volta quando for reposto
//
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
  // CSS DO ACHOCOLATADO
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

      /* ===============================================
         ÍCONE NA BANDEJA
         =============================================== */

      .food-image-icon {

        width: 42px !important;
        height: 42px !important;

        display: flex !important;

        align-items: center;
        justify-content: center;

        font-size: 0 !important;
        line-height: 1 !important;

        overflow: hidden;

      }


      .food-image-icon img {

        width: 100% !important;
        height: 100% !important;

        max-width: 42px !important;
        max-height: 42px !important;

        display: block;

        object-fit: contain;

      }


      /* ===============================================
         ÍCONE NA LOJA
         =============================================== */

      .shop-chocolate-icon {

        width: 100%;
        height: 100%;

        display: block;

        object-fit: contain;

      }


      /* ===============================================
         ÍCONE NO INVENTÁRIO
         =============================================== */

      .inventory-chocolate-icon {

        width: 100%;
        height: 100%;

        display: block;

        object-fit: contain;

      }

    `;


    document.head.appendChild(
      style
    );

  }


  createChocolateStyles();


  // ====================================================
  // ESPERA GAME.JS E SHOP.JS
  // ====================================================

  function initializeFoodExpansion() {

    const ready =

      typeof getFoodFrames !==
        "undefined"

      &&

      typeof shopItems !==
        "undefined"

      &&

      typeof foodTrayIds !==
        "undefined"

      &&

      typeof foodTrayNames !==
        "undefined"

      &&

      typeof foodTrayIcons !==
        "undefined"

      &&

      typeof cinnaFoodTray !==
        "undefined"

      &&

      typeof saveFoodTray ===
        "function"

      &&

      typeof getFoodTrayAmount ===
        "function"

      &&

      typeof getItemAmount ===
        "function"

      &&

      typeof updateFoodTrayStockDisplay ===
        "function"

      &&

      typeof refillFoodTray ===
        "function"

      &&

      typeof renderShopCategory ===
        "function"

      &&

      typeof renderInventory ===
        "function";


    if (!ready) {

      setTimeout(
        initializeFoodExpansion,
        50
      );

      return;

    }


    // ==================================================
    // ACHOCOLATADO NA LOJA
    // ==================================================

    const alreadyExists =
      shopItems.some(

        item =>
          item.id ===
          FOOD_ID

      );


    if (!alreadyExists) {

      const chocolateItem = {

        id:
          FOOD_ID,

        category:
          "food",

        /*
          IMPORTANTE:

          O icon agora é texto simples.
          Assim a mensagem da loja não imprime
          HTML cru na tela.
        */

        icon:
          "🥤",

        image:
          FOOD_ICON,

        name:
          FOOD_NAME,

        description:
          "Uma caixinha geladinha de achocolatado para o Cinna.",

        price:
          FOOD_PRICE,

        stackable:
          true

      };


      const cakeIndex =
        shopItems.findIndex(

          item =>
            item.id ===
            "bolo"

        );


      if (
        cakeIndex >=
        0
      ) {

        shopItems.splice(

          cakeIndex + 1,

          0,

          chocolateItem

        );

      }

      else {

        shopItems.push(
          chocolateItem
        );

      }

    }


    // ==================================================
    // REGISTRA NO ESTOQUE
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


    // Se é um save antigo,
    // adiciona o novo alimento com estoque 0.

    if (
      !Object.prototype
        .hasOwnProperty
        .call(
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
    // ANIMAÇÃO
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


    // ==================================================
    // PRÉ-CARREGAMENTO
    // ==================================================

    [

      FOOD_ICON,

      ...chocolateFrames

    ].forEach(

      src => {

        const image =
          new Image();


        image.src =
          src;

      }

    );


    // ==================================================
    // TEXTO "TOMANDO"
    // ==================================================

    const chocolateButton =
      document.querySelector(
        '[data-food="Achocolatado"]'
      );


    if (
      chocolateButton
    ) {

      chocolateButton.addEventListener(

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

    }


    // ==================================================
    // IMAGEM DO ACHOCOLATADO NA LOJA
    // ==================================================

    function decorateChocolateShop() {

      const foodItems =
        shopItems.filter(

          item =>
            item.category ===
            "food"

        );


      const cards =
        shopContent
          .querySelectorAll(
            ".shop-item"
          );


      cards.forEach(

        (
          card,
          index
        ) => {

          const item =
            foodItems[
              index
            ];


          if (
            !item

            ||

            item.id !==
              FOOD_ID
          ) {

            return;

          }


          const icon =
            card.querySelector(
              ".shop-item-icon"
            );


          if (!icon) {

            return;

          }


          icon.innerHTML = `

            <img
              class="shop-chocolate-icon"
              src="${FOOD_ICON}"
              alt="Achocolatado"
            >

          `;

        }

      );

    }


    // ==================================================
    // IMAGEM NO INVENTÁRIO
    // ==================================================

    function decorateChocolateInventory() {

      const cards =
        shopContent
          .querySelectorAll(
            ".inventory-item"
          );


      cards.forEach(

        card => {

          const title =
            card.querySelector(
              ".inventory-info strong"
            );


          if (
            !title

            ||

            title.textContent
              .trim() !==
              FOOD_NAME
          ) {

            return;

          }


          const icon =
            card.querySelector(
              ".inventory-icon"
            );


          if (!icon) {

            return;

          }


          icon.innerHTML = `

            <img
              class="inventory-chocolate-icon"
              src="${FOOD_ICON}"
              alt="Achocolatado"
            >

          `;

        }

      );

    }


    // ==================================================
    // ENVOLVE O RENDER DA LOJA
    // ==================================================

    const originalRenderShopCategory =
      renderShopCategory;


    renderShopCategory =
      function (
        category
      ) {

        originalRenderShopCategory(
          category
        );


        if (
          category ===
          "food"
        ) {

          decorateChocolateShop();

        }

      };


    // ==================================================
    // ENVOLVE O INVENTÁRIO
    // ==================================================

    const originalRenderInventory =
      renderInventory;


    renderInventory =
      function () {

        originalRenderInventory();


        decorateChocolateInventory();

    };


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
    // CARREGAR OS 4 SLOTS
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

          // Ignora save quebrado.

        }

      }


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
    // ORGANIZAR BANDEJA
    // ==================================================

    function normalizeVisibleFoodSlots() {

      /*
        Primeiro remove:

        - duplicados
        - alimentos inexistentes
        - alimentos com estoque 0
      */

      visibleFoodSlots = [

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


      /*
        Se algum item acabou,
        fica uma vaga.

        Se outra comida já tiver estoque,
        ela entra automaticamente.
      */

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
    // MOSTRAR / ESCONDER ALIMENTOS
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


          const visible =

            amount > 0

            &&

            visibleFoodSlots.includes(
              foodId
            );


          /*
            x0 = desaparece completamente.
          */

          button.hidden =
            !visible;

        }

      );

    }


    // ==================================================
    // ATUALIZAÇÃO DO ESTOQUE
    // ==================================================

    const originalUpdateFoodTrayStockDisplay =
      updateFoodTrayStockDisplay;


    updateFoodTrayStockDisplay =
      function () {

        /*
          Primeiro o shop.js atualiza
          x10, x9, x8...
        */

        originalUpdateFoodTrayStockDisplay();


        /*
          Depois nós escondemos os x0.
        */

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


        /*
          Se estiver tentando colocar
          uma NOVA comida e os quatro
          slots estiverem ocupados.
        */

        if (
          inventoryAmount > 0

          &&

          trayAmount <= 0

          &&

          !alreadyVisible

          &&

          visibleFoodSlots.length >=
            FOOD_MAX_VISIBLE
        ) {

          shopMessage.textContent =
            "A bandeja já tem 4 tipos de comida 🍽️";


          return;

        }


        /*
          Se existe uma vaga,
          reserva o slot.
        */

        if (
          inventoryAmount > 0

          &&

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


        /*
          Shop.js continua fazendo
          a transferência normal:
          inventário → bandeja.
        */

        originalRefillFoodTray(
          foodId
        );


        normalizeVisibleFoodSlots();


        updateFoodTrayStockDisplay();

    };


    // ==================================================
    // ATUALIZAÇÃO INICIAL
    // ==================================================

    normalizeVisibleFoodSlots();


    updateFoodTrayStockDisplay();


    // ==================================================
    // SE A LOJA JÁ ESTIVER ABERTA
    // ==================================================

    const activeCategory =
      document.querySelector(
        ".shop-category.active"
      );


    if (
      activeCategory
    ) {

      const category =
        activeCategory.dataset.category;


      if (
        category ===
        "food"
      ) {

        renderShopCategory(
          "food"
        );

      }

    }


    // ==================================================
    // API
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


  setTimeout(
    initializeFoodExpansion,
    0
  );

})();
