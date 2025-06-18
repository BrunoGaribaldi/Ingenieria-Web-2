document.addEventListener("DOMContentLoaded", async () => {

    try{

    
        await cargarOpcionesDeFiltros();
        
        cargarProductos(1); //por defecto cargamos la primer pagina.

        document.getElementById("filtro-genero").addEventListener("change", () => cargarProductos(1));
        document.getElementById("filtro-categoria").addEventListener("change", () => cargarProductos(1));
        document.getElementById("filtro-precio").addEventListener("change", () => cargarProductos(1));


    }
    catch (error) {
        console.error("Error al cargar productos:", error);
    }

});

async function cargarOpcionesDeFiltros() {

    const res = await axios.get('/products/api/filters');
    const { categorias, generos } = res.data;

    const selectCategoria = document.getElementById("filtro-categoria");
    const selectGenero = document.getElementById("filtro-genero");

    // Llenar categorías
    selectCategoria.innerHTML = `<option value="">Todas</option>`;
    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        selectCategoria.appendChild(option);
    });

    // Llenar géneros
    selectGenero.innerHTML = `<option value="">Todos</option>`;
    generos.forEach(gen => {
      const option = document.createElement("option");
      option.value = gen;
      option.textContent = gen;
      selectGenero.appendChild(option);
    });

    //Leer filtros desde la URL y aplicarlos a los select
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get("categoria");
    const genero = urlParams.get("genero");
    const precio = urlParams.get("precio");

    if (categoria) selectCategoria.value = categoria;
    if (genero) selectGenero.value = genero;
    if (precio) {
        const selectPrecio = document.getElementById("filtro-precio");
        if (selectPrecio) selectPrecio.value = precio;
    }



}

async function cargarProductos(pagina) {
  const limit = 12;

  const generoSelectValue = document.getElementById("filtro-genero").value;
  const categoriaSelectValue = document.getElementById("filtro-categoria").value;
  const precioSelectValue = document.getElementById("filtro-precio").value;

  const params = new URLSearchParams({
    page: pagina,
    limit,
  });

  if (generoSelectValue && generoSelectValue !== "") {
    params.append("genero", generoSelectValue);
  }

  if (categoriaSelectValue && categoriaSelectValue !== "") {
    params.append("categoria", categoriaSelectValue);
  }

  if (precioSelectValue && precioSelectValue !== "") {
    const [minPrecio, maxPrecio] = precioSelectValue.split("-");
    params.append("precioMin", minPrecio);
    params.append("precioMax", maxPrecio);
  }

  const res = await axios.get(`/products/api/list?${params.toString()}`);
  const data = res.data;

  renderizarProductos(data.productos);
  renderizarPaginador(data.page, data.totalPages);
}



function renderizarProductos(productos) {

        const contenedor = document.getElementById("productos-contenedor");
        contenedor.innerHTML = ""; // limpiamos el contenedor donde se van a mostrar los productos.

        if (productos.length === 0) { // si el arreglo de productos esta vacio.
          contenedor.innerHTML =
            "<p class='text-center'>No se encontraron productos.</p>";
          return;
        }

        productos.forEach((producto) => {
          const card = document.createElement("div");
          card.className = "col-12 col-sm-6 col-md-4 col-lg-3"; // responsive.

          card.innerHTML = `
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
                    <p class="text-muted mb-1">Género: ${producto.genero}</p>
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
          contenedor.appendChild(card);

        });

}

function renderizarPaginador (paginaActual, totalPaginas){

    const contenedor = document.getElementById("contenedor-paginador");
    contenedor.innerHTML = ""; 
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Page navigation");
    const ul = document.createElement("ul");
    ul.className = "pagination justify-content-center";


    
    const liAnterior = document.createElement("li");
    liAnterior.className = `page-item ${paginaActual === 1 ? "disabled" : ""}`;
    liAnterior.innerHTML = `<a class="page-link" href="#" onclick="cargarProductos(${paginaActual - 1})">Anterior</a>`;
    ul.appendChild(liAnterior);

    
    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === paginaActual ? "active" : ""}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="cargarProductos(${i})">${i}</a>`;
        ul.appendChild(li);
    }


    const liSiguiente = document.createElement("li");
    liSiguiente.className = `page-item ${paginaActual === totalPaginas ? "disabled" : ""}`;
    liSiguiente.innerHTML = `<a class="page-link" href="#" onclick="cargarProductos(${paginaActual + 1})">Siguiente</a>`;
    ul.appendChild(liSiguiente);

    nav.appendChild(ul);
    contenedor.appendChild(nav);

}


