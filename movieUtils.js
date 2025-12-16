function filterMovies(movies, query) {
    if (!query) return movies;

    return movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );
}

// Per Node.js
if (typeof module !== 'undefined') {
    module.exports = { filterMovies };
}
