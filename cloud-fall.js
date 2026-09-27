// ======================================================
// CINNA FALL ☁️🪙
// ======================================================
//
// CONTROLE:
//
// 📱 Incline o celular
// 👆 ou arraste com o dedo
//
// O sensor é calibrado toda vez
// que uma partida começa.
//
// ======================================================

(() => {

  // ====================================================
  // ELEMENTOS PRINCIPAIS
  // ====================================================

  const room =
    document.querySelector(
      ".room"
    );


  const gameHub =
    document.querySelector(
      "#game-hub"
    );


  if (
    !room ||
    !gameHub
  ) {

    return;

  }


  // ====================================================
  // ENCONTRA O CARD
  // ====================================================

  const gameCards = [

    ...gameHub.querySelectorAll(
      ".game-card"
    )

  ];


  const cloudCard =
    gameCards.find(

      card => {

        const name =
          card.querySelector(
            ".game-card-name"
          );


        if (!name) {

          return false;

        }


        const text =
          name.textContent
            .trim();


        return (
          text ===
          "Cloud Jump"

          ||

          text ===
          "Cinna Fall"
        );

      }

    );


  if (!cloudCard) {

    console.warn(
      "Não encontrei o card do Cinna Fall."
    );


    return;

  }


  // ====================================================
  // CONFIGURA O CARD
  // ====================================================

  cloudCard.disabled =
    false;


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

    cardIcon.textContent =
      "☁️";

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
  // CRIA A TELA
  // ====================================================

  const screen =
    document.createElement(
      "section"
    );


  screen.className =
    "cloud-fall-screen";


  screen.innerHTML = `

    <div class="cloud-fall-topbar">

      <div class="cloud-fall-stat">

        🪙

        <strong
          id="cloud-fall-coins"
        >
          0
        </strong>

      </div>


      <div class="cloud-fall-title">

        Cinna Fall

      </div>


      <div class="cloud-fall-stat">

        ☁️

        <strong
          id="cloud-fall-score"
        >
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


      <!-- ========================= -->
      <!-- TELA INICIAL -->
      <!-- ========================= -->

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

            Segure o celular como preferir
            e toque em jogar.

            <br><br>

            Essa posição será considerada
            o centro.

            <br><br>

            Depois incline para a esquerda
            ou direita para mover o Cinna.

            <br><br>

            Também dá para arrastar com
            o dedo ♡

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


      <!-- ========================= -->
      <!-- RESULTADO -->
      <!-- ========================= -->

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
    screen
  );


  // ====================================================
  // REFERÊNCIAS
  // ====================================================

  const board =
    screen.querySelector(
      "#cloud-fall-board"
    );


  const cinna =
    screen.querySelector(
      "#cloud-fall-cinna"
    );


  const coinDisplay =
    screen.querySelector(
      "#cloud-fall-coins"
    );


  const scoreDisplay =
    screen.querySelector(
      "#cloud-fall-score"
    );


  const startOverlay =
    screen.querySelector(
      "#cloud-fall-start"
    );


  const resultOverlay =
    screen.querySelector(
      "#cloud-fall-result-overlay"
    );


  const resultText =
    screen.querySelector(
      "#cloud-fall-result"
    );


  const rewardText =
    screen.querySelector(
      "#cloud-fall-reward"
    );


  const startButton =
    screen.querySelector(
      "#cloud-fall-start-button"
    );


  const replayButton =
    screen.querySelector(
      "#cloud-fall-replay"
    );


  const backButton =
    screen.querySelector(
      "#cloud-fall-back"
    );


  const exitButton =
    screen.querySelector(
      "#cloud-fall-exit"
    );


  // ====================================================
  // ESTADO DO JOGO
  // ====================================================

  let running =
    false;


  let animationFrame =
    null;


  let lastTime =
    0;


  let score =
    0;


  let runCoins =
    0;


  let survivalTime =
    0;


  let difficulty =
    1;


  let cloudTimer =
    0;


  let coinTimer =
    0;


  const objects =
    [];


  // ====================================================
  // POSIÇÃO DO CINNA
  // ====================================================

  let playerX =
    0;


  let dragTargetX =
    0;


  let dragging =
    false;


  // ====================================================
  // SENSOR
  // ====================================================

  let orientationEnabled =
    false;


  let sensorActive =
    false;


  let neutralTilt =
    null;


  let filteredTilt =
    null;


  let tiltVelocity =
    0;


  let calibrationSamples =
    [];


  /*
    Quantidade de leituras usadas
    para descobrir a posição neutra.
  */

  const CALIBRATION_SAMPLES =
    12;


  /*
    Inclinação pequena é ignorada.

    Isso elimina tremedeira da mão
    e ruído natural do sensor.
  */

  const TILT_DEAD_ZONE =
    2.5;


  /*
    Com aproximadamente 18 graus
    já atingimos a velocidade máxima.
  */

  const MAX_TILT =
    18;


  /*
    Velocidade máxima horizontal.
  */

  const MAX_PLAYER_SPEED =
    240;


  /*
    Filtro do sensor.

    Menor = mais suave.
    Maior = mais rápido.

    0.16 ficou um meio-termo bom.
  */

  const SENSOR_FILTER =
    0.16;


  // ====================================================
  // UTILIDADES
  // ====================================================

  function clamp(
    value,
    min,
    max
  ) {

    return Math.max(

      min,

      Math.min(
        max,
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


      object.element.remove();

    }

  }


  // ====================================================
  // DESCOBRE ORIENTAÇÃO DA TELA
  // ====================================================

  function getScreenAngle() {

    if (
      screen.orientation

      &&

      typeof screen.orientation.angle ===
        "number"
    ) {

      return (
        (
          screen.orientation.angle %
          360
        )
        +
        360
      )
      %
      360;

    }


    if (
      typeof window.orientation ===
      "number"
    ) {

      return (
        (
          window.orientation %
          360
        )
        +
        360
      )
      %
      360;

    }


    return 0;

  }


  // ====================================================
  // INCLINAÇÃO LATERAL REAL
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


    /*
      Retrato normal:
      gamma controla esquerda/direita.
    */

    if (
      angle === 0
    ) {

      return gamma;

    }


    /*
      Retrato de cabeça para baixo.
    */

    if (
      angle === 180
    ) {

      return -gamma;

    }


    /*
      Paisagem.
    */

    if (
      angle === 90
    ) {

      return beta;

    }


    if (
      angle === 270
    ) {

      return -beta;

    }


    return gamma;

  }


  // ====================================================
  // SENSOR
  // ====================================================

  function handleOrientation(
    event
  ) {

    if (
      !running
    ) {

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


      /*
        Enquanto calibra,
        Cinna fica parado no centro.
      */

      tiltVelocity =
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
            sum +
            value,

          0

        );


      neutralTilt =
        total /
        calibrationSamples.length;


      filteredTilt =
        neutralTilt;


      calibrationSamples =
        [];


      sensorActive =
        true;


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
    // DIFERENÇA DA POSIÇÃO NEUTRA
    // ==================================================

    let relativeTilt =

      filteredTilt -
      neutralTilt;


    /*
      Evita valores malucos em mudanças
      de orientação.
    */

    relativeTilt =
      clamp(
        relativeTilt,
        -MAX_TILT,
        MAX_TILT
      );


    // ==================================================
    // ZONA MORTA
    // ==================================================

    const absoluteTilt =
      Math.abs(
        relativeTilt
      );


    if (
      absoluteTilt <=
      TILT_DEAD_ZONE
    ) {

      tiltVelocity =
        0;


      return;

    }


    // ==================================================
    // VELOCIDADE
    // ==================================================

    const usableTilt =

      absoluteTilt -
      TILT_DEAD_ZONE;


    const usableRange =

      MAX_TILT -
      TILT_DEAD_ZONE;


    const strength =
      clamp(

        usableTilt /
        usableRange,

        0,
        1

      );


    tiltVelocity =

      Math.sign(
        relativeTilt
      )

      *

      strength

      *

      MAX_PLAYER_SPEED;

  }


  // ====================================================
  // PERMISSÃO DO SENSOR
  // ====================================================

  async function enableOrientation() {

    try {

      if (
        typeof DeviceOrientationEvent ===
        "undefined"
      ) {

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

    catch (
      error
    ) {

      console.warn(
        "Sensor não disponível:",
        error
      );


      return false;

    }

  }


  // ====================================================
  // RECALIBRAR SENSOR
  // ====================================================

  function resetSensorCalibration() {

    neutralTilt =
      null;


    filteredTilt =
      null;


    tiltVelocity =
      0;


    calibrationSamples =
      [];


    sensorActive =
      false;

  }


  // ====================================================
  // CONTROLE POR TOQUE
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

      if (
        !running
      ) {

        return;

      }


      dragging =
        true;


      moveToPointer(
        event
      );

    }

  );


  board.addEventListener(

    "pointermove",

    event => {

      if (
        !dragging

        ||

        !running
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
  // ATUALIZA POSIÇÃO DO CINNA
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


    /*
      Se estiver tocando,
      o dedo tem prioridade sobre o sensor.
    */

    if (
      dragging
    ) {

      const touchSmoothing =
        Math.min(
          1,
          delta *
          16
        );


      playerX +=

        (
          dragTargetX -
          playerX
        )

        *

        touchSmoothing;

    }

    else {

      /*
        Inclinação controla VELOCIDADE,
        não posição absoluta.

        Isso é o que deixa o movimento
        natural e contínuo.
      */

      playerX +=

        tiltVelocity *
        delta;

    }


    playerX =
      clamp(

        playerX,

        minimumX,

        maximumX

      );


    cinna.style.left =
      `${playerX}px`;

  }


  // ====================================================
  // ABRIR JOGO
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
  // CRIAR NUVEM
  // ====================================================

  function spawnCloud() {

    const boardRect =
      board.getBoundingClientRect();


    /*
      Nuvens menores.
    */

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


    const x =

      Math.random() *

      (
        boardRect.width -
        width
      );


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

  }


  // ====================================================
  // CRIAR MOEDA
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


    const x =

      10 +

      Math.random() *

      (
        boardRect.width -
        size -
        20
      );


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
    a,
    b
  ) {

    return !(

      a.right <
      b.left

      ||

      a.left >
      b.right

      ||

      a.bottom <
      b.top

      ||

      a.top >
      b.bottom

    );

  }


  function getPlayerHitbox() {

    const rect =
      cinna.getBoundingClientRect();


    /*
      Hitbox menor que a imagem.

      As orelhas não contam totalmente,
      para não ficar injusto.
    */

    return {

      left:
        rect.left +
        17,

      right:
        rect.right -
        17,

      top:
        rect.top +
        12,

      bottom:
        rect.bottom -
        8

    };

  }


  // ====================================================
  // ATUALIZA OBJETOS
  // ====================================================

  function updateObjects(
    delta
  ) {

    const speed =

      105 +

      difficulty *
      14;


    const playerHitbox =
      getPlayerHitbox();


    for (

      let i =
        objects.length -
        1;

      i >= 0;

      i--

    ) {

      const object =
        objects[i];


      object.y -=

        speed *
        delta;


      object.element.style.top =
        `${object.y}px`;


      const rect =
        object.element
          .getBoundingClientRect();


      if (
        intersects(
          playerHitbox,
          rect
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
            window.CinnaCoins

            &&

            typeof window.CinnaCoins.add ===
              "function"
          ) {

            window.CinnaCoins.add(
              1
            );

          }


          object.element.remove();


          objects.splice(
            i,
            1
          );


          continue;

        }

      }


      // ===============================================
      // SAIU PELO TOPO
      // ===============================================

      if (
        object.y +
        object.height <
        -20
      ) {

        object.element.remove();


        objects.splice(
          i,
          1
        );

      }

    }

  }


  // ====================================================
  // LOOP PRINCIPAL
  // ====================================================

  function gameLoop(
    time
  ) {

    if (
      !running
    ) {

      return;

    }


    if (
      !lastTime
    ) {

      lastTime =
        time;

    }


    const delta =
      Math.min(

        (
          time -
          lastTime
        )
        /
        1000,

        0.05

      );


    lastTime =
      time;


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
    // GERADORES
    // ==================================================

    cloudTimer +=
      delta;


    coinTimer +=
      delta;


    const cloudInterval =
      Math.max(

        0.52,

        1.05 -

        difficulty *
        0.055

      );


    if (
      cloudTimer >=
      cloudInterval
    ) {

      cloudTimer =
        0;


      spawnCloud();

    }


    if (
      coinTimer >=
      1.15
    ) {

      coinTimer =
        0;


      spawnCoin();

    }


    // ==================================================
    // MOVIMENTO
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


    // ==================================================
    // PRÓXIMO FRAME
    // ==================================================

    if (
      running
    ) {

      animationFrame =
        requestAnimationFrame(
          gameLoop
        );

    }

  }


  // ====================================================
  // INICIAR PARTIDA
  // ====================================================

  async function startGame() {

    /*
      O pedido de permissão precisa acontecer
      diretamente depois do toque no botão.
    */

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
      true;


    resultOverlay.hidden =
      true;


    const rect =
      board.getBoundingClientRect();


    playerX =
      rect.width /
      2;


    dragTargetX =
      playerX;


    cinna.style.left =
      `${playerX}px`;


    /*
      MUITO IMPORTANTE:

      Toda nova partida recalibra
      a posição neutra do celular.
    */

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


    tiltVelocity =
      0;


    dragging =
      false;


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
  // FIM DE JOGO
  // ====================================================

  function finishGame() {

    if (
      !running
    ) {

      return;

    }


    stopGame();


    const previousBest =

      Number(

        localStorage.getItem(
          "cinnaFallBest"
        )

      )

      ||

      0;


    const best =
      Math.max(

        previousBest,

        score

      );


    localStorage.setItem(

      "cinnaFallBest",

      String(
        best
      )

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


})();
