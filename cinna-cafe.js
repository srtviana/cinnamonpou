// ======================================================
// CINNA CAFÉ ☕️🍰
// V4 — CLIENTE + PEDIDOS + HOTSPOTS + BANDEJA
// ======================================================

(() => {

  // ====================================================
  // ASSETS
  // ====================================================

  const A = {

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
      "assets/cafe/characters/cinna-chef-sad.PNG",

    kuromiIdle:
      "assets/cafe/characters/kuromi-idle.PNG",

    kuromiBlink:
      "assets/cafe/characters/kuromi-blink.PNG",

    kuromiAngry:
      "assets/cafe/characters/kuromi-angry.PNG"

  };


  // ====================================================
  // ITENS
  // ====================================================

  const ITEMS = {

    bearLatte: {
      name: "Latte Branco",
      src: "assets/cafe/food/coffee-bear-latte.PNG"
    },

    pinkLatte: {
      name: "Latte Rosa",
      src: "assets/cafe/food/coffee-pink-latte.PNG"
    },

    frappe: {
      name: "Frappé de Chocolate",
      src: "assets/cafe/food/drink-chocolate-frappe.PNG"
    },

    cupcakeChocolate: {
      name: "Cupcake de Chocolate",
      src: "assets/cafe/food/cupcake-chocolate.PNG"
    },

    cupcakeStrawberry: {
      name: "Cupcake de Morango",
      src: "assets/cafe/food/cupcake-strawberry.PNG"
    },

    donutChocolate: {
      name: "Donut de Chocolate",
      src: "assets/cafe/food/donut-chocolate.PNG"
    },

    donutStrawberry: {
      name: "Donut de Morango",
      src: "assets/cafe/food/donut-strawberry.PNG"
    },

    donutVanilla: {
      name: "Donut de Baunilha",
      src: "assets/cafe/food/donut-vanilla.PNG"
    }

  };


  // ====================================================
  // PRÉ-CARREGAMENTO
  // ====================================================

  [
    ...Object.values(A),
    ...Object.values(ITEMS).map(item => item.src)

  ].forEach(src => {

    const img = new Image();
    img.src = src;

  });


  // ====================================================
  // JOGO PRINCIPAL
  // ====================================================

  const gamesRoom =
    document.querySelector(".room");

  const gameCards =
    document.querySelector("#game-hub .game-cards");


  if (!gamesRoom || !gameCards) {

    console.warn(
      "Cinna Café: Games Hub não encontrado."
    );

    return;

  }


  if (
    document.querySelector("#cinna-cafe-button")
  ) {

    return;

  }


  // ====================================================
  // CARD
  // ====================================================

  const cafeCard =
    document.createElement("button");

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
    document.querySelector("#star-game-button");


  if (starCard) {

    starCard.insertAdjacentElement(
      "afterend",
      cafeCard
    );

  } else {

    gameCards.appendChild(cafeCard);

  }


  // ====================================================
  // TELA
  // ====================================================

  const cafeOverlay =
    document.createElement("section");

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

        🪙

        <strong id="cinna-cafe-coins-value">
          0
        </strong>

      </div>

    </div>


    <div class="cinna-cafe-stage-wrapper">

      <div
        id="cinna-cafe-stage"
        class="cinna-cafe-stage"
      >


        <!-- FUNDO -->

        <img
          class="cinna-cafe-background"
          src="${A.background}"
          alt=""
          draggable="false"
        >


        <!-- CLIENTE -->

        <div
          id="cafe-customer-wrap"
          class="cafe-customer-wrap"
        >

          <img
            id="cafe-customer"
            class="cafe-customer"
            src="${A.kuromiIdle}"
            alt="Kuromi"
            draggable="false"
          >

          <div
            id="cafe-happy-hearts"
            class="cafe-happy-hearts"
          >
            ♡ ♡
          </div>

        </div>


        <!-- PEDIDO -->

        <div
          id="cafe-order"
          class="cafe-order"
        >

          <span class="cafe-order-title">
            Pedido
          </span>

          <div
            id="cafe-order-items"
            class="cafe-order-items"
          ></div>

        </div>


        <!-- BALCÃO DO CLIENTE -->

        <img
          class="cinna-cafe-client-counter"
          src="${A.clientCounter}"
          alt=""
          draggable="false"
        >


        <!-- CINNA -->

        <img
          id="cinna-cafe-chef"
          class="cinna-cafe-chef"
          src="${A.cinnaIdle}"
          alt="Cinna cozinheiro"
          draggable="false"
        >


        <!-- BANCADA -->

        <img
          class="cinna-cafe-prep-counter"
          src="${A.prepCounter}"
          alt=""
          draggable="false"
        >


        <!-- ===================================== -->
        <!-- HOTSPOTS INVISÍVEIS -->
        <!-- ===================================== -->

        <div
          id="cafe-hotspots"
          class="cafe-hotspots"
        >

          <button
            class="cafe-hotspot hotspot-bear-latte"
            data-item="bearLatte"
            aria-label="Latte branco"
          ></button>

          <button
            class="cafe-hotspot hotspot-pink-latte"
            data-item="pinkLatte"
            aria-label="Latte rosa"
          ></button>

          <button
            class="cafe-hotspot hotspot-frappe"
            data-item="frappe"
            aria-label="Frappé"
          ></button>

          <button
            class="cafe-hotspot hotspot-cupcake-chocolate"
            data-item="cupcakeChocolate"
            aria-label="Cupcake de chocolate"
          ></button>

          <button
            class="cafe-hotspot hotspot-cupcake-strawberry"
            data-item="cupcakeStrawberry"
            aria-label="Cupcake de morango"
          ></button>

          <button
            class="cafe-hotspot hotspot-donut-chocolate"
            data-item="donutChocolate"
            aria-label="Donut de chocolate"
          ></button>

          <button
            class="cafe-hotspot hotspot-donut-strawberry"
            data-item="donutStrawberry"
            aria-label="Donut de morango"
          ></button>

          <button
            class="cafe-hotspot hotspot-donut-vanilla"
            data-item="donutVanilla"
            aria-label="Donut de baunilha"
          ></button>

        </div>


        <!-- BANDEJA -->

        <div
          id="cafe-tray-items"
          class="cafe-tray-items"
        ></div>


        <!-- ENTREGAR -->

        <button
          id="cafe-deliver"
          class="cafe-deliver"
          type="button"
          disabled
        >
          ENTREGAR ♡
        </button>


        <!-- FEEDBACK -->

        <div
          id="cafe-feedback"
          class="cafe-feedback"
        ></div>


      </div>

    </div>

  `;


  document.body.appendChild(cafeOverlay);


  // ====================================================
  // ELEMENTOS
  // ====================================================

  const chef =
    cafeOverlay.querySelector("#cinna-cafe-chef");

  const customer =
    cafeOverlay.querySelector("#cafe-customer");

  const customerWrap =
    cafeOverlay.querySelector("#cafe-customer-wrap");

  const hearts =
    cafeOverlay.querySelector("#cafe-happy-hearts");

  const orderBox =
    cafeOverlay.querySelector("#cafe-order");

  const orderItems =
    cafeOverlay.querySelector("#cafe-order-items");

  const tray =
    cafeOverlay.querySelector("#cafe-tray-items");

  const deliverButton =
    cafeOverlay.querySelector("#cafe-deliver");

  const feedback =
    cafeOverlay.querySelector("#cafe-feedback");

  const coins =
    cafeOverlay.querySelector("#cinna-cafe-coins-value");

  const back =
    cafeOverlay.querySelector("#cinna-cafe-back");

  const hotspots =
    [...cafeOverlay.querySelectorAll(".cafe-hotspot")];


  // ====================================================
  // ESTADO
  // ====================================================

  let currentOrder = [];

  let trayItems = [];

  let roundErrors = 0;

  let orderLocked = false;

  let cafeRunning = false;

  let chefMood = "idle";

  let customerMood = "idle";

  let chefBlinkTimer = null;

  let chefBlinkReturn = null;

  let customerBlinkTimer = null;

  let customerBlinkReturn = null;

  let reactionTimer = null;

  let nextCustomerTimer = null;


  // ====================================================
  // MOEDAS
  // ====================================================

  function updateCoins() {

    if (
      window.CinnaCoins &&
      typeof window.CinnaCoins.getBalance === "function"
    ) {

      coins.textContent =
        window.CinnaCoins.getBalance();

    } else {

      coins.textContent = "0";

    }

  }


  function giveCoins(amount) {

    if (
      window.CinnaCoins &&
      typeof window.CinnaCoins.add === "function"
    ) {

      window.CinnaCoins.add(amount);

    }

    updateCoins();

  }


  // ====================================================
  // CINNA
  // ====================================================

  function clearChefBlink() {

    clearTimeout(chefBlinkTimer);
    clearTimeout(chefBlinkReturn);

  }


  function setChefMood(mood) {

    chefMood = mood;

    if (mood === "happy") {

      chef.src = A.cinnaHappy;

    } else if (mood === "sad") {

      chef.src = A.cinnaSad;

    } else {

      chefMood = "idle";
      chef.src = A.cinnaIdle;

    }

  }


  function scheduleChefBlink() {

    clearChefBlink();

    if (
      !cafeRunning ||
      chefMood !== "idle"
    ) {

      return;

    }


    chefBlinkTimer =
      setTimeout(() => {

        if (
          !cafeRunning ||
          chefMood !== "idle"
        ) {

          return;

        }


        chef.src =
          A.cinnaBlink;


        chefBlinkReturn =
          setTimeout(() => {

            if (chefMood !== "idle") {
              return;
            }

            chef.src =
              A.cinnaIdle;

            scheduleChefBlink();

          }, 150);

      }, 2800 + Math.random() * 2600);

  }


  function chefIdle() {

    setChefMood("idle");
    scheduleChefBlink();

  }


  function chefHappy() {

    clearChefBlink();
    setChefMood("happy");

  }


  function chefSad() {

    clearChefBlink();
    setChefMood("sad");

  }


  // ====================================================
  // KUROMI
  // ====================================================

  function clearCustomerBlink() {

    clearTimeout(customerBlinkTimer);
    clearTimeout(customerBlinkReturn);

  }


  function customerIdle() {

    customerMood = "idle";

    customer.src =
      A.kuromiIdle;

    scheduleCustomerBlink();

  }


  function scheduleCustomerBlink() {

    clearCustomerBlink();

    if (
      !cafeRunning ||
      customerMood !== "idle"
    ) {

      return;

    }


    customerBlinkTimer =
      setTimeout(() => {

        if (
          !cafeRunning ||
          customerMood !== "idle"
        ) {

          return;

        }


        customer.src =
          A.kuromiBlink;


        customerBlinkReturn =
          setTimeout(() => {

            if (
              customerMood !== "idle"
            ) {

              return;

            }

            customer.src =
              A.kuromiIdle;

            scheduleCustomerBlink();

          }, 150);

      }, 2400 + Math.random() * 2600);

  }


  function customerAngry() {

    clearCustomerBlink();

    customerMood =
      "angry";

    customer.src =
      A.kuromiAngry;

    customerWrap.classList.add(
      "is-angry"
    );

  }


  function customerHappy() {

    clearCustomerBlink();

    customerMood =
      "happy";

    customer.src =
      A.kuromiIdle;

    customerWrap.classList.add(
      "is-happy"
    );

    hearts.classList.add(
      "show"
    );

  }


  function clearCustomerReaction() {

    customerWrap.classList.remove(
      "is-happy",
      "is-angry"
    );

    hearts.classList.remove(
      "show"
    );

  }


  // ====================================================
  // PEDIDOS
  // ====================================================

  function randomItemKey() {

    const keys =
      Object.keys(ITEMS);

    return keys[
      Math.floor(
        Math.random() * keys.length
      )
    ];

  }


  function createRandomOrder() {

    const amount =
      Math.random() < 0.55
        ? 1
        : 2;

    const result = [];


    while (
      result.length < amount
    ) {

      const key =
        randomItemKey();

      if (
        !result.includes(key)
      ) {

        result.push(key);

      }

    }


    return result;

  }


  function renderOrder() {

    orderItems.innerHTML = "";


    currentOrder.forEach(key => {

      const item =
        ITEMS[key];

      const img =
        document.createElement("img");

      img.src =
        item.src;

      img.alt =
        item.name;

      img.title =
        item.name;

      orderItems.appendChild(img);

    });

  }


  // ====================================================
  // NOVO CLIENTE
  // ====================================================

  function startCustomer() {

    if (!cafeRunning) {
      return;
    }


    clearTimeout(nextCustomerTimer);
    clearTimeout(reactionTimer);

    clearCustomerReaction();

    orderLocked = true;

    trayItems = [];

    renderTray();

    currentOrder = [];

    orderItems.innerHTML = "";

    orderBox.classList.remove("show");

    deliverButton.classList.remove("show");

    feedback.classList.remove(
      "show",
      "correct",
      "wrong"
    );


    customerWrap.classList.remove(
      "arrived"
    );


    void customerWrap.offsetWidth;


    customerWrap.classList.add(
      "arrived"
    );


    customerIdle();


    setTimeout(() => {

      if (!cafeRunning) {
        return;
      }

      currentOrder =
        createRandomOrder();

      renderOrder();

      orderBox.classList.add(
        "show"
      );

      orderLocked = false;

    }, 750);

  }


  // ====================================================
  // BANDEJA
  // ====================================================

  function addToTray(key) {

    if (
      orderLocked ||
      !currentOrder.length
    ) {

      return;

    }


    /*
      Máximo de 2 itens por pedido
      nesta primeira versão.
    */

    if (
      trayItems.length >= 2
    ) {

      tray.classList.remove(
        "shake"
      );

      void tray.offsetWidth;

      tray.classList.add(
        "shake"
      );

      return;

    }


    trayItems.push(key);

    renderTray();

  }


  function removeFromTray(index) {

    if (orderLocked) {
      return;
    }

    trayItems.splice(
      index,
      1
    );

    renderTray();

  }


  function renderTray() {

    tray.innerHTML = "";


    trayItems.forEach(
      (key, index) => {

        const item =
          ITEMS[key];

        const button =
          document.createElement("button");

        button.type =
          "button";

        button.className =
          "cafe-tray-item";

        button.title =
          `Remover ${item.name}`;

        button.innerHTML = `

          <img
            src="${item.src}"
            alt="${item.name}"
            draggable="false"
          >

        `;


        button.addEventListener(
          "click",
          () => {

            removeFromTray(index);

          }
        );


        tray.appendChild(
          button
        );

      }
    );


    if (
      trayItems.length > 0 &&
      !orderLocked
    ) {

      deliverButton.classList.add(
        "show"
      );

      deliverButton.disabled =
        false;

    } else {

      deliverButton.classList.remove(
        "show"
      );

      deliverButton.disabled =
        true;

    }

  }


  // ====================================================
  // COMPARAÇÃO DO PEDIDO
  // ====================================================

  function arraysMatch(a, b) {

    if (
      a.length !== b.length
    ) {

      return false;

    }


    const first =
      [...a].sort();

    const second =
      [...b].sort();


    return first.every(
      (value, index) =>
        value === second[index]
    );

  }


  // ====================================================
  // FEEDBACK
  // ====================================================

  function showFeedback(
    text,
    type
  ) {

    feedback.textContent =
      text;

    feedback.className =
      `cafe-feedback show ${type}`;

  }


  // ====================================================
  // ENTREGA
  // ====================================================

  function deliverOrder() {

    if (
      orderLocked ||
      !trayItems.length
    ) {

      return;

    }


    orderLocked = true;

    deliverButton.disabled =
      true;


    const correct =
      arraysMatch(
        currentOrder,
        trayItems
      );


    // ==================================================
    // ACERTOU
    // ==================================================

    if (correct) {

      chefHappy();

      customerHappy();

      showFeedback(
        "Pedido perfeito! +5 🪙",
        "correct"
      );

      giveCoins(5);

      orderBox.classList.remove(
        "show"
      );

      deliverButton.classList.remove(
        "show"
      );


      reactionTimer =
        setTimeout(() => {

          if (!cafeRunning) {
            return;
          }


          customerWrap.classList.add(
            "leaving"
          );


          setTimeout(() => {

            customerWrap.classList.remove(
              "leaving",
              "arrived"
            );

            clearCustomerReaction();

            trayItems = [];

            renderTray();

            chefIdle();

            feedback.classList.remove(
              "show"
            );


            nextCustomerTimer =
              setTimeout(
                startCustomer,
                500
              );

          }, 500);

        }, 1200);

    }


    // ==================================================
    // ERROU
    // ==================================================

    else {

      roundErrors++;

      chefSad();

      customerAngry();

      showFeedback(
        "Ops! Pedido errado 💢",
        "wrong"
      );


      reactionTimer =
        setTimeout(() => {

          if (!cafeRunning) {
            return;
          }


          clearCustomerReaction();

          customerIdle();

          chefIdle();


          /*
            Limpa a bandeja para tentar novamente.
            O pedido continua o mesmo.
          */

          trayItems = [];

          renderTray();

          orderLocked = false;


          feedback.classList.remove(
            "show"
          );

        }, 1100);

    }

  }


  // ====================================================
  // HOTSPOTS
  // ====================================================

  hotspots.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const key =
          button.dataset.item;

        if (!ITEMS[key]) {
          return;
        }


        button.classList.remove(
          "clicked"
        );

        void button.offsetWidth;

        button.classList.add(
          "clicked"
        );


        addToTray(key);

      }
    );

  });


  deliverButton.addEventListener(
    "click",
    deliverOrder
  );


  // ====================================================
  // RESET
  // ====================================================

  function resetGame() {

    roundErrors = 0;

    currentOrder = [];

    trayItems = [];

    orderLocked = false;

    clearTimeout(reactionTimer);
    clearTimeout(nextCustomerTimer);

    clearChefBlink();
    clearCustomerBlink();

    clearCustomerReaction();

    renderTray();

    chefIdle();

  }


  // ====================================================
  // ABRIR
  // ====================================================

  function openCafe() {

    updateCoins();

    cafeRunning = true;

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

    resetGame();

    startCustomer();

  }


  // ====================================================
  // FECHAR
  // ====================================================

  function closeCafe() {

    cafeRunning = false;

    clearTimeout(reactionTimer);
    clearTimeout(nextCustomerTimer);

    clearChefBlink();
    clearCustomerBlink();

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

    updateCoins();

  }


  // ====================================================
  // EVENTOS
  // ====================================================

  cafeCard.addEventListener(
    "click",
    openCafe
  );


  back.addEventListener(
    "click",
    closeCafe
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        cafeOverlay.classList.contains(
          "is-open"
        )
      ) {

        closeCafe();

      }

    }
  );


  // ====================================================
  // API
  // ====================================================

  window.CinnaCafe = {

    open:
      openCafe,

    close:
      closeCafe,

    refreshCoins:
      updateCoins,

    happy:
      chefHappy,

    sad:
      chefSad,

    newCustomer:
      startCustomer,

    getErrors() {

      return roundErrors;

    },

    getOrder() {

      return [...currentOrder];

    },

    getTray() {

      return [...trayItems];

    }

  };


  updateCoins();

})();
