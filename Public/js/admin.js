document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      "http://localhost:3000/admin/",{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Puedes manejar la respuesta aquí si lo necesitas
    console.log(res.data);
  } catch (err) {
    console.error("Error al acceder al panel de admin:", err);
    // Opcional: redirigir si no está autorizado
    if (err.response && err.response.status === 401) {
      window.location.href = "/user/login";
    }
  }
});