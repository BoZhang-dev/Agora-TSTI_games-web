const API_KEY = 'fa64d94a92904f01822a854b93741b2f'; //Le clé d'API
const BASE_URL = 'https://api.rawg.io/api'; //La base pour utilisé l'API

//asseigner les IDs en tant que variable 
const content = document.getElementById('content'); 
const loadingOverlay = document.getElementById('loading-overlay');
const showMoreButton = document.getElementById('show-more-button');
const searchBar = document.getElementById('search-bar');

//Le site commence avec ces valeurs
let currentCategory = 'all-games'; 
let currentPage = 1;
let searchQuery = '';

// URL d'image à afficher quand l'image n'est pas disponible
const placeholderImage = 'https://raw.githubusercontent.com/BoZhang-dev/Agora-TSTI_games-web/refs/heads/main/objets/icons/hide_image_256dp_E8EAED_FILL0_wght400_GRAD0_opsz48.png';

// Initialisation
function initialize() {
    document.getElementById('new-trending').addEventListener('click', () => loadGames('new-trending'));
    document.getElementById('best-of-year').addEventListener('click', () => loadGames('best-of-year'));
    document.getElementById('all-games').addEventListener('click', () => loadGames('all-games'));

    showMoreButton.addEventListener('click', () => loadGames(currentCategory, ++currentPage));

    // Fonction de recherche
    searchBar.addEventListener('input', () => {
        searchQuery = searchBar.value;
        loadGames(currentCategory, 1); // Reset à la page 1 quand une nouvelle recherche s'effectue
    });

    loadGames(currentCategory);
}

// Afficher le "loading" overlay
function showLoading() {
    loadingOverlay.style.visibility = 'visible';
}

// Cacher le "loading" overlay
function hideLoading() {
    loadingOverlay.style.visibility = 'hidden';
}

// Charger les jeux en fonction de la catégorie et de la recherche
async function loadGames(category, page = 1) {
    currentCategory = category;
    currentPage = page;
    showLoading();
    if (page === 1) content.innerHTML = ''; // effacer le contenu si une nouvelle categorie ou recherche s'effectue

    //Règlage du contenu à afficher
    let url = `${BASE_URL}/games?key=${API_KEY}&page_size=20&page=${page}`;
    if (category === 'new-trending') url += '&ordering=released';
    else if (category === 'best-of-year') url += `&dates=${new Date().getFullYear()}-01-01,${new Date().getFullYear()}-12-31&ordering=-rating`;
    else if (category === 'all-games') url += '&ordering=-added';

    // Inclure la "search query" s'il existe
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGames(data.results); //displaygames = les résultat à afficher
        
        // Système du bouton "Afficher Plus"
        showMoreButton.style.display = data.next ? 'block' : 'none';
    } catch (error) {
        console.error('Error fetching data:', error);
        content.innerHTML = '<h2>Failed to load games. Please try again later.</h2>';
    } finally {
        hideLoading();
    }
}

// Afficher les Jeux 
function displayGames(games) {
    games.forEach(game => {

        // Créer un log dans la console sur les data donner par RAWG
        console.log("Game Information:", game);

        // Définir les variable d'un "game card"
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        // Définir les variables dans un "game card"
        const gameImage = game.background_image || placeholderImage;
        const releaseDate = game.released 
            ? new Date(game.released).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) 
            : 'Date inconnue';
        const updateDate = game.updated 
            ? new Date(game.updated).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) 
            : 'Date inconnue';
        const starRating = '★'.repeat(Math.round(game.rating)) + '☆'.repeat(5 - Math.round(game.rating));

        // Mise en place de l'URL RAWG pour la redirection
        const gameUrl = `https://rawg.io/games/${game.slug}`;

        // Mise en place de HTML pour un "game card"
        gameCard.innerHTML = `
            <img src="${gameImage}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>Date de sortie : ${releaseDate}</p>
            <p>Mise à jour : ${updateDate}</p>
            <p>Note : ${starRating}</p>
        `;

        // permet la redirection au click sur un game card
        gameCard.addEventListener('click', () => {
            window.open(gameUrl, '_blank');
        });

        content.appendChild(gameCard);
    });
}

// Initialisation
initialize();
