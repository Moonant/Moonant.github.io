document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies');

    // Fetch movies from movies.json
    fetch('movies.json')
        .then(response => response.json())
        .then(movies => {
            // Create and append movie poster elements
            movies.forEach(movie => {
                const posterElement = document.createElement('div');
                posterElement.className = 'movie-poster';
                posterElement.innerHTML = `
                    <img src="${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-title">${movie.title}</div>
                `;
                moviesContainer.appendChild(posterElement);
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            moviesContainer.innerHTML = '<p>Error loading movies. Please try again later.</p>';
        });
});
