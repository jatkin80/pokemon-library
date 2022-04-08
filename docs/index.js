const spinner = document.querySelector(".spinner")
const ul = document.querySelector("ul")


function addPokemonImage(response) {
    const div = document.createElement('div')
    div.classList.add('pokemon-listing')
    div.innerHTML = `
   <figure>
       <img src = "${response.sprites.front_default}" alt = "${response.name}"/>
       <figcaption> <a href="pokemon.html?pokemon=${response.id}"> ${response.name} </a></figcaption>
       </figure>
   `
    ul.append(div)
}

const url = "https://pokeapi.co/api/v2/pokemon/?limit=50"
console.log(url)
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