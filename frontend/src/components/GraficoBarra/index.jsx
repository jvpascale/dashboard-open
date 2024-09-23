import { useState, useEffect } from 'react'; 
import { GiDiamonds } from "react-icons/gi"; 
import Chart from 'react-apexcharts'; 
import { colors } from '../../services/colors'; 
import './styles.css'; 
import api from '../../services/api';
import Carteira from '../Carteira';
 
const GraficoBarra = () => { 
  const [dados, setDados] = useState([]); 
  const [labels, setLabels] = useState([]); 
  const [caixa, setCaixa] = useState(0); 
  const [blockchainsData, setBlockchainsData] = useState({}); 
  const [carteiras, setCarteiras] = useState([]);
  const [collectionsCounts, setCollectionsCounts] = useState({});

  useEffect(() => { 
    const retornoDados = async () => { 
      try { 
        const response = await fetch('http://localhost:3001/'); 
        const data = await response.json(); 
 
        setCaixa(data.caixa); 
 
        const colecoesMap = {}; 
        Object.keys(data.blockchains).forEach(nomeBlockchain => { 
          Object.entries(data.blockchains[nomeBlockchain]).forEach(([nomeCarteira, colecoes]) => { colecoes.forEach(colecao => { 
              if (colecoesMap[colecao.colecao]) { 
                // Soma o valor se a coleção já existir
                colecoesMap[colecao.colecao].valor += colecao.total_investido;
                
               
              } else { 
                // Cria a coleção se ainda não existir, com o valor
                colecoesMap[colecao.colecao] = { 
                  valor: colecao.total_investido, 
                  blockchain: nomeBlockchain, 
                }; 
              } 
            }); 
          }); 
        });
        
        

        const nomeColecoes = [] 
        const valorColecao = [] 

        Object.keys(colecoesMap).forEach(colecao => { 
          nomeColecoes.push(colecao) 
          valorColecao.push(colecoesMap[colecao].valor) 
        });

        setLabels(nomeColecoes)
 
        setDados(valorColecao)
 
 
        // Prepara a exibição organizada por blockchain 
        const blockchainOrganizado = {}; 
        const Carteiras = {}; 
        Object.keys(colecoesMap).forEach(nomeColecao => { 
          const colecao = colecoesMap[nomeColecao]; 
          if (!blockchainOrganizado[colecao.blockchain]) { 
            blockchainOrganizado[colecao.blockchain] = []; 
          } 
          blockchainOrganizado[colecao.blockchain].push({ 
            colecao: nomeColecao, 
            total_investido: colecao.valor, 
            hiperlink: colecao.link, 
          }); 
          
        }); 
 
        setBlockchainsData(blockchainOrganizado); 


            
       
        Object.keys(data.blockchains).forEach(nomeBlockchain => { 
          // Inicializa como um objeto para cada Blockchain
          Carteiras[nomeBlockchain] = {
            carteira: [], // Inicializa o array de carteiras para cada blockchain
            links: []
          }; 
          
          // Itera sobre as carteiras de cada blockchain
          Object.entries(data.blockchains[nomeBlockchain]).forEach(([nomeCarteira, colecoes]) => { 
            
            // Adiciona cada carteira ao array 'carteira' da respectiva blockchain
            Carteiras[nomeBlockchain].carteira.push(nomeCarteira);

          colecoes.forEach(colecao => {
            // Adiciona o link apenas se for diferente dos já existentes
            if (!Carteiras[nomeBlockchain].links.includes(colecao.hiperlink)) {
              Carteiras[nomeBlockchain].links.push(colecao.hiperlink);
            }
            
          });
             
          
          });
        }); 
        
        setCarteiras(Carteiras)
        console.log(Carteiras)
    
        

      } catch (error) { 
        console.error('Erro ao retornar a API:', error); 
      } 
    }; 
 
    retornoDados(); 
  }, []); 
 
  useEffect(() => {
    const fetchCollectionsCounts = async () => {
        const counts = {};
        for (const blockchain of Object.keys(blockchainsData)) {
            counts[blockchain] = await api.getColecoesPassadas(blockchain);
        }
        setCollectionsCounts(counts);
    };

    fetchCollectionsCounts();
  }, [api, blockchainsData]);

  console.log("collectionsCounts: ", collectionsCounts);

  const formatValue = (value) => { 
    if (value > 1000000) { 
      return (value / 1000000).toFixed(1) + 'M'; 
    } else if (value > 1000) { 
      return (value / 1000).toFixed(1) + 'K'; 
    } else { 
      return value; 
    } 
  }; 
 
  const options = { 
    chart: { 
      type: 'bar', 
      stacked: true, 
      toolbar: { 
        show: false, 
      }, 
    }, 
    stroke: { 
      colors: ['#1E0E40'],
      width: 4, 
    }, 
    tooltip: { 
      trigger: 'axis', 
      backgroundColor: '#000000', 
      textStyle: { 
        color: '#ffffff', 
      }, 
    }, 
    colors: colors, 
    textStyle: { 
      fontFamily: 'Microsoft YaHei', 
      fontSize: 12, 
      fontStyle: 'normal', 
      fontWeight: 'normal', 
    }, 
    xaxis: { 
      type: 'category', 
      categories: ['Tesouraria'], 
      labels: { 
        show: false, 
        style: { 
          fontFamily: 'Microsoft YaHei', 
          fontSize: 12, 
          fontWeight: 'normal', 
          colors: 'black', 
        }, 
      }, 
      axisTicks: { 
        show: false, 
      }, 
      axisBorder: { 
        show: false, 
      }, 
    }, 
    grid: { 
      show: false, 
    }, 
    yaxis: { 
      labels: { 
        style: { 
          fontFamily: 'Microsoft YaHei', 
          fontSize: 0.1, 
          fontWeight: 'normal', 
        }, 
        axisBorder: { 
          show: false, 
          color: 'black', 
        }, 
        axisTicks: { 
          show: false, 
          color: '#FFFFFF', 
        }, 
      }, 
      
    }, 
    plotOptions: { 
      bar: { 
        barHeight: '90%', 
        columnWidth: '100%', 
        endingShape: 'flat', 
        horizontal: true, 
        barWidth: '100%', 
        barGap: 10,
        distributed: false, 
        dataLabels: { 
          position: 'top', 
        }, 
      }, 
    }, 
    dataLabels: { 
      enabled: false, 
      formatter: function (value) { 
        return value.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
      }, 
      style: { 
        fontFamily: 'Microsoft YaHei', 
        fontSize: 12, 
        fontWeight: 'normal', 
      }, 
    }, 
  }; 
 
  const series = [ 
    { name: 'Caixa', data: [caixa] }, 
    ...labels.map((label, index) => ({ 
      name: label, 
      data: [dados[index]], 
    })), 
  ]; 
 
 
  return ( 
    <div> 
      <Chart 
        id="chart" 
        options={options} 
        series={series} 
        type="bar" 
        height="90" 
      /> 
      <div id="valorAtivos"> 
        {Object.keys(blockchainsData).map((blockchain, index) => ( 
          <div key={index} className="blockchain-legend"> 
            <h3>{blockchain}</h3>
            
            {/* Adiciona o nome das carteiras */}
            {carteiras[blockchain] && carteiras[blockchain].carteira.length > 0 && (
              <div className="carteira-links">
                {carteiras[blockchain].carteira.map((carteira, idx) => (
                  <a
                    key={idx}
                    href={carteiras[blockchain].links[idx]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="carteira-link"
                  >
                    {carteira} 
                  </a>
                ))}
              </div>
            )}


  
            {blockchainsData[blockchain].map((colecao, idx) => ( 
              <div key={idx} className="collection-item"> 
                <GiDiamonds fill={colors[idx + 1 + ((collectionsCounts[blockchain] || 0))]} /> 
                {colecao.colecao}: ${formatValue(colecao.total_investido)} 
              </div> 
            ))} 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
   
}; 
 
export default GraficoBarra;