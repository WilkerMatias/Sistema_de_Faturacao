const bcrypt = require('bcrypt');
const User = require('../models/User');

async function login(req, res) {
    const { nome, senha } = req.body;

    // Verificação se os campos foram fornecidos
    if (!nome || !senha) {
        return res.status(400).json({ success: false, message: 'Nome e senha são obrigatórios.' });
    }

    try {
        const [rows] = await User.findByName(nome);
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Usuário não encontrado.' });
        }

        const user = rows[0];

        // Comparar a senha fornecida com a senha hash no banco de dados
        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (passwordMatch) {
            res.json({ success: true, message: 'Login bem sucedido.' });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ success: false, error: 'Erro ao fazer login.' });
    }
}

async function register(req, res) {
    const { nome, senha, tipo } = req.body;
    try {
        await User.save({ nome, senha, tipo });
        res.json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
}

async function getAllUsers(req, res) {
    try {
        const [rows] = await User.fetchAll();
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
}

async function getUserByID(req, res) {
    const { id_user } = req.params;
    try {
        const [rows] = await User.findById(id_user);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuário por id_user:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário por id_user.' });
    }
}

async function updateUser(req, res) {
    const { id_user } = req.params;
    const { nome, senha } = req.body;
    try {
        const [rows] = await User.findById(id_user);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const hashedPassword = await bcrypt.hash(senha, 10);
        await User.update({ nome, senha: hashedPassword, id_user });
        res.json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
}

async function deleteUser(req, res) {
    const { id_user } = req.params;
    try {
        await User.delete(id_user);
        res.json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
        res.status(500).json({ error: 'Erro ao excluir o usuário.' });
    }
}

module.exports = {
    login,
    register,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser
};
