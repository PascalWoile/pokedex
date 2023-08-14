const loadedPokemon = 30;
const pokemonArray = [];
  

async function loadAllPokemon(){
    for (let i = 0; i < loadedPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJSON = await response.json();
        console.log(responseAsJSON);
        let pokemonName = responseAsJSON['name'].charAt(0).toUpperCase() + responseAsJSON['name'].slice(1);
        let pokemonArtWorkSrc = responseAsJSON['sprites']['other']['official-artwork']['front_default'];
        document.getElementById('pokemon').innerHTML += `<h2 id="pokemonName${i}">${pokemonName}</h2>
        <img id="pokemonImg${i}" src="${pokemonArtWorkSrc}">`
    //document.getElementById('pokemonImg').src += `<div>${responseAsJSON['sprites']['other']['official-artwork']['front_default']}</div>`
    }

}

async function loadPokemon(){
    let url = `https://pokeapi.co/api/v2/pokemon/charmander`
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    console.log(responseAsJSON);
    //document.getElementById('pokemonName').innerHTML += `<h2>${responseAsJSON['name']}</h2>`
    //document.getElementById('pokemonImg').src += `<div>${responseAsJSON['sprites']['other']['official-artwork']['front_default']}</div>`
}