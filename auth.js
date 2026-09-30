// ======================================================
// CINNA AUTH ☁️
// Login e cadastro com Supabase
// ======================================================

(() => {

  // ====================================================
  // CONFIGURAÇÃO DO SUPABASE
  // ====================================================

  const SUPABASE_URL =
    "https://pfklbfnmqwcivzmigjuz.supabase.co";


  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBma2xiZm5tcXdjaXZ6bWlnanV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3MzA4MTEsImV4cCI6MjEwNjMwNjgxMX0.Bjt-sSxNRmu3aCE8ECDdvZwBJlUuy3d4xKuMhtiFNEA";


  // ====================================================
  // VERIFICA BIBLIOTECA
  // ====================================================

  if (
    !window.supabase ||
    typeof window.supabase.createClient !==
      "function"
  ) {

    console.error(
      "Cinna Auth: Supabase JS não foi carregado."
    );

    return;

  }


  // ====================================================
  // CRIA CLIENTE
  // ====================================================

  const supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );


  console.log(
    "☁️ Supabase conectado ao Cinna."
  );


  // ====================================================
  // EVITA DUPLICAR A TELA
  // ====================================================

  const oldAuth =
    document.querySelector(
      "#cinna-auth"
    );


  if (
    oldAuth
  ) {

    oldAuth.remove();

  }


  // ====================================================
  // CRIA INTERFACE
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


        <!-- ========================================= -->
        <!-- ABAS -->
        <!-- ========================================= -->

        <div
          class="cinna-auth-tabs"
          role="tablist"
        >

          <button
            id="cinna-login-tab"
            class="cinna-auth-tab active"
            type="button"
          >

            ENTRAR

          </button>


          <button
            id="cinna-register-tab"
            class="cinna-auth-tab"
            type="button"
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
            id="cinna-login-submit"
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
        <!-- CRIAR CONTA -->
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
                minlength="3"
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
            id="cinna-register-submit"
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
        <!-- MODO TESTE -->
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
  // ELEMENTOS
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


  const loginButton =
    authOverlay.querySelector(
      "#cinna-login-submit"
    );


  const registerButton =
    authOverlay.querySelector(
      "#cinna-register-submit"
    );


  const testButton =
    authOverlay.querySelector(
      "#cinna-auth-test-game"
    );


  const usernameInput =
    authOverlay.querySelector(
      "#cinna-register-username"
    );


  // ====================================================
  // ABRIR / FECHAR AUTH
  // ====================================================

  function openAuth() {

    authOverlay.classList.remove(
      "auth-hidden"
    );

  }


  function closeAuth() {

    authOverlay.classList.add(
      "auth-hidden"
    );

  }


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
  // CARREGAMENTO
  // ====================================================

  function setLoading(
    button,
    loading,
    normalText
  ) {

    button.disabled =
      loading;


    button.textContent =

      loading

        ? "CARREGANDO... ☁️"

        : normalText;

  }


  // ====================================================
  // TRADUZ ERROS
  // ====================================================

  function translateAuthError(
    error
  ) {

    const code =
      error?.code || "";


    const text =
      (
        error?.message ||
        ""
      ).toLowerCase();


    if (
      code === "invalid_credentials" ||
      text.includes(
        "invalid login credentials"
      )
    ) {

      return "E-mail ou senha incorretos 🥲";

    }


    if (
      code === "email_not_confirmed" ||
      text.includes(
        "email not confirmed"
      )
    ) {

      return "Confirme seu e-mail antes de entrar ♡";

    }


    if (
      text.includes(
        "user already registered"
      ) ||
      text.includes(
        "already registered"
      )
    ) {

      return "Esse e-mail já possui uma conta ☁️";

    }


    if (
      code === "weak_password" ||
      text.includes(
        "password should be"
      )
    ) {

      return "Escolha uma senha um pouco mais forte ♡";

    }


    if (
      text.includes(
        "rate limit"
      )
    ) {

      return "Muitas tentativas. Espere um pouco e tente novamente ☁️";

    }


    if (
      text.includes(
        "invalid api key"
      )
    ) {

      return "A chave do Supabase não foi aceita 🥲";

    }


    if (
      text.includes(
        "failed to fetch"
      )
    ) {

      return "Não consegui alcançar o Supabase. Verifique a internet ☁️";

    }


    return (
      error?.message ||
      "Algo deu errado 🥲"
    );

  }


  // ====================================================
  // TROCAR LOGIN / CADASTRO
  // ====================================================

  function showAuthMode(
    mode
  ) {

    const isLogin =
      mode ===
      "login";


    loginTab.classList.toggle(
      "active",
      isLogin
    );


    registerTab.classList.toggle(
      "active",
      !isLogin
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


            const isVisible =
              input.type ===
              "text";


            input.type =

              isVisible

                ? "password"

                : "text";


            button.textContent =

              isVisible

                ? "👁️"

                : "🙈";


            button.setAttribute(

              "aria-label",

              isVisible

                ? "Mostrar senha"

                : "Ocultar senha"

            );

          }
        );

      }

    );


  // ====================================================
  // USERNAME
  // ====================================================

  usernameInput.addEventListener(
    "input",
    () => {

      let value =
        usernameInput
          .value
          .toLowerCase();


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
    async event => {

      event.preventDefault();


      const email =
        authOverlay
          .querySelector(
            "#cinna-login-email"
          )
          .value
          .trim()
          .toLowerCase();


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


      setMessage(
        loginMessage,
        ""
      );


      setLoading(
        loginButton,
        true,
        "ENTRAR ☁️"
      );


      try {

        const {
          data,
          error
        } =
          await supabaseClient
            .auth
            .signInWithPassword({
              email,
              password
            });


        if (
          error
        ) {

          throw error;

        }


        if (
          !data?.session
        ) {

          setMessage(
            loginMessage,
            "Não foi possível iniciar a sessão 🥲",
            "error"
          );

          return;

        }


        setMessage(
          loginMessage,
          "Entrando... ♡",
          "success"
        );


        setTimeout(
          () => {

            closeAuth();

          },
          350
        );

      }

      catch (
        error
      ) {

        console.error(
          "Cinna Auth - erro no login:",
          error
        );


        setMessage(
          loginMessage,
          translateAuthError(
            error
          ),
          "error"
        );

      }

      finally {

        setLoading(
          loginButton,
          false,
          "ENTRAR ☁️"
        );

      }

    }
  );


  // ====================================================
  // CRIAR CONTA
  // ====================================================

  registerForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const username =
        usernameInput
          .value
          .trim()
          .toLowerCase();


      const email =
        authOverlay
          .querySelector(
            "#cinna-register-email"
          )
          .value
          .trim()
          .toLowerCase();


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


      // ================================================
      // VALIDAÇÕES
      // ================================================

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


      setMessage(
        registerMessage,
        ""
      );


      setLoading(
        registerButton,
        true,
        "CRIAR CONTA ♡"
      );


      try {

        const redirectUrl =
          `${window.location.origin}${window.location.pathname}`;


        const {
          data,
          error
        } =
          await supabaseClient
            .auth
            .signUp({

              email,

              password,

              options: {

                emailRedirectTo:
                  redirectUrl,

                data: {

                  username:
                    username

                }

              }

            });


        if (
          error
        ) {

          throw error;

        }


        // ==============================================
        // SUPABASE CRIOU SESSÃO IMEDIATAMENTE
        // ==============================================

        if (
          data?.session
        ) {

          setMessage(
            registerMessage,
            `Conta criada, @${username}! ♡`,
            "success"
          );


          setTimeout(
            () => {

              closeAuth();

            },
            650
          );


          return;

        }


        // ==============================================
        // PRECISA CONFIRMAR E-MAIL
        // ==============================================

        if (
          data?.user
        ) {

          setMessage(
            registerMessage,
            `Conta criada, @${username}! Confira seu e-mail para confirmar ♡`,
            "success"
          );


          registerForm.reset();


          return;

        }


        setMessage(
          registerMessage,
          "Não consegui finalizar o cadastro 🥲",
          "error"
        );

      }

      catch (
        error
      ) {

        console.error(
          "Cinna Auth - erro no cadastro:",
          error
        );


        setMessage(
          registerMessage,
          translateAuthError(
            error
          ),
          "error"
        );

      }

      finally {

        setLoading(
          registerButton,
          false,
          "CRIAR CONTA ♡"
        );

      }

    }
  );


  // ====================================================
  // CONTINUAR SEM CONTA
  // ====================================================

  testButton.addEventListener(
    "click",
    () => {

      closeAuth();

    }
  );


  // ====================================================
  // VERIFICA SESSÃO EXISTENTE
  // ====================================================

  async function checkExistingSession() {

    try {

      const {
        data,
        error
      } =
        await supabaseClient
          .auth
          .getSession();


      if (
        error
      ) {

        console.warn(
          "Cinna Auth - erro ao verificar sessão:",
          error
        );


        openAuth();

        return;

      }


      if (
        data?.session
      ) {

        closeAuth();

      }

      else {

        openAuth();

      }

    }

    catch (
      error
    ) {

      console.warn(
        "Cinna Auth - erro ao carregar sessão:",
        error
      );


      openAuth();

    }

  }


  // ====================================================
  // ESCUTA LOGIN / LOGOUT
  // ====================================================

  supabaseClient.auth
    .onAuthStateChange(
      (
        event,
        session
      ) => {

        console.log(
          "Cinna Auth:",
          event
        );


        if (
          event ===
            "SIGNED_IN" &&
          session
        ) {

          closeAuth();

        }


        if (
          event ===
          "SIGNED_OUT"
        ) {

          showAuthMode(
            "login"
          );


          openAuth();

        }

      }
    );


  // ====================================================
  // INICIALIZA
  // ====================================================

  checkExistingSession();


  // ====================================================
  // API PARA OS OUTROS ARQUIVOS
  // ====================================================

  window.CinnaAuth = {

    client:
      supabaseClient,


    open() {

      openAuth();

    },


    close() {

      closeAuth();

    },


    login() {

      showAuthMode(
        "login"
      );


      openAuth();

    },


    register() {

      showAuthMode(
        "register"
      );


      openAuth();

    },


    async getUser() {

      const {
        data,
        error
      } =
        await supabaseClient
          .auth
          .getUser();


      if (
        error
      ) {

        console.warn(
          "Erro ao buscar usuário:",
          error
        );


        return null;

      }


      return (
        data?.user ||
        null
      );

    },


    async getSession() {

      const {
        data,
        error
      } =
        await supabaseClient
          .auth
          .getSession();


      if (
        error
      ) {

        return null;

      }


      return (
        data?.session ||
        null
      );

    },


    async signOut() {

      const {
        error
      } =
        await supabaseClient
          .auth
          .signOut();


      if (
        error
      ) {

        console.error(
          "Erro ao sair:",
          error
        );


        return false;

      }


      return true;

    }

  };


  // ====================================================
  // DEBUG
  // ====================================================

  window.CinnaSupabase =
    supabaseClient;

})();
