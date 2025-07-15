document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  if (nombre.trim() !== "") {
    localStorage.setItem("usuario", nombre);
    alert(`¡Bienvenido, ${nombre}!`);
    window.location.href = "index.html";
  }
});
