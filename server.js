const express = require('express');
const fs = require('fs');
const path = require('path');
const { filterMovies } = require('./movieUtils');

const app = express();
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/search', (req, res) => {
    const query = req.query.q || '';
    const genre = req.query.genre || 'Tots';

    fs.readFile(path.join(__dirname, 'pelicules.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error llegint les dades' });
        }

        const movies = JSON.parse(data);
        const result = filterMovies(movies, query, genre);
        res.json(result);
    });
});

app.get('/genres', (req, res) => {
    fs.readFile(path.join(__dirname, 'pelicules.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error llegint les dades' });
        }

        const movies = JSON.parse(data);
        const genres = [...new Set(movies.map(m => m.genre))].sort();
        res.json(genres);
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor actiu a http://localhost:${PORT}`);
});
