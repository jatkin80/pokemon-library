 const url = new URL(window.location)
 const queryString = new URLSearchParams(url.search)
 const main = document.querySelector("main")

 fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
     .then(response => response.json())
     .then(response => {
         const name = `${ response.name }`;
         const title = document.querySelector("title");
         title.textContent = name;
         const pokemonDetails = document.createElement("div")
         pokemonDetails.classList = "pokemon-details"
         pokemonDetails.innerHTML = `
            <figure>
                <img src="${response.sprites.front_shiny}" alt="${name}" />
                <figcaption>${name}</figcaption>
            </figure>
            <h2>Abilities</h2>
        `;
         main.append(pokemonDetails);
         const abilitiesRequests = response.abilities
             .map(response => response.ability.url)
             .map(url => {
                 return fetch(url).then(response => response.json())
             })
         return Promise.all(abilitiesRequests)
     }).then(responses => {
         const ul = document.createElement("ul")
         ul.classList = "abilities"
         main.append(ul)
         responses.map(response => {
             const li = document.createElement("li")
             li.innerHTML = `
                <span class="ability-name">${response.name}</span>
                <span class="ability-short-description">${response.effect_entries[1].short_effect}</span> 
                `
             return li;
         }).forEach(li => {
             ul.append(li)
         })
         const spinner = document.querySelector(".spinner")
         spinner.classList.add("hidden")
     })