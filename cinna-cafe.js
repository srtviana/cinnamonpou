// ======================================================
// CINNA CAFÉ ☕️🍰
// V7 — PARTIDA DE 2 MIN + RESULTADO + CLIENTES INDEPENDENTES
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

  const ROUND_TIME = 120;

  const CUSTOMER_TIME = 25;

  const MAX_ERRORS = 3;

  const CORRECT_REWARD = 5;

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


      <div
        class="cinna-cafe-round-timer"
        id="cinna-cafe-round-timer"
      >
        ⏱️

        <strong id="cinna-cafe-round-time">
          2:00
        </strong>
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


        <!-- RESULTADO -->

        <div
          id="cinna-cafe-results"
          class="cinna-cafe-results"
        >

          <div class="cinna-cafe-results-card">

            <div class="cinna-cafe-results-icon">
              ☕
            </div>

            <h2>
              Café fechado!
            </h2>

            <p>
              Resultado do turno do Cinna ♡
            </p>

            <div
              id="cinna-cafe-results-stars"
              class="cinna-cafe-results-stars"
            >
              ⭐⭐⭐
            </div>


            <div class="cinna-cafe-results-grid">

              <div>
                <span>
                  🍰 Pedidos
                </span>

                <strong id="cinna-cafe-result-orders">
                  0
                </strong>
              </div>


              <div>
                <span>
                  😊 Atendidos
                </span>

                <strong id="cinna-cafe-result-served">
                  0
                </strong>
              </div>


              <div>
                <span>
                  😡 Perdidos
                </span>

                <strong id="cinna-cafe-result-lost">
                  0
                </strong>
              </div>


              <div>
                <span>
                  💢 Erros
                </span>

                <strong id="cinna-cafe-result-errors">
                  0
                </strong>
              </div>


              <div class="coins">

                <span>
                  🪙 Cinna Coins
                </span>

                <strong id="cinna-cafe-result-coins">
                  +0
                </strong>

              </div>

            </div>


            <div class="cinna-cafe-results-buttons">

              <button
                id="cinna-cafe-play-again"
                type="button"
              >
                JOGAR DE NOVO ♡
              </button>

              <button
                id="cinna-cafe-result-exit"
                type="button"
              >
                SAIR
              </button>

            </div>

          </div>

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

  const roundTimerBox =
    cafeOverlay.querySelector(
      "#cinna-cafe-round-timer"
    );

  const roundTimeText =
    cafeOverlay.querySelector(
      "#cinna-cafe-round-time"
    );

  const resultsScreen =
    cafeOverlay.querySelector(
      "#cinna-cafe-results"
    );

  const resultStars =
    cafeOverlay.querySelector(
      "#cinna-cafe-results-stars"
    );

  const resultOrders =
    cafeOverlay.querySelector(
      "#cinna-cafe-result-orders"
    );

  const resultServed =
    cafeOverlay.querySelector(
      "#cinna-cafe-result-served"
    );

  const resultLost =
    cafeOverlay.querySelector(
      "#cinna-cafe-result-lost"
    );

  const resultErrors =
    cafeOverlay.querySelector(
      "#cinna-cafe-result-errors"
    );

  const resultCoins =
    cafeOverlay.querySelector(
      "#cinna-cafe-result-coins"
    );

  const playAgainButton =
    cafeOverlay.querySelector(
      "#cinna-cafe-play-again"
    );

  const resultExitButton =
    cafeOverlay.querySelector(
      "#cinna-cafe-result-exit"
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

  let roundActive = false;

  let roundFinished = false;

  let roundTimeLeft =
    ROUND_TIME;

  let roundTimer = null;

  let lastSoloCharacterKey = null;


  let roundStats = {
    orders: 0,
    served: 0,
    lost: 0,
    errors: 0,
    coins: 0
  };


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


    if (
      roundActive ||
      (
        !roundActive &&
        !roundFinished
      )
    ) {

      roundStats.coins +=
        amount;

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
  // PISCADA
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
  // CLIENTES INDEPENDENTES
  // ====================================================

  function getCharacterKeys() {

    return Object.keys(
      CHARACTERS
    );

  }


  function chooseSoloCharacter() {

    const keys =
      getCharacterKeys();


    if (!keys.length) {

      return null;

    }


    if (keys.length === 1) {

      lastSoloCharacterKey =
        keys[0];

      return keys[0];

    }


    const pool =
      keys.filter(
        key =>
          key !==
          lastSoloCharacterKey
      );


    const chosen =
      pool[
        Math.floor(
          Math.random() *
          pool.length
        )
      ];


    lastSoloCharacterKey =
      chosen;


    return chosen;

  }


  function chooseDoubleCharacters() {

    const keys =
      [...getCharacterKeys()];


    for (
      let i =
        keys.length - 1;

      i > 0;

      i--
    ) {

      const j =
        Math.floor(
          Math.random() *
          (i + 1)
        );


      [
        keys[i],
        keys[j]
      ] = [
        keys[j],
        keys[i]
      ];

    }


    return keys.slice(
      0,
      2
    );

  }


  // ====================================================
  // ONDA
  // ====================================================

  function startWave() {

    if (
      !cafeRunning ||
      !roundActive
    ) {

      checkRoundEnd();

      return;

    }


    clearTimeout(
      nextWaveTimer
    );


    selectedCustomerId =
      null;


    trayItems = [];


    renderTray();


    customers.forEach(
      cleanupCustomerTimers
    );


    customers = [];


    customersContainer.innerHTML =
      "";


    const characterKeys =
      getCharacterKeys();


    if (
      !characterKeys.length
    ) {

      return;

    }


    const doubleWave =
      characterKeys.length >= 2 &&
      Math.random() <
        DOUBLE_CUSTOMER_CHANCE;


    if (doubleWave) {

      const chosen =
        chooseDoubleCharacters();


      const first =
        createCustomer(
          chosen[0],
          1,
          2
        );


      const second =
        createCustomer(
          chosen[1],
          2,
          2
        );


      customers.push(
        first,
        second
      );


      roundStats.orders += 2;


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


      return;

    }


    const characterKey =
      chooseSoloCharacter();


    if (!characterKey) {

      return;

    }


    const customer =
      createCustomer(
        characterKey,
        1,
        1
      );


    customers.push(
      customer
    );


    roundStats.orders++;


    enterCustomer(
      customer
    );

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


      if (
        cafeRunning &&
        customers.length === 0
      ) {

        if (roundActive) {

          nextWaveTimer =
            setTimeout(
              startWave,
              700
            );

        } else {

          checkRoundEnd();

        }

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


    roundStats.lost++;


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


      roundStats.served++;


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


    roundStats.errors++;


    trayItems = [];


    renderTray();


    chefSad(
      900
    );


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
  // PARTIDA
  // ====================================================

  function formatRoundTime(
    seconds
  ) {

    const minutes =
      Math.floor(
        seconds / 60
      );


    const secs =
      seconds % 60;


    return (
      `${minutes}:` +
      `${String(secs).padStart(2, "0")}`
    );

  }


  function renderRoundTime() {

    roundTimeText.textContent =
      formatRoundTime(
        Math.max(
          roundTimeLeft,
          0
        )
      );


    roundTimerBox
      .classList.toggle(
        "time-low",
        roundTimeLeft <= 15 &&
        roundTimeLeft > 0
      );

  }


  function startRoundTimer() {

    clearInterval(
      roundTimer
    );


    roundTimeLeft =
      ROUND_TIME;


    roundActive = true;

    roundFinished = false;


    renderRoundTime();


    roundTimer =
      setInterval(() => {

        if (
          !cafeRunning ||
          !roundActive
        ) {

          clearInterval(
            roundTimer
          );

          return;

        }


        roundTimeLeft--;


        renderRoundTime();


        if (
          roundTimeLeft <= 0
        ) {

          roundTimeLeft = 0;

          roundActive = false;


          clearInterval(
            roundTimer
          );


          clearTimeout(
            nextWaveTimer
          );


          renderRoundTime();


          showFeedback(
            "Café fechando! Termine os pedidos ☕",
            "correct"
          );


          checkRoundEnd();

        }

      }, 1000);

  }


  // ====================================================
  // ESTRELAS
  // ====================================================

  function calculateStars() {

    if (
      roundStats.served > 0 &&
      roundStats.lost === 0 &&
      roundStats.errors <= 2
    ) {

      return 3;

    }


    if (
      roundStats.served > 0 &&
      roundStats.lost <= 1
    ) {

      return 2;

    }


    return 1;

  }


  // ====================================================
  // FIM DA PARTIDA
  // ====================================================

  function checkRoundEnd() {

    if (
      roundActive ||
      roundFinished ||
      !cafeRunning ||
      customers.length > 0
    ) {

      return;

    }


    finishRound();

  }


  function finishRound() {

    if (
      roundFinished ||
      !cafeRunning
    ) {

      return;

    }


    roundFinished = true;


    clearInterval(
      roundTimer
    );


    clearTimeout(
      nextWaveTimer
    );


    selectedCustomerId =
      null;


    trayItems = [];


    renderTray();


    const stars =
      calculateStars();


    resultStars.textContent =
      "⭐".repeat(stars) +
      "☆".repeat(
        3 - stars
      );


    resultOrders.textContent =
      roundStats.orders;


    resultServed.textContent =
      roundStats.served;


    resultLost.textContent =
      roundStats.lost;


    resultErrors.textContent =
      roundStats.errors;


    resultCoins.textContent =
      `+${roundStats.coins}`;


    resultsScreen.classList.add(
      "show"
    );


    if (
      stars === 3
    ) {

      setChefMood(
        "happy"
      );

    } else if (
      stars === 1
    ) {

      setChefMood(
        "sad"
      );

    } else {

      setChefMood(
        "idle"
      );

    }

  }


  // ====================================================
  // NOVA PARTIDA
  // ====================================================

  function startNewRound() {

    resetGame();


    roundStats = {
      orders: 0,
      served: 0,
      lost: 0,
      errors: 0,
      coins: 0
    };


    resultsScreen.classList.remove(
      "show"
    );


    startRoundTimer();


    startWave();

  }


  // ====================================================
  // RESET
  // ====================================================

  function resetGame() {

    clearInterval(
      roundTimer
    );


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


    startNewRound();

  }


  // ====================================================
  // FECHAR
  // ====================================================

  function closeCafe() {

    cafeRunning = false;

    roundActive = false;

    roundFinished = false;


    clearInterval(
      roundTimer
    );


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


    resultsScreen.classList.remove(
      "show"
    );


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


  playAgainButton.addEventListener(
    "click",
    startNewRound
  );


  resultExitButton.addEventListener(
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

    },


    getRoundTime() {

      return roundTimeLeft;

    },


    getRoundStats() {

      return {
        ...roundStats
      };

    }

  };


  updateCoins();

})();
