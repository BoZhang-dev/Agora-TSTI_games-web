const API_KEY = 'fa64d94a92904f01822a854b93741b2f';
const BASE_URL = 'https://api.rawg.io/api';
const content = document.getElementById('content');
const loadingOverlay = document.getElementById('loading-overlay');
const showMoreButton = document.getElementById('show-more-button');
const searchBar = document.getElementById('search-bar');
let currentCategory = 'new-trending';
let currentPage = 1;
let searchQuery = '';

// URL for the placeholder image when no game image is available
const placeholderImage = 'https://raw.githubusercontent.com/BoZhang-dev/Agora-TSTI_games-web/refs/heads/main/objets/icons/hide_image_256dp_E8EAED_FILL0_wght400_GRAD0_opsz48.png';

// Initialize the page with event listeners and load default content
function initialize() {
    document.getElementById('new-trending').addEventListener('click', () => loadGames('new-trending'));
    document.getElementById('best-of-year').addEventListener('click', () => loadGames('best-of-year'));
    document.getElementById('all-games').addEventListener('click', () => loadGames('all-games'));

    showMoreButton.addEventListener('click', () => loadGames(currentCategory, ++currentPage));

    // Search functionality
    searchBar.addEventListener('input', () => {
        searchQuery = searchBar.value;
        loadGames(currentCategory, 1); // Reset to page 1 when a new search is triggered
    });

    loadGames(currentCategory);
}

// Show the loading overlay
function showLoading() {
    loadingOverlay.style.visibility = 'visible';
}

// Hide the loading overlay
function hideLoading() {
    loadingOverlay.style.visibility = 'hidden';
}

// Load games based on category and search query
async function loadGames(category, page = 1) {
    currentCategory = category;
    currentPage = page;
    showLoading();
    if (page === 1) content.innerHTML = ''; // Clear content if loading a new category or search

    let url = `${BASE_URL}/games?key=${API_KEY}&page_size=20&page=${page}`;
    if (category === 'new-trending') url += '&ordering=released';
    else if (category === 'best-of-year') url += `&dates=${new Date().getFullYear()}-01-01,${new Date().getFullYear()}-12-31&ordering=-rating`;
    else if (category === 'all-games') url += '&ordering=-added';

    // Include the search query if it exists
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGames(data.results);
        
        // Toggle "Show More" button visibility
        showMoreButton.style.display = data.next ? 'block' : 'none';
    } catch (error) {
        console.error('Error fetching data:', error);
        content.innerHTML = '<h2>Failed to load games. Please try again later.</h2>';
    } finally {
        hideLoading();
    }
}

// Display games on the page
function displayGames(games) {
    games.forEach(game => {
        // Log the full game object to the console
        console.log("Game Information:", game);

        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        const gameImage = game.background_image || placeholderImage;
        const releaseDate = game.released 
            ? new Date(game.released).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) 
            : 'Date inconnue';
        const updateDate = game.updated 
            ? new Date(game.updated).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) 
            : 'Date inconnue';
        const starRating = '★'.repeat(Math.round(game.rating)) + '☆'.repeat(5 - Math.round(game.rating));

        // Set the RAWG game URL using the game's slug
        const gameUrl = `https://rawg.io/games/${game.slug}`;

        // Set up the game card HTML
        gameCard.innerHTML = `
            <img src="${gameImage}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>Date de sortie : ${releaseDate}</p>
            <p>Mise à jour : ${updateDate}</p>
            <p>Note : ${starRating}</p>
        `;

        // Add click event to open the game page in a new tab
        gameCard.addEventListener('click', () => {
            window.open(gameUrl, '_blank');
        });

        content.appendChild(gameCard);
    });
}

// Initialize on page load
initialize();
