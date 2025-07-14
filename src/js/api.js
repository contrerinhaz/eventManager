const API_BASE = 'http://localhost:3005';

/* Obtener todos los eventos con detalles de usuarios registrados */
export async function getEvents() {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error('Error al obtener eventos');
  const events = await res.json();

  // Cargar detalles de los usuarios registrados por evento
  for (const event of events) {
    event.registeredUserDetails = [];

    for (const userId of event.registeredUsers || []) {
      const userRes = await fetch(`${API_BASE}/users/${userId}`);
      if (userRes.ok) {
        const user = await userRes.json();
        event.registeredUserDetails.push(user);
      }
    }
  }

  return events;
}

/* Obtener un evento por su ID */
export async function getEventById(id) {
  const res = await fetch(`${API_BASE}/events/${id}`);
  if (!res.ok) throw new Error('Evento no encontrado');
  return await res.json();
}

/* Crear un nuevo evento */
export async function creatEven(eventData) {
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...eventData,
      registeredUsers: [] // Inicializar array vacío
    }),
  });
  if (!res.ok) throw new Error('Error al crear el evento');
  return await res.json();
}

/* Actualizar un evento existente */
export async function updateEvent(id, data) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar el evento');
  return await res.json();
}

/* Eliminar un evento */
export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar el evento');
}

/* Registrar usuario visitante a un evento */
export async function registerUserToEvent(eventId, userId) {
  const event = await getEventById(eventId);

  // Validación: ¿ya está registrado o está lleno?
  if (event.registeredUsers.includes(userId)) {
    throw new Error('Ya estás registrado en este evento.');
  }

  if (event.registeredUsers.length >= event.capacity) {
    throw new Error('El evento ya está lleno.');
  }

  const updatedUsers = [...event.registeredUsers, userId];

  const res = await fetch(`${API_BASE}/events/${eventId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ registeredUsers: updatedUsers }),
  });

  if (!res.ok) throw new Error('Error al registrar en el evento');
  return await res.json();
}

/* ✅ Eliminar usuario registrado de un evento (solo admin) */
export async function unregisterUserFromEvent(eventId, userId) {
  const event = await getEventById(eventId);

  const updatedUsers = event.registeredUsers.filter(id => id !== userId);

  const res = await fetch(`${API_BASE}/events/${eventId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ registeredUsers: updatedUsers }),
  });

  if (!res.ok) throw new Error('Error al eliminar usuario del evento');
}
/* Obtener todos los usuarios */
export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return await res.json();
}

/* Eliminar usuario por ID */
export async function deleteUser(userId) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar usuario');
}

/* Actualizar usuario por ID */
export async function updateUser(userId, data) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar usuario');
  return await res.json();
}
