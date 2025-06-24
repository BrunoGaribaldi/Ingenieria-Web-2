   document.addEventListener("DOMContentLoaded", async function () {
        cargarClientes(1);
      });

      async function cargarClientes(pagina) {
        const limit = 10;

        const params = new URLSearchParams({
          //crea un objeto como esto: page=1&limit=10
          page: pagina,
          limit,
        });

        const res = await axios.get(
          `/admin/api/clientes/list?${params.toString()}`
        );
        const data = res.data;

        renderizarClientes(data.clientes);

        // Actualizar el paginador
        renderizarPaginador(data.page, data.totalPages);
      }

      function renderizarPaginador(paginaActual, totalPaginas) {
        const contenedor = document.getElementById("contenedor-paginador");
        contenedor.innerHTML = "";
        const nav = document.createElement("nav");
        nav.setAttribute("aria-label", "Page navigation");
        const ul = document.createElement("ul");
        ul.className = "pagination justify-content-center";

        const liAnterior = document.createElement("li");
        liAnterior.className = `page-item ${
          paginaActual === 1 ? "disabled" : ""
        }`;
        liAnterior.innerHTML = `<a class="page-link" href="#" onclick="cargarClientes(${
          paginaActual - 1
        })">Anterior</a>`;
        ul.appendChild(liAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
          const li = document.createElement("li");
          li.className = `page-item ${i === paginaActual ? "active" : ""}`;
          li.innerHTML = `<a class="page-link" href="#" onclick="cargarClientes(${i})">${i}</a>`;
          ul.appendChild(li);
        }

        const liSiguiente = document.createElement("li");
        liSiguiente.className = `page-item ${
          paginaActual === totalPaginas ? "disabled" : ""
        }`;
        liSiguiente.innerHTML = `<a class="page-link" href="#" onclick="cargarClientes(${
          paginaActual + 1
        })">Siguiente</a>`;
        ul.appendChild(liSiguiente);

        nav.appendChild(ul);
        contenedor.appendChild(nav);
      }

      function renderizarClientes(usuarios) {
        const tbody = document.getElementById("cuerpo-tabla");
        tbody.innerHTML = "";

        usuarios.forEach((usuario) => {
          const tr = document.createElement("tr"); //creas fila de tabla <tr>

          // Nombre
          const tdNombre = document.createElement("td");
          tdNombre.textContent = usuario.nombre;
          tr.appendChild(tdNombre);

          //apellido
          const tdApellido = document.createElement("td");
          tdApellido.textContent = usuario.apellido;
          tr.appendChild(tdApellido);

          const tdEmail = document.createElement("td");
          tdEmail.textContent = usuario.email;
          tr.appendChild(tdEmail);

          tbody.appendChild(tr);
        });
      }