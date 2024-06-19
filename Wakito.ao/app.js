// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const apiRoutes = require('./routes/api'); // Certifique-se de que este arquivo existe e está implementado corretamente

const app = express();

// Configuração do body-parser para lidar com requisições URL-encoded e JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da sessão
app.use(session({
    secret: process.env.SESSION_SECRET, // Chave secreta para assinatura da sessão
    resave: false, // Não salva a sessão se não houver modificações
    saveUninitialized: false // Não cria uma sessão nova se não houver dados nela
}));

// Configuração das rotas da API
app.use('/api', apiRoutes);

// Rota principal para a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html')); // Certifique-se de que este arquivo HTML existe
});

// Iniciando o servidor na porta especificada nas variáveis de ambiente ou na porta 3000 por padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


