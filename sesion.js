document.addEventListener("DOMContentLoaded", () => {
  const nombreUsuario = localStorage.getItem("usuario");
  const nombreSpan = document.getElementById("nombre-usuario");
  const cerrarBtn = document.getElementById("cerrar-sesion");
  const linkLogin = document.getElementById("link-login");

  if (nombreUsuario) {
    if (nombreSpan) nombreSpan.textContent = `Hola, ${nombreUsuario}`;
    if (cerrarBtn) cerrarBtn.style.display = "inline-block";
    if (linkLogin) linkLogin.style.display = "none";
  }

  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      window.location.reload();
    });
  }
});