const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";
const container = document.getElementById("pokemonContainer");

async function obtenerPokemon(){
    try{
        const response = await fetch(API_URL);

        if(!response.ok){
            throw new Error("Error al obtener datos");
        }

        const data = await response.json();
console.log("Respuesta API:", data);


        for(const pokemon of data.results){
            await crearTarjeta(pokemon.url);
        }

    }catch(error){
        console.error("Error:", error);
    }
}

async function crearTarjeta(url){

    const res = await fetch(url);
    const data = await res.json();

    const card = document.createElement("article");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = data.sprites.front_default;
    img.alt = data.name;

    const name = document.createElement("h3");
    name.textContent = data.name;

    const id = document.createElement("p");
    id.textContent = "ID: " + data.id;

    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats");

    data.stats.forEach(stat => {
        const p = document.createElement("p");
        p.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsContainer.appendChild(p);
    });

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(statsContainer);

    container.appendChild(card);
}

obtenerPokemon();
