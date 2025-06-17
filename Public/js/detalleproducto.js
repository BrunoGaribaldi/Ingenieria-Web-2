document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const parts = path.split("/");
  const id = parts[3];

  try {
    const res = await axios.get(`/products/api/list/${id}`);
    const producto = res.data;

    const titleText = (document.getElementById("titulo").textContent =
      producto.categoria + " " + producto.modelo);

    const imagen = document.getElementById("imagen");
    imagen.src = "/Uploads/" + producto.foto;
    imagen.style.width = "100vw";

    const descripcion = (document.getElementById("descripcion").textContent =
      producto.descripcion);

    const precio = (document.getElementById("precio").textContent = `${Number(
      producto.precio
    ).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })}`);

    const genero = (document.getElementById("genero").textContent =
      producto.genero);

    const marca = (document.getElementById("marca").textContent =
      producto.marca);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  }

  // CARRUSEL DE ACCESORIOS CON 8 PRODUCTOS ALEATORIOS
  try {
    const res = await axios.get("/products/api/list");
    const productos = res.data.productos;

    // Tomamos 8 productos aleatorios
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
              <button class="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle">
                <i class="bi bi-heart"></i>
              </button>
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

  //enable del boton
  const token = localStorage.getItem("token");
  const botonReserva = document.getElementById("boton-reserva");
  token
    ? botonReserva.classList.remove("disabled")
    : botonReserva.classList.add("disabled");


//creacion de reserva
  botonReserva.addEventListener("click", function () {
    const path = window.location.pathname;
    const parts = path.split("/"); //queda en un array
    const id = parts[3]; //obtenemos id del producto obtenido desde la url.
    const res = axios.post(
      `/reserva/crear-reserva/${id}`,
      {}, // body vacío, o pon los datos que necesites enviar
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      
    } catch(err) {
        document.writeln(err)
    }
  });
});
