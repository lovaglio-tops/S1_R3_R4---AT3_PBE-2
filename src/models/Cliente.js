export class Cliente {
    #id;
    #nome;
    #cpf;
    #dataCad;

    constructor(nome, cpf, id) {
        this.nome = nome;
        this.cpf = cpf;
        this.id = id;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        if (value && value <= 0) throw new Error("ID inválido");
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.validarNome(value);
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.validarCpf(value);
        this.#cpf = value;
    }

    validarNome(nome) {
        if (!nome || nome.trim().length < 3) {
            throw new Error("Nome inválido");
        }
    }

    validarCpf(cpf) {
        if (!cpf || cpf.length !== 11) {
            throw new Error("CPF deve ter 11 dígitos");
        }
    }

    static criar(dados) {
        return new Cliente(dados.nome, dados.cpf, null);
    }

    static alterar(dados, id) {
        return new Cliente(dados.nome, dados.cpf, id);
    }
}