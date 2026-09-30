// ======================================================
// CINNA AUTH ☁️
// Supabase Auth real
// ======================================================

(() => {

  // ====================================================
  // CONFIGURAÇÃO
  // ====================================================

  const SUPABASE_URL =
    "https://fkyamskqmxbljkwmsgyq.supabase.co";

  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_d5wGpIEKSm7v24nJ7tSkCA_5AXBzb_d";


  // ====================================================
  // VERIFICA SE A BIBLIOTECA CARREGOU
  // ====================================================

  if (
    !window.supabase ||
    typeof window.supabase.createClient !== "function"
  ) {
    console.error(
      "Cinna Auth: Supabase JS não foi carregado."
    );

    return;
  }


  // ====================================================
  // CLIENTE SUPABASE
  // ====================================================

  const supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );


  // ====================================================
  // EVITA DUPLICAR A TELA
  // ====================================================

  const oldAuth =
    document.querySelector(
      "#cinna-auth"
    );

  if (oldAuth) {
    oldAuth.remove();
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

      <div class="cinna-auth-mascot-area">

        <img
          class="cinna-auth-mascot"
          src="assets/sprites/cinna-idle-1.PNG"
          alt="Cinna"
        >

      </div>


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
        <!-- TESTAR SEM CONTA -->
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
  // ABRIR / FECHAR
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

    if (type) {

      element.classList.add(
        type
      );

    }

  }


  // ====================================================
  // BOTÃO CARREGANDO
  // ====================================================

  function setLoading(
    button,
    loading,
    defaultText
  ) {

    button.disabled =
      loading;

    button.textContent =
      loading
        ? "CARREGANDO... ☁️"
        : defaultText;

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
      code === "user_already_exists" ||
      text.includes(
        "already registered"
      )
    ) {

      return "Esse e-mail já possui uma conta ☁️";

    }


    if (
      code === "weak_password"
    ) {

      return "Escolha uma senha mais forte ♡";

    }


    if (
      code === "over_email_send_rate_limit"
    ) {

      return "Muitos e-mails enviados. Espere um pouco e tente novamente ☁️";

    }


    return (
      error?.message ||
      "Algo deu errado 🥲"
    );

  }


  // ====================================================
  // TROCAR ABA
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


            if (!input) {
              return;
            }


            const visible =
              input.type === "text";


            input.type =
              visible
                ? "password"
                : "text";


            button.textContent =
              visible
                ? "👁️"
                : "🙈";

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

      usernameInput.value =
        usernameInput.value
          .toLowerCase()
          .replace(
            /[^a-z0-9_.]/g,
            ""
          );

    }
  );


  // ====================================================
  // LOGIN REAL
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
          await supabaseClient.auth
            .signInWithPassword({
              email,
              password
            });


        if (error) {
          throw error;
        }


        if (
          !data.session
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
          300
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
  // CADASTRO REAL
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


      if (
        username.length < 3
      ) {

        setMessage(
          registerMessage,
          "O nome de usuário precisa ter pelo menos 3 caracteres.",
          "error"
        );

        return;

      }


      if (!email) {

        setMessage(
          registerMessage,
          "Digite um e-mail válido ☁️",
          "error"
        );

        return;

      }


      if (
        password.length < 6
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
          window.location.origin +
          window.location.pathname;


        const {
          data,
          error
        } =
          await supabaseClient.auth
            .signUp({
              email,
              password,

              options: {

                emailRedirectTo:
                  redirectUrl,

                data: {
                  username
                }

              }
            });


        if (error) {
          throw error;
        }


        if (
          data.session
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
            600
          );


          return;

        }


        setMessage(
          registerMessage,
          `Conta criada, @${username}! Confira seu e-mail para confirmar ♡`,
          "success"
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
  // TESTAR SEM CONTA
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
        await supabaseClient.auth
          .getSession();


      if (error) {

        console.warn(
          "Cinna Auth - erro ao verificar sessão:",
          error
        );

        openAuth();

        return;

      }


      if (
        data.session
      ) {

        closeAuth();

      } else {

        openAuth();

      }

    }

    catch (
      error
    ) {

      console.warn(
        "Cinna Auth - erro:",
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

        if (
          event === "SIGNED_IN" &&
          session
        ) {

          closeAuth();

        }


        if (
          event === "SIGNED_OUT"
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
  // API
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
        await supabaseClient.auth
          .getUser();


      if (error) {
        return null;
      }


      return (
        data.user ||
        null
      );

    },


    async signOut() {

      const {
        error
      } =
        await supabaseClient.auth
          .signOut();


      if (error) {

        console.error(
          "Erro ao sair:",
          error
        );

        return false;

      }


      return true;

    }

  };

})();
