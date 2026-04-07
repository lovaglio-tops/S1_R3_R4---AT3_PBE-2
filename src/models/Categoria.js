export class Categoria {
    #id;
    #nome;
    #descricao;
    #dataCad;

    constructor(pNome, pDescricao, pId) {
        this.nome = pNome ?? null;
        this.descricao = pDescricao ?? null;
        this.id = pId ?? null;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(value) {
        this.#validarDescricao(value);
        this.#descricao = value;
    }

    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('Nome deve ter entre 3 e 45 caracteres');
        }
    }

    #validarDescricao(value) {
        if (value && (value.trim().length < 10 || value.trim().length > 100)) {
            throw new Error('Descrição deve ter entre 10 e 100 caracteres');
        }
    }

    static criar(dados) {
        return new Categoria(dados.nome, dados.descricao, null);
    }

    static alterar(dados, id) {
        return new Categoria(dados.nome, dados.descricao, id);
    }
}