//aca me va a llegar el token de inicio de sesion
document.addEventListener("DOMContentLoaded", () => {
  console.log("login.js cargado correctamente");
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
        localStorage.setItem("token", res.token);
        alert(`Bienvenido, ${res.data.user.nombre}`);
      } catch (err) {
        alert(`Error: ${err.response?.data?.error || err.message}`);
      }
    });
});
