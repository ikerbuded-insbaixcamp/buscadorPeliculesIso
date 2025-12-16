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

    fs.readFile('pelicules.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error llegint el fitxer de pel·lícules');
        }

        const movies = JSON.parse(data);
        const result = filterMovies(movies, query);
        res.json(result);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor actiu a http://localhost:${PORT}`);
});
