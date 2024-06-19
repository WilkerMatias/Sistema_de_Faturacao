const db = require('./db');

class Produto {
    // Retorna todos os produtos
    static fetchAll() {
        return db.execute('SELECT * FROM produtos');
    }

    // Busca produto por ID
    static findById(id) {
        return db.execute('SELECT * FROM produtos WHERE id_produto = ?', [id]);
    }

    // Busca produto por nome (uso de LIKE para busca parcial)
    static findByName(name) {
        return db.execute('SELECT * FROM produtos WHERE nome LIKE ?', [`%${name}%`]);
    }

    // Busca produto por categoria (uso de LIKE para busca parcial)
    static findByCategory(categoria) {
        return db.execute('SELECT * FROM produtos WHERE categoria LIKE ?', [`%${categoria}%`]);
    }

    // Adiciona estoque ao produto
    static addStock(id, stock) {
        return db.execute('UPDATE produtos SET estoque = estoque + ? WHERE id_produto = ?', [stock, id]);
    }

    // Remove estoque do produto com verificação para evitar estoque negativo
    static async removeStock(id, stock) {
        const [produto] = await db.execute('SELECT estoque FROM produtos WHERE id_produto = ?', [id]);

        if (produto.length > 0) {
            const estoqueAtual = produto[0].estoque;
            if (estoqueAtual >= stock) {
                return db.execute('UPDATE produtos SET estoque = estoque - ? WHERE id_produto = ?', [stock, id]);
            } else {
                throw new Error('Estoque insuficiente para remover a quantidade solicitada.');
            }
        } else {
            throw new Error('Produto não encontrado.');
        }
    }

    // Salva um novo produto
    static save(product) {
        return db.execute(
            'INSERT INTO produtos (nome, descricao, categoria, preco_unit, estoque) VALUES (?, ?, ?, ?, ?)',
            [product.nome, product.descricao, product.categoria, product.preco_unit, product.estoque]
        );
    }

    // Atualiza um produto existente
    static update(product) {
        return db.execute(
            'UPDATE produtos SET nome = ?, descricao = ?, categoria = ?, preco_unit = ?, estoque = ? WHERE id_produto = ?',
            [product.nome, product.descricao, product.categoria, product.preco_unit, product.estoque, product.id]
        );
    }

    // Deleta um produto pelo ID
    static delete(id) {
        return db.execute('DELETE FROM produtos WHERE id_produto = ?', [id]);
    }
}

module.exports = Produto;
