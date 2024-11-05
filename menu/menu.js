// API KEY = fa64d94a92904f01822a854b93741b2f;

const gameList = document.querySelector(".gameList");
const loaderEl = document.getElementById("js-preloader");
const loadMoreGamesBtn = document.querySelector(".main-button")
let nextGameListUrl = null;

const url = `https://api.rawg.io/api/games?key=fa64d94a92904f01822a854b93741b2f`

const getPlatformStr = (platforms) => {
    const platformStr = platforms.map(pl => pl.platform.name).join(", ");
    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
    }
    return platformStr;
}

function loadGames(url){
    loaderEl.classList.remove("loaded");
    
    // Fetch recently released games from RAWG API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            nextGameListUrl = data.next ? data.next : null;
            const games = data.results;
    
            games.forEach(game => {
                const gameItemEl = `
                <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="item">
                        <img src="${game.background_image}" alt="${game.name} image">
                            <h4 class="game-name">${game.name}<br><span class="platforms">${getPlatformStr(game.parent_platforms)}</span></h4>
                            <ul>
                            <li><i class="fa fa-star"></i> <span class="rating">${game.rating}/5</span></li>
                                <li><i class="fa-regular fa-calendar"></i> <span class="date">${game.released}</span></li>
                                </ul>
                        </div>
                        </div>
                `
                gameList.insertAdjacentHTML("beforeend", gameItemEl)
            });
            loaderEl.classList.add("loaded");
            if (nextGameListUrl) {
                loadMoreGamesBtn.classList.remove("hidden");
            } else {
                loadMoreGamesBtn.classList.add("hidden");
            }
        })
        .catch(error => {
            console.log("An error occurred:", error);
        });
}


// load games
loadGames(url);

loadMoreGamesBtn.addEventListener("click", ()=>{
    if(nextGameListUrl){
        loadGames(nextGameListUrl);
    }
})