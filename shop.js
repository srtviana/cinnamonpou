// ======================================================
// LOJA DO CINNA 🛍️
// ======================================================

const SHOP_INVENTORY_KEY =
  "cinnaInventory";


// ======================================================
// ITENS DA LOJA
// ======================================================

const shopItems = [

  // ====================================================
  // COMIDA
  // ====================================================

  {
    id: "morango",
    category: "food",
    icon: "🍓",
    name: "Morango",
    description: "Um moranguinho docinho para o Cinna.",
    price: 15,
    stackable: true
  },

  {
    id: "maca",
    category: "food",
    icon: "🍎",
    name: "Maçã",
    description: "Lanchinho saudável e crocante.",
    price: 18,
    stackable: true
  },

  {
    id: "leite",
    category: "food",
    icon: "🥛",
    name: "Leite",
    description: "Um copinho de leite fresquinho.",
    price: 20,
    stackable: true
  },

  {
    id: "bolo",
    category: "food",
    icon: "🍰",
    name: "Bolo",
    description: "O favorito para recuperar bastante comida.",
    price: 35,
    stackable: true
  },


  // ====================================================
  // DECORAÇÃO
  // ====================================================

  {
    id: "planta",
    category: "decor",
    icon: "🪴",
    name: "Plantinha",
    description: "Uma plantinha delicada para decorar a casa.",
    price: 80,
    stackable: false
  },

  {
    id: "luminaria",
    category: "decor",
    icon: "💡",
    name: "Luminária Nuvem",
    description: "Uma luminária fofinha em formato de nuvem.",
    price: 120,
    stackable: false
  },

  {
    id: "tapete",
    category: "decor",
    icon: "☁️",
    name: "Tapete Nuvem",
    description: "Um tapete macio para deixar o quarto ainda mais fofo.",
    price: 150,
    stackable: false
  },


  // ====================================================
  // ACESSÓRIOS
  // ====================================================

  {
    id: "laco",
    category: "accessories",
    icon: "🎀",
    name: "Lacinho Azul",
    description: "Um pequeno lacinho para o Cinna usar.",
    price: 100,
    stackable: false
  },

  {
    id: "oculos",
    category: "accessories",
    icon: "👓",
    name: "Óculos",
    description: "Porque aparentemente o Cinna agora é intelectual.",
    price: 130,
    stackable: false
  },

  {
    id: "chapeu",
    category: "accessories",
    icon: "🌟",
    name: "Chapéu Estrela",
    description: "Um chapéuzinho especial cheio de estrelas.",
    price: 180,
    stackable: false
  },


  // ====================================================
  // BRINQUEDOS
  // ====================================================

  {
    id: "bola",
    category: "toys",
    icon: "⚽",
    name: "Bola",
    description: "Uma bolinha para brincar e aumentar a felicidade.",
    price: 70,
    stackable: false
  },

  {
    id: "ursinho",
    category: "toys",
    icon: "🧸",
    name: "Ursinho",
    description: "Um amiguinho de pelúcia para o Cinna.",
    price: 90,
    stackable: false
  },

  {
    id: "bolhas",
    category: "toys",
    icon: "🫧",
    name: "Bolhas de Sabão",
    description: "Para fazer uma bagunça extremamente necessária.",
    price: 60,
    stackable: true
  },

  {
    id: "videogame",
    category: "toys",
    icon: "🎮",
    name: "Mini Videogame",
    description: "Um videogame minúsculo para um coelho gamer.",
    price: 200,
    stackable: false
  }

];


// ======================================================
// INVENTÁRIO
// ======================================================

function loadInventory() {

  const saved =
    localStorage.getItem(
      SHOP_INVENTORY_KEY
    );


  if (!saved) {

    return {};

  }


  try {

    return JSON.parse(
      saved
    );

  }

  catch {

    return {};

  }

}


let cinnaInventory =
  loadInventory();


function saveInventory() {

  localStorage.setItem(
    SHOP_INVENTORY_KEY,
    JSON.stringify(
      cinnaInventory
    )
  );

}


function getItemAmount(
  itemId
) {

  return (
    cinnaInventory[itemId]
    ||
    0
  );

}


