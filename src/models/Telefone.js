export class Telefone {
    #id;
    #idCliente;
    #telefone;

    constructor(telefone, idCliente, id) {
        this.telefone = telefone;
        this.idCliente = idCliente;
        this.id = id;
    }

    set telefone(value) {
        if (!value || value.length < 8) {
            throw new Error("Telefone inválido");
        }
        this.#telefone = value;
    }

    get telefone() {
        return this.#telefone;
    }

    static criar(dados, idCliente) {
        return new Telefone(dados.telefone, idCliente, null);
    }
}