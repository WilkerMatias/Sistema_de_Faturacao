const db = require('./db');

class Factura {
    static async create(id_user, produtos, total) {
        // Iniciar transação
        await db.beginTransaction();

        try {
            // Inserir nova fatura na tabela 'faturas'
            const [faturaResult] = await db.execute(
                'INSERT INTO faturas (id_user, total) VALUES (?, ?)',
                [id_user, total]
            );
            const id_fatura = faturaResult.insertId;

            // Inserir produtos na tabela 'fatura_detalhes'
            for (let produto of produtos) {
                await db.execute(
                    'INSERT INTO fatura_detalhes (id_fatura, id_produto, quantidade, preco_unit) VALUES (?, ?, ?, ?)',
                    [id_fatura, produto.id_produto, produto.quantidade, produto.preco_unit]
                );
            }

            // Commit da transação
            await db.commit();

            return id_fatura;
        } catch (err) {
            // Rollback em caso de erro
            await db.rollback();
            throw err;
        }
    }

    static getAll() {
        return db.execute('SELECT * FROM faturas');
    }

    static getById(id) {
        return db.execute('SELECT * FROM faturas WHERE id_fatura = ?', [id]);
    }

    static deleteById(id) {
        return db.execute('DELETE FROM faturas WHERE id_fatura = ?', [id]);
    }

    static getProdutoMaisVendido() {
        return db.execute(`
            SELECT fd.id_produto, SUM(fd.quantidade) AS total_vendido
            FROM fatura_detalhes fd
            GROUP BY fd.id_produto
            ORDER BY total_vendido DESC
            LIMIT 10
        `);
    }

    static getVendasDoDia() {
        return db.execute('SELECT * FROM faturas WHERE DATE(data_fatura) = CURDATE()');
    }

    static getVendasDoMes() {
        return db.execute(`
            SELECT * FROM faturas
            WHERE MONTH(data_fatura) = MONTH(CURDATE()) AND YEAR(data_fatura) = YEAR(CURDATE())
        `);
    }
}

module.exports = Factura;