// ======================================================
// CINNA FALL ☁️🪙
// ======================================================
//
// Controle:
// - inclinar o celular
// - ou arrastar com o dedo
//
// Objetivo:
// - desviar das nuvens
// - pegar Cinna Coins
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
  // TRANSFORMA CLOUD JUMP EM CINNA FALL
  // ====================================================

  const gameCards =
    [
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

        return (
          name &&
          name.textContent
            .trim() ===
            "Cloud Jump"
        );

      }

    );


  if (
    !cloudCard
  ) {

    console.warn(
      "Não encontrei o card Cloud Jump."
    );

    return;

  }


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


  cloudCard.querySelector(
    ".game-card-icon"
  ).textContent =
    "☁️";


  cloudCard.querySelector(
    ".game-card-name"
  ).textContent =
    "Cinna Fall";


  cloudCard.querySelector(
    ".game-card-description"
  ).textContent =
    "Incline o celular, desvie das nuvens e pegue moedas.";


  cloudCard.querySelector(
    ".game-card-status"
  ).textContent =
    "JOGAR";


  // ====================================================
  // CRIA TELA
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
            Incline o celular para mover o Cinna.
            Desvie das nuvens e pegue as moedas!
            <br><br>
            Se preferir, também dá para arrastar
            o Cinna com o dedo.
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
  // ESTADO
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

  let playerX =
    0;

  let targetX =
    0;

  let orientationEnabled =
    false;

  let dragging =
    false;

  let cloudTimer =
    0;

  let coinTimer =
    0;

  let difficulty =
    1;

  const objects =
    [];


  // ====================================================
  // UTIL
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


    coinDisplay.textContent =
      "0";

    scoreDisplay.textContent =
      "0";


    startOverlay.hidden =
      false;

    resultOverlay.hidden =
      true;


    requestAnimationFrame(

      () => {

        const boardRect =
          board.getBoundingClientRect();

        playerX =
          boardRect.width / 2;

        targetX =
          playerX;

        updatePlayerPosition();

      }

    );

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


    const gamma =
      Number(
        event.gamma
      );


    if (
      Number.isNaN(
        gamma
      )
    ) {

      return;

    }


    const boardRect =
      board.getBoundingClientRect();

    const half =
      boardRect.width / 2;


    const normalized =
      clamp(
        gamma / 35,
        -1,
        1
      );


    targetX =
      half +
      normalized *
      (
        half -
        40
      );

  }


  async function enableOrientation() {

    try {

      if (
        typeof DeviceOrientationEvent !==
          "undefined"

        &&

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
  // CONTROLE POR TOQUE
  // ====================================================

  function moveToPointer(
    event
  ) {

    const rect =
      board.getBoundingClientRect();


    targetX =
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
        !dragging ||
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


  // ====================================================
  // POSIÇÃO DO CINNA
  // ====================================================

  function updatePlayerPosition() {

    const boardRect =
      board.getBoundingClientRect();


    playerX =
      clamp(

        playerX +
        (
          targetX -
          playerX
        ) *
        0.16,

        40,

        boardRect.width -
        40

      );


    cinna.style.left =
      `${playerX}px`;

  }


  // ====================================================
  // NUVEM
  // ====================================================

  function spawnCloud() {

    const boardRect =
      board.getBoundingClientRect();


    const width =
      75 +
      Math.random() *
      55;


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
        b.left ||

      a.left >
        b.right ||

      a.bottom <
        b.top ||

      a.top >
        b.bottom
    );

  }


  function getPlayerHitbox() {

    const rect =
      cinna.getBoundingClientRect();


    /*
      Hitbox menor que a imagem.

      Fica mais justo e menos irritante.
    */

    return {

      left:
        rect.left + 16,

      right:
        rect.right - 16,

      top:
        rect.top + 12,

      bottom:
        rect.bottom - 8

    };

  }


  // ====================================================
  // ATUALIZAR OBJETOS
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
        objects.length - 1;

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

        if (
          object.type ===
          "cloud"
        ) {

          finishGame();

          return;

        }


        if (
          object.type ===
          "coin"
        ) {

          runCoins++;

          coinDisplay.textContent =
            runCoins;


          if (
            window.CinnaCoins
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


      /*
        Saiu pelo topo.
      */

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
  // LOOP
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
        ) /
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


    updatePlayerPosition();

    updateObjects(
      delta
    );


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
      rect.width / 2;

    targetX =
      playerX;


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

      ) || 0;


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
      `Você pegou ${runCoins} Cinna Coin${runCoins === 1 ? "" : "s"} 🪙`;


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


  /*
    Se sair do cômodo Jogos,
    fecha o Cinna Fall.
  */

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
