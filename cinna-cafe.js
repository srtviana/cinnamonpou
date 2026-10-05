// ======================================================
// CINNA CAFÉ ☕️🍰
// V7 — PARTIDA + RESULTADO + MULTICLIENTES
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

  // 2 minutos
  const ROUND_TIME = 120;

  // Tempo individual do cliente
  const CUSTOMER_TIME = 25;

  // 3º erro = cliente vai embora
  const MAX_ERRORS = 3;

  // Moedas por pedido correto
  const CORRECT_REWARD = 5;

  // 40% de chance de dupla
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


      <div class="cinna-cafe-topbar-right">

        <div
          id="cinna-cafe-round-timer"
          class="cinna-cafe-round-timer"
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


        <!-- ========================================= -->
        <!-- RESULTADO DA PARTIDA -->
        <!-- ========================================= -->

        <div
          id="cafe-results"
          class="cafe-results"
          aria-hidden="true"
        >

          <div class="cafe-results-card">

            <div class="cafe-results-icon">
              ☕
            </div>

            <h2>
              Café fechado!
            </h2>

            <p class="cafe-results-subtitle">
              Como foi o turno do Cinna?
            </p>


            <div
              id="cafe-results-stars"
              class="cafe-results-stars"
            >
              ⭐⭐⭐
            </div>


            <div class="cafe-results-stats">

              <div class="cafe-result-stat">

                <span>
                  🍰 Pedidos
                </span>

                <strong
                  id="cafe-result-orders"
                >
                  0
                </strong>

              </div>


              <div class="cafe-result-stat">

                <span>
                  😊 Atendidos
                </span>

                <strong
                  id="cafe-result-served"
                >
                  0
                </strong>

              </div>


              <div class="cafe-result-stat">

                <span>
                  😡 Perdidos
                </span>

                <strong
                  id="cafe-result-lost"
                >
                  0
                </strong>

              </div>


              <div class="cafe-result-stat">

                <span>
                  💢 Erros
                </span>

                <strong
                  id="cafe-result-errors"
                >
                  0
                </strong>

              </div>


              <div class="cafe-result-stat cafe-result-coins">

                <span>
                  🪙 Cinna Coins
                </span>

                <strong
                  id="cafe-result-coins"
                >
                  +0
                </strong>

              </div>

            </div>


            <div class="cafe-results-actions">

              <button
                id="cafe-play-again"
                class="cafe-result-button primary"
                type="button"
              >
                JOGAR DE NOVO ♡
              </button>


              <button
                id="cafe-result-exit"
                class="cafe-result-button secondary"
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

  const roundTimeElement =
    cafeOverlay.querySelector(
      "#cinna-cafe-round-time"
    );

  const results =
    cafeOverlay.querySelector(
      "#cafe-results"
    );

  const resultsStars =
    cafeOverlay.querySelector(
      "#cafe-results-stars"
    );

  const resultOrders =
    cafeOverlay.querySelector(
      "#cafe-result-orders"
    );

  const resultServed =
    cafeOverlay.querySelector(
      "#cafe-result-served"
    );

  const resultLost =
    cafeOverlay.querySelector(
      "#cafe-result-lost"
    );

  const resultErrors =
    cafeOverlay.querySelector(
      "#cafe-result-errors"
    );

  const resultCoins =
    cafeOverlay.querySelector(
      "#cafe-result-coins"
    );

  const playAgainButton =
    cafeOverlay.querySelector(
      "#cafe-play-again"
    );

  const resultExitButton =
    cafeOverlay.querySelector(
      "#cafe-result-exit"
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

  let roundActive = false;

  let roundEnding = false;

  let roundTimeLeft =
    ROUND_TIME;

  let roundTimer = null;

  let trayItems = [];

  let customers = [];

  let selectedCustomerId = null;

  let customerSequence = 0;

  let chefMood = "idle";

  let chefBlinkTimer = null;

  let chefBlinkReturn = null;

  let nextWaveTimer = null;

  let feedbackTimer = null;

  let lastSoloCharacterKey = null;


  // ====================================================
  // ESTATÍSTICAS DA PARTIDA
  // ====================================================

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


    roundStats.coins +=
      amount;


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
  // SORTEIO DOS PERSONAGENS
  // ====================================================

  function getCharacterKeys() {

    return Object.keys(
      CHARACTERS
    );

  }


  function chooseSoloCharacter() {

    const allKeys =
      getCharacterKeys();


    if (
      allKeys.length === 0
    ) {

      return null;

    }


    if (
      allKeys.length === 1
    ) {

      lastSoloCharacterKey =
        allKeys[0];

      return allKeys[0];

    }


    const availableKeys =
      allKeys.filter(
        key =>
          key !==
          lastSoloCharacterKey
      );


    const pool =
      availableKeys.length
        ? availableKeys
        : allKeys;


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

    const allKeys =
      getCharacterKeys();


    if (
      allKeys.length < 2
    ) {

      return [];

    }


    const shuffled =
      [...allKeys];


    for (
      let i =
        shuffled.length - 1;

      i > 0;

      i--
    ) {

      const j =
        Math.floor(
          Math.random() *
          (i + 1)
        );


      [
        shuffled[i],
        shuffled[j]
      ] = [
        shuffled[j],
        shuffled[i]
      ];

    }


    return shuffled.slice(
      0,
      2
    );

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
      CHARACTERS[
        characterKey
      ];


    return {

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

  }


  // ====================================================
  // HTML DO CLIENTE
  // ====================================================

  function createCustomerElement(
    customer
  ) {

    const wrap =
      document.createElement(
        "div"
      );


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
          item.state ===
            "waiting"
      );


    if (!customer) {

      return;

    }


    selectedCustomerId =
      customer.id;


    customers.forEach(
      item => {

        if (!item.element) {

          return;

        }


        item.element.classList.toggle(
          "selected",
          item.id ===
            selectedCustomerId
        );

      }
    );


    renderTray();

  }


  function getSelectedCustomer() {

    return (
      customers.find(
        customer =>
          customer.id ===
            selectedCustomerId &&
          customer.state ===
            "waiting"
      ) || null
    );

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
      customer.state !==
        "waiting" ||
      customer.mood !==
        "idle"
    ) {

      return;

    }


    customer.blinkTimer =
      setTimeout(() => {

        if (
          !cafeRunning ||
          customer.state !==
            "waiting" ||
          customer.mood !==
            "idle"
        ) {

          return;

        }


        customer.image.src =
          customer.character
            .blink;


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
              customer.character
                .idle;


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
      customer.character
        .idle;


    customer.element
      .classList.remove(
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
      customer.character
        .angry;


    customer.element
      .classList.remove(
        "is-happy"
      );


    customer.element
      .classList.add(
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
      customer.character
        .idle;


    customer.element
      .classList.remove(
        "is-angry"
      );


    customer.element
      .classList.add(
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
          customer.state !==
            "waiting"
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


        customer.element
          .classList.add(
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
  // ONDA DE CLIENTES
  // ====================================================

  function startWave() {

    /*
      Se o tempo geral acabou,
      nenhum cliente novo entra.
    */

    if (
      !cafeRunning ||
      !roundActive
    ) {

      checkRoundFinished();

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
      characterKeys.length === 0
    ) {

      return;

    }


    const canHaveDouble =
      characterKeys.length >= 2;


    const doubleWave =
      canHaveDouble &&
      Math.random() <
        DOUBLE_CUSTOMER_CHANCE;


    // ==================================================
    // DUPLA
    // ==================================================

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


      /*
        Cada cliente que entra conta
        como um pedido criado.
      */

      roundStats.orders += 2;


      enterCustomer(
        first