function addItemToInventory(
  item
) {

  const current =
    getItemAmount(
      item.id
    );


  if (
    item.stackable
  ) {

    cinnaInventory[item.id] =
      current + 1;

  }

  else {

    cinnaInventory[item.id] =
      1;

  }


  saveInventory();

}


// ======================================================
// CRIA BOTÃO DA LOJA
// ======================================================

function createShopButton() {

  const coinArea =
    document.querySelector(
      ".cinna-coins-area"
    );


  if (
    !coinArea ||
    document.querySelector(
      "#cinna-shop-button"
    )
  ) {

    return;

  }


  const button =
    document.createElement(
      "button"
    );


  button.id =
    "cinna-shop-button";


  button.className =
    "cinna-shop-button";


  button.type =
    "button";


  button.innerHTML = `

    <span>
      🛍️
    </span>

    <small>
      Loja
    </small>

  `;


  coinArea.appendChild(
    button
  );


  button.addEventListener(
    "click",
    openShop
  );

}


// ======================================================
// CRIA A LOJA
// ======================================================

const shopOverlay =
  document.createElement(
    "div"
  );


shopOverlay.id =
  "cinna-shop-overlay";


shopOverlay.className =
  "cinna-shop-overlay";


shopOverlay.innerHTML = `

  <section class="cinna-shop">

    <header class="shop-header">

      <div>

        <h2>
          🛍️ Loja do Cinna
        </h2>

        <p>
          Use suas Cinna Coins ✨
        </p>

      </div>


      <div class="shop-header-actions">

        <div
          id="shop-balance"
          class="shop-balance"
        >
          🪙 0
        </div>


        <button
          id="shop-close-button"
          class="shop-close-button"
          type="button"
        >
          ✕
        </button>

      </div>

    </header>


    <nav class="shop-categories">

      <button
        class="shop-category active"
        data-category="food"
        type="button"
      >
        🍰
        <span>Comida</span>
      </button>


      <button
        class="shop-category"
        data-category="decor"
        type="button"
      >
        🪴
        <span>Decoração</span>
      </button>


      <button
        class="shop-category"
        data-category="accessories"
        type="button"
      >
        🎀
        <span>Acessórios</span>
      </button>


      <button
        class="shop-category"
        data-category="toys"
        type="button"
      >
        🧸
        <span>Brinquedos</span>
      </button>


      <button
        class="shop-category"
        data-category="inventory"
        type="button"
      >
        🎒
        <span>Inventário</span>
      </button>

    </nav>


    <div
      id="shop-content"
      class="shop-content"
    ></div>


    <p
      id="shop-message"
      class="shop-message"
    >
      Escolha alguma coisinha para o Cinna ♡
    </p>

  </section>

`;


document.body.appendChild(
  shopOverlay
);


// ======================================================
// ELEMENTOS
// ======================================================

const shopContent =
  document.querySelector(
    "#shop-content"
  );


const shopMessage =
  document.querySelector(
    "#shop-message"
  );


const shopBalance =
  document.querySelector(
    "#shop-balance"
  );


const shopCloseButton =
  document.querySelector(
    "#shop-close-button"
  );


const shopCategoryButtons =
  document.querySelectorAll(
    ".shop-category"
  );


// ======================================================
// SALDO
// ======================================================

function getCinnaCoinBalance() {

  if (
    window.CinnaCoins
  ) {

    return (
      window.CinnaCoins
        .getBalance()
    );

  }


  return Number(
    localStorage.getItem(
      "cinnaCoins"
    )
  ) || 0;

}


function updateShopBalance() {

  shopBalance.textContent =
    `🪙 ${getCinnaCoinBalance()}`;

}


// ======================================================
// ABRIR / FECHAR
// ======================================================

function openShop() {

  updateShopBalance();


  renderShopCategory(
    "food"
  );


  shopOverlay.classList.add(
    "open"
  );


  document.body.classList.add(
    "shop-is-open"
  );

}


function closeShop() {

  shopOverlay.classList.remove(
    "open"
  );


  document.body.classList.remove(
    "shop-is-open"
  );

}


shopCloseButton.addEventListener(
  "click",
  closeShop
);


