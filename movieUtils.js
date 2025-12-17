function filterMovies(movies, query, genre) {
    return movies.filter(movie => {
        const matchesTitle =
            !query || movie.title.toLowerCase().includes(query.toLowerCase());

        const matchesGenre =
            !genre || genre === 'Tots' || movie.genre === genre;

        return matchesTitle && matchesGenre;
    });
}

// Per Node.js
if (typeof module !== 'undefined') {
    module.exports = { filterMovies };
}
