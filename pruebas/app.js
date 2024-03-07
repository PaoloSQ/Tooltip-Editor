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
  const clickedIndex = getClickedPointIndex(x, y);
  if (clickedIndex !== -1) {
    vertices.splice(clickedIndex, 1);
  } else {
    vertices.push({ x, y });
  }
  dibujarPuntos();
  calcularArea();
});

// Obtener la coordenada del click dentro de la imagen.
function getClickedPointIndex(x, y) {
  for (let i = 0; i < vertices.length; i++) {
    const distance = Math.sqrt(
      (x - vertices[i].x) ** 2 + (y - vertices[i].y) ** 2
    );
    if (distance <= 5) {
      // Radio del punto de clic
      return i;
    }
  }
  return -1;
}

// Dibuja un punto rojo en las coordenadas clickeadas
function dibujarPuntos() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  for (let i = 0; i < vertices.length; i++) {
    const { x, y } = vertices[i];
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
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
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Color rojo con opacidad
    ctx.fill();
    info.innerHTML = "Área coloreada";
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    dibujarPuntos();
    info.innerHTML = "Necesitas al menos 3 vértices para formar un polígono.";
  }
}
