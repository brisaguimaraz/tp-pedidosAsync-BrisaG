const $ = id => document.getElementById(id);
window.onload = async () => {
    let query = new URLSearchParams(location.search);
    if(query.get('movie')){
        try {
            const response = await fetch(`http://localhost:3031/api/movies/${query.get('movie')}`)
            const result = await response.json()
            console.log(result.data)
            let fecha = new Date(result.data.release_date)
            $("title").value = result.data.title
            $("rating").value = result.data.rating
            $("awards").value = result.data.awards
            $("release_date").value = fecha.toISOString().substring(0,10)
            $("length").value = result.data.length
            $("botonAgregar").style.display = "none"
        } catch (error) {
            console.log(error)
        }
    }else{
        $("botonEditar").style.display = "none"
        $("botonBorrar").style.display = "none"
    }
    $("botonAgregar").addEventListener("click", async function(e){
        e.preventDefault()
        console.log("Click en el boton de agregar")
        const title = $("title").value
        const rating =  $("rating").value
        const awards =  $("awards").value
        const release_date =  $("release_date").value
        const length = $("length").value
        const moviesData = {
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id: null
        }
        try {
            const create = await fetch(`http://localhost:3031/api/movies/create`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(moviesData)
            })
                const resultCreate = await create.json()
                const movieCreated = resultCreate.data;
                console.log(`Producto creado -> ${movieCreated.title}`)
                alert(`Pelicula '${movieCreated.title}' creada con exito`)
                window.location.href = 'home.html'
        } catch (error) {
            console.log(`Error al cargar los archivos`)
        }
    })

    $("botonEditar").addEventListener("click", async function(e){
        e.preventDefault()
        console.log("Click en el boton de Editar")
        const movieToUpdate = query.get('movie');
        const title = $("title").value
        const rating =  $("rating").value
        const awards =  $("awards").value
        const release_date =  $("release_date").value
        const length = $("length").value
        const moviesUpdate = {
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id: null
        }
        try {
            const update = await fetch(`http://localhost:3031/api/movies/update/${movieToUpdate}`,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(moviesUpdate)
            })
                const resultUpdate = await update.json()
                console.log(resultUpdate)
                console.log(`Pelicula editada con exito`)
                alert(`Pelicula editada con exito`)
                window.location.href = 'home.html'
        } catch (error) {
            console.log(`Error al cargar los archivos`)
        }
    })

    $("botonBorrar").addEventListener("click", async function(e) {
        e.preventDefault();
    
        console.log('Botón Borrar clicado');
        const movieToDelete = query.get('movie');
        console.log('ID de la película a borrar:', movieToDelete);
        
        try {
            const destroy = await fetch(`http://localhost:3031/api/movies/delete/${movieToDelete}`, {
                method: 'DELETE',
            });
            const resultDestroy = await destroy.json();
            console.log(resultDestroy)
            alert('Producto eliminado correctamente')
            window.location.href = 'home.html'
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
        }
    });
}