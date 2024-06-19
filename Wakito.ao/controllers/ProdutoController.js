const Produto = require('../models/Produto');

async function getAllProdutos(req, res) {
    try {
        const produtos = await Produto.fetchAll();
        res.json(produtos[0]);
    } catch (error) {
        console.error('Erro ao buscar todos os produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar todos os produtos.' });
    }
}

async function getProdutoById(req, res) {
    const { id } = req.params;
    try {
        const produto = await Produto.findById(id);
        if (produto && produto[0].length > 0) {
            res.json(produto[0][0]);
        } else {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar o produto por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar o produto por ID.' });
    }
}

async function getProdutoByName(req, res) {
    const { nome } = req.params;
    try {
        const produto = await Produto.findByName(nome);
        if (produto && produto[0].length > 0) {
            res.json(produto[0][0]);
        } else {
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar o produto por nome:', error);
        res.status(500).json({ error: 'Erro ao buscar o produto por nome.' });
    }
}

async function getProdutosByCategory(req, res) {
    const { categoria } = req.params;
    try {
        const produtos = await Produto.findByCategory(categoria);
        res.json(produtos[0]);
    } catch (error) {
        console.error('Erro ao buscar os produtos por categoria:', error);
        res.status(500).json({ error: 'Erro ao buscar os produtos por categoria.' });
    }
}

async function createProduto(req, res) {
    const { nome, descricao, categoria, preco_unit, estoque } = req.body;
    try {
        await Produto.save({ nome, descricao, categoria, preco_unit, estoque });
        res.json({ message: 'Produto criado com sucesso.' });
    } catch (error) {
        console.error('Erro ao criar o produto:', error);
        res.status(500).json({ error: 'Erro ao criar o produto.' });
    }
}

async function updateProduto(req, res) {
    const { id } = req.params;
    const { nome, descricao, categoria, preco_unit, estoque } = req.body;
    try {
        const produto = { nome, descricao, categoria, preco_unit, estoque, id};
        await Produto.update(produto);
        res.json({ message: 'Produto atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar o produto.' });
    }
}

async function deleteProduto(req, res) {
    const { id } = req.params;
    try {
        await Produto.delete(id);
        res.json({ message: 'Produto excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        res.status(500).json({ error: 'Erro ao excluir o produto.' });
    }
}

module.exports = {
    getAllProdutos,
    getProdutoById,
    getProdutoByName,
    getProdutosByCategory,
    createProduto,
    updateProduto,
    deleteProduto,
};
