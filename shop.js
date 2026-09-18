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
