function createChart(ctx, HP, ATK, DEF, SPATK, SPDEF, SPEED) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["HP", "ATTACK", "DEFENSE", "SP-ATK", "SP-DEF", "SPEED"],
      datasets: [
        {
          backgroundColor: [
            "green",
            "red",
            "orange",
            "purple",
            "yellow",
            "blue",
          ],
          data: [HP, ATK, DEF, SPATK, SPDEF, SPEED],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      indexAxis: "y",
      scales: {
        x: {
          suggestedMin: 0,
          suggestedMax: 200,
        },
      },
    },
  });
}

async function loadingScreen(count, start) {
  ToggleLoading();
  await loadPokemon(count, start);
  loadedPokemon += 1;
  ToggleLoading();
}

function ToggleLoading() {
  document.getElementById("loadingScreen").classList.toggle("d-none");
  document.getElementById("loadingScreen").classList.toggle("d-flex");
  document.getElementById("body").classList.toggle("overf-hid");
}

async function loadPokemon(count, start) {
  for (i = start; i < start + count; i++) {
    let mainContent = document.getElementById("mainContent");
    await fetchURLPkmn(`https://pokeapi.co/api/v2/pokemon/${i}`);
    loadedPokemon += 1;
    mainContent.innerHTML += displayPreview(i, pokemonId, pokemonMiniSprite, pokemonName);
    document.getElementById(`cardBg${i}`).classList.add(`bg-${pokemonType}`);
  }

}

function miniLoaderAnimation() {
  document.getElementById("miniLoader").classList.add("rotate");
  setTimeout(stopMiniLoaderAnimation, 2000);
}

function loadMorePokemon() {
  loadingScreen(30, loadedPokemon);
  loadedPokemon--;
}

function stopMiniLoaderAnimation() {
  document.getElementById("miniLoader").classList.remove("rotate");
}

async function loadDetailedView(id) {
  if (id === 0) {
    id = 1;
  }
  let displayedId = id;
  await fetchURLSpecies(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  await fetchURLPkmn(`https://pokeapi.co/api/v2/pokemon/${id}`);
  displayedId = displayIdZeroes(id, displayedId);
  displayCard(id, displayedId);
  document.getElementById(`detailBg${id}`).classList.add(`bg-${pkmnTypeMain}`);
  for (let i = 0; i < types.length; i++) {
    let type = types[i]["type"]["name"];
    let typeContainer = document.getElementById("pkmnTypeContainer");
    typeLoop(type, typeContainer, i);
  }
}


function displayCard(id, displayedId) {
  details.classList.remove("d-none");
  details.classList.add("d-flex");
  details.innerHTML = displayDetails(id, displayedId);
}

function displayIdZeroes(id, displayedId) {
  if (id < 10) {
    return (displayedId = "00" + pkmnId);
  }
  if (id < 100) {
    return (displayedId = "0" + pkmnId);
  } else {
    return displayedId;
  }
}

async function showStats(id) {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  const HP = responseAsJSON["stats"]["0"]["base_stat"];
  const ATK = responseAsJSON["stats"]["1"]["base_stat"];
  const DEF = responseAsJSON["stats"]["2"]["base_stat"];
  const SPATK = responseAsJSON["stats"]["3"]["base_stat"];
  const SPDEF = responseAsJSON["stats"]["4"]["base_stat"];
  const SPEED = responseAsJSON["stats"]["5"]["base_stat"];
  document.getElementById("infoContent").innerHTML = displayCanvas();
  const ctx = document.getElementById("myChart");
  createChart(ctx, HP, ATK, DEF, SPATK, SPDEF, SPEED);
}

async function showAbout(id) {
  await fetchURLSpecies(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  await fetchURLPkmn(`https://pokeapi.co/api/v2/pokemon/${id}`);
  document.getElementById("infoContent").innerHTML = displayAbout();
}

function closeDetailedView() {
  let details = document.getElementById("detailedViewContent");
  details.classList.add("d-none");
  details.classList.remove("d-flex");
}

async function showEvos(id) {
  let content = document.getElementById("infoContent");
  await fetchURLSpecies(`https://pokeapi.co/api/v2/pokemon-species/${id}`); //neu
  await getEvoChain(`https://pokeapi.co/api/v2/pokemon-species/${id}`); //neu
  if (firstEvoCheck.length === 0 || firstEvoCheck === undefined) {
    content.innerHTML = displayNoEvo();
  } else {
    let firstEvoName = firstEvoCheck[0]["species"]["name"];
    await fetchFirstEvoURL(`https://pokeapi.co/api/v2/pokemon/${baseFormName}`, `https://pokeapi.co/api/v2/pokemon/${firstEvoName}`)
    firstEvoName = firstLettertoCapital(firstEvoName);
    baseFormName = firstLettertoCapital(baseFormName);
    content.innerHTML = displayEvolutionTree(firstEvoItemCheck, baseFormImg, baseFormName, firstEvoItemCheck, firstEvoImg, firstEvoName, firstEvoReqLvl, baseFormId, firstEvoId);
    secondEvo();
  }
}

async function secondEvo() {
  let evolutionTree = document.getElementById("evolutionTree");
  if (secondEvoCheck.length === 0) {
    return;
  } else {
    let secondEvoName = secondEvoCheck[0]["species"]["name"];
    await fetchSecondEvoURL(`https://pokeapi.co/api/v2/pokemon/${secondEvoName}`)
    secondEvoName = firstLettertoCapital(secondEvoName);
    evolutionTree.innerHTML += displaySecondEvoTree(secondEvoItemCheck, secondEvoImg, secondEvoName, secondEvoReqLvl, secondEvoId);
    
}
}

async function showMoves(id){
  let content = document.getElementById("infoContent");
  content.innerHTML = createMovesContainer();
  let movesContainer = document.getElementById('movesContainer');
  await fetchURLPkmn(`https://pokeapi.co/api/v2/pokemon/${id}`);
  for (let i = 0; i < pokemonMoves.length; i++) {
    const move = pokemonMoves[i]['move']['name'];
    movesContainer.innerHTML += displayMoves(move);
  }
}

