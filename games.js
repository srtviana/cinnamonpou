/* =====================================================
   CINNA CAFÉ ☕🍰
   V4 — CLIENTE + PEDIDOS + HOTSPOTS + BANDEJA
   ===================================================== */


/* =====================================================
   TELA
   ===================================================== */

.cinna-cafe-screen {
  position: fixed;
  inset: 0;

  z-index: 9999;

  width: 100vw;
  height: 100dvh;

  display: none;
  flex-direction: column;

  overflow: hidden;

  background: #dff5ff;

  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.cinna-cafe-screen.is-open {
  display: flex;
}

body.cinna-cafe-body-open {
  overflow: hidden;
}


/* =====================================================
   TOPBAR
   ===================================================== */

.cinna-cafe-topbar {
  position: relative;

  z-index: 100;

  width: 100%;
  min-height: 64px;

  padding:
    max(8px, env(safe-area-inset-top))
    14px
    8px;

  display: grid;

  grid-template-columns:
    48px
    1fr
    auto;

  align-items: center;

  gap: 10px;

  box-sizing: border-box;

  background:
    rgba(255,255,255,.96);

  border-bottom:
    2px solid
    rgba(110,174,214,.18);

  box-shadow:
    0 5px 18px
    rgba(80,126,155,.12);
}


/* =====================================================
   VOLTAR
   ===================================================== */

.cinna-cafe-back {
  width: 44px;
  height: 44px;

  border: 0;
  border-radius: 15px;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #e6f6ff;

  color: #578daf;

  font-size: 26px;
  font-weight: 900;

  cursor: pointer;

  touch-action: manipulation;

  box-shadow:
    0 4px 10px
    rgba(71,120,151,.1);
}

.cinna-cafe-back:active {
  transform: scale(.92);
}


/* =====================================================
   TÍTULO
   ===================================================== */

.cinna-cafe-topbar-title {
  min-width: 0;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  text-align: center;
}

.cinna-cafe-topbar-title strong {
  color: #5c8aa7;

  font-size:
    clamp(15px, 3.5vw, 20px);

  font-weight: 900;
}

.cinna-cafe-topbar-title small {
  margin-top: 2px;

  color: #95aeba;

  font-size: 10px;

  font-weight: 700;
}


/* =====================================================
   MOEDAS
   ===================================================== */

.cinna-cafe-coins {
  min-width: 72px;

  padding: 7px 12px;

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 5px;

  border-radius: 999px;

  background: #fff8dc;

  color: #92733c;

  border:
    2px solid
    rgba(239,195,83,.25);

  box-sizing: border-box;

  font-weight: 900;
}


/* =====================================================
   WRAPPER
   ===================================================== */

.cinna-cafe-stage-wrapper {
  flex: 1;

  min-height: 0;

  width: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 8px;

  box-sizing: border-box;

  overflow: hidden;
}


/* =====================================================
   PALCO
   ===================================================== */

.cinna-cafe-stage {
  position: relative;

  width:
    min(
      100%,
      calc(
        (100dvh - 82px) *
        1.777777
      )
    );

  max-width: 1600px;

  aspect-ratio: 16 / 9;

  max-height:
    calc(100dvh - 82px);

  flex-shrink: 0;

  overflow: hidden;

  border-radius: 22px;

  background: #e9f8ff;

  box-shadow:
    0 15px 40px
    rgba(48,91,121,.22);

  isolation: isolate;
}


.cinna-cafe-stage img {
  user-select: none;

  -webkit-user-select: none;
  -webkit-user-drag: none;
}


/* =====================================================
   FUNDO
   ===================================================== */

.cinna-cafe-background {
  position: absolute;

  inset: 0;

  z-index: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  pointer-events: none;
}


/* =====================================================
   CLIENTE
   ===================================================== */

.cafe-customer-wrap {
  position: absolute;

  left: 25%;
  bottom: 34%;

  z-index: 3;

  width: 17%;

  transform:
    translateX(-180%);

  opacity: 0;

  pointer-events: none;
}


.cafe-customer-wrap.arrived {
  transform:
    translateX(0);

  opacity: 1;

  transition:
    transform .7s
    cubic-bezier(.2,.8,.25,1),
    opacity .3s ease;
}


.cafe-customer-wrap.leaving {
  transform:
    translateX(-190%);

  opacity: 0;

  transition:
    transform .5s ease-in,
    opacity .4s ease;
}


.cafe-customer {
  position: relative;

  display: block;

  width: 100%;
  height: auto;

  animation:
    cafeCustomerFloat
    2.8s
    ease-in-out
    infinite;

  filter:
    drop-shadow(
      0 6px 5px
      rgba(54,53,74,.15)
    );
}


@keyframes cafeCustomerFloat {

  0%,
  100% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(-5px);
  }

}


