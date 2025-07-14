import { showLanding } from '../views/landing.js';
import { showLogin } from '../views/login.js';
import { showRegister } from '../views/register.js';
import { showDashboard } from '../views/dashboard.js';
import { showCreatEven } from '../views/createEvent.js';
import { showEditEven } from '../views/editEvent.js';
import { showNotFound } from '../views/notFound.js';
import { isAuthenticated, isAdmin } from './auth.js';

// Definición de rutas
const routes = {
  "#/": showLanding, // Landing page
  "#/login": showLogin,
  "#/register": showRegister,
  "#/dashboard": showDashboard,
  "#/dashboard/events/create": () => {
    if (isAdmin()) {
      showCreatEven();
    } else {
      window.location.hash = "#/login";
    }
  },
  "#/dashboard/events/edit": () => {
    if (isAdmin()) {
      showEditEven();
    } else {
      window.location.hash = "#/login";
    }
  },
  "#/404": showNotFound,
};

// Función principal del enrutador
export function router() {
  let fullHash = window.location.hash;

  // Si no hay hash o solo "#", redirigir a landing
  if (!fullHash || fullHash === "#") {
    window.location.hash = "#/";
    return;
  }

  const [path] = fullHash.split("?"); // Ignora parámetros

  // Si está autenticado y quiere ir a login o register, redirigir a dashboard
  if (isAuthenticated() && (path === "#/login" || path === "#/register" || path === "#/")) {
    window.location.hash = "#/dashboard";
    return;
  }

  // Rutas públicas accesibles sin autenticación
  const publicRoutes = ["#/", "#/login", "#/register"];

  // Si no está autenticado y quiere acceder a ruta privada → notFound
  if (!isAuthenticated() && !publicRoutes.includes(path)) {
    window.location.hash = "#/notFound";
    return;
  }

  // Ejecutar la vista si existe, si no, mostrar notFound
  const render = routes[path];
  if (render) {
    render();
  } else {
    showNotFound();
  }
}

// Escuchar cambios en el hash y cargar la vista inicial
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
