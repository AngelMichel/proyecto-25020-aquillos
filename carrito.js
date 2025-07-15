///index.html y carrito.html me parecio mas optimo hacerlo en un solo js


// Carga carrito guardado o crea uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Detectar si estamos en index.html (donde hay botones)
const botonesAgregar = document.querySelectorAll(".btn-agregar");
const contador = document.getElementById("contador");

// Actualiza localStorage y contador del ícono
function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));

  if (contador) {
    const totalCant = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalCant;
  }
}

// Agregar producto al carrito (solo en index.html)
if (botonesAgregar.length > 0) 
{
  botonesAgregar.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productoDiv = e.target.closest(".producto");
      const id = parseInt(productoDiv.dataset.id);
      const nombre = productoDiv.dataset.nombre;
      const precio = parseInt(productoDiv.dataset.precio);

      const productoExistente = carrito.find(p => p.id === id);
      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
      }

      actualizarCarrito();
    });
  });
}

// Mostrar carrito (solo si está en carrito.html)
function renderizarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  const totalSpan = document.getElementById("total");

  if (!carritoDiv || !totalSpan) return;

  carritoDiv.innerHTML = "";

  if (carrito.length === 0) {
    carritoDiv.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalSpan.textContent = "0";
    return;
  }

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.style.marginBottom = "15px";
    div.innerHTML = `
      <p>
        <strong>${item.nombre}</strong> - $${item.precio.toLocaleString()} x
        <input type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad(${index}, this.value)" style="width: 50px; margin-left: 10px; margin-right: 10px;">
        = $${(item.precio * item.cantidad).toLocaleString()}
        <button onclick="eliminarProducto(${index})" style="margin-left: 10px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer;">Eliminar</button>
      </p>
    `;
    carritoDiv.appendChild(div);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  totalSpan.textContent = total.toLocaleString();
}

// Cambiar cantidad de un producto (carrito.html)
function cambiarCantidad(index, nuevaCantidad) 
{
  const cantidad = parseInt(nuevaCantidad);
  if (cantidad > 0) {
    carrito[index].cantidad = cantidad;
    actualizarCarrito();
    renderizarCarrito();
  }
}

// Eliminar un producto (carrito.html)
function eliminarProducto(index) 
{
  carrito.splice(index, 1);
  actualizarCarrito();
  renderizarCarrito();
}

// Iniciar cuando carga la página
document.addEventListener("DOMContentLoaded", () => 
{
  actualizarCarrito();

  // Solo ejecutar renderizarCarrito si estamos en carrito.html
  if (document.getElementById("carrito")) {
    renderizarCarrito();
  }
});

// Para que se puedan usar desde el HTML
window.cambiarCantidad = cambiarCantidad;
window.eliminarProducto = eliminarProducto;