/* =====================================================
   CLIENTE FELIZ
   ===================================================== */

.cafe-customer-wrap.is-happy
.cafe-customer {
  animation:
    cafeCustomerHappy
    .45s
    ease-in-out
    infinite alternate;
}


@keyframes cafeCustomerHappy {

  from {
    transform:
      translateY(0)
      scale(1);
  }

  to {
    transform:
      translateY(-10px)
      scale(1.04);
  }

}


.cafe-happy-hearts {
  position: absolute;

  top: -10%;
  left: 50%;

  opacity: 0;

  transform:
    translateX(-50%)
    scale(.5);

  color: #ff8fb6;

  font-size:
    clamp(14px, 2.5vw, 28px);

  font-weight: 900;
}


.cafe-happy-hearts.show {
  opacity: 1;

  animation:
    cafeHearts
    .65s
    ease-out
    infinite alternate;
}


@keyframes cafeHearts {

  from {
    transform:
      translateX(-50%)
      translateY(4px)
      scale(.8);
  }

  to {
    transform:
      translateX(-50%)
      translateY(-8px)
      scale(1.15);
  }

}


/* =====================================================
   CLIENTE COM RAIVA
   ===================================================== */

.cafe-customer-wrap.is-angry {
  animation:
    cafeAngryShake
    .15s
    linear
    3;
}


@keyframes cafeAngryShake {

  0%,
  100% {
    margin-left: 0;
  }

  25% {
    margin-left: -4px;
  }

  75% {
    margin-left: 4px;
  }

}


/* =====================================================
   BALÃO DO PEDIDO
   ===================================================== */

.cafe-order {
  position: absolute;

  left: 10%;
  top: 8%;

  z-index: 30;

  min-width: 13%;

  padding:
    7px 10px;

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 3px;

  opacity: 0;

  transform:
    translateY(5px)
    scale(.8);

  pointer-events: none;

  border-radius:
    18px;

  background:
    rgba(255,255,255,.96);

  border:
    2px solid
    rgba(164,194,220,.45);

  box-shadow:
    0 6px 15px
    rgba(65,91,112,.14);

  transition:
    opacity .2s ease,
    transform .25s ease;
}


.cafe-order.show {
  opacity: 1;

  transform:
    translateY(0)
    scale(1);
}


.cafe-order::after {
  content: "";

  position: absolute;

  bottom: -8px;
  left: 50%;

  width: 15px;
  height: 15px;

  background: white;

  transform:
    translateX(-50%)
    rotate(45deg);

  border-right:
    2px solid
    rgba(164,194,220,.35);

  border-bottom:
    2px solid
    rgba(164,194,220,.35);
}


.cafe-order-title {
  color: #718da2;

  font-size:
    clamp(8px, 1.3vw, 13px);

  font-weight: 900;
}


.cafe-order-items {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 4px;
}


.cafe-order-items img {
  position: relative;

  width:
    clamp(27px, 4.5vw, 60px);

  height:
    clamp(27px, 4.5vw, 60px);

  object-fit: contain;
}


/* =====================================================
   BALCÃO CLIENTE
   ===================================================== */

.cinna-cafe-client-counter {
  position: absolute;

  left: 50%;
  bottom: 25%;

  z-index: 4;

  width: 48%;

  height: auto;

  transform:
    translateX(-50%);

  object-fit: contain;

  pointer-events: none;

  filter:
    drop-shadow(
      0 6px 5px
      rgba(67,51,38,.15)
    );
}


/* =====================================================
   CINNA
   ===================================================== */

