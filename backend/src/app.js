import express from 'express';
import cors from 'cors'
//import {atualizarCarteira, obterDadoCarteira,  obterHistorico, paginarHistorico, quantidadeHistorico, sincronizarHistorico } from '../db/operations.js';

const app = express();
const PORT = 3001; 

app.use(express.json());

const carteiraAtualBruto = {"blockchains":{"Ethereum Mainnet":{"Carteira A":[{"colecao":"ForgottenRunesWizardCult","total_investido":3317.34,"hiperlink":"https://etherscan.io/address/0x76963c73F20839A490e88f66f4579ff41d903dcc"},{"colecao":"Genesis GOATs","total_investido":349.9,"hiperlink":"https://etherscan.io/address/0x76963c73F20839A490e88f66f4579ff41d903dcc"}],"Carteira B":[{"colecao":"ForgottenRunesWizardCult","total_investido":2658.67,"hiperlink":"https://arbiscan.io/address/0x517d7224B28E60bCdE57843C7e7D043D22b645E7"},{"colecao":"Genesis GOATs","total_investido":550,"hiperlink":"https://arbiscan.io/address/0x517d7224B28E60bCdE57843C7e7D043D22b645E7"}]},"Arbitrum":{"Carteira C":[{"colecao":"The Beacons Pets","total_investido":10465,"hiperlink":"https://arbiscan.io/address/0x459F27B4e0A867a063090f9cbd64B6fCa5D12516"},{"colecao":"WOP","total_investido":1110,"hiperlink":"https://arbiscan.io/address/0x459F27B4e0A867a063090f9cbd64B6fCa5D12516"}]},"Ronin":{"Carteira E":[{"colecao":"Moki - Genesis","total_investido":6672.15,"hiperlink":"https://app.roninchain.com/address/0xa715d6d4eb023b9fcbe9a8285fdc13ee2dea2ebb?t=collectibles"},{"colecao":"KrakenType","total_investido":480,"hiperlink":"https://app.roninchain.com/address/0xa715d6d4eb023b9fcbe9a8285fdc13ee2dea2ebb?t=collectibles"}]},"Solana":{"Carteira Z":[{"colecao":"Yatmishia","total_investido":6672.15,"hiperlink":"https://app.roninchain.com/address/0xa715d6d4eb023b9fcbe9a8285fdc13ee2dea2ebb?t=collectibles"},{"colecao":"GalacticKitty","total_investido":1749.15,"hiperlink":"https://app.roninchain.com/address/0xa715d6d4eb023b9fcbe9a8285fdc13ee2dea2ebb?t=collectibles"}]}},"caixa":35000,"tesouraria":39399.9,"total_investido":48993.06}