shopOverlay.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      shopOverlay
    ) {

      closeShop();

    }

  }
);


// ======================================================
// CATEGORIAS
// ======================================================

shopCategoryButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        shopCategoryButtons.forEach(
          item => {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        renderShopCategory(
          button.dataset.category
        );

      }
    );

  }
);


// ======================================================
// DESENHAR LOJA
// ======================================================

function renderShopCategory(
  category
) {

  updateShopBalance();


  if (
    category ===
    "inventory"
  ) {

    renderInventory();

    return;

  }


  const items =
    shopItems.filter(
      item =>
        item.category ===
        category
    );


  shopContent.innerHTML =
    "";


  items.forEach(
    item => {

      const amount =
        getItemAmount(
          item.id
        );


      const owned =
        !item.stackable &&
        amount > 0;


      const card =
        document.createElement(
          "article"
        );


      card.className =
        "shop-item";


      card.innerHTML = `

        <div class="shop-item-icon">

          ${item.icon}

        </div>


        <div class="shop-item-info">

          <strong>
            ${item.name}
          </strong>


          <small>
            ${item.description}
          </small>


          ${
            item.stackable &&
            amount > 0

              ? `
                <span class="shop-owned-count">
                  Você tem: ${amount}
                </span>
              `

              : ""
          }

        </div>


        <div class="shop-item-buy">

          <span class="shop-price">
            🪙 ${item.price}
          </span>


          <button
            class="shop-buy-button"
            type="button"
            ${
              owned
                ? "disabled"
                : ""
            }
          >

            ${
              owned
                ? "COMPRADO"
                : "COMPRAR"
            }

          </button>

        </div>

      `;


      const buyButton =
        card.querySelector(
          ".shop-buy-button"
        );


      if (
        !owned
      ) {

        buyButton.addEventListener(
          "click",
          () => {

            buyShopItem(
              item,
              category
            );

          }
        );

      }


      shopContent.appendChild(
        card
      );

    }
  );

}


// ======================================================
// COMPRAR
// ======================================================

function buyShopItem(
  item,
  currentCategory
) {

  if (
    !window.CinnaCoins
  ) {

    shopMessage.textContent =
      "Não consegui acessar as Cinna Coins ;-;";

    return;

  }


  const success =
    window.CinnaCoins.spend(
      item.price
    );


  if (
    !success
  ) {

    shopMessage.textContent =
      `Faltam Cinna Coins para comprar ${item.name} 🥹`;

    shopMessage.classList.add(
      "error"
    );


    setTimeout(
      () => {

        shopMessage.classList.remove(
          "error"
        );

      },
      900
    );


    return;

  }


  addItemToInventory(
    item
  );


  updateShopBalance();


  shopMessage.textContent =
    `${item.icon} ${item.name} foi para o inventário!`;


  shopMessage.classList.add(
    "success"
  );


  setTimeout(
    () => {

      shopMessage.classList.remove(
        "success"
      );

    },
    900
  );


  renderShopCategory(
    currentCategory
  );

}


// ======================================================
// INVENTÁRIO
// ======================================================

function renderInventory() {

  shopContent.innerHTML =
    "";


  const ownedItems =
    shopItems.filter(
      item =>
        getItemAmount(
          item.id
        ) > 0
    );


  if (
    ownedItems.length ===
    0
  ) {

    shopContent.innerHTML = `

      <div class="shop-empty">

        <div>
          🎒
        </div>

        <strong>
          Inventário vazio
        </strong>

        <small>
          Compra alguma coisa primeiro, miserável KSKSKSK
        </small>

      </div>

    `;


    return;

  }


  ownedItems.forEach(
    item => {

      const amount =
        getItemAmount(
          item.id
        );


      const card =
        document.createElement(
          "article"
        );


      card.className =
        "inventory-item";


      card.innerHTML = `

        <div class="inventory-icon">

          ${item.icon}

        </div>


        <div class="inventory-info">

          <strong>
            ${item.name}
          </strong>


          <small>
            ${
              item.stackable
                ? `Quantidade: ${amount}`
                : "Item adquirido"
            }
          </small>

        </div>


        <span class="inventory-check">

          ${
            item.stackable
              ? `×${amount}`
              : "✓"
          }

        </span>

      `;


      shopContent.appendChild(
        card
      );

    }
  );

}


