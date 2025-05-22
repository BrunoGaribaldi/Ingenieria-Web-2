document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("signup-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await axios.post("http://localhost:3000/user/signup", {
          nombre,
          apellido,
          email,
          password,
        });
        //creo el token y lo guardo en el local storage
        localStorage.setItem("token", res.data.token);
        window.location.href = "http://localhost:3000/";
      } catch (err) {
        let textErrorPassword = document.getElementById("error-password");
        let textErrorEmail = document.getElementById("error-email");
        let textErrorNombre = document.getElementById("error-nombre");
        let textErrorApellido = document.getElementById("error-apellido");
        //al recargarse la pagina hay que asegurarse de que los errores revios ya no esten

        textErrorEmail.innerHTML = "";
        textErrorPassword.innerHTML = "";
        textErrorNombre.innerHTML = "";
        textErrorApellido.innerHTML = "";

       // Si el backend responde con errores de express-validator
        if (err.response && Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach(error => {
                if (error.path === "email") {
                    textErrorEmail.innerHTML = error.msg;
                }
                if (error.path === "password") {
                    textErrorPassword.innerHTML = error.msg;
                }
                if (error.path === "nombre") {
                    textErrorNombre.innerHTML = error.msg;
                }
                if (error.path === "apellido") {
                    textErrorApellido.innerHTML = error.msg;
                }
            });
        } else if (err.response && err.response.data.code == "EMAIL_ALREADY_REGISTERED") {
            textErrorEmail.innerHTML = `${err.response?.data?.error}`;
        } else {
            textErrorEmail.innerHTML = `${err.message}`;
        }
        
      }
    });
});
