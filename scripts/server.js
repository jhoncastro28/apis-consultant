const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Para configurar la política CSP y que no haya problema mostrando las imágenes
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; img-src 'self' https://placebear.com https://*.dog.ceo");
    next();
});

app.use('/Scripts', express.static(path.join(__dirname)));
app.use('/Styles', express.static(path.join(__dirname, '../styles')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Combinar las respuestas que nos den las APIs y dar una respuesta
app.get('/api-combine', async (req, res) => {
    try {
        // Genera un tamaño aleatorio entre 200 y 250 para la imagen del oso, porque así funciona el API
        const bearSize = Math.floor(Math.random() * 50) + 200;
        const bearApi = `https://placebear.com/${bearSize}/${bearSize}`;
        const dogApi = await axios.get('https://dog.ceo/api/breeds/image/random');

        const combinedResponse = {
            bearImage: bearApi,
            dogImage: dogApi.data.message
        };

        res.json(combinedResponse);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de las APIs' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
