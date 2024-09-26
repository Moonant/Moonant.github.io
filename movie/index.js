document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies');

    // Fetch movies from movies.json

    fetch('./movie/movie_by_wa.json')
        .then(response => response.json())
        .then(movies => {
            // Sort movies by release date (newest first)
            movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

            // Create and append movie poster elements
            movies.forEach(movie => {
                const posterElement = document.createElement('div');
                posterElement.className = 'movie-poster';
                posterElement.innerHTML = `
                    <img src="${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-release-date">${movie.release_date}</div>
                    <div class="movie-overview hidden">${movie.overview}</div>
                `;
                posterElement.addEventListener('click', () => {
                    posterElement.querySelector('.movie-overview').classList.toggle('hidden');
                });
                moviesContainer.appendChild(posterElement);
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            moviesContainer.innerHTML = '<p>Error loading movies. Please try again later.</p>';
        });
});
