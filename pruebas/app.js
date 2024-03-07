const canvas = document.querySelector("#myCanvas");
const info = document.querySelector("#info");
const ctx = canvas.getContext("2d");
const vertices = []; // Almacenará los vértices del polígono

// Dibuja la imagen de fondo
const backgroundImage = document.querySelector("#backgroundImage");
ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

// Al hacer un click, obtiene las coordenadas y dibuja un punto
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  vertices.push({ x, y });
  dibujarPunto(x, y);
  calcularArea();
});

// Dibuja un punto rojo en las coordenadas clickeadas
function dibujarPunto(x, y) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
}

// Calcula área utilizando el método de Shoelace
function calcularArea() {
  if (vertices.length >= 3) {
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fill();
    info.innerHTML = "Área coloreada";
  } else {
    info.innerHTML = "Necesitas al menos 3 vértices para formar un polígono.";
  }
}
