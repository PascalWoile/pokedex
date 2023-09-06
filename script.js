let loadedPokemon = 1;
const pokemonArray = [];
 




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


async function loadingScreen(){
  document.getElementById('loadingScreen').classList.remove('d-none');
  document.getElementById('loadingScreen').classList.add('d-flex');
  document.getElementById('body').classList.add('overf-hid');
  await loadPokemon();
  document.getElementById('loadingScreen').classList.add('d-none');
  document.getElementById('loadingScreen').classList.remove('d-flex');
  document.getElementById('body').classList.remove('overf-hid');

}

async function loadPokemon(){
    for (let i = loadedPokemon; i < (loadedPokemon+100); i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJSON = await response.json();
        console.log(responseAsJSON);
        let pokemonName = responseAsJSON['name'].charAt(0).toUpperCase() + responseAsJSON['name'].slice(1);
        let pokemonId = responseAsJSON['id'];
        let pokemonMiniSprite = responseAsJSON['sprites']['front_default'];
        let pokemonType = responseAsJSON['types']['0']['type']['name'];
        if(pokemonId < 100){
          pokemonId = "0"+responseAsJSON['id']
        }
        if(pokemonId < 10){
          pokemonId = "00"+responseAsJSON['id']
        }
        document.getElementById('mainContent').innerHTML += 
        `
        <div onclick="loadDetailedView(${(i)})" class="smallCard d-flex justify-center align-center">
          <div class="d-flex flex-dir-col t-center smallInnerCard" id="cardBg${i}">
            <span class="smallCardTextTop">#${pokemonId}</span>
            <img src="${pokemonMiniSprite}" alt="">
            <span class="smallCardTextBot">${pokemonName}</span>
          </div>
        </div>
        `
        document.getElementById(`cardBg${i}`).classList.add(`bg-${pokemonType}`);
        
    }
    document.getElementById('loadedPokemon').innerHTML = `
    currently loaded Pokemon: <b>${loadedPokemon+99}</b>
    `
}

function miniLoaderAnimation(){
  document.getElementById('miniLoader').classList.add('rotate');
  setTimeout(stopMiniLoaderAnimation, 2000)

}

async function loadMorePokemon(){
  loadedPokemon += 100;
  loadingScreen();
  //document.getElementById('clickBlocker').classList.toggle('d-none');
  //document.getElementById('miniLoader').classList.toggle('filtered');
  //document.getElementById('miniLoader').classList.add('rotate');
  //await loadPokemon();
  //document.getElementById('miniLoader').classList.remove('rotate')
  //document.getElementById('clickBlocker').classList.toggle('d-none');
  //document.getElementById('miniLoader').classList.toggle('filtered');
  
}

function stopMiniLoaderAnimation(){
  document.getElementById('miniLoader').classList.remove('rotate');
}

