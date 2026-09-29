// ======================================================
// CINNA FALL ☁️🪙
// ======================================================
//
// CONTROLES:
//
// 📱 Incline o celular para esquerda/direita
// 👆 Ou arraste o Cinna com o dedo
//
// MOVIMENTO:
//
// - calibra a posição neutra ao iniciar
// - inclinação define velocidade
// - celular reto = Cinna freia e para
// - pequena tremedeira é ignorada
// - sem efeito de "ímã" nas laterais
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

    console.warn(
      "Cinna Fall: room ou game-hub não encontrado."
    );

    return;

  }


  // ====================================================
  // EVITA DUPLICAR O JOGO
  // ====================================================

  const oldScreen =
    document.querySelector(
      ".cloud-fall-screen"
    );


  if (
    oldScreen
  ) {

    oldScreen.remove();

  }


  // ====================================================
  // ENCONTRA O CARD DO JOGO
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


        if (
          !name
        ) {

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


  if (
    !cloudCard
  ) {

    console.warn(
      "Cinna Fall: card Cloud Jump não encontrado."
    );

    return;

  }


  // ====================================================
  // TRANSFORMA O CARD
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


  if (
    cardIcon
  ) {

    cardIcon.textContent =
      "☁️";

  }


  if (
    cardName
  ) {

    cardName.textContent =
      "Cinna Fall";

  }


  if (
    cardDescription
  ) {

    cardDescription.textContent =
      "Incline o celular, desvie das nuvens e pegue moedas.";

  }


  if (
    cardStatus
  ) {

    cardStatus.textContent =
      "JOGAR";

  }


  // ====================================================
  // CRIA A TELA DO JOGO
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


      <!-- CINNA -->

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
  // MOVIMENTO DO CINNA
  // ====================================================

  let playerX =
    0;


  let playerVelocityX =
    0;


  /*
    Valor de -1 até +1.

    -1 = esquerda máxima
     0 = celular neutro
    +1 = direita máxima
  */

  let tiltInput =
    0;


  // ====================================================
  // TOQUE
  // ====================================================

  let dragging =
    false;


  let dragTargetX =
    0;


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
  // CONFIGURAÇÕES DO MOVIMENTO
  // ====================================================

  /*
    Quantas leituras usamos para descobrir
    a posição neutra do celular.

    16 leituras = aproximadamente
    um quarto de segundo.
  */

  const CALIBRATION_SAMPLES =
    16;


  /*
    Pequenas inclinações abaixo de
    3 graus são ignoradas.

    Isso evita o Cinna tremendo
    quando sua mão está parada.
  */

  const TILT_DEAD_ZONE =
    3;


  /*
    Com 21 graus de inclinação,
    já atingimos velocidade máxima.

    Não precisa virar o celular
    como se fosse um volante KSKSK.
  */

  const MAX_TILT =
    21;


  /*
    Velocidade máxima lateral.

    Se depois achar rápido:
    diminui para 160.

    Se achar lento:
    aumenta para 190.
  */

  const MAX_PLAYER_SPEED =
    175;


  /*
    Velocidade com que o Cinna
    responde quando você inclina.

    Maior = resposta mais rápida.
  */

  const MOVEMENT_RESPONSE =
    7.5;


  /*
    Velocidade com que ele freia
    quando o celular volta ao centro.

    Essa é a parte que elimina
    a sensação de ímã.
  */

  const BRAKE_RESPONSE =
    12;


  /*
    Suavização do sensor.

    0.22 deixa suave sem ficar
    com atraso exagerado.
  */

  const SENSOR_FILTER =
    0.22;


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


      if (
        object.element
      ) {

        object.element.remove();

      }

    }

  }


  // ====================================================
  // ORIENTAÇÃO DA TELA
  // ====================================================

  function getScreenAngle() {

    /*
      IMPORTANTE:

      usamos window.screen.

      Não usamos "screen" porque nossa
      tela do jogo é outro elemento.
    */

    if (
      window.screen

      &&

      window.screen.orientation

      &&

      typeof window.screen.orientation.angle ===
        "number"
    ) {

      return (

        (
          window.screen.orientation.angle %
          360
        )

        +

        360

      )

      %

      360;

    }


    /*
      Fallback antigo do Safari.
    */

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


    /*
      Retrato normal.
    */

    if (
      angle === 0
    ) {

      return gamma;

    }


    /*
      Retrato invertido.
    */

    if (
      angle === 180
    ) {

      return -gamma;

    }


    /*
      Paisagem para um lado.
    */

    if (
      angle === 90
    ) {

      return beta;

    }


    /*
      Paisagem para o outro.
    */

    if (
      angle === 270
    ) {

      return -beta;

    }


    return gamma;

  }


  // ====================================================
  // RESET DA CALIBRAÇÃO
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
  // LEITURA DO SENSOR
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
        Cinna não se move.
      */

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


      return;

    }


    // ==================================================
    // FILTRO CONTRA TREMOR
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
    // FORÇA DA INCLINAÇÃO
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


    /*
      Curva levemente progressiva.

      Inclinação pequena = precisão.

      Inclinação grande = velocidade.
    */

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
  // PERMISSÃO DO SENSOR
  // ====================================================

  async function enableOrientation() {

    try {

      if (
        typeof DeviceOrientationEvent ===
        "undefined"
      ) {

        console.warn(
          "DeviceOrientationEvent não disponível."
        );


        return false;

      }


      /*
        iPhone / Safari exige permissão
        após toque do usuário.
      */

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

    catch (
      error
    ) {

      console.warn(
        "Não foi possível ativar o sensor:",
        error
      );


      return false;

    }

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
  // MOVIMENTO DO CINNA
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
    // CONTROLE PELO DEDO
    // ==================================================

    if (
      dragging
    ) {

      /*
        Enquanto arrasta, eliminamos
        a velocidade do sensor.
      */

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
    // CONTROLE PELO SENSOR
    // ==================================================

    else {

      /*
        Inclinação NÃO determina posição.

        Ela determina apenas a
        velocidade desejada.
      */

      const targetVelocity =

        tiltInput *
        MAX_PLAYER_SPEED;


      /*
        Quando o celular está reto,
        usamos uma frenagem mais forte.

        É isso que evita aquela
        sensação de ímã / deslizamento.
      */

      const response =

        Math.abs(
          targetVelocity
        ) <
        1

          ? BRAKE_RESPONSE

          : MOVEMENT_RESPONSE;


      /*
        Suavização independente do FPS.
      */

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


      /*
        Mata micro-movimentos residuais.
      */

      if (

        tiltInput ===
        0

        &&

        Math.abs(
          playerVelocityX
        ) <
        1.5

      ) {

        playerVelocityX =
          0;

      }


      playerX +=

        playerVelocityX *
        delta;

    }


    // ==================================================
    // LIMITES DA TELA
    // ==================================================

    if (
      playerX <=
      minimumX
    ) {

      playerX =
        minimumX;


      /*
        Só zera se estiver tentando
        continuar andando para fora.
      */

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
  // ABRIR O JOGO
  // ====================================================

  function openGame() {

    /*
      Fecha Pega Estrelinhas,
      caso ele esteja aberto.
    */

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
  // FECHAR O JOGO
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
  // CRIA NUVEM
  // ====================================================

  function spawnCloud() {

    const boardRect =
      board.getBoundingClientRect();


    /*
      Nuvens menores:
      aproximadamente 58px até 96px.
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

  }


  // ====================================================
  // CRIA MOEDA
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
      A imagem tem orelhas grandes.

      Reduzimos a hitbox para o jogo
      não ficar injusto demais.
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

    /*
      Velocidade vertical cresce
      conforme a dificuldade.
    */

    const speed =

      105 +

      difficulty *
      14;


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
        objects[
          index
        ];


      object.y -=

        speed *
        delta;


      object.element.style.top =
        `${object.y}px`;


      const objectRect =
        object.element
          .getBoundingClientRect();


      // ==================================================
      // COLISÃO
      // ==================================================

      if (
        intersects(
          playerHitbox,
          objectRect
        )
      ) {

        // ================================================
        // NUVEM
        // ================================================

        if (
          object.type ===
          "cloud"
        ) {

          finishGame();


          return;

        }


        // ================================================
        // MOEDA
        // ================================================

        if (
          object.type ===
          "coin"
        ) {

          runCoins++;


          coinDisplay.textContent =
            runCoins;


          /*
            Adiciona diretamente ao
            saldo global de Cinna Coins.
          */

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
            index,
            1
          );


          continue;

        }

      }


      // ==================================================
      // OBJETO SAIU DA TELA
      // ==================================================

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
  // LOOP PRINCIPAL
  // ====================================================

  function gameLoop(
    currentTime
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
        currentTime;

    }


    /*
      Limite de delta evita um salto
      enorme se o navegador travar.
    */

    const delta =
      Math.min(

        (
          currentTime -
          lastTime
        )

        /

        1000,

        0.05

      );


    lastTime =
      currentTime;


    // ==================================================
    // PONTUAÇÃO
    // ==================================================

    survivalTime +=
      delta;


    score =
      Math.floor(

        survivalTime *
        10

      );


    /*
      Dificuldade sobe a cada
      10 segundos.
    */

    difficulty =

      1 +

      Math.floor(

        survivalTime /
        10

      );


    scoreDisplay.textContent =
      score;


    // ==================================================
    // TEMPORIZADORES
    // ==================================================

    cloudTimer +=
      delta;


    coinTimer +=
      delta;


    /*
      Conforme a dificuldade aumenta,
      nuvens aparecem mais rápido.

      Nunca abaixo de 0.52 segundos.
    */

    const cloudInterval =
      Math.max(

        0.52,

        1.05 -

        difficulty *
        0.055

      );


    // ==================================================
    // NUVENS
    // ==================================================

    if (
      cloudTimer >=
      cloudInterval
    ) {

      cloudTimer =
        0;


      spawnCloud();

    }


    // ==================================================
    // MOEDAS
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
    // MOVIMENTO DO CINNA
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
      No iPhone a permissão precisa
      vir diretamente de um clique.
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


    /*
      Pequeno atraso inicial nas nuvens.

      Dá tempo de calibrar o sensor
      sem já nascer uma nuvem na cara.
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


    /*
      Toda partida começa com nova
      calibração do celular.
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
  // PARAR PARTIDA
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
  // SAIR DO CÔMODO JOGOS
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
  // APP / ABA SAIU DO FOCO
  // ====================================================

  document.addEventListener(

    "visibilitychange",

    () => {

      /*
        Evita a física dar um salto estranho
        quando o Safari fica em segundo plano.
      */

      if (
        document.hidden

        &&

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
