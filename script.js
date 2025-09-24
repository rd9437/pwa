const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJhMTBjNDI5OTE0MTU3MzgwOGQyNzEwNGVkMThmYSIsInN1YiI6IjY0ZjVhNTUwMTIxOTdlMDBmZWE5MzdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.84b7vWpVEilAbly4RpS01E9tyirHdhSXjcpfmTczI3Q';
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';

async function fetchPosters() {
  const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('posterGrid');
  const posters = [];

  fetchPosters().then(data => {
    // Fetch the poster images and store them in an array
    data.forEach(movie => {
      const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
      posters.push(posterUrl);
    });

    // Add all posters as the background in a grid
    posters.forEach(posterUrl => {
      const img = document.createElement('img');
      img.src = posterUrl;
      img.alt = 'Movie Poster';
      grid.appendChild(img);
    });
  });
});
