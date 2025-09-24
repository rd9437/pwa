// script.js

const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJhMTBjNDI5OTE0MTU3MzgwOGQyNzEwNGVkMThmYSIsInN1YiI6IjY0ZjVhNTUwMTIxOTdlMDBmZWE5MzdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.84b7vWpVEilAbly4RpS01E9tyirHdhSXjcpfmTczI3Q';
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';

async function fetchPosters() {
  const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

document.addEventListener('DOMContentLoaded', () => {
  const background = document.querySelector('.background');
  const posters = [];

  // Fetch the movie posters
  fetchPosters().then(data => {
    data.forEach(movie => {
      const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
      posters.push(posterUrl);
    });

    // Set initial background image
    setBackgroundImage(posters[0]);

    // Change background every 5 seconds
    let index = 0;
    setInterval(() => {
      index = (index + 1) % posters.length;
      setBackgroundImage(posters[index]);
    }, 5000);
  });

  function setBackgroundImage(imageUrl) {
    background.style.backgroundImage = `url(${imageUrl})`;
  }

  // Mouse parallax effect (optional)
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    background.style.transform = `translate(-${x / 20}%, -${y / 20}%)`;
  });
});
