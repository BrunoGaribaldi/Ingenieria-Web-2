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
            <li class="nav-item">
              <button class="nav-link text-danger" id="admin">Ver vista de administrador</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  `;
  // Inserta el header al principio del body
  document.body.insertAdjacentHTML("afterbegin", headerHTML);
}
function renderFooter() {
  const footerHTML = `
    <!-- footer de la pagina-->
    <footer class="bg-dark text-white mt-5 pt-5 pb-3">
      <div class="container text-center">
        <div class="row justify-content-center">
          <!-- Contacto -->
          <div class="col-12 col-md-4 mb-4">
            <p class="mb-1">
              Email:
              <a
                href="mailto:contacto@tuempresa.com"
                class="text-white text-decoration-underline"
                >contacto@tuempresa.com</a
              >
            </p>
            <p class="mb-1">Tel: +54 11 1234 5678</p>
            <p class="mb-1">
              Ubicación: San Martín 342 H3700BJH Sáenz Peña Chaco
            </p>
          </div>

          <!-- Enlaces útiles -->
          <div class="col-12 col-md-4 mb-4">
            <h5 class="fw-bold mb-3">Enlaces</h5>
            <ul class="list-unstyled">
              <li>
                <a
                  href="#inicio"
                  class="text-white text-decoration-none d-block mb-1"
                  >Inicio</a
                >
              </li>
              <li>
                <a
                  href="#productos"
                  class="text-white text-decoration-none d-block mb-1"
                  >Productos</a
                >
              </li>
              <li>
                <a
                  href="#clientes"
                  class="text-white text-decoration-none d-block mb-1"
                  >Clientes</a
                >
              </li>
              <li>
                <a
                  href="#nosotros"
                  class="text-white text-decoration-none d-block"
                  >Nosotros</a
                >
              </li>
            </ul>
          </div>

          <!-- Redes sociales -->
          <div class="col-12 col-md-4 mb-4">
            <h5 class="fw-bold mb-3">Seguinos</h5>
            <div class="d-flex justify-content-center gap-3">
              <a
                href="https://facebook.com"
                class="text-white fs-4"
                aria-label="Facebook"
              >
                <i class="bi bi-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                class="text-white fs-4"
                aria-label="Instagram"
              >
                <i class="bi bi-instagram"></i>
              </a>
              <a
                href="https://twitter.com"
                class="text-white fs-4"
                aria-label="Twitter"
              >
                <i class="bi bi-twitter-x"></i>
              </a>
            </div>
          </div>
        </div>

        <hr class="border-light my-4" />

        <div class="text-center">
          <small class="text-secondary"
            >© 2025 Tu Empresa. Todos los derechos reservados.</small
          >
        </div>
      </div>
    </footer>`;
  // Inserta el footer al final del body
  document.body.insertAdjacentHTML("beforeend", footerHTML);
}

//aca se muestra o esconde las opciones de inicio de sesion
document.addEventListener("DOMContentLoaded", function () {
  renderHeader();
  renderFooter();

  token = localStorage.getItem("token");
  admin = localStorage.getItem("admin");

  let login = document.getElementById("login");
  let signup = document.getElementById("signup");
  let adminText = document.getElementById("admin");

  if (token) {
    login.classList.add("invisible");
    signup.classList.add("invisible");

    logout.classList.remove("invisible");
  } else {
    //usuario logueado
    logout.classList.add("invisible");

    login.classList.remove("invisible");
    signup.classList.remove("invisible");
  }

  //link de admin
  if (admin == 1) {
    adminText.classList.remove("invisible");
  } else {
    adminText.classList.add("invisible");
  }

  document.getElementById("admin").addEventListener("click", function () {
    //a veces como guardo en el local storage y en la session si es admin, la session se borra y sigue en el local storage
    //por eso ahora, le voy a pasar por las dudas el admin del local storage para que no se descordine
    const usuario = localStorage.getItem("admin");

    if (usuario) {
      axios
        .get("http://localhost:3000/admin/session", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Sesión activa:", res.data.usuario);
          window.location.href = "/admin";
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            console.log("Sesión expirada, borrando localStorage...");
            localStorage.removeItem("admin");
            localStorage.removeItem("token");

            //redirigimos al login
            window.location.href = "/user/login";
          }
        });
    }
  });

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
