const main = document.querySelector("main")
const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const spinner = document.querySelector(".spinner")

function addPokemonImage (pokemon) {
  const div = document.createElement("div")
  div.classList.add("pokemon-details")
  const imageUrl = pokemon.sprites.front_default
  div.innerHTML = `
<figure>
    <img src="${ imageUrl }" alt="${ pokemon.name }" />
    <figcaption>${ pokemon.name }</figcaption>
        </figure>
        <h2>Abilities</h2>
    `
  main.append(div)
}

function engAbilities (engMatch) {
  const englishEffect = engMatch
    .find(object => object.language.name === "en")
  return englishEffect.short_effect
}

function addAbilities (enResponse) {
  const ul = document.createElement("ul")
  ul.classList = ("abilities")
  main.append(ul)
  const li = document.createElement("li")
  const abilitiesUrl = engAbilities(enResponse.effect_entries)
  li.innerHTML = `
<span class='ability-name'>${ enResponse.name }</span>
<br>
  <span class='ability-short-description'>${ abilitiesUrl }</span>
  `
  ul.append(li)
}

fetch(`https://pokeapi.co/api/v2/pokemon/${ queryString.get("pokemon") }`)
  .then(response => response.json())
  .then(response => {
    addPokemonImage(response)
    const abilities = response.abilities.map(result => result.ability)
    const parsedUrls = abilities.map(ability => ability.url)
    const fetches = parsedUrls.map(parsedUrl => fetch(parsedUrl)
      .then(parsedResponse => parsedResponse.json()))
    return Promise.all(fetches).then(parsedResponses => {
      parsedResponses.forEach(parsedResponse => addAbilities(parsedResponse))
      spinner.classList.add("hidden")
    })
  })