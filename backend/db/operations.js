import { agruparColecoesBlockchains, devolverHistorico } from "../models/operations.js";
import connectDB from "./connection.js";
import { carteiraAtual, performanceCarteira } from "./schemas.js";

connectDB();

const obterDadoCarteira = async () => {
    try {
        const data = await carteiraAtual.findOne({}, { _id: 0, __v: 0 });
        
        return data; 
    } catch (err) {
        console.error('Erro ao ler dados:', err);
    }
};

const atualizarCarteira = async () => {
    try {
        const newData = await agruparColecoesBlockchains();

        await carteiraAtual.findOneAndUpdate({}, newData, { upsert: true, new: true });

        return await carteiraAtual.findOne({});
    } catch (err) {
        console.error('Erro ao inserir ou ler dados:', err);
    }
};

const atualizarHistorico = async () => {
    try {
        const dados = await devolverHistorico(); 

        for (const entry of dados) {
            await performanceCarteira.updateOne(
              { data: entry.data }, // Filtro para encontrar o documento
              entry,                // Dados a serem atualizados ou inseridos
              { upsert: true }      // Configuração upsert para criar documento se não existir
            );
          }
        console.log('Dados atualizados com sucesso.');
    } catch (err) {
        console.error('Erro ao atualizar dados:', err);
    }
};

const excluirHistoricoInutil = async () => {
    try {
        const dados = await devolverHistorico(); 
        const datas = dados.map(el => el.data);

        await performanceCarteira.deleteMany({ data: { $nin: datas } });
        console.log('Dados obsoletos removidos com sucesso.');
    } catch (err) {
        console.error('Erro ao remover dados obsoletos:', err);
    }
};

const sincronizarHistorico = async () => {
    await atualizarHistorico();

    await excluirHistoricoInutil();
};

const obterHistorico = async () => {
    try {
        const data = await performanceCarteira.find({}, { _id: 0, __v: 0 }).lean();
        return data;
    } catch (err) {
        console.error('Erro ao ler dados:', err);
    }
};

const quantidadeHistorico = async () => {
    try {
        const result = await performanceCarteira.countDocuments(); 

        return result; 
    } catch (err) {
        console.error('Erro ao tentar ver quantas entradas existem no Histórico: ' + err);
    }
}

const paginarHistorico = async (pag, tamanho_pag) => {
    try {

        const numero_pagina = parseInt(pag, 10) || 1;

        const historico = await performanceCarteira.find({}, { _id: 0, __v: 0 });

        let paginaHistorico = historico.slice((numero_pagina - 1) * tamanho_pag, numero_pagina * tamanho_pag);

        return paginaHistorico; 
    } catch (err) {
        console.error('Erro ao tentar paginar o histórico: ' + err);
    }
}

export { obterDadoCarteira, obterHistorico, sincronizarHistorico, atualizarCarteira, quantidadeHistorico, paginarHistorico };