// ======================================================
// TENTA CRIAR O BOTÃO
// ======================================================

createShopButton();


// Caso games.js ainda esteja terminando de criar
// o contador de moedas.

setTimeout(
  createShopButton,
  300
);

// ======================================================
// ESTOQUE DA BANDEJA DE COMIDA 🍓🍎🥛🍰
// ======================================================

const FOOD_TRAY_STORAGE_KEY =
  "cinnaFoodTray";

const FOOD_TRAY_MAX =
  10;


// ======================================================
// RELAÇÃO ENTRE BOTÃO E ITEM DA LOJA
// ======================================================

const foodTrayIds = {
  "Morango": "morango",
  "Maçã": "maca",
  "Leite": "leite",
  "Bolo": "bolo"
};


const foodTrayNames = {
  morango: "Morango",
  maca: "Maçã",
  leite: "Leite",
  bolo: "Bolo"
};


const foodTrayIcons = {
  morango: "🍓",
  maca: "🍎",
  leite: "🥛",
  bolo: "🍰"
};


// ======================================================
// ESTOQUE INICIAL
// ======================================================

const INITIAL_FOOD_TRAY = {
  morango: 10,
  maca: 10,
  leite: 10,
  bolo: 10
};


// ======================================================
// CARREGAR BANDEJA
// ======================================================

function loadFoodTray() {

  const saved =
    localStorage.getItem(
      FOOD_TRAY_STORAGE_KEY
    );


  // Primeira vez:
  // ganha 10 de cada comida.

  if (!saved) {

    localStorage.setItem(
      FOOD_TRAY_STORAGE_KEY,
      JSON.stringify(
        INITIAL_FOOD_TRAY
      )
    );


    return {
      ...INITIAL_FOOD_TRAY
    };

  }


  try {

    const parsed =
      JSON.parse(saved);


    return {

      morango:
        Math.max(
          0,
          Math.min(
            FOOD_TRAY_MAX,
            Number(
              parsed.morango
            ) || 0
          )
        ),

      maca:
        Math.max(
          0,
          Math.min(
            FOOD_TRAY_MAX,
            Number(
              parsed.maca
            ) || 0
          )
        ),

      leite:
        Math.max(
          0,
          Math.min(
            FOOD_TRAY_MAX,
            Number(
              parsed.leite
            ) || 0
          )
        ),

      bolo:
        Math.max(
          0,
          Math.min(
            FOOD_TRAY_MAX,
            Number(
              parsed.bolo
            ) || 0
          )
        )

    };

  }

  catch {

    return {
      ...INITIAL_FOOD_TRAY
    };

  }

}


let cinnaFoodTray =
  loadFoodTray();


// ======================================================
// SALVAR BANDEJA
// ======================================================

function saveFoodTray() {

  localStorage.setItem(
    FOOD_TRAY_STORAGE_KEY,
    JSON.stringify(
      cinnaFoodTray
    )
  );

}


// ======================================================
// PEGAR QUANTIDADE
// ======================================================

function getFoodTrayAmount(
  foodId
) {

  return (
    cinnaFoodTray[
      foodId
    ]
    ||
    0
  );

}


// ======================================================
// ATUALIZAR VISUAL DA BANDEJA
// ======================================================

function updateFoodTrayStockDisplay() {

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


      let counter =
        button.querySelector(
          ".food-stock-count"
        );


      if (!counter) {

        counter =
          document.createElement(
            "small"
          );


        counter.className =
          "food-stock-count";


        const valueText =
          button.querySelector(
            "small"
          );


        button.insertBefore(
          counter,
          valueText
        );

      }


      counter.textContent =
        `x${amount}`;


      button.classList.toggle(
        "out-of-stock",
        amount <= 0
      );


      button.setAttribute(
        "aria-label",
        `${foodName}: ${amount} de ${FOOD_TRAY_MAX}`
      );

    }
  );

}


// ======================================================
// CONSUMIR UMA UNIDADE
// ======================================================

