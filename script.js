// Guarda y lee las respuestas a lo largo de las 4 páginas usando sessionStorage.
const Cena = {
  guardar(clave, valor) {
    sessionStorage.setItem('cena_' + clave, valor);
  },
  leer(clave) {
    return sessionStorage.getItem('cena_' + clave) || '';
  },
  todo() {
    return {
      fecha: this.leer('fecha'),
      hora: this.leer('hora'),
      comida: this.leer('comida'),
      mensaje: this.leer('mensaje'),
    };
  }
};

// Hace que el botón "No" sea imposible de pulsar: huye del cursor/dedo.
function activarBotonEsquivo(boton) {
  function posicionAleatoria() {
    const margen = 16;
    const anchoBtn = boton.offsetWidth || 120;
    const altoBtn = boton.offsetHeight || 52;
    const maxX = window.innerWidth - anchoBtn - margen;
    const maxY = window.innerHeight - altoBtn - margen;
    const x = margen + Math.random() * Math.max(maxX - margen, 0);
    const y = margen + Math.random() * Math.max(maxY - margen, 0);
    boton.style.left = x + 'px';
    boton.style.top = y + 'px';
  }

  // Posición inicial (relativa a su sitio en el flujo, luego ya vuela libre)
  const inicial = boton.getBoundingClientRect();
  boton.style.left = inicial.left + 'px';
  boton.style.top = inicial.top + 'px';

  const RADIO_HUIDA = 90;

  function distancia(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
  }

  function quizasHuir(x, y) {
    const r = boton.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    if (distancia(x, y, cx, cy) < RADIO_HUIDA) {
      posicionAleatoria();
    }
  }

  window.addEventListener('pointermove', (e) => quizasHuir(e.clientX, e.clientY));
  boton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    posicionAleatoria();
  }, { passive: false });
  boton.addEventListener('mouseenter', () => posicionAleatoria());
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    posicionAleatoria();
  });
  window.addEventListener('resize', () => posicionAleatoria());
}