const historicoBruto = [{"data":"23/08/2024","caixa":98000,"inicio_semana":true,"rentabilidade":-0.1835,"rentabilidade_acumulada":-0.1835,"tesouraria":102249.9,"total_investido":27222.24},{"data":"24/08/2024","caixa":98000,"inicio_semana":false,"rentabilidade":-0.1906,"rentabilidade_acumulada":-0.3741,"tesouraria":102249.9,"total_investido":28332.24},{"data":"27/08/2024","caixa":98000,"inicio_semana":false,"rentabilidade":-0.2196,"rentabilidade_acumulada":-0.5937,"tesouraria":102249.9,"total_investido":33022.24},{"data":"28/08/2024","caixa":98000,"inicio_semana":false,"rentabilidade":-0.2202,"rentabilidade_acumulada":-0.8138,"tesouraria":102249.9,"total_investido":33117.92},{"data":"30/08/2024","caixa":98000,"inicio_semana":false,"rentabilidade":-0.2271,"rentabilidade_acumulada":-1.041,"tesouraria":102249.9,"total_investido":34302.15},{"data":"03/09/2024","caixa":98000,"inicio_semana":false,"rentabilidade":-0.2312,"rentabilidade_acumulada":-1.2722,"tesouraria":102249.9,"total_investido":35004.39},{"data":"04/09/2024","caixa":98000,"inicio_semana":false,"rentabilidade":-0.2407,"rentabilidade_acumulada":-1.5129,"tesouraria":102249.9,"total_investido":36663.06},{"data":"05/09/2024","caixa":98000,"inicio_semana":true,"rentabilidade":-0.2424,"rentabilidade_acumulada":-1.7553,"tesouraria":102249.9,"total_investido":36963.06},{"data":"06/09/2024","caixa":98000,"inicio_semana":false,"rentabilidade":-0.2438,"rentabilidade_acumulada":-1.9991,"tesouraria":102249.9,"total_investido":37213.06},{"data":"07/09/2024","caixa":98000,"inicio_semana":false,"rentabilidade":-0.2493,"rentabilidade_acumulada":-2.2484,"tesouraria":102249.9,"total_investido":38213.06},{"data":"10/09/2024","caixa":35000,"inicio_semana":false,"rentabilidade":-0.4639,"rentabilidade_acumulada":-2.7123,"tesouraria":39249.9,"total_investido":38213.06},{"data":"11/09/2024","caixa":35000,"inicio_semana":false,"rentabilidade":-0.4679,"rentabilidade_acumulada":-3.1802,"tesouraria":38959.9,"total_investido":38213.06},{"data":"12/09/2024","caixa":35000,"inicio_semana":false,"rentabilidade":-0.4639,"rentabilidade_acumulada":-3.6441,"tesouraria":39249.9,"total_investido":38213.06},{"data":"13/09/2024","caixa":35000,"inicio_semana":false,"rentabilidade":-0.4639,"rentabilidade_acumulada":-4.108,"tesouraria":39249.9,"total_investido":38213.06},{"data":"16/09/2024","caixa":35000,"inicio_semana":true,"rentabilidade":-0.464,"rentabilidade_acumulada":-4.572,"tesouraria":39399.9,"total_investido":38513.06},{"data":"17/09/2024","caixa":35000,"inicio_semana":false,"rentabilidade":-0.4974,"rentabilidade_acumulada":-5.0694,"tesouraria":39699.9,"total_investido":43993.06},{"data":"18/09/2024","caixa":35000,"inicio_semana":false,"rentabilidade":-0.5309,"rentabilidade_acumulada":-5.6004,"tesouraria":39399.9,"total_investido":48993.06},{"data":"20/09/2024","caixa":35000,"inicio_semana":false,"rentabilidade":-0.5309,"rentabilidade_acumulada":-6.1313,"tesouraria":39399.9,"total_investido":48993.06}]

app.use(cors());

const tamanhoPaginas = 30; 

app.get('/', async (req, res) => {
    try {
        //const ativosAtualizados = await obterDadoCarteira();
        res.json(carteiraAtualBruto); 

        setImmediate(async () => {
            try {
                //await atualizarCarteira(); 
                console.log("Carteira Atualizada!");
            } catch (error) {
                console.error('Erro ao atualizar a carteira:', error);
            }
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erro ao processar a solicitação' });
        }
    }
});

app.get('/performance', async (req, res) => {
    try {
        //const historicoAtualizado = await obterHistorico();
        res.json(historicoBruto);

        setImmediate(async () => {
            try {
                //await sincronizarHistorico();
                console.log("Histórico Atualizado!")
            } catch (error) {
                console.error('Erro ao sincronizar o histórico:', error);
            }
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erro ao processar a solicitação' });
        }
    }
});

app.get('/performance/pag', async (req, res) => {
    //const total = await quantidadeHistorico(); 

    res.json({
        'quantidade': Math.ceil(4 / 13)
    }); 
});

app.get('/performance/pag/:num', async (req, res) => {
    //const historico_parcelado = await paginarHistorico(req.params.num, tamanhoPaginas);

    res.json(historicoBruto);
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});