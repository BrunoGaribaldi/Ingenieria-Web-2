//aca se muestra o esconde las opciones de inicio de sesion
 document.addEventListener("DOMContentLoaded", function () {
        token = localStorage.getItem("token");

        let login = document.getElementById("login");
        let signup = document.getElementById("signup");

        if (token) {
          login.classList.add("invisible");
          signup.classList.add("invisible");
          logout.classList.remove("invisible")

        } else {
          logout.classList.add("invisible")
          login.classList.remove("invisible");
          signup.classList.remove("invisible");
        }

        document.getElementById("logout").addEventListener("click", () => {
          //removemos el token
          localStorage.removeItem("token");
          //mostramos devuelta las opciones
          login.classList.remove("invisible");
          signup.classList.remove("invisible");
          logout.classList.add("invisible")
        });
      });