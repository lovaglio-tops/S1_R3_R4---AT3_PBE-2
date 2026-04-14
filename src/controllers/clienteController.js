import axios from "axios";
import { Cliente } from "../models/Cliente.js";
import { Telefone } from "../models/Telefone.js";
import { Endereco } from "../models/Endereco.js";
import clienteRepository from "../repositories/clienteRepository.js";

const clienteController = {

    criar: async (req, res) => {
        try {
            const { nome, cpf, cep, numero, telefones, complemento } = req.body;
            const cepRegex = /^[0-9]{8}$/;

            if (!cepRegex.test(cep)) {
                return res.status(400).json({ message: 'Verifique o CEP informado' });
            }

            if (!cep || cep.length !== 8) {
                return res.status(400).json({ error: "CEP inválido (deve ter 8 dígitos)" });
            }

            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const viaCep = response.data;

            if (viaCep.erro) {
                return res.status(400).json({ error: "CEP inválido" });
            }

            const cliente = Cliente.criar({ nome, cpf });

            const listaTelefones = (telefones || []).map(t =>
                Telefone.criar({ telefone: t }, null)
            );

            const endereco = Endereco.criar({
                cep,
                numero,
                logradouro: viaCep.logradouro,
                bairro: viaCep.bairro,
                cidade: viaCep.localidade,
                uf: viaCep.uf,
                complemento: complemento ?? viaCep.complemento ?? null
            });

            const result = await clienteRepository.criar(
                cliente,
                listaTelefones,
                endereco
            );

            res.status(201).json(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, cpf, cep, numero, telefones, complemento } = req.body;

            const cepRegex = /^[0-9]{8}$/;
            if (!cepRegex.test(cep)) {
                return res.status(400).json({ message: 'CEP inválido' });
            }

            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const viaCep = response.data;

            if (viaCep.erro) {
                return res.status(400).json({ error: "CEP inválido" });
            }

            const cliente = Cliente.alterar({ nome, cpf }, id);

            const listaTelefones = (telefones || []).map(t =>
                Telefone.criar({ telefone: t }, id)
            );

            const endereco = Endereco.criar({
                cep,
                numero,
                logradouro: viaCep.logradouro,
                bairro: viaCep.bairro,
                cidade: viaCep.localidade,
                uf: viaCep.uf,
                complemento: complemento ?? viaCep.complemento ?? null
            }, id);

            const result = await clienteRepository.editar(
                cliente,
                listaTelefones,
                endereco
            );

            res.json(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;

            const result = await clienteRepository.deletar(id);

            res.json(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    
};

export default clienteController;

async function consultaCep(cep) {
    try {
        const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

        if (respApi.data.erro) {
            throw new Error ("erro ao buscar cep", erro.menssage)
        }

        return (respApi.data)
    } catch (error) {
        console.error(error.menssage)
        throw new Error (error)
    }   
}