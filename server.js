const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Servir el frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Retornar totes les pel·lícules
app.get('/movies', (req, res) => {
    fs.readFile('movies.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error llegint el fitxer de pel·lícules');
        }
        res.json(JSON.parse(data));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor actiu a http://localhost:${PORT}`);
});
