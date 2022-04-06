const spinner = document.querySelector(".spinner")
const ul = document.querySelector("ul")


function addPokemonImage(pokemon) {
    const div = document.createElement("div")
        //pokemonListing.classList = ('pokemon-listing')
    div.innerHTML = `
<figure>
<img src = "${pokemon.sprites.front_default }" alt = "${pokemon.name}" />
 <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${pokemon.name}</a></figcaption>

</figure>
    `
    ul.append(div)
}
const url = "https://pokeapi.co/api/v2/pokemon/?limit=50"
fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches)
    })
    .then(responses => {
        spinner.classList.add('hidden')
        responses.forEach(response => {
            addPokemonImage(response)
        })
    })