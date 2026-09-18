
// ======================================================
// AJUSTE DE MOVIMENTO DO CINNA
// ======================================================
//
// O game.js troca várias sprites no idle.
// Alguns frames têm o corpo desenhado alguns pixels
// mais alto/baixo, então o acessório parece ficar parado.
//
// Aqui mantemos o corpo praticamente no mesmo frame
// e usamos apenas o frame 4 para a piscada.
//
// O movimento suave fica por conta do .cinna-body,
// então Cinna + acessórios se movem juntos.
// ======================================================


// ======================================================
// IDLE NORMAL
// ======================================================

if (
  typeof idleSequence !==
  "undefined"
) {

  idleSequence.splice(
    0,
    idleSequence.length,

    0,
    0,
    0,
    0,

    0,
    0,
    0,
    0,

    0,
    3,

    0,
    0
  );

}


// ======================================================
// CINNA TRISTE
// ======================================================
//
// Mesma lógica:
// mantém o frame triste principal e usa o frame 4
// somente para a piscada.
//

if (
  typeof sadSequence !==
  "undefined"
) {

  sadSequence.splice(
    0,
    sadSequence.length,

    0,
    0,
    0,
    0,

    0,
    0,
    0,
    0,

    0,
    3,

    0,
    0
  );

}


// ======================================================
// REINICIA A ANIMAÇÃO NO FRAME BASE
// ======================================================

if (
  typeof animationStep !==
    "undefined"
) {

  animationStep =
    0;

}


if (
  typeof updateCharacterSprite ===
    "function"
) {

  updateCharacterSprite(
    true
  );

}
