import { creatEven } from '../js/api.js';

export function showCreatEven() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="creat-even">
      <h2>Crear Nuevo Evento</h2>
      <form id="creat-even-form">
        <label>Nombre del evento:</label>
        <input type="text" id="name" required />

        <label>Fecha:</label>
        <input type="date" id="date" required />

        <label>Lugar:</label>
        <input type="text" id="location" required />

        <label>Capacidad:</label>
        <input type="number" id="capacity" required min="1" />

        <button type="submit">Crear Evento</button>
      </form>
    </section>
  `;

  const form = document.getElementById('creat-even-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newEvent = {
      name: document.getElementById('name').value.trim(),
      date: document.getElementById('date').value,
      location: document.getElementById('location').value.trim(),
      capacity: parseInt(document.getElementById('capacity').value),
      registeredUsers: [] // lista vacía inicialmente
    };

    try {
      await creatEven(newEvent);
      alert("Evento creado con éxito.");
      window.location.hash = '#/dashboard';
    } catch (error) {
      alert("Error al crear el evento.");
      console.error(error);
    }
  });
}
