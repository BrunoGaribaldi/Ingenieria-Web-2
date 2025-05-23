//aca se muestra o esconde las opciones de inicio de sesion
document.addEventListener("DOMContentLoaded", function () {
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
  document.getElementById("logout").addEventListener("click",async () => {
    //removemos el token
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    //mostramos devuelta las opciones
    login.classList.remove("invisible");
    signup.classList.remove("invisible");
    logout.classList.add("invisible");

    try{
    const response =await axios.post("http://localhost:3000/user/logout")

    }
    catch(err){

      console.log(err);
      
    }
  });
});
