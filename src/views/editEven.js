import { getEventById, updateEvent } from '../js/api.js';
import { isAdmin } from '../js/auth.js';

export async function showEditEven() {
  const app = document.getElementById('app');

  // Extraer ID desde hash: #/dashboard/events/edit?id=1
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  const eventId = params.get('id');

  if (!isAdmin()) {
    window.location.hash = '#/not-found';
    return;
  }

  if (!eventId) {
    app.innerHTML = '<p>Error: ID del evento no especificado.</p>';
    return;
  }

  try {
    const event = await getEventById(eventId);
    if (!event) {
      app.innerHTML = '<p>Evento no encontrado.</p>';
      return;
    }

    app.innerHTML = `
      <section class="edit-even">
        <h2>Editar Evento</h2>
        <form id="edit-even-form">
          <label>Nombre del evento:</label>
          <input type="text" id="name" value="${event.name}" required />

          <label>Fecha:</label>
          <input type="date" id="date" value="${event.date}" required />

          <label>Lugar:</label>
          <input type="text" id="location" value="${event.location}" required />

          <label>Capacidad:</label>
          <input type="number" id="capacity" value="${event.capacity}" required min="1" />

          <button type="submit">Guardar cambios</button>
        </form>
      </section>
    `;

    document.getElementById('edit-even-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const updatedEvent = {
        name: document.getElementById('name').value.trim(),
        date: document.getElementById('date').value,
        location: document.getElementById('location').value.trim(),
        capacity: parseInt(document.getElementById('capacity').value),
      };

      try {
        await updateEvent(event.id, updatedEvent);
        alert("Evento actualizado correctamente.");
        window.location.hash = '#/dashboard';
      } catch (error) {
        alert("Error al actualizar el evento.");
        console.error(error);
      }
    });

  } catch (err) {
    console.error("Error cargando evento:", err);
    app.innerHTML = `<p class="error">Hubo un problema al cargar el evento.</p>`;
  }
}
