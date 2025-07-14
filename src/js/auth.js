const API_URL = "http://localhost:3005/users";

// Registrar nuevo usuario con rol "user"
export async function registerUser(newUser) {
  // Validación mínima de campos
  if (!newUser.name || !newUser.email || !newUser.password) {
    throw new Error("Todos los campos son obligatorios.");
  }

  // Verificar que el email no esté registrado
  const existingUser = await fetch(`${API_URL}?email=${newUser.email}`);
  const users = await existingUser.json();
  if (users.length > 0) {
    throw new Error("El correo ya está registrado.");
  }

  // Forzar rol "user"
  const userToSave = {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    role: "user"
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userToSave),
  });

  if (!response.ok) throw new Error("Error al registrar usuario.");
  return await response.json();
}

// Login de usuario
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}?email=${email}&password=${password}`);
  const users = await response.json();

  if (users.length === 1) {
    localStorage.setItem("currentUser", JSON.stringify(users[0]));
    return users[0];
  } else {
    throw new Error("Credenciales inválidas.");
  }
}

// Logout
export function logoutUser() {
  localStorage.removeItem("currentUser");
}

// Obtener el usuario actualmente logueado
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// Verificar si hay sesión activa
export function isAuthenticated() {
  return !!localStorage.getItem("currentUser");
}

// Verificar si el usuario actual es administrador
export function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === "admin";
}

export function isPath(){
  const path = window.location.pathname;
  return path === "/login" || path === "/register" || path === "/";
}