function consumeFoodFromTray(
  foodId
) {

  const current =
    getFoodTrayAmount(
      foodId
    );


  if (
    current <=
    0
  ) {

    return false;

  }


  cinnaFoodTray[
    foodId
  ] =
    current - 1;


  saveFoodTray();


  updateFoodTrayStockDisplay();


  return true;

}


// ======================================================
// INTERCEPTA O CLIQUE DA COMIDA
//
// Este listener roda ANTES do listener do game.js.
// Assim só deixamos o Cinna comer se houver estoque.
// ======================================================

document
  .querySelectorAll(
    ".food-item"
  )
  .forEach(
    button => {

      button.addEventListener(

        "click",

        event => {

          const foodName =
            button.dataset.food;


          const foodId =
            foodTrayIds[
              foodName
            ];


          if (!foodId) {
            return;
          }


          // Se estiver de barriga cheia,
          // o game.js cuida da mensagem.
          // Não gastamos comida.

          if (
            typeof cinnaStatus !==
              "undefined"
            &&
            cinnaStatus.hunger >=
              100
          ) {

            return;

          }


          const amount =
            getFoodTrayAmount(
              foodId
            );


          // Acabou.

          if (
            amount <=
            0
          ) {

            event.preventDefault();

            event.stopImmediatePropagation();


            if (
              typeof message !==
              "undefined"
            ) {

              message.textContent =
                `${foodName} acabou! Reponha pelo inventário 🛍️`;

            }


            return;

          }


          // Tem estoque:
          // consome uma unidade
          // e deixa o game.js continuar normalmente.

          consumeFoodFromTray(
            foodId
          );

        },

        true

      );

    }
  );


// ======================================================
// REPOR UM ALIMENTO
// ======================================================

function refillFoodTray(
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


  const missing =
    FOOD_TRAY_MAX -
    trayAmount;


  if (
    missing <=
    0
  ) {

    shopMessage.textContent =
      `${foodTrayIcons[foodId]} A bandeja de ${foodTrayNames[foodId]} já está cheia!`;

    return;

  }


  if (
    inventoryAmount <=
    0
  ) {

    shopMessage.textContent =
      `${foodTrayIcons[foodId]} Você não tem ${foodTrayNames[foodId]} no inventário.`;

    return;

  }


  const amountToMove =
    Math.min(
      missing,
      inventoryAmount
    );


  // Tira do inventário.

  cinnaInventory[
    foodId
  ] =
    inventoryAmount -
    amountToMove;


  // Coloca na bandeja.

  cinnaFoodTray[
    foodId
  ] =
    trayAmount +
    amountToMove;


  saveInventory();

  saveFoodTray();


  updateFoodTrayStockDisplay();


  shopMessage.textContent =
    `${foodTrayIcons[foodId]} +${amountToMove} ${foodTrayNames[foodId]} na bandeja!`;


  shopMessage.classList.add(
    "success"
  );


  setTimeout(
    () => {

      shopMessage.classList.remove(
        "success"
      );

    },
    900
  );


  renderInventory();

}


// ======================================================
// NOVO INVENTÁRIO COM BOTÃO REPOR
// ======================================================

