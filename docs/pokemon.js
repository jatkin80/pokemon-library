const spinner = document.querySelector(".spinner")
const ul = document.querySelector("ul")


function addPokemonImage(pokemon) {
    const div = document.createElement('div')
    div.classList.add('pokemon-details')
    div.innerHTML = `
<figure>
   <img src="${pokemon.sprites.front_default }" alt="${ pokemon.name}" />
    <figcaption>"${pokemon.name}"</figcaption>
        </figure>


    `
    ul.append(div)
}
const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        spinner.classList.add('hidden')
        addPokemonImage(parsedResponse)
    })