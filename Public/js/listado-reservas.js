document.addEventListener("DOMContentLoaded", async function () {
  //graficos
  const stats = await axios.get("/admin/api/reservas/stats");

  const dias = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log("====================================");
  console.log(stats);
  console.log("====================================");
  const reservasRes = stats.data.barColumn;

  const completo = dias.map((dia, idx) => {
    const encontrado = reservasRes.find((d) => d.dia === dia);
    return {
      dia, // nombre del día
      numero_dia: idx + 1, // 1-7 según DAYOFWEEK
      numero: encontrado ? encontrado.numero : 0,
    };
  });
  var options = {
    chart: {
      type: "bar",
      height: 200,
    },
    series: [
      {
        name: "Reservas",
        data: completo.map((x) => x.numero),
      },
    ],
    xaxis: {
      categories: dias,
    },
  };

  var chart = new ApexCharts(
    document.querySelector("#div-column-chart"),
    options
  );
  chart.render();

  //grafico de barra
  const reservasRes2 = stats.data.bar;
  var options2 = {
    chart: {
      type: "bar",
      height: 200,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ["#00E396"],
    series: [
      {
        name: "Cantidad de reservas",
        data: reservasRes2.map((item) => ({
          x: item.nom,
          y: Number(item.numero),
        })),
      },
    ],
  };

  var chart2 = new ApexCharts(
    document.querySelector("#div-column-chart-2"),
    options2
  );
  chart2.render();

  cargarReservas(1);

  document.getElementById("btn-buscar").addEventListener("click", () => {
  const valorBusqueda = document.getElementById("busqueda-cliente").value.trim();
  cargarReservas(1, valorBusqueda); // Cargar desde página 1 con búsqueda
  });

});

async function cargarReservas(pagina, cliente = '') {
  const limit = 10;
  console.log('/////////////////////////////////////////');
  console.log(cliente);
  console.log('/////////////////////////////////////////');

  const params = new URLSearchParams({
    //crea un objeto como esto: ?page=1&limit=10
    page: pagina,
    limit,
    cliente,
  });

  const res = await axios.get(`/admin/api/reservas/list?${params.toString()}`);
  const data = res.data;

  reservas = data.reservas;
  renderizarReservas(reservas);

  // Actualizar el paginador
  renderizarPaginador(data.page, data.totalPages, cliente);
}

function renderizarPaginador(paginaActual, totalPaginas, cliente = "") {
  const contenedor = document.getElementById("contenedor-paginador");
  contenedor.innerHTML = "";
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Page navigation");
  const ul = document.createElement("ul");
  ul.className = "pagination justify-content-center";

  const liAnterior = document.createElement("li");
  liAnterior.className = `page-item ${paginaActual === 1 ? "disabled" : ""}`;
  liAnterior.innerHTML = `<a class="page-link" href="#" onclick="cargarReservas(${paginaActual - 1}, '${cliente}')">Anterior</a>`;
  ul.appendChild(liAnterior);

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === paginaActual ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#" onclick="cargarReservas(${i}, '${cliente}')">${i}</a>`;
    ul.appendChild(li);
  }

  const liSiguiente = document.createElement("li");
  liSiguiente.className = `page-item ${paginaActual === totalPaginas ? "disabled" : ""}`;
  liSiguiente.innerHTML = `<a class="page-link" href="#" onclick="cargarReservas(${paginaActual + 1}, '${cliente}')">Siguiente</a>`;
  ul.appendChild(liSiguiente);

  nav.appendChild(ul);
  contenedor.appendChild(nav);
}



//////////

function renderizarReservas(reservas) {
  const divPadre = document.getElementById("container-reservas");
  divPadre.innerHTML = "";
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
    texto.textContent = "No hay reservas :(";
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
      "py-1",
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
    precio.classList.add("mb-1");

    const fecha = document.createElement("p");
    fecha.classList.add("fw-light");
    fecha.innerHTML = new Date(reserva.createdAt).toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    //cliente
    const cliente = document.createElement("p");
    cliente.innerHTML =
      "Cliente: " + reserva.usuario.nombre + " " + reserva.usuario.apellido;
    cliente.classList.add("mb-1");

    const contacto = document.createElement("p");
    contacto.innerHTML = "Contacto: " + reserva.usuario.email;
    contacto.classList.add("mb-2");

    divTexto.append(titulo, precio, cliente, contacto, fecha);

    //appends de divs
    divCard.append(divImagen, divTexto);
    divPadre.appendChild(divCard);
  });
}