async function loadDetailedView(id){
    let displayedId = id;
    let url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    let url2 = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let response2 = await fetch(url2);
    let responseAsJSON = await response.json();
    let responseAsJSON2 = await response2.json();
    console.log(responseAsJSON);
    console.log(responseAsJSON2);
    let pkmnName = responseAsJSON['name'].charAt(0).toUpperCase() + responseAsJSON['name'].slice(1);
    let pkmnNameGer = responseAsJSON['names'][5]['name'].charAt(0).toUpperCase() + responseAsJSON['names'][5]['name'].slice(1);
    let pkmnArtWorkSrc = responseAsJSON2['sprites']['other']['official-artwork']['front_default'];
    let pkmnTypeMain = responseAsJSON2['types']['0']['type']['name'];
    let pkmnShinyForm = responseAsJSON2['sprites']['front_shiny'];
    let details =  document.getElementById('detailedViewContent');
    let pkmnFlavor = responseAsJSON['flavor_text_entries'][10]['flavor_text'];
    let pkmnGenus = responseAsJSON['genera'][7]['genus'];
    let pkmnHeight = responseAsJSON2['height'];
    let pkmnWeight = responseAsJSON2['weight'];
    if(id < 100){
      displayedId = "0"+responseAsJSON['id'];
    }
    if(id < 10){
      displayedId = "00"+responseAsJSON['id'];
    }
    details.classList.remove('d-none');
    details.classList.add('d-flex'); //for Schleife bei Type
    details.innerHTML = `
    <div class="pokemonCard">
  <div id="detailBg${id}" class="pokemon">
    <div class="nav-arrows">
      <img
        class="icon filt-i"
        src="./img/icon/arrow-left-solid.svg"
        alt=""
      />
      <img
        class="icon filt-i"
        src="./img/icon/arrow-right-solid.svg"
        alt=""
      />
    </div>
    <div class="cardHeader">
      <div class="name-and-type">
        <div class="d-flex gap5">
          <h2 class="col-w">${pkmnName}</h2>
          <h2 class="col-w">(${pkmnNameGer})</h2>
        </div>
        <div id="pkmnTypeContainer"> 
          
        </div>
      </div>
      <span class="pokemon-number col-w">#${displayedId}</span>
    </div>
    <img
      class="pokemonArt"
      src="${pkmnArtWorkSrc}"
    />
  </div>
  <div class="infoContainer">
    <div class="tabs">
      <span class="underline-on-hover" onclick="showAbout(${id})">About</span>
      <span class="underline-on-hover" onclick="showStats(${id})">Base Stats</span>
      <span class="underline-on-hover" onclick="showEvos(${id})">Evolution</span>
      <span class="underline-on-hover">Moves</span>
    </div>
    <div class="infoContent" id="infoContent">

    <div class="d-flex justify-sb about">
              <span class="genus">${pkmnGenus}</span>
              <div class="d-flex flex-dir-col t-end">
                <table>
                  <tr>
                    <td>height:</td>
                    <td><b>${pkmnHeight/10} m</b></td>
                  </tr>
                  <tr>
                    <td>weight:</td>
                    <td><b>${pkmnWeight/10} kg</b></td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="details p-8">
              <span class="flavorText"
                >${pkmnFlavor}</span
              >
            </div> 


  </div>
  <div class="d-flex align-center justify-sb closeContainer">
    <img
      src="./img/icon/xmark-solid.svg"
      class="icon button p-8 col-w"
      onclick="closeDetailedView()"
    />
      <div class="d-flex shiny">
        <span>Shiny Form:</span>
        <img
        src="${pkmnShinyForm}"
        alt=""
      />
      </div>
    </div>
  </div>
</div>
</div>
    `
    document.getElementById(`detailBg${id}`).classList.add(`bg-${pkmnTypeMain}`);
    let types = responseAsJSON2['types']
    for (let i = 0; i < types.length; i++) {
      let type = types[i]['type']['name'];
      document.getElementById('pkmnTypeContainer').innerHTML += `<span id="typeContainer${i}" class="type col-w">${type}</span>`
      document.getElementById(`typeContainer${i}`).classList.add(`bgType-${type}`)
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
  document.getElementById('infoContent').innerHTML = `
      <div class="d-flex justify-center">
        <canvas id="myChart"></canvas>
      </div>
  `
  const ctx = document.getElementById('myChart');
  createChart(ctx, HP, ATK, DEF, SPATK, SPDEF, SPEED)
}

async function showAbout(id) {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  let url2 = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let response = await fetch(url);
  let response2 = await fetch(url2);
  let responseAsJSON = await response.json();
  let responseAsJSON2 = await response2.json();
  let pkmnFlavor = responseAsJSON['flavor_text_entries'][10]['flavor_text'];
  let pkmnGenus = responseAsJSON['genera'][7]['genus'];
  let pkmnHeight = responseAsJSON2['height'];
  let pkmnWeight = responseAsJSON2['weight'];
  document.getElementById('infoContent').innerHTML = `
  <div class="d-flex justify-sb about">
              <span class="genus">${pkmnGenus}</span>
              <div class="d-flex flex-dir-col t-end">
                <table>
                  <tr>
                    <td>height:</td>
                    <td><b>${pkmnHeight/10} m</b></td>
                  </tr>
                  <tr>
                    <td>weight:</td>
                    <td><b>${pkmnWeight/10} kg</b></td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="details p-8">
              <span class="flavorText"
                >${pkmnFlavor}</span
              >
            </div> 
  `
}


function closeDetailedView(){
    let details =  document.getElementById('detailedViewContent');
    details.classList.add('d-none');
    details.classList.remove('d-flex'); 
}

async function showEvos(id){
  let url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  let pkmnEvoChainURL = responseAsJSON['evolution_chain']['url'];
  let EvoChainResponse = await fetch(pkmnEvoChainURL);
  let EvoChainResponseAsJSON = await EvoChainResponse.json();
  console.log(EvoChainResponseAsJSON);
  let firstEvoCheck = EvoChainResponseAsJSON['chain']['evolves_to'];
  if (firstEvoCheck.length === 0) {
    console.log('KEINE EVO!')
  }else{
    console.log('ES GIBT EINE EVO!');
    let firstEvoName = firstEvoCheck[0]['species']['name'];
    let firstEvoReq = firstEvoCheck[0]['evolution_details'][0];
    let firstEvoItemCheck = firstEvoCheck[0]['evolution_details'][0]['item'];
    console.log(firstEvoItemCheck)
    if (firstEvoItemCheck != null) {
      console.log('ITEM ZUR ERSTEN EVO ERFORDERLICH');
    }else{
      console.log('KEIN ITEM ZUR ERSTEN EVO ERFORDERLICH');

    } 
    let secondEvoCheck = firstEvoCheck[0]['evolves_to'];
    if (secondEvoCheck.length === 0) {
      console.log('ES GIBT NUR EINE EVO, KEINE ZWEITE!')
    } else {
      console.log('HURRA! ES GIBT ZWEI EVOS!')
      let secondEvoName = secondEvoCheck[0]['species']['name'];
      let secondEvoReq = secondEvoCheck[0]['evolution_details'][0];
      let secondEvoItemCheck = secondEvoCheck[0]['evolution_details'][0]['item'];
      console.log(secondEvoItemCheck)
      if (secondEvoItemCheck != null) {
        console.log('ITEM ZUR ZWEITEN EVO ERFORDERLICH');
      }else{
        console.log('KEIN ITEM ZUR ZWEITEN EVO ERFORDERLICH');
  
      } 
    }
  }
}

//EVo Name + req designen
//Bilder ziehen über fetch url statt id den namen aus der evo-chain
//SUchfunktion implementieren