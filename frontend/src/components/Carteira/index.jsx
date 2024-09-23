import React, { useState, useEffect } from 'react'
import HeaderCarteira from '../HeaderCarteira'
import TelaCarteira from '../TelaCarteira'
import TesourariaCarteira from '../TesourariaCarteira'
import GraficoPerformance from '../GraficoPerformance'
import GraficoBarra from '../GraficoBarra'
import { SlDiamond } from "react-icons/sl";
import AtivoComponent from '../../Teste'
import api from '../../services/api'
import './styles.css'
import { GiDiamonds } from "react-icons/gi";
import { colors } from '../../services/colors';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { TbSwitchHorizontal } from "react-icons/tb";
import Footer from '../Footer'

const Carteira = () => {

  const location = useLocation();
  const { pathname, search, hash } = location;
  console.log("location:", location);
  const [caixa, setCaixa] = useState([])
  const [tesouraria, setTesouraria] = useState([])
  const [suavizar, setSuavizar] = useState(true)

  useEffect(() => {
    api.getCaixa().then((res) => {
      setCaixa(res)
    })
    
    api.getValorTesouraria().then((res) => {
      setTesouraria(res)  
    })
    const navegacao = hash.replace("#","");
    const sec = document.getElementById(navegacao);
    console.log("Navegacao:", navegacao);
    if (navegacao == "performance" || navegacao == "colecoes") {
      sec.scrollIntoView({ behavior: 'smooth', block: 'center'});
    }
  }, [])
  

  // useEffect(() => {
  //   console.log("Caixa:", caixa)
  //   }, [caixa])

  return (
    <div>
      <div className='carteira-container'>
        <HeaderCarteira/>
        <TelaCarteira>
          <img id='luz2' src='../src/assets/images/Luz.png'></img>
          <div className='titulo-tesouraria'>
            <p className='tesouraria-da-dao'>TESOURARIA DO CLIENTE</p>
          </div>
          <TesourariaCarteira>
            <div id='colecoes'>
              <div className='subtitulo-tesouraria'>
                <div className='info-esquerda'>
                  <p className='valor-total-style'>Valor total da tesouraria </p>
                  <div className='valor-total'>${tesouraria.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div id='ValorAtivos'></div>
                </div>
                <div className='info-direita'> 
                  <div className='caixa-style'> 
                    <GiDiamonds fill={`${colors[0]}`} />Caixa - ${caixa.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                  </div>
                </div>
              </div>
            </div>
            <GraficoBarra />
          </TesourariaCarteira>
          <TesourariaCarteira>
          <div id='performance'>
            <h1 className='text-performance'>Performance da Tesouraria</h1>
            <GraficoPerformance />
          </div> 
          </TesourariaCarteira>
        </TelaCarteira>
      </div>
      <Footer/>
    </div>
  )
}

export default Carteira;