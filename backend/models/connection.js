import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
    credenciais recebe o arquivo json para as credenciais do Google Shhets API
*/
const credenciais = path.resolve(__dirname, "../config/credenciais.json");
const id = "id da planilha";

async function autenticarContaServico() {
    const auth = new google.auth.GoogleAuth({
        keyFile: credenciais,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'], 
    });
    
    return google.sheets({ 
        version: 'v4',
        auth: await auth.getClient()
    });
};

async function leitura(minha_aba, escopo) {
    const contaAutenticada = await autenticarContaServico();
    const resultado = await contaAutenticada.spreadsheets.values.get({
        spreadsheetId: id,
        range: `${minha_aba}!${escopo}`
    });
    
    return resultado.data.values;
}

export {leitura};