// Importa o modelo de Factura
const Factura = require('../models/Factura');

// Função para criar uma nova factura
async function createFactura(req, res) {
    const { id_user, produtos } = req.body;

    // Verifica se os dados estão completos
    if (!id_user || !produtos || !Array.isArray(produtos)) {
        return res.status(400).json({ error: 'Dados inválidos.' });
    }

    // Calcula o total da factura
    const total = produtos.reduce((sum, item) => sum + (item.quantidade * item.preco_unit), 0);

    try {
        // Chama o método para criar a factura
        await Factura.create(id_user, produtos, total);
        res.status(201).json({ message: 'Factura criada com sucesso.' });
    } catch (error) {
        // Loga e retorna um erro em caso de falha
        console.error('Erro ao criar a factura:', error);
        res.status(500).json({ error: 'Erro ao criar a factura.' });
    }
}

// Função para buscar todas as facturas
async function getAllFacturas(req, res) {
    try {
        // Chama o método para buscar todas as facturas
        const [facturas] = await Factura.getAll();
        res.json(facturas);
    } catch (error) {
        // Loga e retorna um erro em caso de falha
        console.error('Erro ao buscar as facturas:', error);
        res.status(500).json({ error: 'Erro ao buscar as facturas.' });
    }
}

// Função para buscar uma factura por ID
async function getFacturaById(req, res) {
    const { id } = req.params;

    // Verifica se o ID foi fornecido
    if (!id) {
        return res.status(400).json({ error: 'ID não fornecido.' });
    }

    try {
        // Chama o método para buscar a factura pelo ID
        const [factura] = await Factura.getById(id);
        if (factura.length > 0) {
            res.json(factura[0]);
        } else {
            res.status(404).json({ message: 'Factura não encontrada.' });
        }
    } catch (error) {
        // Loga e retorna um erro em caso de falha
        console.error('Erro ao buscar a factura por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar a factura por ID.' });
    }
}

// Função para deletar uma factura por ID
async function deleteFacturaById(req, res) {
    const { id } = req.params;

    // Verifica se o ID foi fornecido
    if (!id) {
        return res.status(400).json({ error: 'ID não fornecido.' });
    }

    try {
        // Chama o método para deletar a factura pelo ID
        const [result] = await Factura.deleteById(id);
        if (result.affectedRows > 0) {
            res.json({ message: 'Factura excluída com sucesso.' });
        } else {
            res.status(404).json({ message: 'Factura não encontrada.' });
        }
    } catch (error) {
        // Loga e retorna um erro em caso de falha
        console.error('Erro ao excluir a factura:', error);
        res.status(500).json({ error: 'Erro ao excluir a factura.' });
    }
}

async function getFacturasByData(req, res) {
    const { data_lancamento } = req.params;

    try {
        // Chama o método para buscar as facturas por data de lançamento
        const [facturas] = await Factura.getByDataLancamento(data_lancamento);
        res.json(facturas);
    } catch (error) {
        // Loga e retorna um erro em caso de falha
        console.error('Erro ao buscar as facturas por data de lançamento:', error);
        res.status(500).json({ error: 'Erro ao buscar as facturas por data de lançamento.' });
    }
}

module.exports = {
    createFactura,
    getAllFacturas,
    getFacturaById,
    deleteFacturaById,
    getFacturasByData,
};
