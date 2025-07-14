import { isAuthenticated } from '../js/auth.js';

export function showLanding() {
  // Si el usuario ya está autenticado, redirigir al dashboard
  if (isAuthenticated()) {
    window.location.hash = '#/dashboard';
    return;
  }

  const app = document.getElementById('app');

  // Contenido de la landing
  app.innerHTML = `
    <section class="landing-container">
      <h1>Bienvenido a la Plataforma de Gestión</h1>
      <p>Administra tus eventos e ingresa eventos de manera rápida y secilla.</p>
      <div class="landing-buttons">
        <button id="btn-login">Iniciar Sesión</button>
        <button id="btn-register">Registrarse</button>
      </div>
    </section>
  `;

  // Acciones de los botones
  document.getElementById('btn-login').addEventListener('click', () => {
    window.location.hash = '#/login';
  });

  document.getElementById('btn-register').addEventListener('click', () => {
    window.location.hash = '#/register';
  });
}
