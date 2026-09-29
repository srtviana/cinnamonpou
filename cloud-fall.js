// ======================================================
// CINNA FALL ☁️🪙
// ======================================================
//
// CONTROLES
//
// 📱 Incline o celular
// 👆 ou arraste com o dedo
//
// AJUSTES DESTA VERSÃO:
//
// - movimento suave preservado
// - sem efeito de "ímã"
// - nuvens mais espaçadas
// - distância mínima real entre nuvens
// - colisão mais justa
// - orelhas não contam totalmente na hitbox
// - beirada da nuvem não mata
// - dificuldade possui limite
//
// ======================================================

(() => {

  // ====================================================
  // ELEMENTOS PRINCIPAIS
  // ====================================================

  const room =
    document.querySelector(".room");

  const gameHub =
    document.querySelector("#game-hub");


  if (!room || !gameHub) {

    console.warn(
      "Cinna Fall: elementos principais não encontrados."
    );

    return;

  }


  // ====================================================
  // EVITA DUPLICAR A TELA
  // ====================================================

  const oldScreen =
    document.querySelector(
      ".cloud-fall-screen"
    );


  if (oldScreen) {
    oldScreen.remove();
  }


  // ====================================================
  // ENCONTRA CARD
  // ====================================================

  const gameCards = [
    ...gameHub.querySelectorAll(
      ".game-card"
    )
  ];


  const cloudCard =
    gameCards.find(card => {

      const name =
        card.querySelector(
          ".game-card-name"
        );


      if (!name) {
        return false;
      }


      const text =
        name.textContent.trim();


      return (
        text === "Cloud Jump" ||
        text === "Cinna Fall"
      );

    });


  if (!cloudCard) {

    console.warn(
      "Cinna Fall: card não encontrado."
    );

    return;

  }


  // ====================================================
  // CONFIGURA O CARD
  // ====================================================

  cloudCard.disabled = false;

  cloudCard.classList.remove(
    "locked"
  );

  cloudCard.classList.add(
    "available"
  );

  cloudCard.id =
    "cloud-fall-button";


  const cardIcon =
    cloudCard.querySelector(
      ".game-card-icon"
    );

  const cardName =
    cloudCard.querySelector(
      ".game-card-name"
    );

  const cardDescription =
    cloudCard.querySelector(
      ".game-card-description"
    );

  const cardStatus =
    cloudCard.querySelector(
      ".game-card-status"
    );


  if (cardIcon) {
    cardIcon.textContent = "☁️";
  }


  if (cardName) {
    cardName.textContent =
      "Cinna Fall";
  }


  if (cardDescription) {

    cardDescription.textContent =
      "Incline o celular, desvie das nuvens e pegue moedas.";

  }


  if (cardStatus) {
    cardStatus.textContent =
      "JOGAR";
  }


  // ====================================================
  // CRIA TELA DO JOGO
  // ====================================================

  const gameScreen =
    document.createElement(
      "section"
    );


  gameScreen.className =
    "cloud-fall-screen";


  gameScreen.innerHTML = `

    <div class="cloud-fall-topbar">

      <div class="cloud-fall-stat">

        🪙

        <strong id="cloud-fall-coins">
          0
        </strong>

      </div>


      <div class="cloud-fall-title">

        Cinna Fall

      </div>


      <div class="cloud-fall-stat">

        ☁️

        <strong id="cloud-fall-score">
          0
        </strong>

      </div>

    </div>


    <div
      id="cloud-fall-board"
      class="cloud-fall-board"
    >

      <img
        id="cloud-fall-cinna"
        class="cloud-fall-cinna"
        src="assets/sprites/cinna-idle-1.PNG"
        alt="Cinna"
      >


      <!-- INÍCIO -->

      <div
        id="cloud-fall-start"
        class="cloud-fall-overlay"
      >

        <div class="cloud-fall-card">

          <div class="cloud-fall-big-icon">
            ☁️
          </div>

          <h3>
            Cinna Fall
          </h3>

          <p>

            Segure o celular do jeito que
            for confortável.

            <br><br>

            Ao começar, essa posição será
            considerada o centro.

            <br><br>

            Incline para a esquerda ou
            direita para mover o Cinna.

            <br><br>

            Desvie das nuvens e pegue
            Cinna Coins! 🪙

          </p>

          <button
            id="cloud-fall-start-button"
            class="cloud-fall-primary"
            type="button"
          >

            ATIVAR MOVIMENTO E JOGAR

          </button>

        </div>

      </div>


      <!-- RESULTADO -->

      <div
        id="cloud-fall-result-overlay"
        class="cloud-fall-overlay"
        hidden
      >

        <div class="cloud-fall-card">

          <div class="cloud-fall-big-icon">
            😵‍💫
          </div>

          <h3>
            Fim de jogo!
          </h3>

          <p
            id="cloud-fall-result"
            class="cloud-fall-result"
          ></p>

          <p
            id="cloud-fall-reward"
            class="cloud-fall-reward"
          ></p>


          <div class="cloud-fall-result-buttons">

            <button
              id="cloud-fall-replay"
              class="cloud-fall-primary"
              type="button"
            >

              JOGAR DE NOVO

            </button>


            <button
              id="cloud-fall-back"
              class="cloud-fall-secondary"
              type="button"
            >

              VOLTAR

            </button>

          </div>

        </div>

      </div>

    </div>


    <button
      id="cloud-fall-exit"
      class="cloud-fall-exit"
      type="button"
    >

      ← Voltar aos jogos

    </button>

  `;


  room.appendChild(
    gameScreen
  );


  // ====================================================
  // REFERÊNCIAS
  // ====================================================

  const board =
    gameScreen.querySelector(
      "#cloud-fall-board"
    );

  const cinna =
    gameScreen.querySelector(
      "#cloud-fall-cinna"
    );

  const coinDisplay =
    gameScreen.querySelector(
      "#cloud-fall-coins"
    );

  const scoreDisplay =
    gameScreen.querySelector(
      "#cloud-fall-score"
    );

  const startOverlay =
    gameScreen.querySelector(
      "#cloud-fall-start"
    );

  const resultOverlay =
    gameScreen.querySelector(
      "#cloud-fall-result-overlay"
    );

  const resultText =
    gameScreen.querySelector(
      "#cloud-fall-result"
    );

  const rewardText =
    gameScreen.querySelector(
      "#cloud-fall-reward"
    );

  const startButton =
    gameScreen.querySelector(
      "#cloud-fall-start-button"
    );

  const replayButton =
    gameScreen.querySelector(
      "#cloud-fall-replay"
    );

  const backButton =
    gameScreen.querySelector(
      "#cloud-fall-back"
    );

  const exitButton =
    gameScreen.querySelector(
      "#cloud-fall-exit"
    );


  // ====================================================
  // ESTADO
  // ====================================================

  let running = false;

  let animationFrame = null;

  let lastTime = 0;

  let score = 0;

  let runCoins = 0;

  let survivalTime = 0;

  let difficulty = 1;

  let cloudTimer = 0;

  let coinTimer = 0;


  const objects = [];


  // ====================================================
  // MOVIMENTO
  // ====================================================

  let playerX = 0;

  let playerVelocityX = 0;

  let tiltInput = 0;


  // ====================================================
  // TOQUE
  // ====================================================

  let dragging = false;

  let dragTargetX = 0;


  // ====================================================
  // SENSOR
  // ====================================================

  let orientationEnabled =
    false;

  let neutralTilt =
    null;

  let filteredTilt =
    null;

  let calibrationSamples =
    [];


  // ====================================================
  // CONFIGURAÇÕES DO SENSOR
  // ====================================================

  const CALIBRATION_SAMPLES =
    16;


  const TILT_DEAD_ZONE =
    2.5;


  const MAX_TILT =
    16;


  const MAX_PLAYER_SPEED =
    235;


  const MOVEMENT_RESPONSE =
    11;


  const BRAKE_RESPONSE =
    13;


  const SENSOR_FILTER =
    0.30;


  // ====================================================
  // CONFIGURAÇÕES DAS NUVENS
  // ====================================================

  /*
    Distância vertical mínima.

    Mesmo que o cronômetro queira criar
    outra nuvem, ela só nasce depois que
    a anterior se afastar o suficiente.
  */

  const MIN_CLOUD_GAP =
    115;


  /*
    Intervalo inicial entre tentativas
    de criar nuvem.
  */

  const CLOUD_START_INTERVAL =
    1.22;


  /*
    Nunca cria nuvens mais rapidamente
    que esse intervalo.
  */

  const CLOUD_MIN_INTERVAL =
    0.78;


  // ====================================================
  // UTILIDADES
  // ====================================================

  function clamp(
    value,
    minimum,
    maximum
  ) {

    return Math.max(
      minimum,
      Math.min(
        maximum,
        value
      )
    );

  }


  function clearObjects() {

    while (
      objects.length
    ) {

      const object =
        objects.pop();


      if (object.element) {
        object.element.remove();
      }

    }

  }


  // ====================================================
  // ORIENTAÇÃO DA TELA
  // ====================================================

  function getScreenAngle() {

    if (
      window.screen &&
      window.screen.orientation &&
      typeof window.screen.orientation.angle ===
        "number"
    ) {

      return (
        (
          window.screen.orientation.angle %
          360
        ) +
        360
      ) % 360;

    }


    if (
      typeof window.orientation ===
      "number"
    ) {

      return (
        (
          window.orientation %
          360
        ) +
        360
      ) % 360;

    }


    return 0;

  }


  // ====================================================
  // INCLINAÇÃO LATERAL
  // ====================================================

  function getLateralTilt(
    event
  ) {

    const gamma =
      Number(
        event.gamma
      );


    const beta =
      Number(
        event.beta
      );


    const angle =
      getScreenAngle();


    if (angle === 0) {
      return gamma;
    }


    if (angle === 180) {
      return -gamma;
    }


    if (angle === 90) {
      return beta;
    }


    if (angle === 270) {
      return -beta;
    }


    return gamma;

  }


  // ====================================================
  // RESET SENSOR
  // ====================================================

  function resetSensorCalibration() {

    neutralTilt =
      null;

    filteredTilt =
      null;

    calibrationSamples =
      [];

    tiltInput =
      0;

    playerVelocityX =
      0;

  }


  // ====================================================
  // SENSOR
  // ====================================================

  function handleOrientation(
    event
  ) {

    if (!running) {
      return;
    }


    const rawTilt =
      getLateralTilt(
        event
      );


    if (
      !Number.isFinite(
        rawTilt
      )
    ) {
      return;
    }


    // ==================================================
    // CALIBRAÇÃO
    // ==================================================

    if (
      neutralTilt ===
      null
    ) {

      calibrationSamples.push(
        rawTilt
      );


      tiltInput =
        0;

      playerVelocityX =
        0;


      if (
        calibrationSamples.length <
        CALIBRATION_SAMPLES
      ) {

        return;

      }


      const total =
        calibrationSamples.reduce(

          (
            sum,
            value
          ) =>

            sum + value,

          0

        );


      neutralTilt =
        total /
        calibrationSamples.length;


      filteredTilt =
        neutralTilt;


      calibrationSamples =
        [];


      return;

    }


    // ==================================================
    // FILTRO
    // ==================================================

    if (
      filteredTilt ===
      null
    ) {

      filteredTilt =
        rawTilt;

    }


    filteredTilt +=

      (
        rawTilt -
        filteredTilt
      )

      *

      SENSOR_FILTER;


    // ==================================================
    // INCLINAÇÃO RELATIVA
    // ==================================================

    let relativeTilt =

      filteredTilt -
      neutralTilt;


    relativeTilt =
      clamp(

        relativeTilt,

        -MAX_TILT,

        MAX_TILT

      );


    const absoluteTilt =
      Math.abs(
        relativeTilt
      );


    // ==================================================
    // ZONA MORTA
    // ==================================================

    if (
      absoluteTilt <=
      TILT_DEAD_ZONE
    ) {

      tiltInput =
        0;

      return;

    }


    // ==================================================
    // FORÇA
    // ==================================================

    const usableTilt =

      absoluteTilt -
      TILT_DEAD_ZONE;


    const usableRange =

      MAX_TILT -
      TILT_DEAD_ZONE;


    let strength =

      usableTilt /
      usableRange;


    strength =
      clamp(
        strength,
        0,
        1
      );


    strength =
      Math.pow(
        strength,
        1.15
      );


    tiltInput =

      Math.sign(
        relativeTilt
      )

      *

      strength;

  }


  // ====================================================
  // PERMISSÃO
  // ====================================================

  async function enableOrientation() {

    try {

      if (
        typeof DeviceOrientationEvent ===
        "undefined"
      ) {

        console.warn(
          "Sensor não disponível."
        );

        return false;

      }


      if (
        typeof DeviceOrientationEvent
          .requestPermission ===
        "function"
      ) {

        const permission =
          await DeviceOrientationEvent
            .requestPermission();


        if (
          permission !==
          "granted"
        ) {

          console.warn(
            "Permissão do sensor negada."
          );

          return false;

        }

      }


      if (
        !orientationEnabled
      ) {

        window.addEventListener(

          "deviceorientation",

          handleOrientation,

          true

        );


        orientationEnabled =
          true;

      }


      return true;

    }

    catch (error) {

      console.warn(
        "Erro no sensor:",
        error
      );

      return false;

    }

  }


  // ====================================================
  // CONTROLE PELO DEDO
  // ====================================================

  function moveToPointer(
    event
  ) {

    const rect =
      board.getBoundingClientRect();


    dragTargetX =
      clamp(

        event.clientX -
        rect.left,

        40,

        rect.width -
        40

      );

  }


  board.addEventListener(

    "pointerdown",

    event => {

      if (!running) {
        return;
      }


      dragging =
        true;


      playerVelocityX =
        0;


      moveToPointer(
        event
      );

    }

  );


  board.addEventListener(

    "pointermove",

    event => {

      if (
        !running ||
        !dragging
      ) {

        return;

      }


      moveToPointer(
        event
      );

    }

  );


  window.addEventListener(

    "pointerup",

    () => {

      dragging =
        false;

    }

  );


  window.addEventListener(

    "pointercancel",

    () => {

      dragging =
        false;

    }

  );


  // ====================================================
  // ATUALIZA MOVIMENTO
  // ====================================================

  function updatePlayerPosition(
    delta
  ) {

    const boardRect =
      board.getBoundingClientRect();


    const minimumX =
      40;


    const maximumX =
      boardRect.width -
      40;


    // ==================================================
    // DEDO
    // ==================================================

    if (dragging) {

      playerVelocityX =
        0;


      const touchResponse =

        1 -
        Math.exp(
          -18 *
          delta
        );


      playerX +=

        (
          dragTargetX -
          playerX
        )

        *

        touchResponse;

    }


    // ==================================================
    // SENSOR
    // ==================================================

    else {

      const targetVelocity =

        tiltInput *
        MAX_PLAYER_SPEED;


      const response =

        Math.abs(
          targetVelocity
        ) < 1

          ? BRAKE_RESPONSE

          : MOVEMENT_RESPONSE;


      const velocityBlend =

        1 -

        Math.exp(
          -response *
          delta
        );


      playerVelocityX +=

        (
          targetVelocity -
          playerVelocityX
        )

        *

        velocityBlend;


      if (
        tiltInput === 0 &&
        Math.abs(
          playerVelocityX
        ) < 1.5
      ) {

        playerVelocityX =
          0;

      }


      playerX +=

        playerVelocityX *
        delta;

    }


    // ==================================================
    // LIMITES
    // ==================================================

    if (
      playerX <=
      minimumX
    ) {

      playerX =
        minimumX;


      if (
        playerVelocityX <
        0
      ) {

        playerVelocityX =
          0;

      }

    }


    if (
      playerX >=
      maximumX
    ) {

      playerX =
        maximumX;


      if (
        playerVelocityX >
        0
      ) {

        playerVelocityX =
          0;

      }

    }


    cinna.style.left =
      `${playerX}px`;

  }


  // ====================================================
  // ABRIR
  // ====================================================

  function openGame() {

    if (
      typeof closeStarGame ===
      "function"
    ) {

      closeStarGame();

    }


    room.classList.remove(
      "star-game-open"
    );


    room.classList.add(
      "cloud-fall-open"
    );


    resetGame();

  }


  // ====================================================
  // FECHAR
  // ====================================================

  function closeGame() {

    stopGame();

    clearObjects();


    room.classList.remove(
      "cloud-fall-open"
    );


    startOverlay.hidden =
      false;


    resultOverlay.hidden =
      true;

  }


  // ====================================================
  // RESET
  // ====================================================

  function resetGame() {

    stopGame();

    clearObjects();


    score =
      0;

    runCoins =
      0;

    survivalTime =
      0;

    difficulty =
      1;

    cloudTimer =
      0;

    coinTimer =
      0;

    lastTime =
      0;


    coinDisplay.textContent =
      "0";


    scoreDisplay.textContent =
      "0";


    startOverlay.hidden =
      false;


    resultOverlay.hidden =
      true;


    dragging =
      false;


    resetSensorCalibration();


    requestAnimationFrame(

      () => {

        const boardRect =
          board.getBoundingClientRect();


        playerX =
          boardRect.width /
          2;


        dragTargetX =
          playerX;


        cinna.style.left =
          `${playerX}px`;

      }

    );

  }


  // ====================================================
  // DISTÂNCIA ENTRE NUVENS
  // ====================================================

  function canSpawnCloud() {

    const boardRect =
      board.getBoundingClientRect();


    const spawnY =
      boardRect.height +
      45;


    /*
      Procura todas as nuvens existentes.

      Se alguma ainda estiver muito perto
      da região onde a próxima vai nascer,
      esperamos mais um pouco.
    */

    const clouds =
      objects.filter(

        object =>
          object.type ===
          "cloud"

      );


    if (
      clouds.length ===
      0
    ) {

      return true;

    }


    const nearestCloud =
      clouds.reduce(

        (
          nearest,
          cloud
        ) => {

          if (!nearest) {
            return cloud;
          }


          return cloud.y >
            nearest.y
              ? cloud
              : nearest;

        },

        null

      );


    if (!nearestCloud) {
      return true;
    }


    const distance =

      spawnY -
      nearestCloud.y;


    return (
      distance >=
      MIN_CLOUD_GAP
    );

  }


  // ====================================================
  // NUVEM
  // ====================================================

  function spawnCloud() {

    if (
      !canSpawnCloud()
    ) {

      return false;

    }


    const boardRect =
      board.getBoundingClientRect();


    const width =

      58 +

      Math.random() *
      38;


    const element =
      document.createElement(
        "div"
      );


    element.className =
      "fall-cloud";


    element.style.width =
      `${width}px`;


    const maximumX =
      Math.max(

        0,

        boardRect.width -
        width

      );


    const x =

      Math.random() *
      maximumX;


    element.style.left =
      `${x}px`;


    board.appendChild(
      element
    );


    objects.push({

      type:
        "cloud",

      element,

      x,

      y:
        boardRect.height +
        45,

      width,

      height:
        55

    });


    return true;

  }


  // ====================================================
  // MOEDA
  // ====================================================

  function spawnCoin() {

    const boardRect =
      board.getBoundingClientRect();


    const element =
      document.createElement(
        "div"
      );


    element.className =
      "fall-coin";


    element.textContent =
      "🪙";


    const size =
      36;


    const availableWidth =
      Math.max(

        0,

        boardRect.width -
        size -
        20

      );


    const x =

      10 +

      Math.random() *
      availableWidth;


    element.style.left =
      `${x}px`;


    board.appendChild(
      element
    );


    objects.push({

      type:
        "coin",

      element,

      x,

      y:
        boardRect.height +
        30,

      width:
        size,

      height:
        size

    });

  }


  // ====================================================
  // COLISÃO
  // ====================================================

  function intersects(
    first,
    second
  ) {

    return !(

      first.right <
      second.left

      ||

      first.left >
      second.right

      ||

      first.bottom <
      second.top

      ||

      first.top >
      second.bottom

    );

  }


  // ====================================================
  // HITBOX DO CINNA
  // ====================================================

  function getPlayerHitbox() {

    const rect =
      cinna.getBoundingClientRect();


    /*
      Hitbox propositalmente menor.

      As pontas das orelhas não matam.
      Pequena raspada também não.
    */

    return {

      left:
        rect.left +
        24,

      right:
        rect.right -
        24,

      top:
        rect.top +
        17,

      bottom:
        rect.bottom -
        9

    };

  }


  // ====================================================
  // HITBOX DA NUVEM
  // ====================================================

  function getCloudHitbox(
    rect
  ) {

    /*
      A área de colisão também é
      menor que o desenho da nuvem.

      Assim você pode passar raspando.
    */

    return {

      left:
        rect.left +
        8,

      right:
        rect.right -
        8,

      top:
        rect.top +
        6,

      bottom:
        rect.bottom -
        4

    };

  }


  // ====================================================
  // OBJETOS
  // ====================================================

  function updateObjects(
    delta
  ) {

    /*
      A dificuldade aumenta,
      mas a velocidade tem limite.
    */

    const speed =
      Math.min(

        205,

        105 +
        difficulty *
        11

      );


    const playerHitbox =
      getPlayerHitbox();


    for (

      let index =
        objects.length -
        1;

      index >= 0;

      index--

    ) {

      const object =
        objects[index];


      object.y -=

        speed *
        delta;


      object.element.style.top =
        `${object.y}px`;


      const objectRect =
        object.element
          .getBoundingClientRect();


      /*
        Nuvem usa hitbox reduzida.

        Moeda continua usando o tamanho
        visual inteiro para ficar gostoso
        de coletar.
      */

      const collisionRect =

        object.type ===
        "cloud"

          ? getCloudHitbox(
              objectRect
            )

          : objectRect;


      if (
        intersects(
          playerHitbox,
          collisionRect
        )
      ) {

        // =============================================
        // NUVEM
        // =============================================

        if (
          object.type ===
          "cloud"
        ) {

          finishGame();

          return;

        }


        // =============================================
        // MOEDA
        // =============================================

        if (
          object.type ===
          "coin"
        ) {

          runCoins++;


          coinDisplay.textContent =
            runCoins;


          if (
            window.CinnaCoins &&
            typeof window.CinnaCoins.add ===
              "function"
          ) {

            window.CinnaCoins.add(
              1
            );

          }


          object.element.remove();


          objects.splice(
            index,
            1
          );


          continue;

        }

      }


      // ===============================================
      // SAIU DA TELA
      // ===============================================

      if (
        object.y +
        object.height <
        -30
      ) {

        object.element.remove();


        objects.splice(
          index,
          1
        );

      }

    }

  }


  // ====================================================
  // LOOP
  // ====================================================

  function gameLoop(
    currentTime
  ) {

    if (!running) {
      return;
    }


    if (!lastTime) {

      lastTime =
        currentTime;

    }


    const delta =
      Math.min(

        (
          currentTime -
          lastTime
        ) / 1000,

        0.05

      );


    lastTime =
      currentTime;


    // ==================================================
    // TEMPO / SCORE
    // ==================================================

    survivalTime +=
      delta;


    score =
      Math.floor(

        survivalTime *
        10

      );


    difficulty =

      1 +

      Math.floor(

        survivalTime /
        10

      );


    scoreDisplay.textContent =
      score;


    // ==================================================
    // TIMERS
    // ==================================================

    cloudTimer +=
      delta;


    coinTimer +=
      delta;


    // ==================================================
    // INTERVALO DAS NUVENS
    // ==================================================

    const cloudInterval =
      Math.max(

        CLOUD_MIN_INTERVAL,

        CLOUD_START_INTERVAL -

        difficulty *
        0.035

      );


    // ==================================================
    // NUVEM
    // ==================================================

    if (
      cloudTimer >=
      cloudInterval
    ) {

      /*
        Só zera o timer se realmente
        conseguiu criar a nuvem.

        Se estiver perto demais da anterior,
        espera até existir espaço.
      */

      const spawned =
        spawnCloud();


      if (spawned) {

        cloudTimer =
          0;

      }

    }


    // ==================================================
    // MOEDA
    // ==================================================

    if (
      coinTimer >=
      1.15
    ) {

      coinTimer =
        0;


      spawnCoin();

    }


    // ==================================================
    // CINNA
    // ==================================================

    updatePlayerPosition(
      delta
    );


    // ==================================================
    // OBJETOS
    // ==================================================

    updateObjects(
      delta
    );


    if (running) {

      animationFrame =
        requestAnimationFrame(
          gameLoop
        );

    }

  }


  // ====================================================
  // INICIAR
  // ====================================================

  async function startGame() {

    await enableOrientation();


    clearObjects();


    score =
      0;

    runCoins =
      0;

    survivalTime =
      0;

    difficulty =
      1;


    /*
      Pequeno atraso antes da
      primeira nuvem.
    */

    cloudTimer =
      -0.35;


    coinTimer =
      -0.15;


    lastTime =
      0;


    coinDisplay.textContent =
      "0";


    scoreDisplay.textContent =
      "0";


    startOverlay.hidden =
      true;


    resultOverlay.hidden =
      true;


    dragging =
      false;


    const boardRect =
      board.getBoundingClientRect();


    playerX =
      boardRect.width /
      2;


    dragTargetX =
      playerX;


    cinna.style.left =
      `${playerX}px`;


    resetSensorCalibration();


    running =
      true;


    animationFrame =
      requestAnimationFrame(
        gameLoop
      );

  }


  // ====================================================
  // PARAR
  // ====================================================

  function stopGame() {

    running =
      false;


    dragging =
      false;


    tiltInput =
      0;


    playerVelocityX =
      0;


    if (
      animationFrame
    ) {

      cancelAnimationFrame(
        animationFrame
      );


      animationFrame =
        null;

    }

  }


  // ====================================================
  // GAME OVER
  // ====================================================

  function finishGame() {

    if (!running) {
      return;
    }


    stopGame();


    const previousBest =

      Number(

        localStorage.getItem(
          "cinnaFallBest"
        )

      ) || 0;


    const best =
      Math.max(

        previousBest,

        score

      );


    localStorage.setItem(

      "cinnaFallBest",

      String(best)

    );


    resultText.textContent =

      `Pontuação: ${score} · Recorde: ${best}`;


    rewardText.textContent =

      `Você pegou ${runCoins} Cinna Coin${
        runCoins === 1
          ? ""
          : "s"
      } 🪙`;


    resultOverlay.hidden =
      false;

  }


  // ====================================================
  // EVENTOS
  // ====================================================

  cloudCard.addEventListener(
    "click",
    openGame
  );


  startButton.addEventListener(
    "click",
    startGame
  );


  replayButton.addEventListener(
    "click",
    startGame
  );


  backButton.addEventListener(
    "click",
    closeGame
  );


  exitButton.addEventListener(
    "click",
    closeGame
  );


  // ====================================================
  // SAIR DO CÔMODO
  // ====================================================

  document
    .querySelectorAll(
      ".menu-button"
    )
    .forEach(

      button => {

        button.addEventListener(

          "click",

          () => {

            if (
              button.dataset.room !==
              "games"
            ) {

              closeGame();

            }

          }

        );

      }

    );


  // ====================================================
  // SEGUNDO PLANO
  // ====================================================

  document.addEventListener(

    "visibilitychange",

    () => {

      if (
        document.hidden &&
        running
      ) {

        lastTime =
          0;


        playerVelocityX =
          0;

      }

    }

  );


  // ====================================================
  // API
  // ====================================================

  window.CinnaFall = {

    open() {
      openGame();
    },


    close() {
      closeGame();
    },


    recalibrate() {
      resetSensorCalibration();
    }

  };

})();
