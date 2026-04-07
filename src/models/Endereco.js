export class Endereco {
    #id;
    #idCliente;
    #cep;
    #numero;
    #logradouro;
    #bairro;
    #cidade;
    #uf;
    #complemento;

    constructor(dados, idCliente, id) {
        this.cep = dados.cep;
        this.numero = dados.numero;
        this.logradouro = dados.logradouro;
        this.bairro = dados.bairro;
        this.cidade = dados.cidade;
        this.uf = dados.uf;
        this.complemento = dados.complemento;
        this.idCliente = idCliente;
        this.id = id;
    }

    set cep(value) {
        if (!value || value.length !== 8) {
            throw new Error("CEP inválido");
        }
        this.#cep = value;
    }

    get cep() { 
        return this.#cep;
    }

    static criar(dados, idCliente) {
        return new Endereco(dados, idCliente, null);
    }
}