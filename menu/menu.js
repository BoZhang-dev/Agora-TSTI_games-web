const apiKey = config.API_KEY;
fetch(`https://rawg.io/api/games?token&key=${fa64d94a92904f01822a854b93741b2f}`)
  .then(res => res.json())
  .then(data => console.log(data)
  .catch(error => console.error('Error:', error));