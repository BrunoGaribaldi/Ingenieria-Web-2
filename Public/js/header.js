function renderHeader() {
  const headerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div class="container-md">
        <!-- Logo -->
        <a class="navbar-brand" href="/">
          <img
            id="agape-logo"
            src="/Images/logo.png"
            alt="Logo"
            width="200px"
            height=""
            class="d-inline-block align-text-top me-2"
          />
        </a>

        <!-- Botón para menú colapsable en móviles -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Enlaces -->
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul class="navbar-nav align-items-center mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/products">Ver Productos</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/about-us">Sobre nosotros</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="login" href="/user/login"
                >Iniciar Sesión</a
              >
            </li>
            <li class="nav-item">
              <a
                class="btn custom-red-btn btn-lg shadow-lg px-4"
                href="/user/signup"
                id="signup"
                style="font-weight: 600; transition: background-color 0.3s ease"
              >
                Registrate
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onclick="logout" id="logout" href="/"
                >Cerrar Sesión</a
              >
            </li>
            <!-- la idea es que ver mi cuenta solo aparezca cuando ya hemos iniciado sesión, sino no.-->
            <li class="nav-item">
              <a class="nav-link" id="my-account" href="/my-account">Ver mi cuenta</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-danger" id="admin" href="/admin">Ver vista de administrador</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  `;
  // Inserta el header al principio del body
  document.body.insertAdjacentHTML("afterbegin", headerHTML);
}

//aca se muestra o esconde las opciones de inicio de sesion
document.addEventListener("DOMContentLoaded", function () {
  renderHeader(); // <-- Inserta el header dinámicamente

  token = localStorage.getItem("token");
  admin = localStorage.getItem("admin");

  let login = document.getElementById("login");
  let signup = document.getElementById("signup");
  let adminText = document.getElementById("admin");
  let myAccount = document.getElementById("my-account");

  if (token) {
    login.classList.add("invisible");
    signup.classList.add("invisible");

    myAccount.classList.remove("invisible");
    logout.classList.remove("invisible");
  } else {
    //usuario logueado
    logout.classList.add("invisible");
    myAccount.classList.add("invisible");

    login.classList.remove("invisible");
    signup.classList.remove("invisible");
  }

  //link de admin
  if (admin == 1) {
    adminText.classList.remove("invisible");
  } else {
    adminText.classList.add("invisible");
  }
  document.getElementById("logout").addEventListener("click", async () => {
    //removemos el token
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    //mostramos devuelta las opciones
    login.classList.remove("invisible");
    signup.classList.remove("invisible");
    logout.classList.add("invisible");

    try {
      const response = await axios.post("http://localhost:3000/user/logout");
    } catch (err) {
      console.log(err);
    }
  });
});
