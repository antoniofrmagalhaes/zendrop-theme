const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração da pasta pública
app.use(express.static(path.join(__dirname, 'public')));

app.get('/settings.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'settings.json'));
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
