export const api = {
    getCarteira: async () => {
        const response = await fetch('http://localhost:3001/')
        return await response.json()
    },
    getColecao: async () => {
        const response = await fetch('http://localhost:3001/')
        const data = await response.json()

        const colecoes = [];
        
        colecoes.push(data.ativos) // Adiciona os ativos no array colecoes
        
        return data;
    },
    getCaixa: async () => {
        const response = await fetch('http://localhost:3001/')
        const data = await response.json()
        const caixa = data.caixa;
        
        return caixa;
    },
    getValorTesouraria: async () => {
      const response = await fetch('http://localhost:3001/')
      const data = await response.json()
      const tesouraria = data.tesouraria;
      
      return tesouraria;
    },
    getColecoesPassadas: async (current) => {
        try {
            const response = await fetch('http://localhost:3001/');
            const data = await response.json();
            const blockchains = data.blockchains;
            const blockchainOrder = Object.keys(blockchains); // Obtém a lista de blockchains
            let totalCollections = 0;
            let isCurrent = false;
            const seenCollections = new Set(); // Conjunto para armazenar coleções já contadas
    
            for (const blockchain of blockchainOrder) {
                if (blockchain === current) {
                    isCurrent = true;
                } else if (!isCurrent) {
                    // Soma as coleções dos blockchains anteriores
                    for (const wallet of Object.values(blockchains[blockchain] || {})) {
                        for (const item of wallet) {
                            if (!seenCollections.has(item.colecao)) {
                                seenCollections.add(item.colecao);
                                totalCollections += 1; // Incrementa o número total de coleções únicas
                            }
                        }
                    }
                }
            }
    
            return totalCollections;
        } catch (error) {
            console.error('Erro ao buscar as coleções:', error);
            return 0;
        }
    }
}

export default api;
