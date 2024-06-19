const db = require('./db');

// comunicação com bd por querys, retorna json onde tem retorno
// atualiza para a tua bd
class User {
    static fetchAll() {
        return db.execute('SELECT * FROM Usuarios');
    }

    static findById(id_user) {
        if (!id_user) {
            return Promise.reject(new Error('ID do usuário não fornecido.'));
        }
        return db.execute('SELECT * FROM users WHERE id_user = ?', [id_user]);
    }

    static findByName(nome) {
        if (!nome) {
            return Promise.reject(new Error('Nome do usuário não fornecido.'));
        }
        return db.execute('SELECT * FROM users WHERE nome = ?', [nome]);
    }

    static save(user) {
        return db.execute(
            'INSERT INTO users (nome, senha, tipo) VALUES (?, ?, ?)',
            [user.nome, user.senha, user.tipo]
        );
    }

    static update(user) {
        return db.execute(
            'UPDATE users SET nome = ?, senha = ? WHERE id_user = ?',
            [user.nome, user.senha, user.id_user]
        );
    }

    static delete(id_user) {
        return db.execute('DELETE FROM users WHERE id_user = ?', [id_user]);
    }
}

module.exports = User;
