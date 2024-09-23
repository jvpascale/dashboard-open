import { leitura } from "./connection.js";
import { converterStringParaValorMonetario } from "../controller/cels-formatter.js";

const abaHistorico = "Histórico";
const abaCarteiraAtual = "Carteira Atual";

async function devolverHistorico() {
    const rows = await leitura(abaHistorico, `$A:Z`);

    const colunas = rows[0];

    const dadosFormatados = rows.slice(1).map(row => {
      const obj = {};
      row.forEach((value, index) => {
        const chave = colunas[index];

        if (chave != "Data") {
          obj[chave.trim().toLowerCase().replace(" ", "_")] = converterStringParaValorMonetario(value.trim());
        } else {
          obj["data"] = value.trim();

          const indice = rows.findIndex(arr => JSON.stringify(arr) === JSON.stringify(row)); 
          
          obj["inicio_semana"] = (indice - 1) % 7 == 0;
        }
      });

      return obj;
    });

    return dadosFormatados; 
}

async function listarLinhasDasColecoesCarteiras() {
  try {
    const range = "B:Z"; 
    const rows = await leitura(abaCarteiraAtual, range) || []; 

    return rows.filter((el) => el[0] != ''); 
  } catch (err) {
    console.log("Error ao tentar achar última linha dados da coleção | carteira: " + err); 
  }
}

async function tratarColecoesCarteiras() {
  const lista_ativos = await listarLinhasDasColecoesCarteiras(); 

  const colunas = lista_ativos[0];

  const colunas_ignoradas = ["Quantidade", "Valores diários"];

  const dadosFormatados = lista_ativos.slice(1).map(row => {
    const obj = {};
    row.forEach((value, index) => {
      const chave = colunas[index];
      if (!colunas_ignoradas.includes(chave)) {
        obj[colunas[index].trim()] = value.trim();
      }
    });

    return obj;
  });

  return dadosFormatados; 
}

async function agruparColecoesBlockchains() {
  const data = await tratarColecoesCarteiras(); 

  const groupedData = {};
  const dadosHistorico = await devolverHistorico();
  const dadoMaisRecenteHistorico = dadosHistorico[dadosHistorico.length - 1]; 

  groupedData.caixa = dadoMaisRecenteHistorico["caixa"];
  groupedData.tesouraria = dadoMaisRecenteHistorico["tesouraria"];
  groupedData.total_investido = dadoMaisRecenteHistorico["total_investido"];
  groupedData.blockchains = {};

  data.forEach(item => {
    

    const indexador = item['Carteira'] || " [Outros]";

    const blockchain = indexador.match(/\[(.*?)\]/)[1];

    const carteira = indexador.replace(/\s*\[.*?\]$/, '').trim();

    if (!groupedData.blockchains[blockchain]) {
      groupedData.blockchains[blockchain] = {};
    }

    if (!groupedData.blockchains[blockchain][carteira]) {
      groupedData.blockchains[blockchain][carteira] = [];
    }

    groupedData.blockchains[blockchain][carteira].push({
      'colecao': item['Coleção'],
      'total_investido': converterStringParaValorMonetario(item['Total investido']),
      hiperlink: item['Hiperlink']
    });
  });

  return groupedData;
}

export {agruparColecoesBlockchains, devolverHistorico}