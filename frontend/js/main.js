const $ = id => document.getElementById(id);
window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  //Primero verificamos si hay una pelicula guardada en localstorage para dejar marcada las estrellas al momento de abrir la pagina
  const favoritas = JSON.parse(localStorage.getItem("favoritas")) || [];

  function updateBannerVisibility() {
    const bannerFavoritas = $('bannerFavoritas');
  
    if (favoritas.length > 0) {
      bannerFavoritas.style.display = "block";
    } else {
      bannerFavoritas.style.display = "none";
    }
  }

  updateBannerVisibility()
  //Despues hacemos una funcion que recibe el id de una pelicula y la estrella para preguntar si estamos guardando o quitando una pelicula en favoritas
  function toggleFavorita(movieId, estrella) {
    if (favoritas.includes(movieId)) {
      estrella.classList.remove("fa-solid", "fa-star");
      estrella.classList.add("fa-regular", "fa-star");
      favoritas.splice(favoritas.indexOf(movieId), 1); //removemos de a uno por id
    } else {
      estrella.classList.add("fa-solid", "fa-star");
      favoritas.push(movieId); //pusheamos de a uno
    }
  
    // Actualizamos la lista de peliculas de favoritas
    localStorage.setItem("favoritas", JSON.stringify(favoritas));
  }
  try {
    const response = await fetch('http://localhost:3031/api/movies')
    const { meta, data } = await response.json()

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const link = document.createElement("a");
      link.textContent = "ver mas"
      link.setAttribute('href', `formulario.html?movie=${movie.id}`)
      link.classList.add("botonAgregar")

      const estrella = document.createElement("i")
      estrella.classList.add("fa-regular", "fa-star")
      estrella.style.cursor = "pointer";

      // Verificamos si la película está marcada como favorita
      if (favoritas.includes(movie.id.toString())) {
        estrella.classList.add("fa-solid", "fa-star");
      }

      // utilizamos la funcion creada, pasamos por parametro el elemento creado con la variable "estrella" y depaso el id de la pelicula
      estrella.addEventListener("click", () => {
        toggleFavorita(movie.id.toString(), estrella);
        updateBannerVisibility()
      });

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      if (movie.length) {
        card.appendChild(duracion);
      }
      card.appendChild(link);
      card.appendChild(estrella);
    });


  } catch (error) {
    console.log(error)
  }
};


