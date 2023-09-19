function addZeroes(pokemonId) {
  if (pokemonId < 10) {
    return (pokemonId = "00" + pokemonId);
  }
  if (pokemonId < 100) {
    return (pokemonId = "0" + pokemonId);
  }
  return pokemonId;
}

async function fetchURLSpecies(url) {
  //Variablen Zuweisung
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  let nameEng = responseAsJSON["name"];
  let nameGer = responseAsJSON["names"][5]["name"];
  pkmnName = firstLettertoCapital(nameEng);
  pkmnNameGer = firstLettertoCapital(nameGer);
  details = document.getElementById("detailedViewContent");
  pkmnFlavor = responseAsJSON["flavor_text_entries"][10]["flavor_text"];
  pkmnGenus = responseAsJSON["genera"][7]["genus"];
  pkmnId = responseAsJSON["id"];
}

async function fetchURLPkmn(url) {
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  pkmnArtWorkSrc =
    responseAsJSON["sprites"]["other"]["official-artwork"]["front_default"];
  pkmnTypeMain = responseAsJSON["types"]["0"]["type"]["name"];
  pkmnShinyForm = responseAsJSON["sprites"]["front_shiny"];
  pkmnHeight = responseAsJSON["height"];
  pkmnWeight = responseAsJSON["weight"];
  types = responseAsJSON["types"];
  pokemonName = firstLettertoCapital(responseAsJSON["name"]);
  pokemonId = addZeroes(responseAsJSON["id"]);
  pokemonMiniSprite = responseAsJSON["sprites"]["front_default"];
  pokemonType = responseAsJSON["types"]["0"]["type"]["name"];
}

function firstLettertoCapital(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}


async function getEvoChain(url){
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  let pkmnEvoChainURL = responseAsJSON['evolution_chain']['url'];
  let EvoChainResponse = await fetch(pkmnEvoChainURL);
  let EvoChainResponseAsJSON = await EvoChainResponse.json();
  baseFormName = EvoChainResponseAsJSON['chain']['species']['name'];
  firstEvoCheck = EvoChainResponseAsJSON['chain']['evolves_to'];
}

function typeLoop(type, typeContainer, i){
  typeContainer.innerHTML += displayTypes(i, type);
    document
      .getElementById(`typeContainer${i}`)
      .classList.add(`bgType-${type}`);
}
