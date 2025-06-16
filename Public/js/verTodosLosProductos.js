document.addEventListener("DOMContentLoaded", async () => {

    try{


        cargarProductos(1); //por defecto cargamos la primer pagina.


    }
    catch (error) {
        console.error("Error al cargar productos:", error);
    }

});


async function cargarProductos (pagina){

    const limit = 12; // la cantidad de productos por página

    const res = await axios.get(`/products/api/list?page=${pagina}&limit=${limit}`);
    const data = res.data;

    // Renderizar los productos de esta página
    renderizarProductos(data.productos);

    // Actualizar el paginador
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
                <button class="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle">
                    <i class="bi bi-heart"></i>
                </button>
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