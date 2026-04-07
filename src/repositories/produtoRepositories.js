import { connection } from "../configs/Database.js";

const produtosRepository = {
    criar: async (produto) => {
        const sql = `
            INSERT INTO produtos (nome, valor, idCategoria, caminhoImagem)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            produto.nome,
            produto.valor,
            produto.idCategoria,
            produto.caminhoImagem
        ];

        const [rows] = await connection.execute(sql, values);
        return rows;
    },

     editar: async (produto) => {
    const sql = 'UPDATE produtos SET nome=?, valor=? WHERE Id=?';

    const values = [
        produto.nome ?? null,
        produto.valor ?? null,
        produto.id ?? null
    ];

    const [rows] = await connection.execute(sql, values);
    return rows;
},

    deletar: async (id) => {
        const sql = 'DELETE FROM produtos WHERE Id = ?';
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    },

    selecionar: async () => {
        const [rows] = await connection.execute(
            "SELECT * FROM produtos"
        );
        return rows;
    }
};

export default produtosRepository;