const pokedex = document.querySelector('div');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 50; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((response) => response.json()));
    }
    Promise.all(promises).then((response) => {
        const pokemon = response.map((response) => ({
            name: `${response.name[0].toUpperCase()}${response.name.slice(1)}`,
            image: response.sprites['front_shiny'],

        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonList = pokemon
        .map(
            (poke) => `
        <figure class="card">
            <img class="card-image" src="${poke.image}" alt ="${poke.name}"/>
            <h2 class="figcaption"> ${poke.name}</h2>
        </figure>
    `
        )


    pokedex.innerHTML = pokemonList
};



fetchPokemon();