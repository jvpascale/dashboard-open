import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react';
import './styles.css'
import { TbSwitchHorizontal } from "react-icons/tb";

const GraficoPerformance = () => {
  const [datasSemanais, setDatas] = useState([]) // Para armazenar as datas semanais
  const [totais, setTotais] = useState([]) // Para armazenar os totais diários
  const [todasDatas, setTodasDatas] = useState([]) // Para armazenar todas as datas (diárias)
  const [suavizar, setSuavizar] = useState(true)

  useEffect(() => {
    const retornoDados = async () => {
      try {
        const response = await fetch('http://localhost:3001/performance')
        const data = await response.json()

        const dadosArray = []
        var data_semana = []
        var valoresDiarios = []
        var todasAsDatas = []

        dadosArray.push(data)
        dadosArray.forEach(infosAPI => {
          const dias = Object.keys(infosAPI)
          
          for(var i = 0; i < dias.length; i++){
            valoresDiarios.push(infosAPI[dias[i]].tesouraria)
            todasAsDatas.push(infosAPI[dias[i]].data)
            if(infosAPI[dias[i]].inicio_semana === true){
              data_semana.push(infosAPI[dias[i]].data)
            }
          }
        });

        setDatas(data_semana)
        setTotais(valoresDiarios)
        setTodasDatas(todasAsDatas)

      } catch (error) {
        console.error('Erro ao retornar a API:', error)
      }
    }
    retornoDados()
  }, []);

  const suavizacao = ()=>{
    setSuavizar(prevSuavizar => !prevSuavizar)
}

  var amplitude = (Math.max(...totais)) - (Math.min(...totais));
  var min =  Math.round(Math.min(...totais) - (amplitude / 5));
  var max = Math.round(Math.max(...totais) + (amplitude / 5));
  console.log("Amplitude, min, max: ", amplitude, min, max);

  const options = {
    xAxis: {
      type: 'category',
      data: todasDatas,
      axisLabel: {
        formatter: function (value, index) {
          // Exibe as datas semanais e as adiciona ao gráfico
          console.log(datasSemanais);
          return datasSemanais.includes(value) ? value : '';
        },
        color: '#ffffff', // Cor do texto dos eixos x
      },
      axisLine: {
        lineStyle: {
          color: '#9154FF', // Cor da linha do eixo x
        },
      },
      axisTick: {
        alignWithLabel: true,
        interval: function (index, value) {
          // Garante que todas as datas semanais sejam mostradas no gráfico
          return datasSemanais.includes(value);
        },
      },
    },
    yAxis: {
      type: 'value',
      min: min,
      max: max,
      axisLabel: {
        color: '#ffffff', // Cor do texto dos eixos y
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff', // Cor da linha do eixo y
        },
      },
      splitLine: {
        lineStyle: {
          color: '#9154FF', // Cor das linhas de grade do eixo y
        },
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    series: [
      {
        name: 'Valor Diário',
        data: totais,
        type: 'line',
        smooth: suavizar,
        lineStyle: {
          width: 3,
          color: '#ffffff', // Cor da linha do gráfico
        },
        color: '#5470c6', //cor das bolinhas 
      },
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
  };

  return (
    <div>
      <div className='div-botao-suavizar'>
        <span>{suavizar ? 'Linha Reta ': 'Linha Suave '}</span>
        <TbSwitchHorizontal className='botao-suavizar' onClick={suavizacao}/>
      </div>
      <ReactECharts option={options} style={{ height: 500, width: '100%' }} />
    </div>
  );
};

export default GraficoPerformance;