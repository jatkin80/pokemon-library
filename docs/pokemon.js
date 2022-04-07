const main = document.querySelector("main")
const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const spinner = document.querySelector(".spinner")

fetch(`https://pokeapi.co/api/v2/pokemon/${ queryString.get( "pokemon" ) }`)
    .then(response => response.json())
    .then(response => {
        const div = document.createElement('div')
        div.classList.add('pokemon-details')
        div.innerHTML = `
<figure>
   <img src="${ response.sprites.front_default }" alt="${ response.name }" />
    <figcaption>${response.name}</figcaption>
        </figure>
        <h2>Abilities</h2>
    `;
        main.append(div);
        const abilitiesList = response.abilities
            .map(response => response.ability.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        return Promise.all(abilitiesList)
    }).then(response => {
        const ul = document.createElement("ul")
        ul.classList = ("abilities")
        main.append(ul)
        response.map(response => {
                const li = document.createElement("li")
                li.innerHTML = `
<span class='ability-name'>
${response.name}
</span>
<br>
 <span class='ability-short-description'>
 ${response.effect_entries[1].short_effect}
 </span>
 `
                return li;
            })
            .forEach(li => {
                ul.append(li)
            })
        spinner.classList.add('hidden')
    });