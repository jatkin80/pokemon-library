const pokemonDetails = document.querySelector(".pokemon-details")
const abilities = document.querySelector("ul")

const spinner = document.querySelector(".spinner")

function addPokemonImage(pokemon) {
    const div = document.createElement('div')
    div.classList.add('pokemon-details')
    div.innerHTML = `
<figure>
   <img src="${pokemon.sprites.front_default }" alt="${ pokemon.name}" />
    <figcaption>"${pokemon.name}"</figcaption>
        </figure>
    `
    main.append(div)
}

const displayPokemon = (pokemon) => {

    const li = document.createElement('li')
    ul.append(li)
    const spanOne = document.createElement('span')
    spanOne.classList.add('ability-name')
    spanOne.innerHTML = `

    `
    li.append(spanOne) const spanTwo = document.createElement('span')
    spanTwo.classList.add('ability-short-description') li.append(spanTwo)

}
console.log(addPokemonAbilities())



const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        spinner.classList.add('hidden')
        addPokemonImage(parsedResponse)
    })