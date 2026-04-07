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

    // ================= ID =================
    get id() {
        return this.#id;
    }

    set id(value) {
        if (value && value <= 0) {
            throw new Error("ID inválido");
        }
        this.#id = value;
    }

    // ================= NOME =================
    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.validarNome(value);
        this.#nome = value.trim();
    }

    validarNome(nome) {
        if (!nome || nome.trim().length < 3) {
            throw new Error("Nome deve ter pelo menos 3 caracteres");
        }
    }

    // ================= CPF =================
    get cpf() {
        return this.#cpf;
    }

    set cpf(value) {
        if (!value) {
            throw new Error("CPF é obrigatório");
        }

        // aceita só números, pontos e traço (formato CPF)
        const formatoValido = /^[0-9.\-]+$/;

        if (!formatoValido.test(value)) {
            throw new Error("CPF não pode conter letras");
        }

        const cpfLimpo = value.replace(/\D/g, '');

        this.validarCpf(cpfLimpo);
        this.#cpf = cpfLimpo;
    }

    validarCpf(cpf) {
        if (!cpf) {
            throw new Error("CPF é obrigatório");
        }

        if (cpf.length !== 11) {
            throw new Error("CPF deve ter 11 dígitos");
        }

        // bloqueia CPFs repetidos (111111..., 222222...)
        if (/^(\d)\1+$/.test(cpf)) {
            throw new Error("CPF inválido");
        }

        let soma = 0;

        // 1º dígito
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf[i]) * (10 - i);
        }

        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        if (resto !== parseInt(cpf[9])) {
            throw new Error("CPF inválido");
        }

        // 2º dígito
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf[i]) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        if (resto !== parseInt(cpf[10])) {
            throw new Error("CPF inválido");
        }
    }

    // ================= FACTORY =================
    static criar(dados) {
        return new Cliente(dados.nome, dados.cpf, null);
    }

    static alterar(dados, id) {
        return new Cliente(dados.nome, dados.cpf, id);
    }
}