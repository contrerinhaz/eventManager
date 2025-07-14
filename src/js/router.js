import { showLanding } from '../views/landing.js';
import { showLogin } from '../views/login.js';
import { showRegister } from '../views/register.js';
import { showDashboard } from '../views/dashboard.js';
import { showCreatEven } from '../views/creatEven.js';
import { showEditEven } from '../views/editEven.js';
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
      window.location.hash = "#/not-found";
    }
  },
  "#/dashboard/events/edit": () => {
    if (isAdmin()) {
      showEditEven();
    } else {
      window.location.hash = "#/not-found";
    }
  },
  "#/not-found": showNotFound
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

  // Si no está autenticado y quiere acceder a ruta privada → not-found
  if (!isAuthenticated() && !publicRoutes.includes(path)) {
    window.location.hash = "#/not-found";
    return;
  }

  // Ejecutar la vista si existe, si no, mostrar not-found
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
