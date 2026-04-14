import { connection } from "../configs/Database.js";

const clienteRepository = {

    criar: async (cliente, telefones, endereco) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            // cliente
            const [clienteResult] = await conn.execute(
                "INSERT INTO clientes (nome, cpf) VALUES (?, ?)",
                [cliente.nome, cliente.cpf]
            );

            const idCliente = clienteResult.insertId;

            // telefones (multi)
            for (let tel of telefones) {
                await conn.execute(
                    "INSERT INTO telefones (idCliente, telefone) VALUES (?, ?)",
                    [idCliente, tel.telefone]
                );
            }

            // endereco (ViaCEP)
            await conn.execute(
                `INSERT INTO enderecos 
    (idCliente, cep, numero, logradouro, complemento, bairro, cidade, uf)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    idCliente,
                    endereco.cep ?? null,
                    endereco.numero ?? null,
                    endereco.logradouro ?? null,
                    endereco.complemento ?? null,
                    endereco.bairro ?? null,
                    endereco.cidade ?? null,
                    endereco.uf ?? null
                ]
            );

            await conn.commit();

            return { idCliente };

        } catch (error) {
            await conn.rollback();
            throw error;
        } 
          finally{
            conn.release();
        }
    },

    selecionar: async () => {
        const [rows] = await connection.execute(`
            SELECT c.*, t.telefone, e.*
            FROM clientes c
            INNER JOIN telefones t ON c.idCliente = t.idCliente
            INNER JOIN enderecos e ON c.idCliente = e.idCliente
        `);

        return rows;
    },

    editar: async (cliente, telefones, endereco) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            // atualiza cliente
            await conn.execute(
                "UPDATE clientes SET nome=?, cpf=? WHERE idCliente=?",
                [
                    cliente.nome ?? null,
                    cliente.cpf ?? null,
                    cliente.id
                ]
            );

            // remove telefones antigos
            await conn.execute(
                "DELETE FROM telefones WHERE idCliente=?",
                [cliente.id]
            );

            // insere novos telefones
            for (let tel of telefones) {
                await conn.execute(
                    "INSERT INTO telefones (idCliente, telefone) VALUES (?, ?)",
                    [cliente.id, tel.telefone]
                );
            }

            // atualiza endereço
            await conn.execute(
                `UPDATE enderecos SET 
                cep=?, numero=?, logradouro=?, complemento=?, bairro=?, cidade=?, uf=?
             WHERE idCliente=?`,
                [
                    endereco.cep ?? null,
                    endereco.numero ?? null,
                    endereco.logradouro ?? null,
                    endereco.complemento ?? null,
                    endereco.bairro ?? null,
                    endereco.cidade ?? null,
                    endereco.uf ?? null,
                    cliente.id
                ]
            );

            await conn.commit();

            return { message: "Cliente atualizado com sucesso" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } 
        finally{
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            // ordem por causa das FK
            await conn.execute("DELETE FROM telefones WHERE idCliente=?", [id]);
            await conn.execute("DELETE FROM enderecos WHERE idCliente=?", [id]);
            await conn.execute("DELETE FROM clientes WHERE idCliente=?", [id]);

            await conn.commit();

            return { message: "Cliente deletado com sucesso" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } 
          finally{
            conn.release();
        }
    }
};

export default clienteRepository;