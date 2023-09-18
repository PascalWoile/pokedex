function displayPreview(i, pokemonId, pokemonMiniSprite, pokemonName) {
  return `
    <div onclick="loadDetailedView(${i})" class="smallCard d-flex justify-center align-center">
      <div class="d-flex flex-dir-col t-center smallInnerCard" id="cardBg${i}">
        <span class="smallCardTextTop">#${pokemonId}</span>
        <img src="${pokemonMiniSprite}" alt="">
        <span class="smallCardTextBot">${pokemonName}</span>
      </div>
    </div>
    `;
}

function pokemonCount(loadedPokemon) {
  return `currently loaded Pokemon: <b>${loadedPokemon}</b>`;
}


function displayCanvas(){
  return `
      <div class="d-flex justify-center">
        <canvas id="myChart"></canvas>
      </div>
  `}

function displayAbout() {
  return`
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
  `}

  function displayTypes(i, type){
    return `<span id="typeContainer${i}" class="type col-w">${type}</span>`
  }

  function displayNoEvo() {
    return`
  <div class="d-flex justify-center align-center evolutionTree">
          <span>No Evolution Chain</span>
        </div>  
  `}
  

function displayDetails(id, displayedId){
  return `
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
    <span class="underline-on-hover" onclick="showMoves(${id})">Moves</span>
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
}

function displayEvolutionTree(firstEvoItemCheck, baseFormImg, baseFormName, firstEvoItemCheck, firstEvoImg, firstEvoName, firstEvoReqLvl) {
  if (firstEvoItemCheck != null) { //EVO MIT ITEM GEHT!
          return`
          <div id="evolutionTree" class="d-flex justify-center align-center evolutionTree">
                  <div class="d-flex flex-dir-col justify-center align-center">
                    <img class="evoArt" src="${baseFormImg}" alt="">
                    <span>${baseFormName}</span>
                  </div>
                  <div class="d-flex flex-dir-col justify-center align-center"> 
                  <img class="evoTo" src="./img/fast-forward.png" alt="">
                  <span class="f-size10">${firstEvoItemCheck['name']}</span>
                  </div>
                  <div class="d-flex flex-dir-col justify-center align-center">
                    <img class="evoArt" src="${firstEvoImg}" alt="">
                    <span>${firstEvoName}</span>
                  </div>
                </div>  
          `
        }else{
          // ERSTE EVO OHNE ITEM GEHT!
          if(firstEvoReqLvl != null){
          return `
          <div id="evolutionTree" class="d-flex justify-center align-center evolutionTree">
                  <div class="d-flex flex-dir-col justify-center align-center">
                    <img class="evoArt" src="${baseFormImg}" alt="">
                    <span>${baseFormName}</span>
                  </div>
                  <div class="d-flex flex-dir-col justify-center align-center"> 
                  <img class="evoTo" src="./img/fast-forward.png" alt="">
                  <span class="f-size10">lvl ${firstEvoReqLvl}</span>
                  </div>
                  <div class="d-flex flex-dir-col justify-center align-center">
                    <img class="evoArt" src="${firstEvoImg}" alt="">
                    <span>${firstEvoName}</span>
                  </div>
                </div>  
          `
          }else{
            return`
          <div id="evolutionTree" class="d-flex justify-center align-center evolutionTree">
                  <div class="d-flex flex-dir-col justify-center align-center">
                    <img class="evoArt" src="${baseFormImg}" alt="">
                    <span>${baseFormName}</span>
                  </div>
                  <div class="d-flex flex-dir-col justify-center align-center"> 
                  <img class="evoTo" src="./img/fast-forward.png" alt="">
                  <span class="f-size10">special</span>
                  </div>
                  <div class="d-flex flex-dir-col justify-center align-center">
                    <img class="evoArt" src="${firstEvoImg}" alt="">
                    <span>${firstEvoName}</span>
                  </div>
                </div>  
          `}
}}