//aca me va a llegar el token de inicio de sesion
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      //previene la accion por defecto del dubmit form
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await axios.post("http://localhost:3000/user/login", {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        window.location.href = "http://localhost:3000/";
      } catch (err) {
        let textErrorPassword = document.getElementById("error-password");
        let textErrorEmail = document.getElementById("error-email");
        //al recargarse la pagina hay que asegurarse de que los errores revios ya no esten

        textErrorEmail.innerHTML = "";
        textErrorPassword.innerHTML = "";
        if (err.response.data.code == "EMAIL_NOT_FOUND") {
          textErrorEmail.innerHTML = `Error: ${err.response?.data?.error}`;
        } else {
          if (err.response.data.code == "INCORRECT_PASSWORD") {
            //pass incorrecta
            textErrorPassword.innerHTML = `${err.response?.data?.error}`;
          } else {
            //algun otro errr
            textErrorEmail.innerHTML = `${err.message}`;
          }
        }
      }
    });
});
