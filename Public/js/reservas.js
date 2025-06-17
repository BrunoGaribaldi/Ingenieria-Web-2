document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const parts = path.split("/");
  const id = parts[3];
  const response = await axios.get(`/reserva/api/list-reserva/${id}`);

  try {
    const reservas = response.data.reservas;
    const divPadre = document.getElementById("container-cards");
    reservas.forEach((reserva) => {
      console.log("====================================");
      console.log(reserva);
      console.log("====================================");
      //carta general
      const divCard = document.createElement("div");
      divCard.classList.add("d-flex", "border", "border-secondary", "my-3");
      divCard.style.height = "33vh";
      divCard.style.maxHeight = "200px";
      divCard.style.borderRadius = "15px";

      //parte imagen
      const divImagen = document.createElement("div");
      divImagen.classList.add("col-2");

      const imagen = document.createElement("img");
      imagen.src = "/Uploads/" + reserva.producto.foto;
      imagen.style.width = "100%";
      imagen.style.height = "100%";
      imagen.style.objectFit = "cover";
      imagen.style.borderRadius = "10px";
      divImagen.appendChild(imagen);

      //parte texto
      const divTexto = document.createElement("div");
      divTexto.classList.add(
        "col-10",
        "d-flex",
        "flex-column",
        "px-4",
        "py-5",
        "ml-4"
      );

      const titulo = document.createElement("h4");
      titulo.innerHTML = reserva.producto.modelo;
      titulo.style.fontFamily = "Montserrat, sans-serif";

      const precio = document.createElement("p");
      precio.innerHTML = "Monto: $" + reserva.producto.precio;
      precio.style.fontFamily = "Montserrat, sans-serif";
      precio.classList.add("mb-1");
      const fecha = document.createElement("p");

      fecha.innerHTML =
        "Fecha: " + new Date(reserva.createdAt).toLocaleDateString("es-AR");
      fecha.style.fontFamily = "Montserrat, sans-serif";
      divTexto.append(titulo, precio, fecha);

      //appends de divs
      divCard.append(divImagen, divTexto);
      divPadre.appendChild(divCard);
    });
  } catch (err) {}
});