renderInventory =
  function () {

    shopContent.innerHTML =
      "";


    const ownedItems =
      shopItems.filter(
        item =>
          getItemAmount(
            item.id
          ) > 0
      );


    if (
      ownedItems.length ===
      0
    ) {

      shopContent.innerHTML = `

        <div class="shop-empty">

          <div>
            🎒
          </div>

          <strong>
            Inventário vazio
          </strong>

          <small>
            Compra alguma coisa primeiro KSKSKSK
          </small>

        </div>

      `;


      return;

    }


    ownedItems.forEach(
      item => {

        const amount =
          getItemAmount(
            item.id
          );


        const isFood =
          item.category ===
          "food";


        const trayAmount =
          isFood

            ? getFoodTrayAmount(
                item.id
              )

            : 0;


        const card =
          document.createElement(
            "article"
          );


        card.className =
          "inventory-item";


        card.innerHTML = `

          <div class="inventory-icon">

            ${item.icon}

          </div>


          <div class="inventory-info">

            <strong>
              ${item.name}
            </strong>


            <small>

              ${
                isFood

                  ? `Inventário: ${amount} • Bandeja: ${trayAmount}/${FOOD_TRAY_MAX}`

                  : item.stackable

                    ? `Quantidade: ${amount}`

                    : "Item adquirido"
              }

            </small>

          </div>


          ${
            isFood

              ? `

                <div class="inventory-food-actions">

                  <span class="inventory-check">
                    ×${amount}
                  </span>


                  <button
                    class="inventory-refill-button"
                    data-refill-food="${item.id}"
                    type="button"
                    ${
                      trayAmount >=
                      FOOD_TRAY_MAX

                        ? "disabled"

                        : ""
                    }
                  >

                    ${
                      trayAmount >=
                      FOOD_TRAY_MAX

                        ? "CHEIO"

                        : "REPOR"
                    }

                  </button>

                </div>

              `

              : `

                <span class="inventory-check">

                  ${
                    item.stackable

                      ? `×${amount}`

                      : "✓"
                  }

                </span>

              `
          }

        `;


        shopContent.appendChild(
          card
        );

      }
    );


    // Botões REPOR

    document
      .querySelectorAll(
        ".inventory-refill-button"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              refillFoodTray(
                button.dataset
                  .refillFood
              );

            }
          );

        }
      );

  };


// ======================================================
// API PARA USARMOS DEPOIS
// ======================================================

window.CinnaFoodTray = {

  getStock(
    foodId
  ) {

    return getFoodTrayAmount(
      foodId
    );

  },


  getAll() {

    return {
      ...cinnaFoodTray
    };

  },


  refill(
    foodId
  ) {

    refillFoodTray(
      foodId
    );

  },


  max:
    FOOD_TRAY_MAX

};


// ======================================================
// INICIALIZAÇÃO
// ======================================================

updateFoodTrayStockDisplay();


// ======================================================
// ACESSÓRIOS DO CINNA 🎀
// ======================================================

const CINNA_ACCESSORIES_KEY =
  "cinnaEquippedAccessories";


// ======================================================
// PACK DE ACESSÓRIOS
// ======================================================

const cinnaAccessories = [

  {
    id: "laco-azul",
    category: "accessories",
    slot: "head",
    icon: "🎀",
    name: "Lacinho Azul",
    description: "Um lacinho azul delicado para o Cinna.",
    price: 100,
    stackable: false,
    image:
      "assets/accessories/acessorio-laco-azul.PNG"
  },

  {
    id: "coroa",
    category: "accessories",
    slot: "head",
    icon: "👑",
    name: "Coroa",
    description: "Para quando o Cinna decidir que agora é da realeza.",
    price: 250,
    stackable: false,
    image:
      "assets/accessories/acessorio-cora.PNG"
  },

  {
    id: "oculos",
    category: "accessories",
    slot: "face",
    icon: "👓",
    name: "Óculos Nuvem",
    description: "Óculos azuis redondinhos e muito intelectuais.",
    price: 130,
    stackable: false,
    image:
      "assets/accessories/acessorio-óculos.PNG"
  },

  {
    id: "touca",
    category: "accessories",
    slot: "head",
    icon: "🌙",
    name: "Touca Estrelinha",
    description: "Uma touquinha confortável para noites sonolentas.",
    price: 160,
    stackable: false,
    image:
      "assets/accessories/acessorio-touca.PNG"
  },

  {
    id: "colar-coracao",
    category: "accessories",
    slot: "neck",
    icon: "💗",
    name: "Colar de Coração",
    description: "Um colar rosa com pingente de coração.",
    price: 150,
    stackable: false,
    image:
      "assets/accessories/acessorio-colar-coracao.PNG"
  },

  {
    id: "morango",
    category: "accessories",
    slot: "head",
    icon: "🍓",
    name: "Presilha Morango",
    description: "Uma presilha de moranguinho absurdamente fofa.",
    price: 120,
    stackable: false,
    image:
      "assets/accessories/acessorio-morango.PNG"
  }

];


// ======================================================
// REMOVE OS ACESSÓRIOS ANTIGOS DA LOJA
// E COLOCA O PACK NOVO
// ======================================================

