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
  pkmnArtWorkSrc = responseAsJSON["sprites"]["other"]["official-artwork"]["front_default"];
  pkmnTypeMain = responseAsJSON["types"]["0"]["type"]["name"];
  pkmnShinyForm = responseAsJSON["sprites"]["front_shiny"];
  pkmnHeight = responseAsJSON["height"];
  pkmnWeight = responseAsJSON["weight"];
  types = responseAsJSON["types"];
  pokemonName = firstLettertoCapital(responseAsJSON["name"]);
  pokemonId = addZeroes(responseAsJSON["id"]);
  pokemonMiniSprite = responseAsJSON["sprites"]["front_default"];
  pokemonType = responseAsJSON["types"]["0"]["type"]["name"];
  pokemonMoves = responseAsJSON['moves']
}

async function fetchFirstEvoURL(urlBase, urlEvo1){
    let baseFormResponse = await fetch(urlBase);
    let firstEvolutionResponse = await fetch(urlEvo1);
    let baseFormJSON = await baseFormResponse.json();
    let firstEvoJSON = await firstEvolutionResponse.json();
    baseFormImg = baseFormJSON["sprites"]["other"]["official-artwork"]["front_default"];
    baseFormId = baseFormJSON['id'];
    firstEvoImg = firstEvoJSON["sprites"]["other"]["official-artwork"]["front_default"];
    firstEvoReq = firstEvoCheck[0]["evolution_details"][0];
    firstEvoReqLvl = firstEvoReq["min_level"];
    firstEvoItemCheck = firstEvoReq["item"];
    firstEvoId = firstEvoJSON['id']

}

async function fetchSecondEvoURL(url){
    let secondEvolutionResponse = await fetch(url);
    let secondEvoJSON = await secondEvolutionResponse.json();
    console.log(secondEvoJSON['id']);
    secondEvoImg = secondEvoJSON["sprites"]["other"]["official-artwork"]["front_default"];
    secondEvoReq = secondEvoCheck[0]["evolution_details"][0];
    secondEvoItemCheck = secondEvoReq["item"];
    secondEvoReqLvl = secondEvoReq["min_level"];
    secondEvoId = secondEvoJSON['id'];
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
  if (firstEvoCheck.length > 0) {
    secondEvoCheck = firstEvoCheck[0]['evolves_to'];
  }
  
}

function typeLoop(type, typeContainer, i){
  typeContainer.innerHTML += displayTypes(i, type);
    document
      .getElementById(`typeContainer${i}`)
      .classList.add(`bgType-${type}`);
}


async function startFilter(){
  let btn = document.getElementById('searchButton');
  btn.disabled = true;
  let searchScreen = document.getElementById('searchingScreen');
  toggleClass(btn, 'cursor-dis');
  toggleClass(searchScreen, 'd-none')
  await filterPkmn();
  btn.disabled = false;
  toggleClass(btn, 'cursor-dis')
  toggleClass(searchScreen, 'd-none');
}

function toggleClass(elem, cssClass) {
  elem.classList.toggle(cssClass)
}

async function filterPkmn(){
  let search = document.getElementById('search').value;
  search = search.toLowerCase();
  if (search.length <=0) {
    mainContent.innerHTML = ``;
    loadingScreen(30, 1);
  }else{
    mainContent.innerHTML = ``;
  await searchLoop(search);
  if (mainContent.innerHTML === '') {
    mainContent.innerHTML = noResults();
  }
  }
  
}

async function searchLoop(search) {
  for (i = 1; i < 1000; i++) {
    await fetchURLPkmn(`https://pokeapi.co/api/v2/pokemon/${i}`)
    let mainContent = document.getElementById("mainContent");
      if(pokemonName.toLowerCase().startsWith(search)){
        mainContent.innerHTML += displayPreview(i, pokemonId, pokemonMiniSprite, pokemonName);
        document.getElementById(`cardBg${i}`).classList.add(`bg-${pokemonType}`);
      }
  }
}