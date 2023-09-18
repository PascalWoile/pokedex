let loadedPokemon = 0;
 

let pkmnName 
let pkmnNameGer 
let pkmnArtWorkSrc 
let pkmnTypeMain 
let pkmnShinyForm 
let details  
let pkmnFlavor 
let pkmnGenus 
let pkmnHeight
let pkmnWeight

let types
let pkmnId

let pokemonName 
let pokemonId 
let pokemonMiniSprite
let pokemonType 


let baseFormName 
let firstEvoCheck


function createChart(ctx, HP, ATK, DEF, SPATK, SPDEF, SPEED) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['HP', 'ATTACK', 'DEFENSE', 'SP-ATK', 'SP-DEF', 'SPEED'],
      datasets: [{
        backgroundColor: ['green', 'red', 'orange', 'purple', 'yellow', 'blue'],
        data: [HP, ATK, DEF, SPATK, SPDEF, SPEED],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false,
        }
      },
      indexAxis: 'y',
      scales: {
        x: {
            suggestedMin: 0,
            suggestedMax: 150,
        }
    }
  }});
}


async function loadingScreen(count, start){
  ToggleLoading();
  await loadPokemon(count, start);
  loadedPokemon += 1;
  ToggleLoading();

}

function ToggleLoading(){
  document.getElementById('loadingScreen').classList.toggle('d-none');
  document.getElementById('loadingScreen').classList.toggle('d-flex');
  document.getElementById('body').classList.toggle('overf-hid');
}

async function loadPokemon(count, start){
    for (i= start; i < (start+count); i++) {
        let mainContent = document.getElementById('mainContent');
        await fetchURLPkmn(`https://pokeapi.co/api/v2/pokemon/${i}`)
        loadedPokemon += 1;
        mainContent.innerHTML += displayPreview(i, pokemonId, pokemonMiniSprite, pokemonName);
        document.getElementById(`cardBg${i}`).classList.add(`bg-${pokemonType}`);
    }
    document.getElementById('loadedPokemon').innerHTML = pokemonCount(loadedPokemon);
}


function miniLoaderAnimation(){
  document.getElementById('miniLoader').classList.add('rotate');
  setTimeout(stopMiniLoaderAnimation, 2000)

}

function loadMorePokemon(){
  loadingScreen(50, loadedPokemon);
  loadedPokemon--;

}

function stopMiniLoaderAnimation(){
  document.getElementById('miniLoader').classList.remove('rotate');
}



