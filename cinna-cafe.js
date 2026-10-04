// ======================================================
// CINNA CAFÉ ☕️🍰
// V5 — MULTICLIENTES + TIMER + PEDIDOS INDIVIDUAIS
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
      "assets/cafe/characters/cinna-chef-sad.PNG"
  };


  // ====================================================
  // CLIENTES
  // ====================================================

  const CHARACTERS = {

    kuromi: {
      name: "Kuromi",

      idle:
        "assets/cafe/characters/kuromi-idle.PNG",

      blink:
        "assets/cafe/characters/kuromi-blink.PNG",

      angry:
        "assets/cafe/characters/kuromi-angry.PNG"
    },

    pompompurin: {
      name: "Pompompurin",

      idle:
        "assets/cafe/characters/pompompurin-idle.PNG",

      blink:
        "assets/cafe/characters/pompompurin-blink.PNG",

      angry:
        "assets/cafe/characters/pompompurin-angry.PNG"
    }

  };


  // ====================================================
  // ITENS
  // ====================================================

  const ITEMS = {

    bearLatte: {
      name: "Latte Branco",
      src:
        "assets/cafe/food/coffee-bear-latte.PNG"
    },

    pinkLatte: {
      name: "Latte Rosa",
      src:
        "assets/cafe/food/coffee-pink-latte.PNG"
    },

    frappe: {
      name: "Frappé de Chocolate",
      src:
        "assets/cafe/food/drink-chocolate-frappe.PNG"
    },

    cupcakeChocolate: {
      name: "Cupcake de Chocolate",
      src:
        "assets/cafe/food/cupcake-chocolate.PNG"
    },

    cupcakeStrawberry: {
      name: "Cupcake de Morango",
      src:
        "assets/cafe/food/cupcake-strawberry.PNG"
    },

    donutChocolate: {
      name: "Donut de Chocolate",
      src:
        "assets/cafe/food/donut-chocolate.PNG"
    },

    donutStrawberry: {
      name: "Donut de Morango",
      src:
        "assets/cafe/food/donut-strawberry.PNG"
    },

    donutVanilla: {
      name: "Donut de Baunilha",
      src:
        "assets/cafe/food/donut-vanilla.PNG"
    }

  };


  // ====================================================
  // CONFIGURAÇÕES
  // ====================================================

  const CUSTOMER_TIME = 25;

  const MAX_ERRORS = 3;

  const CORRECT_REWARD = 5;

  /*
    Chance de chegar uma dupla.

    0.40 = 40%
  */

  const DOUBLE_CUSTOMER_CHANCE = 0.40;


  // ====================================================
  // PRÉ-CARREGAMENTO
  // ====================================================

  const preloadAssets = [
    ...Object.values(A),

    ...Object.values(CHARACTERS)
      .flatMap(character => [
        character.idle,
        character.blink,
        character.angry
      ]),

    ...Object.values(ITEMS)
      .map(item => item.src)
  ];


  preloadAssets.forEach(src => {

    const img = new Image();

    img.src = src;

  });


  // ====================================================
  // JOGO PRINCIPAL
  // ====================================================

  const gamesRoom =
    document.querySelector(".room");

  const gameCards =
    document.querySelector(
      "#game-hub .game-cards"
    );


  if (!gamesRoom || !gameCards) {

    console.warn(
      "Cinna Café: Games Hub não encontrado."
    );

    return;

  }


  if (
    document.querySelector(
      "#cinna-cafe-button"
    )
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
    document.querySelector(
      "#star-game-button"
    );


  if (starCard) {

    starCard.insertAdjacentElement(
      "afterend",
      cafeCard
    );

  } else {

    gameCards.appendChild(
      cafeCard
    );

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


        <!-- CLIENTES -->

        <div
          id="cafe-customers"
          class="cafe-customers"
        ></div>


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


        <!-- HOTSPOTS -->

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
            aria-label="Frappé de chocolate"
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


  document.body.appendChild(
    cafeOverlay
  );


  // ====================================================
  // ELEMENTOS
  // ====================================================

  const chef =
    cafeOverlay.querySelector(
      "#cinna-cafe-chef"
    );

  const customersContainer =
    cafeOverlay.querySelector(
      "#cafe-customers"
    );

  const tray =
    cafeOverlay.querySelector(
      "#cafe-tray-items"
    );

  const deliverButton =
    cafeOverlay.querySelector(
      "#cafe-deliver"
    );

  const feedback =
    cafeOverlay.querySelector(
      "#cafe-feedback"
    );

  const coins =
    cafeOverlay.querySelector(
      "#cinna-cafe-coins-value"
    );

  const back =
    cafeOverlay.querySelector(
      "#cinna-cafe-back"
    );

  const hotspots = [
    ...cafeOverlay.querySelectorAll(
      ".cafe-hotspot"
    )
  ];


  // ====================================================
  // ESTADO
  // ====================================================

  let cafeRunning = false;

  let trayItems = [];

  let customers = [];

  let selectedCustomerId = null;

  let customerSequence = 0;

  let chefMood = "idle";

  let chefBlinkTimer = null;

  let chefBlinkReturn = null;

  let nextWaveTimer = null;

  let feedbackTimer = null;


  // ====================================================
  // MOEDAS
  // ====================================================

  function updateCoins() {

    if (
      window.CinnaCoins &&
      typeof window.CinnaCoins
        .getBalance === "function"
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
      typeof window.CinnaCoins
        .add === "function"
    ) {

      window.CinnaCoins.add(
        amount
      );

    }

    updateCoins();

  }


  // ====================================================
  // CINNA
  // ====================================================

  function clearChefBlink() {

    clearTimeout(
      chefBlinkTimer
    );

    clearTimeout(
      chefBlinkReturn
    );

  }


  function setChefMood(mood) {

    chefMood = mood;


    if (mood === "happy") {

      chef.src =
        A.cinnaHappy;

    } else if (mood === "sad") {

      chef.src =
        A.cinnaSad;

    } else {

      chefMood = "idle";

      chef.src =
        A.cinnaIdle;

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

            if (
              chefMood !== "idle"
            ) {

              return;

            }


            chef.src =
              A.cinnaIdle;

            scheduleChefBlink();

          }, 150);

      },
      2800 +
      Math.random() * 2600);

  }


  function chefIdle() {

    setChefMood("idle");

    scheduleChefBlink();

  }


  function chefHappy(
    duration = 900
  ) {

    clearChefBlink();

    setChefMood("happy");


    setTimeout(() => {

      if (
        cafeRunning &&
        chefMood === "happy"
      ) {

        chefIdle();

      }

    }, duration);

  }


  function chefSad(
    duration = 900
  ) {

    clearChefBlink();

    setChefMood("sad");


    setTimeout(() => {

      if (
        cafeRunning &&
        chefMood === "sad"
      ) {

        chefIdle();

      }

    }, duration);

  }


  // ====================================================
  // PEDIDOS
  // ====================================================

  function randomItemKey() {

    const keys =
      Object.keys(ITEMS);


    return keys[
      Math.floor(
        Math.random() *
        keys.length
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


  // ====================================================
  // CLIENTE
  // ====================================================

  function createCustomer(
    characterKey,
    slot,
    total
  ) {

    const character =
      CHARACTERS[characterKey];


    const customer = {

      id:
        `customer-${++customerSequence}`,

      characterKey,

      character,

      slot,

      total,

      order:
        createRandomOrder(),

      errors: 0,

      timeLeft:
        CUSTOMER_TIME,

      state:
        "entering",

      mood:
        "idle",

      blinkTimer:
        null,

      blinkReturn:
        null,

      countdownTimer:
        null,

      reactionTimer:
        null,

      element:
        null,

      image:
        null,

      orderButton:
        null,

      timerElement:
        null

    };


    return customer;

  }


  // ====================================================
  // HTML DO CLIENTE
  // ====================================================

  function createCustomerElement(
    customer
  ) {

    const wrap =
      document.createElement("div");


    wrap.className =
      "cafe-customer-wrap";


    wrap.dataset.customerId =
      customer.id;


    wrap.classList.add(
      customer.total === 2
        ? "is-double"
        : "is-single"
    );


    wrap.classList.add(
      `slot-${customer.slot}`
    );


    const orderHTML =
      customer.order
        .map(key => {

          const item =
            ITEMS[key];


          return `

            <img
              src="${item.src}"
              alt="${item.name}"
              title="${item.name}"
              draggable="false"
            >

          `;

        })
        .join("");


    wrap.innerHTML = `

      <button
        class="cafe-order"
        type="button"
        aria-label="Atender pedido de ${customer.character.name}"
      >

        <span class="cafe-order-title">
          Pedido
        </span>

        <div class="cafe-order-items">
          ${orderHTML}
        </div>

        <span class="cafe-order-timer">

          ⏱️

          <strong>
            ${customer.timeLeft}
          </strong>s

        </span>

      </button>


      <img
        class="cafe-customer"
        src="${customer.character.idle}"
        alt="${customer.character.name}"
        draggable="false"
      >


      <div class="cafe-happy-hearts">
        ♡ ♡
      </div>

    `;


    customersContainer.appendChild(
      wrap
    );


    customer.element =
      wrap;

    customer.image =
      wrap.querySelector(
        ".cafe-customer"
      );

    customer.orderButton =
      wrap.querySelector(
        ".cafe-order"
      );

    customer.timerElement =
      wrap.querySelector(
        ".cafe-order-timer strong"
      );


    customer.orderButton
      .addEventListener(
        "click",
        event => {

          event.stopPropagation();

          selectCustomer(
            customer.id
          );

        }
      );


    return wrap;

  }


  // ====================================================
  // SELEÇÃO
  // ====================================================

  function selectCustomer(id) {

    const customer =
      customers.find(
        item =>
          item.id === id &&
          item.state === "waiting"
      );


    if (!customer) {

      return;

    }


    selectedCustomerId =
      customer.id;


    customers.forEach(item => {

      if (!item.element) {
        return;
      }


      item.element.classList.toggle(
        "selected",
        item.id ===
          selectedCustomerId
      );

    });


    renderTray();

  }


  function getSelectedCustomer() {

    return customers.find(
      customer =>
        customer.id ===
          selectedCustomerId &&
        customer.state ===
          "waiting"
    ) || null;

  }


  // ====================================================
  // PISCADA DO CLIENTE
  // ====================================================

  function clearCustomerBlink(
    customer
  ) {

    clearTimeout(
      customer.blinkTimer
    );

    clearTimeout(
      customer.blinkReturn
    );

  }


  function scheduleCustomerBlink(
    customer
  ) {

    clearCustomerBlink(
      customer
    );


    if (
      !cafeRunning ||
      customer.state !== "waiting" ||
      customer.mood !== "idle"
    ) {

      return;

    }


    customer.blinkTimer =
      setTimeout(() => {

        if (
          !cafeRunning ||
          customer.state !== "waiting" ||
          customer.mood !== "idle"
        ) {

          return;

        }


        customer.image.src =
          customer.character.blink;


        customer.blinkReturn =
          setTimeout(() => {

            if (
              customer.state !==
                "waiting" ||
              customer.mood !==
                "idle"
            ) {

              return;

            }


            customer.image.src =
              customer.character.idle;


            scheduleCustomerBlink(
              customer
            );

          }, 150);

      },
      2400 +
      Math.random() * 2600);

  }


  function customerIdle(
    customer
  ) {

    clearCustomerBlink(
      customer
    );


    customer.mood =
      "idle";


    customer.image.src =
      customer.character.idle;


    customer.element.classList.remove(
      "is-angry",
      "is-happy"
    );


    customer.element
      .querySelector(
        ".cafe-happy-hearts"
      )
      .classList.remove(
        "show"
      );


    scheduleCustomerBlink(
      customer
    );

  }


  function customerAngry(
    customer
  ) {

    clearCustomerBlink(
      customer
    );


    customer.mood =
      "angry";


    customer.image.src =
      customer.character.angry;


    customer.element.classList.remove(
      "is-happy"
    );


    customer.element.classList.add(
      "is-angry"
    );

  }


  function customerHappy(
    customer
  ) {

    clearCustomerBlink(
      customer
    );


    customer.mood =
      "happy";


    customer.image.src =
      customer.character.idle;


    customer.element.classList.remove(
      "is-angry"
    );


    customer.element.classList.add(
      "is-happy"
    );


    customer.element
      .querySelector(
        ".cafe-happy-hearts"
      )
      .classList.add(
        "show"
      );

  }


  // ====================================================
  // TIMER INDIVIDUAL
  // ====================================================

  function startCustomerTimer(
    customer
  ) {

    clearInterval(
      customer.countdownTimer
    );


    customer.countdownTimer =
      setInterval(() => {

        if (
          !cafeRunning ||
          customer.state !== "waiting"
        ) {

          clearInterval(
            customer.countdownTimer
          );

          return;

        }


        customer.timeLeft--;


        if (
          customer.timerElement
        ) {

          customer.timerElement
            .textContent =
              Math.max(
                customer.timeLeft,
                0
              );

        }


        if (
          customer.timeLeft <= 7
        ) {

          customer.orderButton
            .classList.add(
              "time-low"
            );

        }


        if (
          customer.timeLeft <= 0
        ) {

          clearInterval(
            customer.countdownTimer
          );


          customerLeavesAngry(
            customer,
            "Tempo esgotado! 💢"
          );

        }

      }, 1000);

  }


  // ====================================================
  // ENTRADA
  // ====================================================

  function enterCustomer(
    customer
  ) {

    createCustomerElement(
      customer
    );


    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        if (
          !cafeRunning ||
          !customer.element
        ) {

          return;

        }


        customer.element.classList.add(
          "arrived"
        );

      });

    });


    setTimeout(() => {

      if (
        !cafeRunning ||
        !customer.element
      ) {

        return;

      }


      customer.state =
        "waiting";


      customer.orderButton
        .classList.add(
          "show"
        );


      customerIdle(
        customer
      );


      startCustomerTimer(
        customer
      );


      /*
        Se só existe um cliente,
        ele já fica selecionado.

        Em dupla, o primeiro também
        começa selecionado para evitar
        travar a bandeja.
      */

      if (
        !getSelectedCustomer()
      ) {

        selectCustomer(
          customer.id
        );

      }

    }, 650);

  }


  // ====================================================
  // ONDA DE CLIENTES
  // ====================================================

  function startWave() {

    if (!cafeRunning) {

      return;

    }


    clearTimeout(
      nextWaveTimer
    );


    selectedCustomerId =
      null;

    trayItems = [];

    renderTray();


    /*
      Limpa clientes antigos que
      já terminaram.
    */

    customers.forEach(
      cleanupCustomerTimers
    );


    customers = [];


    customersContainer.innerHTML =
      "";


    const doubleWave =
      Math.random() <
        DOUBLE_CUSTOMER_CHANCE;


    if (doubleWave) {

      const first =
        createCustomer(
          "kuromi",
          1,
          2
        );


      const second =
        createCustomer(
          "pompompurin",
          2,
          2
        );


      customers.push(
        first,
        second
      );


      enterCustomer(
        first
      );


      setTimeout(() => {

        if (
          cafeRunning &&
          customers.includes(second)
        ) {

          enterCustomer(
            second
          );

        }

      }, 350);

    } else {

      const characterKeys =
        Object.keys(
          CHARACTERS
        );


      const characterKey =
        characterKeys[
          Math.floor(
            Math.random() *
            characterKeys.length
          )
        ];


      const customer =
        createCustomer(
          characterKey,
          1,
          1
        );


      customers.push(
        customer
      );


      enterCustomer(
        customer
      );

    }

  }


  // ====================================================
  // BANDEJA
  // ====================================================

  function addToTray(key) {

    const selected =
      getSelectedCustomer();


    if (!selected) {

      showFeedback(
        "Escolha um pedido primeiro ♡",
        "wrong"
      );

      return;

    }


    /*
      Como os pedidos desta versão
      possuem no máximo 2 itens.
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


    trayItems.push(
      key
    );


    renderTray();

  }


  function removeFromTray(
    index
  ) {

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
          document.createElement(
            "button"
          );


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

            removeFromTray(
              index
            );

          }
        );


        tray.appendChild(
          button
        );

      }
    );


    const selected =
      getSelectedCustomer();


    if (
      trayItems.length > 0 &&
      selected
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
  // COMPARAÇÃO
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

    clearTimeout(
      feedbackTimer
    );


    feedback.textContent =
      text;


    feedback.className =
      `cafe-feedback show ${type}`;


    feedbackTimer =
      setTimeout(() => {

        feedback.classList.remove(
          "show"
        );

      }, 1300);

  }


  // ====================================================
  // LIMPEZA DE TIMERS
  // ====================================================

  function cleanupCustomerTimers(
    customer
  ) {

    clearCustomerBlink(
      customer
    );


    clearInterval(
      customer.countdownTimer
    );


    clearTimeout(
      customer.reactionTimer
    );

  }


  // ====================================================
  // CLIENTE SAI
  // ====================================================

  function removeCustomer(
    customer
  ) {

    cleanupCustomerTimers(
      customer
    );


    if (
      selectedCustomerId ===
        customer.id
    ) {

      selectedCustomerId =
        null;


      trayItems = [];


      renderTray();

    }


    customer.state =
      "leaving";


    customer.orderButton
      ?.classList.remove(
        "show"
      );


    customer.element
      ?.classList.remove(
        "selected"
      );


    customer.element
      ?.classList.add(
        "leaving"
      );


    setTimeout(() => {

      customer.element
        ?.remove();


      customers =
        customers.filter(
          item =>
            item.id !==
              customer.id
        );


      /*
        Se ainda existe outro cliente,
        selecionamos automaticamente.
      */

      const waitingCustomer =
        customers.find(
          item =>
            item.state ===
              "waiting"
        );


      if (
        waitingCustomer &&
        !getSelectedCustomer()
      ) {

        selectCustomer(
          waitingCustomer.id
        );

      }


      /*
        Se todos foram embora,
        começa outra onda.
      */

      if (
        cafeRunning &&
        customers.length === 0
      ) {

        nextWaveTimer =
          setTimeout(
            startWave,
            700
          );

      }

    }, 550);

  }


  function customerLeavesAngry(
    customer,
    message
  ) {

    if (
      customer.state !== "waiting"
    ) {

      return;

    }


    customer.state =
      "reaction";


    clearInterval(
      customer.countdownTimer
    );


    customerAngry(
      customer
    );


    chefSad(
      1000
    );


    showFeedback(
      message,
      "wrong"
    );


    if (
      selectedCustomerId ===
        customer.id
    ) {

      trayItems = [];

      renderTray();

    }


    customer.reactionTimer =
      setTimeout(() => {

        if (!cafeRunning) {

          return;

        }


        removeCustomer(
          customer
        );

      }, 900);

  }


  // ====================================================
  // ENTREGA
  // ====================================================

  function deliverOrder() {

    const customer =
      getSelectedCustomer();


    if (
      !customer ||
      !trayItems.length
    ) {

      return;

    }


    const correct =
      arraysMatch(
        customer.order,
        trayItems
      );


    // ==================================================
    // ACERTO
    // ==================================================

    if (correct) {

      customer.state =
        "reaction";


      clearInterval(
        customer.countdownTimer
      );


      customer.orderButton
        .classList.remove(
          "show"
        );


      customerHappy(
        customer
      );


      chefHappy(
        1000
      );


      giveCoins(
        CORRECT_REWARD
      );


      showFeedback(
        `Pedido perfeito! +${CORRECT_REWARD} 🪙`,
        "correct"
      );


      trayItems = [];

      renderTray();


      customer.reactionTimer =
        setTimeout(() => {

          if (!cafeRunning) {

            return;

          }


          removeCustomer(
            customer
          );

        }, 1100);


      return;

    }


    // ==================================================
    // ERRO
    // ==================================================

    customer.errors++;


    trayItems = [];

    renderTray();


    chefSad(
      900
    );


    /*
      3º erro:
      cliente perde a paciência.
    */

    if (
      customer.errors >=
        MAX_ERRORS
    ) {

      customerLeavesAngry(
        customer,
        `${customer.character.name} perdeu a paciência! 💢`
      );


      return;

    }


    // ==================================================
    // 1º / 2º ERRO
    // ==================================================

    customer.mood =
      "angry";


    customerAngry(
      customer
    );


    const attemptsLeft =
      MAX_ERRORS -
      customer.errors;


    showFeedback(
      `Pedido errado! ${attemptsLeft} tentativa${attemptsLeft === 1 ? "" : "s"} restante${attemptsLeft === 1 ? "" : "s"} 💢`,
      "wrong"
    );


    customer.reactionTimer =
      setTimeout(() => {

        if (
          !cafeRunning ||
          customer.state !==
            "waiting"
        ) {

          return;

        }


        customerIdle(
          customer
        );

      }, 850);

  }


  // ====================================================
  // HOTSPOTS
  // ====================================================

  hotspots.forEach(
    button => {

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


          addToTray(
            key
          );

        }
      );

    }
  );


  deliverButton.addEventListener(
    "click",
    deliverOrder
  );


  // ====================================================
  // RESET
  // ====================================================

  function resetGame() {

    clearTimeout(
      nextWaveTimer
    );


    clearTimeout(
      feedbackTimer
    );


    customers.forEach(
      cleanupCustomerTimers
    );


    customers = [];


    selectedCustomerId =
      null;


    trayItems = [];


    customersContainer.innerHTML =
      "";


    feedback.className =
      "cafe-feedback";


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


    startWave();

  }


  // ====================================================
  // FECHAR
  // ====================================================

  function closeCafe() {

    cafeRunning = false;


    clearTimeout(
      nextWaveTimer
    );


    clearTimeout(
      feedbackTimer
    );


    customers.forEach(
      cleanupCustomerTimers
    );


    clearChefBlink();


    customers = [];


    selectedCustomerId =
      null;


    trayItems = [];


    customersContainer.innerHTML =
      "";


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
      startWave,

    getCustomers() {

      return customers.map(
        customer => ({
          id:
            customer.id,

          character:
            customer.characterKey,

          order:
            [...customer.order],

          errors:
            customer.errors,

          timeLeft:
            customer.timeLeft,

          state:
            customer.state
        })
      );

    },

    getTray() {

      return [
        ...trayItems
      ];

    },

    getSelectedCustomer() {

      return selectedCustomerId;

    }

  };


  updateCoins();

})();
