const main = document.querySelector("main")
const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const spinner = document.querySelector(".spinner")

function addPokemonImage (pokemon) {
  const div = document.createElement("div")
  div.classList.add("pokemon-details")
  div.innerHTML = `
<figure>
    <img src="${ pokemon.sprites.front_default }" alt="${ pokemon.name }" />
    <figcaption>${ pokemon.name }</figcaption>
        </figure>
        <h2>Abilities</h2>
    `
  main.append(div)
}

function englishAbilities (arrayofObjects) {
  const englishEffect = arrayofObjects.find(object => object.language.name === "en")
  return englishEffect.short_effect
}

function addAbilities (response) {
  const ul = document.createElement("ul")
  ul.classList = ("abilities")
  main.append(ul)
  const li = document.createElement("li")
  li.innerHTML = `
<span class='ability-name'>${ response.name }</span>
<br>
  <span class='ability-short-description'>${ englishAbilities(response.effect_entries) }</span>
  `
  ul.append(li)
}

fetch(`https://pokeapi.co/api/v2/pokemon/${ queryString.get("pokemon") }`)
  .then(response => response.json())
  .then(response => {
    addPokemonImage(response)
    const abilities = response.abilities.map(result => result.ability)
    const urls = abilities.map(ability => ability.url)
    const fetches = urls.map(url => fetch(url).then(response => response.json()))
    return Promise.all(fetches).then(responses => {
      responses.forEach(response => addAbilities(response))
      spinner.classList.add("hidden")
    })
  })