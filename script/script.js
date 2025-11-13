let carrito = {};
let carritoCount = 0;

const botonesComprar = document.querySelectorAll(".btn-comprar");
const carritoSpan = document.getElementById("carrito-count");
const carritoLink = document.getElementById("carrito-link");
const carritoPanel = document.getElementById("carrito-panel");
const carritoLista = document.getElementById("carrito-lista");
const subtotalText = document.getElementById("subtotal");
const btnProceder = document.getElementById("btn-proceder");

botonesComprar.forEach(boton => {
  boton.addEventListener("click", () => {
    const nombre = boton.getAttribute("data-nombre");
    const precio = parseFloat(boton.getAttribute("data-precio"));

    if (carrito[nombre]) {
      carrito[nombre].cantidad++;
    } else {
      carrito[nombre] = { precio, cantidad: 1 };
    }

    carritoCount++;
    carritoSpan.textContent = carritoCount;
    actualizarCarrito();
  });
});

carritoLink.addEventListener("click", () => {
  carritoPanel.style.display = carritoPanel.style.display === "block" ? "none" : "block";
});

function actualizarCarrito() {
  carritoLista.innerHTML = "";
  let subtotal = 0;

  for (let producto in carrito) {
    const item = carrito[producto];
    subtotal += item.precio * item.cantidad;

    const li = document.createElement("li");
    li.innerHTML = `
      ${producto} - ${item.precio} Bs x ${item.cantidad}
      <button class="btn-eliminar" data-nombre="${producto}">X</button>
    `;
    carritoLista.appendChild(li);
  }

  subtotalText.textContent = `Total: ${subtotal} Bs`;

  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", () => {
      const nombre = btn.getAttribute("data-nombre");
      carritoCount -= carrito[nombre].cantidad;
      delete carrito[nombre];
      carritoSpan.textContent = carritoCount;
      actualizarCarrito();
    });
  });
}

btnProceder.addEventListener("click", () => {
  window.location.href = "error.html";
});
