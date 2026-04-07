export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;

    constructor(nome, valor, idCategoria, caminhoImagem, id) {
        this.nome = nome;
        this.valor = valor;
        this.idCategoria = idCategoria;
        this.caminhoImagem = caminhoImagem;
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
        if (value !== undefined && value.length < 3) {
            throw new Error("Nome inválido");
        }
        this.#nome = value;
    }

    get valor() {
        return this.#valor;
    }
    set valor(value) {
        if (value !== undefined && value <= 0) {
            throw new Error("Valor inválido");
        }
        this.#valor = value;
    }

    get idCategoria() {
        return this.#idCategoria;
    }
    set idCategoria(value) {
        if (value !== undefined && !value) {
            throw new Error("Categoria obrigatória");
        }
        this.#idCategoria = value;
    }

    get caminhoImagem() {
        return this.#caminhoImagem;
    }
    set caminhoImagem(value) {
        this.#caminhoImagem = value;
    }

    static criar(dados, imagem) {
        return new Produto(
            dados.nome,
            dados.valor,
            dados.idCategoria,
            imagem,
            null
        );
    }

    static alterar(dados, imagem, id) {
        return new Produto(
            dados.nome,
            dados.valor,
            dados.idCategoria,
            imagem,
            id
        );
    }
}