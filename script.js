document.addEventListener('DOMContentLoaded', function () {
  // Contacto
  const formContacto = document.getElementById('formContacto');
  formContacto.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = this.nombre;
    const email = this.email;
    const mensaje = this.mensaje;

    let valid = true;

    [nombre, email, mensaje].forEach(field => {
      field.style.borderColor = '#a3b18a';
      if (!field.value.trim()) {
        field.style.borderColor = 'red';
        valid = false;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.style.borderColor = 'red';
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!valid) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    alert('Mensaje enviado con éxito. ¡Gracias por contactarnos!');
    this.reset();
  });

  // Pedido
  const formPedido = document.getElementById('formPedido');
  formPedido.addEventListener('submit', function (event) {
    event.preventDefault();

    const producto = this.producto;
    const cantidad = this.cantidad;
    const direccion = this.direccion;

    let valid = true;

    [producto, cantidad, direccion].forEach(field => {
      field.style.borderColor = '#a3b18a';
      if (!field.value.trim()) {
        field.style.borderColor = 'red';
        valid = false;
      }
    });

    if (cantidad.value <= 0) {
      cantidad.style.borderColor = 'red';
      alert('La cantidad debe ser mayor a cero.');
      return;
    }

    if (!valid) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    alert(`¡Pedido realizado!\nProducto: ${producto.value}\nCantidad: ${cantidad.value}\nDirección: ${direccion.value}`);
    this.reset();
  });

  // 🔥 CONEXIÓN REAL DEL BOTÓN COMPRAR AL CARRITO
  const botonesComprar = document.querySelectorAll('.producto button');
  botonesComprar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const producto = boton.closest('.producto');
      const nombreProducto = producto.querySelector('h3').textContent;
      const precioProducto = parseFloat(producto.querySelector('.precio').textContent);

      agregarAlCarrito(nombreProducto, precioProducto); // ✅ AHORA AGREGA AL CARRITO
    });
  });
});

console.log("✅ Script cargado correctamente");

let carrito = [];

// 🔹 Abre/cierra un panel (carrito, contacto o pedido) SIN solaparse
function togglePanel(id) {
  const panel = document.getElementById(id);
  const isOpen = panel.classList.contains('active');

  document.querySelectorAll('.panel').forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-hidden', 'true');
  });

  if (!isOpen) {
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
  }
}

function cerrarPanel() {
  document.querySelectorAll('.panel').forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-hidden', 'true');
  });
}

// 🔹 Funciones del carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
  togglePanel('carrito');
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const contenedor = document.querySelector('.carrito-items');
  contenedor.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <span>${item.nombre}</span>
      <div>
        <span>S/ ${item.precio.toFixed(2)}</span>
        <button onclick="eliminarDelCarrito(${index})">X</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  document.querySelector('.carrito-total').textContent = `Total: S/ ${total.toFixed(2)}`;
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  let resumen = 'Resumen de tu compra:\n\n';
  let total = 0;
  carrito.forEach(item => {
    resumen += `${item.nombre} - S/ ${item.precio.toFixed(2)}\n`;
    total += item.precio;
  });
  resumen += `\nTOTAL: S/ ${total.toFixed(2)}`;
  alert(resumen);
  carrito = [];
  actualizarCarrito();
  cerrarPanel();
}

