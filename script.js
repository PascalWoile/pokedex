const pokemonArray = [
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", 
    "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", 
    "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", 
    "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", 
    "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", 
    "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", 
    "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", 
    "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", 
    "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", 
    "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", 
    "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", 
    "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", 
    "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", 
    "slowpoke", "slowbro", "magnemite", "magneton", "farfetchd", "doduo", 
    "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", 
    "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", 
    "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", 
    "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", 
    "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", 
    "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", 
    "starmie", "mr-mime", "scyther", "jynx", "electabuzz", 
    "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", 
    "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", 
    "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", 
    "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", 
    "mewtwo", "mew"
  ];

async function loadAllPokemon(){
    for (let i = 0; i < pokemonArray.length; i++) {
        const pokemon = pokemonArray[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
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
    document.getElementById('pokemonName').innerHTML += `<h2>${responseAsJSON['name']}</h2>`
    document.getElementById('pokemonImg').src += `<div>${responseAsJSON['sprites']['other']['official-artwork']['front_default']}</div>`
}