import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");
const editModal = document.getElementById('editModal');
const spanClose = document.querySelectorAll(".close");
const formEditarProducto = document.getElementById('formEditarProducto');
let currentEditingProductId = null;

// Función para crear una tarjeta de producto
function crearCard(id, imagen, nombre, precio) {
    const producto = document.createElement("div");
    producto.className = "section-index";
    producto.innerHTML = `
    <div class="contenedor-producto" data-id="${id}">
        <div class="producto">
            <img class="imagen-producto" src="${imagen}" alt="">
            <div>
                <h2 class="nombreProducto">${nombre}</h2>
                <div class="precio-iconoDelete">
                    <p class="precioProducto">${'$' + precio}</p>
                    <button class="btn-edit" data-id="${id}"><img src="Img/iconos/editar.png" alt="Editar"></button>
                    <button class="btn-delete" data-id="${id}"><img src="Img/iconos/delete.png" alt="Eliminar"></button>
                </div>
            </div>
        </div>
     </div> 
    `;
    return producto;
}

// Función para listar los productos
async function listarProductos() {
    try {
        const productos = await conexionAPI.listarProductos();
        console.log('Datos a procesar:', productos); // Confirmar la estructura de los datos

        if (productos.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "No hay productos disponibles.";
            mensaje.classList.add("no-productos");
            lista.appendChild(mensaje);
        } else {
            productos.forEach(producto => {
                const card = crearCard(producto.id, producto.imagen, producto.nombre, producto.precio);
                lista.appendChild(card);
            });
            agregarEventListeners();
        }
    } catch (error) {
        console.error("Error al obtener los datos de los productos: ", error);
    }
}

function agregarEventListeners() {
    const botonesEliminar = document.querySelectorAll(".btn-delete");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", async (event) => {
            const id = event.target.closest(".btn-delete").dataset.id;
            try {
                const response = await fetch(`https://challenge-alurageek-eta.vercel.app/productos/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Producto eliminado con éxito');
                    const productoElement = document.querySelector(`.contenedor-producto[data-id="${id}"]`);
                    productoElement.remove();
                } else {
                    alert('Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el producto');
            }
        });
    });

    const botonesEditar = document.querySelectorAll(".btn-edit");
    botonesEditar.forEach(boton => {
        boton.addEventListener("click", (event) => {
            currentEditingProductId = event.target.closest(".btn-edit").dataset.id;
            const productoElement = document.querySelector(`.contenedor-producto[data-id="${currentEditingProductId}"]`);
            const nombre = productoElement.querySelector('.nombreProducto').textContent;
            const precio = productoElement.querySelector('.precioProducto').textContent.replace('$', '');
            const imagen = productoElement.querySelector('.imagen-producto').src;

            document.getElementById('editNombre').value = nombre;
            document.getElementById('editPrecio').value = precio;
            document.getElementById('editImagen').value = imagen;
            document.getElementById('editId').value = currentEditingProductId;

            editModal.style.display = "block";
        });
    });

    spanClose.forEach(span => {
        span.addEventListener("click", () => {
            editModal.style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        if (event.target === editModal) {
            editModal.style.display = "none";
        }
    });

    formEditarProducto.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const id = document.getElementById('editId').value;
        const nombre = document.getElementById('editNombre').value;
        const precio = document.getElementById('editPrecio').value;
        const imagen = document.getElementById('editImagen').value;

        const productoActualizado = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen
        };

        try {
            const response = await fetch(`https://challenge-alurageek-eta.vercel.app/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoActualizado)
            });

            if (response.ok) {
                alert('Producto actualizado con éxito');
                location.reload(); // Recargar la página para ver los cambios
            } else {
                alert('Error al actualizar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el producto');
        }
    });
}

listarProductos();