.cinna-cafe-chef {
  position: absolute;

  left: 56%;
  bottom: 31%;

  z-index: 6;

  width: 15%;

  height: auto;

  transform-origin:
    50% 100%;

  object-fit: contain;

  pointer-events: none;

  filter:
    drop-shadow(
      0 8px 7px
      rgba(58,85,101,.16)
    );

  animation:
    cinnaCafeFloat
    3.1s
    ease-in-out
    infinite;

  will-change: transform;
}


@keyframes cinnaCafeFloat {

  0% {
    transform:
      translate3d(-50%,0,0)
      scale(1);
  }

  20% {
    transform:
      translate3d(-50%,-3px,0)
      scale(1.004);
  }

  50% {
    transform:
      translate3d(-50%,-9px,0)
      scale(1.012);
  }

  80% {
    transform:
      translate3d(-50%,-3px,0)
      scale(1.004);
  }

  100% {
    transform:
      translate3d(-50%,0,0)
      scale(1);
  }

}


/* =====================================================
   BANCADA DE PREPARO
   ===================================================== */

.cinna-cafe-prep-counter {
  position: absolute;

  left: 50%;
  bottom: -1%;

  z-index: 10;

  width: 98%;

  height: auto;

  transform:
    translateX(-50%);

  object-fit: contain;

  pointer-events: none;

  filter:
    drop-shadow(
      0 8px 6px
      rgba(65,47,33,.16)
    );
}


/* =====================================================
   HOTSPOTS
   ===================================================== */

.cafe-hotspots {
  position: absolute;

  inset: 0;

  z-index: 20;

  pointer-events: none;
}


.cafe-hotspot {
  position: absolute;

  padding: 0;

  border: 0;

  outline: 0;

  background: transparent;

  cursor: pointer;

  pointer-events: auto;

  touch-action: manipulation;

  -webkit-tap-highlight-color:
    transparent;
}


/*
   =====================================================
   POSIÇÕES DOS OBJETOS

   São percentuais do palco inteiro.
   Se algum botão ficar alguns pixels fora do objeto,
   é SOMENTE aqui que vamos ajustar depois.
   =====================================================
*/


/* LATTE BRANCO */

.hotspot-bear-latte {
  left: 52%;
  top: 65%;

  width: 7%;
  height: 15%;
}


/* LATTE ROSA */

.hotspot-pink-latte {
  left: 59%;
  top: 65%;

  width: 7%;
  height: 15%;
}


/* FRAPPÉ */

.hotspot-frappe {
  left: 68%;
  top: 60%;

  width: 8%;
  height: 20%;
}


/* CUPCAKE CHOCOLATE */

.hotspot-cupcake-chocolate {
  left: 35%;
  top: 69%;

  width: 7%;
  height: 12%;
}


/* CUPCAKE MORANGO */

.hotspot-cupcake-strawberry {
  left: 42%;
  top: 69%;

  width: 7%;
  height: 12%;
}


/* DONUT CHOCOLATE */

.hotspot-donut-chocolate {
  left: 18%;
  top: 65%;

  width: 7%;
  height: 11%;
}


/* DONUT MORANGO */

.hotspot-donut-strawberry {
  left: 24%;
  top: 65%;

  width: 7%;
  height: 11%;
}


/* DONUT BAUNILHA */

.hotspot-donut-vanilla {
  left: 30%;
  top: 65%;

  width: 7%;
  height: 11%;
}


/* =====================================================
   EFEITO AO TOCAR
   ===================================================== */

.cafe-hotspot.clicked {
  animation:
    hotspotTap
    .18s ease;
}


@keyframes hotspotTap {

  50% {
    transform:
      scale(.9);
  }

}


/* =====================================================
   ITENS SOBRE A BANDEJA AZUL
   ===================================================== */

.cafe-tray-items {
  position: absolute;

  left: 79%;
  top: 67%;

  z-index: 25;

  width: 15%;
  height: 15%;

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 2%;

  pointer-events: auto;
}


.cafe-tray-item {
  position: relative;

  width: 48%;
  height: 100%;

  padding: 0;

  border: 0;

  background: transparent;

  cursor: pointer;

  touch-action: manipulation;

  -webkit-tap-highlight-color:
    transparent;

  animation:
    trayItemAppear
    .2s
    cubic-bezier(.2,.9,.3,1.3);
}