for (
  let i =
    shopItems.length - 1;

  i >= 0;

  i--
) {

  if (
    shopItems[i].category ===
    "accessories"
  ) {

    shopItems.splice(
      i,
      1
    );

  }

}


shopItems.push(
  ...cinnaAccessories
);


// ======================================================
// MIGRA COMPRAS ANTIGAS
// caso você já tenha comprado algum dos placeholders
// ======================================================

const accessoryMigration = {

  laco:
    "laco-azul",

  chapeu:
    "touca"

};


Object.entries(
  accessoryMigration
).forEach(
  ([oldId, newId]) => {

    if (
      cinnaInventory[oldId] &&
      !cinnaInventory[newId]
    ) {

      cinnaInventory[newId] =
        cinnaInventory[oldId];

    }

  }
);


// Óculos já tinha o mesmo ID,
// então não precisa migrar.

saveInventory();


// ======================================================
// CARREGAR ACESSÓRIOS EQUIPADOS
// ======================================================

function loadEquippedAccessories() {

  const saved =
    localStorage.getItem(
      CINNA_ACCESSORIES_KEY
    );


  if (!saved) {

    return {

      head: null,
      face: null,
      neck: null

    };

  }


  try {

    const data =
      JSON.parse(
        saved
      );


    return {

      head:
        data.head || null,

      face:
        data.face || null,

      neck:
        data.neck || null

    };

  }

  catch {

    return {

      head: null,
      face: null,
      neck: null

    };

  }

}


let cinnaEquippedAccessories =
  loadEquippedAccessories();


// ======================================================
// SALVAR EQUIPADOS
// ======================================================

function saveEquippedAccessories() {

  localStorage.setItem(

    CINNA_ACCESSORIES_KEY,

    JSON.stringify(
      cinnaEquippedAccessories
    )

  );

}


// ======================================================
// CAMADA DOS ACESSÓRIOS
// ======================================================

const cinnaWrap =
  document.querySelector(
    ".cinna-wrap"
  );


let accessoryLayer =
  document.querySelector(
    "#cinna-accessories-layer"
  );


if (
  cinnaWrap &&
  !accessoryLayer
) {

  accessoryLayer =
    document.createElement(
      "div"
    );


  accessoryLayer.id =
    "cinna-accessories-layer";


  accessoryLayer.className =
    "cinna-accessories-layer";


  cinnaWrap.appendChild(
    accessoryLayer
  );

}


// ======================================================
// ACHAR ACESSÓRIO
// ======================================================

function getAccessoryById(
  accessoryId
) {

  return cinnaAccessories.find(

    item =>
      item.id ===
      accessoryId

  );

}


// ======================================================
// DESENHAR ACESSÓRIOS NO CINNA
// ======================================================

function applyEquippedAccessories() {

  if (!accessoryLayer) {

    return;

  }


  accessoryLayer.innerHTML =
    "";


  const slots = [

    "head",
    "face",
    "neck"

  ];


  slots.forEach(
    slot => {

      const accessoryId =
        cinnaEquippedAccessories[
          slot
        ];


      if (!accessoryId) {

        return;

      }


      const accessory =
        getAccessoryById(
          accessoryId
        );


      if (!accessory) {

        return;

      }


      // Só equipa se realmente
      // estiver no inventário.

      if (
        getItemAmount(
          accessory.id
        ) <= 0
      ) {

        cinnaEquippedAccessories[
          slot
        ] =
          null;


        return;

      }


      const image =
        document.createElement(
          "img"
        );


      image.src =
        accessory.image;


      image.alt =
        accessory.name;


      image.className =
        `cinna-accessory cinna-accessory-${accessory.id}`;


      image.dataset.slot =
        slot;


      accessoryLayer.appendChild(
        image
      );

    }
  );


  saveEquippedAccessories();

}


// ======================================================
// EQUIPAR / REMOVER
// ======================================================

