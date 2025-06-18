document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const parts = path.split("/");
  const id = parts[3];
  const response = await axios.get(`/reserva/api/list-reserva/${id}`);

  try {
    const reservas = response.data.reservas;
    const divPadre = document.getElementById("container-cards");

    //si no tiene resercas

    if (reservas.length == 0) {
      const divFoto = document.createElement("div");
      divFoto.classList.add(
        "d-flex",
        "justify-content-center",
        "align-items-center",
        "flex-column",
        "position-relative"
      );
      divFoto.style.height = "300px"; // ajusta el alto según tu diseño

      // Texto arriba de la imagen
      const texto = document.createElement("span");
      texto.textContent = "No tienes reservas :(";
      texto.classList.add(
        "position-absolute",
        "top-50",
        "start-50",
        "translate-middle",
        "fs-4",
        "fw-bold",
        "text-dark"
      );
      texto.style.zIndex = "2";

      // Imagen con opacidad
      const fotoGatito = document.createElement("img");
      fotoGatito.src = "/Images/cat.png";
      fotoGatito.style.opacity = "0.4";
      fotoGatito.style.maxHeight = "250px";
      fotoGatito.style.objectFit = "contain";
      fotoGatito.classList.add("w-auto");

      divFoto.append(fotoGatito, texto);
      divPadre.append(divFoto);
    }
    reservas.forEach((reserva) => {
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
        "justify-content-center",
        "px-4",
        "py-3",
        "ml-4"
      );

      const titulo = document.createElement("h4");
      titulo.innerHTML = reserva.producto.modelo;
      titulo.style.fontFamily = "Montserrat, sans-serif";

      const precio = document.createElement("p");
      precio.innerHTML =
        "Monto: " +
        Number(reserva.producto.precio).toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 2,
        });
      precio.style.fontFamily = "Montserrat, sans-serif";
      precio.classList.add("mb-1");

      const fecha = document.createElement("p");
      fecha.classList.add("fw-light");
      fecha.innerHTML = new Date(reserva.createdAt).toLocaleDateString(
        "es-AR",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      fecha.style.fontFamily = "Montserrat, sans-serif";

      const boton = document.createElement("button");
      boton.classList.add("btn", "btn-danger", "w-25");

      const i = document.createElement("i");
      i.classList.add("bi", "bi-cart-dash", "px-1");
      boton.append(i, "Cancelar reserva");

      //logica de boton
      boton.addEventListener("click", async function () {
        try {
          await axios.post(
            `/reserva/delete-reserva/${reserva.producto.id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const idUsuario = localStorage.getItem("id");
          window.location.href = `/reserva/list-reserva/${idUsuario}`;
        } catch (err) {
          //token expiro
          console.log("====================================");
          console.log(err);
          console.log("====================================");
        }
      });
      divTexto.append(titulo, precio, fecha, boton);

      //appends de divs
      divCard.append(divImagen, divTexto);
      divPadre.appendChild(divCard);
    });
  } catch (err) {}
});
