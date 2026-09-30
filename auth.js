// ======================================================
// CINNA AUTH ☁️
// Interface visual de login e criação de conta.
//
// CONECTADO AO Supabase:
//
const SUPABASE_URL =
  "https://fkyamskqmxbljkwmsgyq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_nshDmD_5kYrpoIei7Jgsow_NFuXWWom";

(() => {

  // ====================================================
  // EVITA CRIAR DUAS VEZES
  // ====================================================

  if (
    document.querySelector(
      "#cinna-auth"
    )
  ) {

    return;

  }


  // ====================================================
  // CRIA A INTERFACE
  // ====================================================

  const authOverlay =
    document.createElement(
      "div"
    );


  authOverlay.id =
    "cinna-auth";


  authOverlay.className =
    "cinna-auth-overlay";


  authOverlay.innerHTML = `

    <!-- NUVENS DO FUNDO -->

    <div
      class="cinna-auth-cloud cloud-one"
      aria-hidden="true"
    ></div>

    <div
      class="cinna-auth-cloud cloud-two"
      aria-hidden="true"
    ></div>

    <div
      class="cinna-auth-cloud cloud-three"
      aria-hidden="true"
    ></div>


    <!-- CONTAINER -->

    <main class="cinna-auth-container">


      <!-- CINNA -->

      <div class="cinna-auth-mascot-area">

        <img
          class="cinna-auth-mascot"
          src="assets/sprites/cinna-idle-1.PNG"
          alt="Cinna"
        >

      </div>


      <!-- CARD -->

      <section class="cinna-auth-card">


        <h1 class="cinna-auth-logo">

          ᑕIᑎᑎᗩᗰOᑎᖇOᒪᒪ ☁️

        </h1>


        <p
          id="cinna-auth-subtitle"
          class="cinna-auth-subtitle"
        >

          Bem-vindo de volta ♡

        </p>


        <!-- ABAS -->

        <div
          class="cinna-auth-tabs"
          role="tablist"
          aria-label="Conta"
        >


          <button
            id="cinna-login-tab"
            class="cinna-auth-tab active"
            type="button"
            role="tab"
            aria-selected="true"
          >

            ENTRAR

          </button>


          <button
            id="cinna-register-tab"
            class="cinna-auth-tab"
            type="button"
            role="tab"
            aria-selected="false"
          >

            CRIAR CONTA

          </button>


        </div>


        <!-- ========================================= -->
        <!-- LOGIN -->
        <!-- ========================================= -->

        <form
          id="cinna-login-form"
          class="cinna-auth-form active"
          autocomplete="on"
        >


          <div class="cinna-auth-field">

            <label
              class="cinna-auth-label"
              for="cinna-login-email"
            >

              E-mail

            </label>


            <div class="cinna-auth-input-wrap">

              <input
                id="cinna-login-email"
                class="cinna-auth-input no-button"
                type="email"
                autocomplete="email"
                inputmode="email"
                placeholder="seuemail@exemplo.com"
                required
              >

            </div>

          </div>


          <div class="cinna-auth-field">

            <label
              class="cinna-auth-label"
              for="cinna-login-password"
            >

              Senha

            </label>


            <div class="cinna-auth-input-wrap">

              <input
                id="cinna-login-password"
                class="cinna-auth-input"
                type="password"
                autocomplete="current-password"
                placeholder="••••••••"
                required
              >


              <button
                class="cinna-auth-password-button"
                type="button"
                data-password-target="cinna-login-password"
                aria-label="Mostrar senha"
              >

                👁️

              </button>

            </div>

          </div>


          <div
            id="cinna-login-message"
            class="cinna-auth-message"
            aria-live="polite"
          ></div>


          <button
            class="cinna-auth-submit"
            type="submit"
          >

            ENTRAR ☁️

          </button>


          <p class="cinna-auth-switch-text">

            Ainda não tem uma conta?

            <button
              class="cinna-auth-switch"
              type="button"
              data-open-auth="register"
            >

              Criar conta ♡

            </button>

          </p>


        </form>


        <!-- ========================================= -->
        <!-- CADASTRO -->
        <!-- ========================================= -->

        <form
          id="cinna-register-form"
          class="cinna-auth-form"
          autocomplete="on"
        >


          <div class="cinna-auth-field">

            <label
              class="cinna-auth-label"
              for="cinna-register-username"
            >

              Nome de usuário

            </label>


            <div class="cinna-auth-input-wrap">

              <input
                id="cinna-register-username"
                class="cinna-auth-input no-button"
                type="text"
                autocomplete="username"
                maxlength="20"
                placeholder="@seunome"
                required
              >

            </div>

          </div>


          <div class="cinna-auth-field">

            <label
              class="cinna-auth-label"
              for="cinna-register-email"
            >

              E-mail

            </label>


            <div class="cinna-auth-input-wrap">

              <input
                id="cinna-register-email"
                class="cinna-auth-input no-button"
                type="email"
                autocomplete="email"
                inputmode="email"
                placeholder="seuemail@exemplo.com"
                required
              >

            </div>

          </div>


          <div class="cinna-auth-field">

            <label
              class="cinna-auth-label"
              for="cinna-register-password"
            >

              Senha

            </label>


            <div class="cinna-auth-input-wrap">

              <input
                id="cinna-register-password"
                class="cinna-auth-input"
                type="password"
                autocomplete="new-password"
                minlength="6"
                placeholder="Mínimo 6 caracteres"
                required
              >


              <button
                class="cinna-auth-password-button"
                type="button"
                data-password-target="cinna-register-password"
                aria-label="Mostrar senha"
              >

                👁️

              </button>

            </div>

          </div>


          <div class="cinna-auth-field">

            <label
              class="cinna-auth-label"
              for="cinna-register-confirm-password"
            >

              Confirmar senha

            </label>


            <div class="cinna-auth-input-wrap">

              <input
                id="cinna-register-confirm-password"
                class="cinna-auth-input"
                type="password"
                autocomplete="new-password"
                minlength="6"
                placeholder="Digite novamente"
                required
              >


              <button
                class="cinna-auth-password-button"
                type="button"
                data-password-target="cinna-register-confirm-password"
                aria-label="Mostrar senha"
              >

                👁️

              </button>

            </div>

          </div>


          <div
            id="cinna-register-message"
            class="cinna-auth-message"
            aria-live="polite"
          ></div>


          <button
            class="cinna-auth-submit"
            type="submit"
          >

            CRIAR CONTA ♡

          </button>


          <p class="cinna-auth-switch-text">

            Já tem uma conta?

            <button
              class="cinna-auth-switch"
              type="button"
              data-open-auth="login"
            >

              Entrar

            </button>

          </p>


        </form>


        <!-- ========================================= -->
        <!-- TEMPORÁRIO -->
        <!-- ========================================= -->

        <div class="cinna-auth-divider">

          POR ENQUANTO

        </div>


        <button
          id="cinna-auth-test-game"
          class="cinna-auth-test-button"
          type="button"
        >

          Continuar testando o jogo sem conta

        </button>


      </section>

    </main>

  `;


  document.body.appendChild(
    authOverlay
  );


  // ====================================================
  // REFERÊNCIAS
  // ====================================================

  const loginTab =
    authOverlay.querySelector(
      "#cinna-login-tab"
    );


  const registerTab =
    authOverlay.querySelector(
      "#cinna-register-tab"
    );


  const loginForm =
    authOverlay.querySelector(
      "#cinna-login-form"
    );


  const registerForm =
    authOverlay.querySelector(
      "#cinna-register-form"
    );


  const subtitle =
    authOverlay.querySelector(
      "#cinna-auth-subtitle"
    );


  const loginMessage =
    authOverlay.querySelector(
      "#cinna-login-message"
    );


  const registerMessage =
    authOverlay.querySelector(
      "#cinna-register-message"
    );


  const testButton =
    authOverlay.querySelector(
      "#cinna-auth-test-game"
    );


  // ====================================================
  // MENSAGENS
  // ====================================================

  function setMessage(
    element,
    text,
    type = ""
  ) {

    element.textContent =
      text;


    element.classList.remove(
      "error",
      "success"
    );


    if (
      type
    ) {

      element.classList.add(
        type
      );

    }

  }


  // ====================================================
  // TROCAR ENTRE LOGIN / CADASTRO
  // ====================================================

  function showAuthMode(
    mode
  ) {

    const isLogin =
      mode === "login";


    loginTab.classList.toggle(
      "active",
      isLogin
    );


    registerTab.classList.toggle(
      "active",
      !isLogin
    );


    loginTab.setAttribute(
      "aria-selected",
      String(isLogin)
    );


    registerTab.setAttribute(
      "aria-selected",
      String(!isLogin)
    );


    loginForm.classList.toggle(
      "active",
      isLogin
    );


    registerForm.classList.toggle(
      "active",
      !isLogin
    );


    subtitle.textContent =

      isLogin

        ? "Bem-vindo de volta ♡"

        : "Crie sua conta e cuide do Cinna ♡";


    setMessage(
      loginMessage,
      ""
    );


    setMessage(
      registerMessage,
      ""
    );

  }


  loginTab.addEventListener(
    "click",
    () => {

      showAuthMode(
        "login"
      );

    }
  );


  registerTab.addEventListener(
    "click",
    () => {

      showAuthMode(
        "register"
      );

    }
  );


  authOverlay
    .querySelectorAll(
      "[data-open-auth]"
    )
    .forEach(

      button => {

        button.addEventListener(

          "click",

          () => {

            showAuthMode(
              button.dataset.openAuth
            );

          }

        );

      }

    );


  // ====================================================
  // MOSTRAR / ESCONDER SENHA
  // ====================================================

  authOverlay
    .querySelectorAll(
      "[data-password-target]"
    )
    .forEach(

      button => {

        button.addEventListener(

          "click",

          () => {

            const input =
              authOverlay.querySelector(
                `#${
                  button.dataset.passwordTarget
                }`
              );


            if (
              !input
            ) {

              return;

            }


            const showing =
              input.type ===
              "text";


            input.type =

              showing

                ? "password"

                : "text";


            button.textContent =

              showing

                ? "👁️"

                : "🙈";


            button.setAttribute(

              "aria-label",

              showing

                ? "Mostrar senha"

                : "Ocultar senha"

            );

          }

        );

      }

    );


  // ====================================================
  // LIMPAR NOME DE USUÁRIO
  // ====================================================

  const usernameInput =
    authOverlay.querySelector(
      "#cinna-register-username"
    );


  usernameInput.addEventListener(

    "input",

    () => {

      let value =
        usernameInput
          .value
          .toLowerCase();


      /*
        Permite:
        letras
        números
        _
        .
      */

      value =
        value.replace(
          /[^a-z0-9_.]/g,
          ""
        );


      usernameInput.value =
        value;

    }

  );


  // ====================================================
  // LOGIN
  // ====================================================

  loginForm.addEventListener(

    "submit",

    event => {

      event.preventDefault();


      const email =
        authOverlay
          .querySelector(
            "#cinna-login-email"
          )
          .value
          .trim();


      const password =
        authOverlay
          .querySelector(
            "#cinna-login-password"
          )
          .value;


      if (
        !email ||
        !password
      ) {

        setMessage(

          loginMessage,

          "Preencha o e-mail e a senha ☁️",

          "error"

        );


        return;

      }


      /*
        A conexão real com Supabase
        entrará aqui no próximo passo.
      */

      setMessage(

        loginMessage,

        "Interface pronta ♡ Agora falta conectar ao Supabase.",

        "success"

      );

    }

  );


  // ====================================================
  // CRIAR CONTA
  // ====================================================

  registerForm.addEventListener(

    "submit",

    event => {

      event.preventDefault();


      const username =
        usernameInput
          .value
          .trim();


      const email =
        authOverlay
          .querySelector(
            "#cinna-register-email"
          )
          .value
          .trim();


      const password =
        authOverlay
          .querySelector(
            "#cinna-register-password"
          )
          .value;


      const confirmPassword =
        authOverlay
          .querySelector(
            "#cinna-register-confirm-password"
          )
          .value;


      if (
        username.length <
        3
      ) {

        setMessage(

          registerMessage,

          "O nome de usuário precisa ter pelo menos 3 caracteres.",

          "error"

        );


        return;

      }


      if (
        !email
      ) {

        setMessage(

          registerMessage,

          "Digite um e-mail válido ☁️",

          "error"

        );


        return;

      }


      if (
        password.length <
        6
      ) {

        setMessage(

          registerMessage,

          "A senha precisa ter pelo menos 6 caracteres.",

          "error"

        );


        return;

      }


      if (
        password !==
        confirmPassword
      ) {

        setMessage(

          registerMessage,

          "As senhas não são iguais 🥲",

          "error"

        );


        return;

      }


      /*
        A criação REAL da conta
        com Supabase entrará aqui.
      */

      setMessage(

        registerMessage,

        `@${username} ficou perfeito ♡ Agora falta conectar ao Supabase!`,

        "success"

      );

    }

  );


  // ====================================================
  // BOTÃO TEMPORÁRIO DE TESTE
  // ====================================================

  testButton.addEventListener(

    "click",

    () => {

      authOverlay.classList.add(
        "auth-hidden"
      );

    }

  );


  // ====================================================
  // API
  // ====================================================

  window.CinnaAuth = {

    open() {

      authOverlay.classList.remove(
        "auth-hidden"
      );

    },


    close() {

      authOverlay.classList.add(
        "auth-hidden"
      );

    },


    login() {

      showAuthMode(
        "login"
      );


      authOverlay.classList.remove(
        "auth-hidden"
      );

    },


    register() {

      showAuthMode(
        "register"
      );


      authOverlay.classList.remove(
        "auth-hidden"
      );

    }

  };

})();
