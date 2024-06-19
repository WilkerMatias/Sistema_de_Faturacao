const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const ProdutoController = require('../controllers/ProdutoController');
const FacturaController = require('../controllers/FacturaController');

// Rotas para usuários
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserByID);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Rotas para produtos
router.get('/produtos', ProdutoController.getAllProdutos);
router.get('/produtos/:id', ProdutoController.getProdutoById);
router.get('/produtos/nome/:nome', ProdutoController.getProdutoByName);
router.get('/produtos/categoria/:categoria', ProdutoController.getProdutosByCategory);
router.post('/produtos', ProdutoController.createProduto);
router.put('/produtos/:id', ProdutoController.updateProduto);
router.delete('/produtos/:id', ProdutoController.deleteProduto);

// Rotas para facturas
router.post('/facturas', FacturaController.createFactura);
router.get('/facturas', FacturaController.getAllFacturas);
router.get('/facturas/:id', FacturaController.getFacturaById);
router.delete('/facturas/:id', FacturaController.deleteFacturaById);
router.get('/facturas/data/:data_lancamento', FacturaController.getFacturasByData);

module.exports = router;
