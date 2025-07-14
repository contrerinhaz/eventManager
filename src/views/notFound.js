import { isAuthenticated } from '../js/auth.js';

export function showNotFound() {
  const app = document.getElementById('app');
  const redirectTo = isAuthenticated() ? '#/dashboard' : '#/login';

  app.innerHTML = `
    <section class="not-found">
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la ruta que intentaste acceder no existe o no tienes permiso.</p>
      <a href="${redirectTo}">
        <button>Volver</button>
      </a>
    </section>
  `;
}