async function loadDetailedView(id){
    let displayedId = id;
    await fetchURLSpecies(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    await fetchURLPkmn(`https://pokeapi.co/api/v2/pokemon/${id}`);
    displayedId = checkIdForZeroes(id, displayedId);
    displayCard(id, displayedId);
    document.getElementById(`detailBg${id}`).classList.add(`bg-${pkmnTypeMain}`);
    for (let i = 0; i < types.length; i++) {
      let type = types[i]['type']['name'];
      let typeContainer = document.getElementById('pkmnTypeContainer');
      typeContainer.innerHTML += displayTypes(i, type);
      document.getElementById(`typeContainer${i}`).classList.add(`bgType-${type}`)
    }
    
}

function displayCard(id, displayedId){
    details.classList.remove('d-none');
    details.classList.add('d-flex');
    details.innerHTML = displayDetails(id, displayedId)
}


function checkIdForZeroes(id, displayedId){
  if(id < 10){
    return displayedId = "00"+pkmnId;
  }
  if(id < 100){
    return displayedId = "0"+pkmnId;
  }
  else{
    return displayedId;
  }
}



async function showStats(id) {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  let HP = responseAsJSON['stats']['0']['base_stat'];
  let ATK = responseAsJSON['stats']['1']['base_stat'];
  let DEF = responseAsJSON['stats']['2']['base_stat'];
  let SPATK = responseAsJSON['stats']['3']['base_stat'];
  let SPDEF = responseAsJSON['stats']['4']['base_stat'];
  let SPEED = responseAsJSON['stats']['5']['base_stat'];
  document.getElementById('infoContent').innerHTML = displayCanvas();
  const ctx = document.getElementById('myChart');
  createChart(ctx, HP, ATK, DEF, SPATK, SPDEF, SPEED);
}

async function showAbout(id) {
  await fetchURLSpecies(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  await fetchURLPkmn(`https://pokeapi.co/api/v2/pokemon/${id}`);
  document.getElementById('infoContent').innerHTML = displayAbout();
}


function closeDetailedView(){
    let details =  document.getElementById('detailedViewContent');
    details.classList.add('d-none');
    details.classList.remove('d-flex'); 
}

async function showEvos(id){
  let content = document.getElementById('infoContent');
  await fetchURLSpecies(`https://pokeapi.co/api/v2/pokemon-species/${id}`); //neu
  await getEvoChain(`https://pokeapi.co/api/v2/pokemon-species/${id}`); //neu

  if (firstEvoCheck.length === 0) {
    content.innerHTML = displayNoEvo();
  }else{ //hier evtl. fetchurlpkmn anwenden und an dortige Variablen anpassen
    console.log('ES GIBT EINE EVO!');
    let firstEvoName = firstEvoCheck[0]['species']['name'];
    let baseFormUrl = `https://pokeapi.co/api/v2/pokemon/${baseFormName}`;
    let firstEvoUrl = `https://pokeapi.co/api/v2/pokemon/${firstEvoName}`;
    firstEvoName = firstLettertoCapital(firstEvoName);
    baseFormName = firstLettertoCapital(baseFormName);
    let baseFormResponse = await fetch(baseFormUrl);
    let firstEvolutionResponse = await fetch(firstEvoUrl);
    let baseFormJSON = await baseFormResponse.json();
    let firstEvoJSON = await firstEvolutionResponse.json();
    let baseFormImg = baseFormJSON['sprites']['other']['official-artwork']['front_default'];
    let firstEvoImg = firstEvoJSON['sprites']['other']['official-artwork']['front_default'];
    let firstEvoReq = firstEvoCheck[0]['evolution_details'][0];
    let firstEvoReqLvl = firstEvoReq['min_level'];
    let firstEvoItemCheck = firstEvoReq['item'];

    content.innerHTML = displayEvolutionTree(firstEvoItemCheck, baseFormImg, baseFormName, firstEvoItemCheck, firstEvoImg, firstEvoName, firstEvoReqLvl)
      
      secondEvo(firstEvoCheck);
    }
    
    } 
    







async function secondEvo(firstEvoCheck){
  let secondEvoCheck = firstEvoCheck[0]['evolves_to'];
if (secondEvoCheck.length === 0) {
  console.log('ES GIBT NUR EINE EVO, KEINE ZWEITE!')
} else {
  console.log('HURRA! ES GIBT ZWEI EVOS!')

  let secondEvoName = secondEvoCheck[0]['species']['name'];
  let secondEvoUrl = `https://pokeapi.co/api/v2/pokemon/${secondEvoName}`;
  secondEvoName = secondEvoName.charAt(0).toUpperCase() + secondEvoName.slice(1);
  let secondEvolutionResponse = await fetch(secondEvoUrl); 
  let secondEvoJSON = await secondEvolutionResponse.json();
  let secondEvoImg = secondEvoJSON['sprites']['other']['official-artwork']['front_default'];
  let secondEvoReq = secondEvoCheck[0]['evolution_details'][0];
  let secondEvoItemCheck = secondEvoReq['item'];
  let secondEvoReqLvl = secondEvoReq['min_level']

  console.log(secondEvoItemCheck)
  if (secondEvoItemCheck != null) {
    console.log('ITEM ZUR ZWEITEN EVO ERFORDERLICH');

    document.getElementById('evolutionTree').innerHTML += `
          <div class="d-flex flex-dir-col justify-center align-center"> 
          <img class="evoTo" src="./img/fast-forward.png" alt="">
          <span class="f-size10">${secondEvoItemCheck['name']}</span>
          </div>
          <div class="d-flex flex-dir-col justify-center align-center">
            <img class="evoArt" src="${secondEvoImg}" alt="">
            <span">${secondEvoName}</span>
          </div>
        </div>  
  `
  }else
  
  if (secondEvoReqLvl != null) {
    document.getElementById('evolutionTree').innerHTML += `
          <div class="d-flex flex-dir-col justify-center align-center"> 
          <img class="evoTo" src="./img/fast-forward.png" alt="">
          <span class="f-size10">lvl ${secondEvoReqLvl}</span>
          </div>
          <div class="d-flex flex-dir-col justify-center align-center">
            <img class="evoArt" src="${secondEvoImg}" alt="">
            <span>${secondEvoName}</span>
          </div>
        </div>  
  `
  }else{
    console.log('special ERFORDERLICH');
    document.getElementById('evolutionTree').innerHTML += `
          <div class="d-flex flex-dir-col justify-center align-center"> 
          <img class="evoTo" src="./img/fast-forward.png" alt="">
          <span class="f-size10">special </span>
          </div>
          <div class="d-flex flex-dir-col justify-center align-center">
            <img class="evoArt" src="${secondEvoImg}" alt="">
            <span>${secondEvoName}</span>
          </div>
        </div>  
  `
  } 
}}

//SUchfunktion implementieren