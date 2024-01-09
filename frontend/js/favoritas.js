window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Obtener películas favoritas del localStorage
  const favoritas = JSON.parse(localStorage.getItem("favoritas")) || [];

  // Verificar si hay películas favoritas
  if (favoritas.length > 0) {
    try {
      const response = await fetch('http://localhost:3031/api/movies')
      const { meta, data } = await response.json()

      // Filtrar solo las películas que son favoritas
      const peliculasFavoritas = data.filter(movie => favoritas.includes(movie.id.toString()));

      peliculasFavoritas.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
      });

    } catch (error) {
      console.log(error);
    }
  } else {
    // Si no hay películas favoritas, mostrar un mensaje
    const mensaje = document.createElement("p");
    mensaje.textContent = "Aún no tienes películas favoritas.";
    container.appendChild(mensaje);
  }
};
