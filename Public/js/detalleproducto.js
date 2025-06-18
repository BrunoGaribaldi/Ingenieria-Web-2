document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const parts = path.split("/");
  const id = parts[3];

  // Cargar datos del producto
  try {
    const res = await axios.get(`/products/api/list/${id}`);
    const producto = res.data;

    document.getElementById(
      "titulo"
    ).textContent = `${producto.categoria} ${producto.modelo}`;
    const imagen = document.getElementById("imagen");
    imagen.src = "/Uploads/" + producto.foto;
    imagen.style.width = "100vw";
    document.getElementById("descripcion").textContent = producto.descripcion;
    document.getElementById("precio").textContent = Number(
      producto.precio
    ).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });
    document.getElementById("genero").textContent = producto.genero;
    document.getElementById("marca").textContent = producto.marca;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  }

  // Cargar productos para el carrusel
  try {
    const res = await axios.get("/products/api/list");
    const productos = res.data.productos;
    const productosAleatorios = productos
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
    const carouselInner = document.getElementById("carousel-inner-accesorios");

    for (let i = 0; i < productosAleatorios.length; i += 4) {
      const grupo = productosAleatorios.slice(i, i + 4);
      const item = document.createElement("div");
      item.className = `carousel-item ${i === 0 ? "active" : ""}`;
      const row = document.createElement("div");
      row.className = "row";

      grupo.forEach((producto) => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        col.innerHTML = `
          <a href="/products/list/${
            producto.id
          }" class="text-decoration-none text-dark">
            <div class="card product-card shadow-sm position-relative h-100">
             
              <img src="/Uploads/${producto.foto}" class="card-img-top" alt="${
          producto.modelo
        }" style="height: 40vh; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title mb-1">${producto.modelo}</h5>
                <p class="text-muted mb-1">Categoría: ${producto.categoria}</p>
                <p class="fw-bold">${Number(producto.precio).toLocaleString(
                  "es-AR",
                  {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  }
                )}</p>
              </div>
            </div>
          </a>
        `;
        row.appendChild(col);
      });

      item.appendChild(row);
      carouselInner.appendChild(item);
    }
  } catch (error) {
    console.error("Error cargando productos para el carrusel:", error);
  }

  // Habilitar/deshabilitar botón de reserva según token
  const token = localStorage.getItem("token");
  const botonReserva = document.getElementById("boton-reserva");
  const textLog = document.getElementById("logeate")
  const botonCancelarReserva = document.getElementById(
    "boton-cancelar-reserva"
  );

  //que boton mostrar
  const idUsuario = localStorage.getItem("id");
  const responseReservado = await axios.get(
    "/reserva/api/check-reserva/" + id + "/" + idUsuario
  );
  const reservado = responseReservado.data;

  if (botonReserva) {
    if (token) {
      //usuario registrado, decido que boton mostrar
      textLog.classList.add("invisible")
      if (reservado) {
        botonCancelarReserva.classList.remove("invisible");
        botonCancelarReserva.classList.remove("disabled");

        botonReserva.classList.add("invisible");
      } else {
        botonReserva.classList.remove("disabled");
        botonReserva.removeAttribute("disabled");
      }
    } else {
      textLog.classList.remove("invisible")
      botonReserva.classList.add("disabled");
      botonReserva.setAttribute("disabled", "disabled");
    }

    //Evento de cancelar reserva
    botonCancelarReserva.addEventListener("click", async function () {
      try {
        await axios.post(
          `/reserva/delete-reserva/${id}`,
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
        console.log('====================================');
        console.log(err);
        console.log('====================================');
       
      }
    });
    // Evento de reserva
    botonReserva.addEventListener("click", async function () {
      try {
        await axios.post(
          `/reserva/crear-reserva/${id}`,
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
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("admin");

        window.location.href = "/user/login";
      }
    });
  }
});
