import {
  getEvents,
  registerUserToEvent,
  unregisterUserFromEvent,
  getUsers,
  deleteUser,
  updateUser,
} from '../js/api.js';
import { getCurrentUser, logoutUser, isAdmin } from '../js/auth.js';

export async function showDashboard() {
  const app = document.getElementById('app');
  const user = getCurrentUser();

  if (!user) {
    window.location.hash = '#/login';
    return;
  }

  let events = [];
  let users = [];

  try {
    events = await getEvents();
    if (isAdmin()) {
      users = await getUsers();
    }
  } catch (error) {
    app.innerHTML = `<p>Error al cargar datos</p>`;
    return;
  }

  app.innerHTML = `
    <section class="dashboard">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>Bienvenido, ${user.name}</h2>
        <button id="logoutBtn" class="logout">Cerrar sesión</button>
      </div>

      <div id="events-container">
        <h3>Eventos</h3>
        ${events.map(event => renderEvent(event, user)).join('')}
      </div>
    </section>
  `;

  // Cerrar sesión
  document.getElementById('logoutBtn').addEventListener('click', () => {
    logoutUser();
    window.location.hash = '#/login';
  });

  // Botón registrar a evento
  document.querySelectorAll(".register-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const eventId = e.target.dataset.eventId;
      try {
        await registerUserToEvent(eventId, user.id);
        alert("Registro exitoso");
        showDashboard();
      } catch (err) {
        alert(err.message);
      }
    });
  });

  // Botón cancelar registro (usuario)
  document.querySelectorAll(".unregister-user-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const eventId = e.target.dataset.eventId;
      if (confirm("¿Seguro que quieres cancelar tu registro?")) {
        try {
          await unregisterUserFromEvent(eventId, user.id);
          alert("Registro cancelado");
          showDashboard();
        } catch (err) {
          alert("Error al cancelar registro");
        }
      }
    });
  });

  // Botón eliminar usuario de evento (admin)
  document.querySelectorAll('.unregister-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const eventId = e.target.dataset.eventId;
      const userId = e.target.dataset.userId;
      if (confirm("¿Eliminar usuario del evento?")) {
        await unregisterUserFromEvent(eventId, userId);
        showDashboard();
      }
    });
  });

  // Botón eliminar usuario del sistema (admin)
  document.querySelectorAll('.delete-user').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const userId = e.target.dataset.userId;
      if (confirm("¿Eliminar este usuario del sistema?")) {
        await deleteUser(userId);
        alert("Usuario eliminado");
        showDashboard();
      }
    });
  });

  // Botón editar usuario del sistema (admin)
  document.querySelectorAll('.edit-user').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const userId = e.target.dataset.userId;
      const newName = prompt("Nuevo nombre:");
      const newRole = prompt("Nuevo rol (user o admin):");
      if (!newName || !newRole) return;

      try {
        await updateUser(userId, { name: newName, role: newRole });
        alert("Usuario actualizado");
        showDashboard();
      } catch (err) {
        alert("Error al actualizar usuario");
      }
    });
  });
}

// Render de eventos
function renderEvent(event, user) {
  const isRegistered = event.registeredUsers?.includes(user.id);
  const isFull = event.registeredUsers.length >= event.capacity;
  const canRegister = !isRegistered && !isFull && user.role === 'user';

  let adminExtras = '';
  if (isAdmin() && event.registeredUserDetails?.length > 0) {
    adminExtras = `
      <div class="registered-users">
        <br>
        <strong>Registrados:</strong>
        <ul>
          ${event.registeredUserDetails.map(u => `
            <li>
              ${u.name} (${u.email})
              <button class="unregister-btn" data-event-id="${event.id}" data-user-id="${u.id}">Eliminar</button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  const userAction = user.role === "user"
    ? (isRegistered
        ? `<button class="unregister-user-btn" data-event-id="${event.id}">Cancelar registro</button>`
        : `<button class="register-btn" data-event-id="${event.id}" ${canRegister ? "" : "disabled"}>Registrarse</button>`)
    : "";

  return `
    <div class="event-card">
      <h3><i>${event.name}</i></h3>
      <p><strong>Fecha:</strong> ${event.date}</p>
      <p><strong>Lugar:</strong> ${event.location}</p>
      <p><strong>Cupos:</strong> ${event.registeredUsers.length} / ${event.capacity}</p>
      ${userAction}
      ${
        isAdmin()
          ? `
            <a href="#/dashboard/events/edit?id=${event.id}">Editar</a>
            ${adminExtras}
          `
          : ''
      }
    </div>
  `;
}