.cafe-tray-item img {
  position: relative;

  width: 100%;
  height: 100%;

  object-fit: contain;

  pointer-events: none;

  filter:
    drop-shadow(
      0 3px 2px
      rgba(62,66,75,.15)
    );
}


@keyframes trayItemAppear {

  from {
    opacity: 0;

    transform:
      translateY(-8px)
      scale(.65);
  }

  to {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);
  }

}


.cafe-tray-items.shake {
  animation:
    trayShake
    .25s linear;
}


@keyframes trayShake {

  25% {
    transform:
      translateX(-4px);
  }

  75% {
    transform:
      translateX(4px);
  }

}


/* =====================================================
   BOTÃO ENTREGAR
   ===================================================== */

.cafe-deliver {
  position: absolute;

  right: 5%;
  bottom: 2%;

  z-index: 40;

  padding:
    clamp(5px,1vw,9px)
    clamp(9px,1.8vw,18px);

  border: 0;

  border-radius: 999px;

  opacity: 0;

  transform:
    translateY(8px)
    scale(.9);

  pointer-events: none;

  background:
    linear-gradient(
      180deg,
      #ffb9d2,
      #ff94bd
    );

  color: white;

  font-size:
    clamp(8px,1.2vw,13px);

  font-weight: 900;

  letter-spacing: .4px;

  cursor: pointer;

  box-shadow:
    0 4px 0 #e879a3,
    0 7px 12px
    rgba(139,70,98,.18);

  transition:
    opacity .2s ease,
    transform .2s ease;

  touch-action: manipulation;
}


.cafe-deliver.show {
  opacity: 1;

  transform:
    translateY(0)
    scale(1);

  pointer-events: auto;
}


.cafe-deliver:active {
  transform:
    translateY(2px)
    scale(.96);

  box-shadow:
    0 2px 0 #e879a3;
}


/* =====================================================
   FEEDBACK
   ===================================================== */

.cafe-feedback {
  position: absolute;

  left: 50%;
  top: 5%;

  z-index: 80;

  padding:
    7px 14px;

  opacity: 0;

  transform:
    translateX(-50%)
    translateY(-7px);

  pointer-events: none;

  border-radius: 999px;

  color: #66859a;

  background:
    rgba(255,255,255,.96);

  font-size:
    clamp(9px,1.5vw,14px);

  font-weight: 900;

  box-shadow:
    0 5px 15px
    rgba(57,91,112,.15);

  transition:
    opacity .2s ease,
    transform .2s ease;
}


.cafe-feedback.show {
  opacity: 1;

  transform:
    translateX(-50%)
    translateY(0);
}


.cafe-feedback.correct {
  color: #62a87a;
}


.cafe-feedback.wrong {
  color: #d96d7c;
}


/* =====================================================
   BLOQUEIA HOME ATRÁS
   ===================================================== */

body.cinna-cafe-body-open
.room {
  pointer-events: none;
}


body.cinna-cafe-body-open
.cinna-cafe-screen {
  pointer-events: auto;
}


/* =====================================================
   CELULAR
   ===================================================== */

@media (max-width: 650px) {

  .cinna-cafe-topbar {
    min-height: 58px;

    grid-template-columns:
      42px 1fr auto;

    padding-left: 8px;
    padding-right: 8px;
  }


  .cinna-cafe-back {
    width: 38px;
    height: 38px;

    border-radius: 13px;

    font-size: 22px;
  }


  .cinna-cafe-coins {
    min-width: 64px;

    padding: 5px 8px;

    font-size: 12px;
  }

}


/* =====================================================
   VERTICAL
   ===================================================== */

@media (orientation: portrait) {

  .cinna-cafe-stage-wrapper {
    padding: 6px;
  }


  .cinna-cafe-stage {
    width: 100%;

    max-height: none;
  }


  .cinna-cafe-chef {
    width: 16%;
  }


  .cinna-cafe-client-counter {
    width: 49%;
  }


  .cinna-cafe-prep-counter {
    width: 99%;
  }

}