function toggleAccessory(
  accessoryId
) {

  const accessory =
    getAccessoryById(
      accessoryId
    );


  if (!accessory) {

    return;

  }


  if (
    getItemAmount(
      accessory.id
    ) <= 0
  ) {

    shopMessage.textContent =
      "Você ainda não comprou esse acessório ;-;";

    return;

  }


  const slot =
    accessory.slot;


  // Se já está equipado:
  // remove.

  if (
    cinnaEquippedAccessories[
      slot
    ] ===
    accessory.id
  ) {

    cinnaEquippedAccessories[
      slot
    ] =
      null;


    shopMessage.textContent =
      `${accessory.icon} ${accessory.name} removido!`;

  }

  else {

    // Se outro item ocupa o mesmo slot,
    // ele é substituído automaticamente.

    cinnaEquippedAccessories[
      slot
    ] =
      accessory.id;


    shopMessage.textContent =
      `${accessory.icon} ${accessory.name} equipado!`;

  }


  saveEquippedAccessories();


  applyEquippedAccessories();


  renderInventory();

}


// ======================================================
// MOSTRAR IMAGENS REAIS NA LOJA
// ======================================================

function decorateAccessoryShop() {

  const cards =
    shopContent.querySelectorAll(
      ".shop-item"
    );


  const items =
    shopItems.filter(
      item =>
        item.category ===
        "accessories"
    );


  cards.forEach(
    (card, index) => {

      const item =
        items[index];


      if (!item) {

        return;

      }


      const icon =
        card.querySelector(
          ".shop-item-icon"
        );


      if (
        icon &&
        item.image
      ) {

        icon.innerHTML = `

          <img
            class="shop-accessory-preview"
            src="${item.image}"
            alt="${item.name}"
          >

        `;

      }

    }
  );

}


// ======================================================
// ENVOLVE O RENDER DA LOJA
// ======================================================

const renderShopCategoryBeforeAccessories =
  renderShopCategory;


renderShopCategory =
  function (
    category
  ) {

    renderShopCategoryBeforeAccessories(
      category
    );


    if (
      category ===
      "accessories"
    ) {

      decorateAccessoryShop();

    }

  };


// ======================================================
// MELHORA O INVENTÁRIO
// SEM QUEBRAR O SISTEMA DA COMIDA
// ======================================================

const renderInventoryBeforeAccessories =
  renderInventory;


renderInventory =
  function () {

    renderInventoryBeforeAccessories();


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


        const accessory =
          cinnaAccessories.find(

            item =>
              item.name.trim() ===
              nameElement
                .textContent
                .trim()

          );


        if (!accessory) {

          return;

        }


        // Troca emoji pela imagem real.

        const icon =
          card.querySelector(
            ".inventory-icon"
          );


        if (icon) {

          icon.innerHTML = `

            <img
              class="inventory-accessory-preview"
              src="${accessory.image}"
              alt="${accessory.name}"
            >

          `;

        }


        // Remove o ✓ padrão.

        const oldCheck =
          card.querySelector(
            ".inventory-check"
          );


        if (oldCheck) {

          oldCheck.remove();

        }


        const actions =
          document.createElement(
            "div"
          );


        actions.className =
          "inventory-accessory-actions";


        const equipped =

          cinnaEquippedAccessories[
            accessory.slot
          ] ===
          accessory.id;


        actions.innerHTML = `

          <button

            class="
              inventory-equip-button
              ${
                equipped
                  ? "equipped"
                  : ""
              }
            "

            type="button"

          >

            ${
              equipped
                ? "REMOVER"
                : "EQUIPAR"
            }

          </button>

        `;


        actions
          .querySelector(
            ".inventory-equip-button"
          )
          .addEventListener(

            "click",

            () => {

              toggleAccessory(
                accessory.id
              );

            }

          );


        card.appendChild(
          actions
        );

      }
    );

  };


// ======================================================
// API DOS ACESSÓRIOS
// ======================================================

window.CinnaAccessories = {

  equip(
    accessoryId
  ) {

    toggleAccessory(
      accessoryId
    );

  },


  getEquipped() {

    return {

      ...cinnaEquippedAccessories

    };

  },


  refresh() {

    applyEquippedAccessories();

  }

};


// ======================================================
// INICIALIZAÇÃO
// ======================================================

applyEquippedAccessories();
