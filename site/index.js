const spinner = document.querySelector(".spinner")
const ul = document.querySelector("ul")


function addPokemonImage (pokemon) {
  const div = document.createElement("div")
  div.classList.add("pokemon-listing")
  const imageUrl = pokemon.sprites.front_default
  div.innerHTML = `
      <figure> <a href= "pokemon.html?pokemon=${pokemon.name}">
        <img src="${imageUrl }"alt="${pokemon.name}"/>
        <figcaption>${pokemon.name}</figcaption></a>
      </figure>
    `
  ul.append(div)
}
const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=50"
fetch(apiUrl)
  .then(response => {
    return response.json()
  })
  .then(parsedResponse => {
    const parsedUrls = parsedResponse.results.map(result => result.url)
    const fetches = parsedUrls.map(url => fetch(url)
      .then(response => response.json()))
    return Promise.all(fetches)
  })
  .then(responses => {
    spinner.classList.add("hidden")
    responses.forEach(response => {
      addPokemonImage(response)
    })
  })