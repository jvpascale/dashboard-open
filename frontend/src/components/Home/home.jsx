import react, {useEffect, useState} from 'react';
import './home.css';
import titulo from '../../assets/images/Titulo.png';
import Header from '../HeaderCarteira/index.tsx';
import Footer from '../Footer/index.jsx';

export default function Home () {
    useEffect((()=>{
        const quadros = document.querySelectorAll('.imgJogos');

        const carregarQuadrosJogos = () =>{ // randomizar os jogos que aparecem nos quadrados
            const jafoi = [];
            let i = 0;
            while(true){
                let img = Math.round(Math.random()*11 +1);
                if(!jafoi.includes(img)){
                    quadros[i].style.backgroundImage = `url(/src/assets/images/jogos/jogo${img}.png)`;
                    jafoi.push(img);
                    i++;
                }
                if(jafoi.length == 12) // temos 12 imagens
                    break;
            }
        }

        carregarQuadrosJogos();
    }),[]);

    return(
        <div className='tela-home'>
            <Header tela='home'></Header>
            <section>
                <img id='luz' src='../src/assets/images/Luz.png'></img>
                <div className='divMain' id='dm1' draggable='false'>
                    <div className='divEsquerda'>
                        <div className='divTitulo' draggable='false'>
                            <img draggable='false' id='imgTitulo' src={titulo}/>
                            <p>PREPARE-SE PARA SUBIR DE NÍVEL</p>
                        </div>
                        <div className='jogosLosango'>
                            <div draggable='false' className='quadroJogos um losango'><span className='imgJogos L1'></span></div>
                            <div draggable='false' className='quadroJogos dois losango'><span className='imgJogos L2'></span></div>
                            <div draggable='false' className='quadroJogos tres losango'><span className='imgJogos L3'></span></div>
                        </div>
                    </div>
                    <div className='vetorControle'></div>
                </div>

                <div className='divMain' id='dm2' draggable='false'>
                    <div className='introducao'>
                        <h1 className='tituloParag'>QUEM SOMOS NÓS?</h1>
                        <p>Nós somos uma comunidade de jogos focada fazer web3 games acessíveis para as massas, ajudando você a extrair o máximo de suas oportunidades.</p>
                        <p>Não importa se você é um jogador casual ou profissional, colecionador ou quer apenas ajudar a impulsionar o futuro dos jogos. Nos temos assets jogáveis, ferramentas analíticas e material educacional para construir seu caminho à glória.</p>
                        <p>Não custa nada vencer conosco.</p>
                    </div>
                    <div className='jogosQuadrado' draggable='false'>
                        <div className='quadroJogos quatro' draggable='false'><span className='imgJogos'></span></div>
                        <div className='quadroJogos cinco' draggable='false'><span className='imgJogos'></span></div>
                        <div className='quadroJogos seis' draggable='false'><span className='imgJogos'></span></div>
                        <div className='quadroJogos sete' draggable='false'><span className='imgJogos'></span></div>
                        <div className='quadroJogos oito' draggable='false'><span className='imgJogos'></span></div>
                    </div>
                    <div id='elementosGraficosGrid' draggable='false'> 
                        <img draggable='false' id='p1' src='../src/assets/images/elemGraficos/piramide1.png'></img>
                        <img draggable='false' id='d1' src='../src/assets/images/elemGraficos/diamante1.png'></img>
                        <img draggable='false' id='d2' src='../src/assets/images/elemGraficos/diamante2.svg'></img>
                        <img draggable='false' id='p2' src='../src/assets/images/elemGraficos/piramide2.png'></img>
                    </div>
                </div>

                <div className='divMain' id='dm3' draggable='false'>
                    <div className='divEsquerda'>
                        <div className='introducao i2'>
                            <h1 className='tituloParag'>TRAGA SEU EMPENHO</h1>
                            <p>Quanto tempo você já gastou jogando, sem verdadeiramente possuir os assets, a experiência ou a moeda que você conquistou no jogo?</p>
                            <p>Os Web3 games te dão a liberdade para manter, trocar ou vender seus assets nos jogos e tokens. Mas, geralmente, para obter tokens é necessário utilizar colecionáveis digitais, o que pode ser um ponto de entrada custoso e intimidador. Por isso, nós te ajudaremos.</p>
                            {/* <p>Iremos te guiar para os jogos mais divertidos e promissores, compartilhar os assets jogáveis para te ajudar a conquistar mais tokens e prover as ferramentas de análise e material educacional para "afiar suas armas"—de graça. Seu mérito é a chave para utilizar os melhores assets dos jogos.</p>
                            <p>Afinal, Web3 games devem ser acessíveis para todos.</p> */}
                            <img className='img-controle' src='../src/assets/images/controle-celular.png'></img>
                        </div>
                        <img id='d1' draggable='false' src='../src/assets/images/elemGraficos/diamante1.svg'></img>
                    </div>
                    <div draggable='false' className='vetorNave'></div>
                </div>

                <div className='divMain' id='dm4' draggable='false'>
                    <div className='textoSec4'>
                        <img draggable='false' id='p2' className='piramideSection4' src='../src/assets/images/elemGraficos/piramide2.png'></img>
                        <div className='introducao i3'>
                            <h1 className='tituloParag'>TENHA A NOSSA AJUDA</h1>
                            <p>Iremos te guiar para os jogos mais divertidos e promissores, compartilhar os assets jogáveis para te ajudar a conquistar mais tokens e prover as ferramentas de análise e material educacional para "afiar suas armas"—de graça. Seu mérito é a chave para utilizar os melhores assets dos jogos.</p>
                            <p>Afinal, Web3 games devem ser acessíveis para todos.</p>
                        </div>
                        <img draggable='false' id='p1' className='piramideSection4' src='../src/assets/images/elemGraficos/piramide1.png'></img>
                    </div>
                    <div className='jogosLosango'>
                        <div className='bolinhaBrilhante'></div><div className='losBrilhante'></div>
                        <div draggable='false' className='quadroJogos nove losango'><span className='imgJogos L1'></span></div>
                        <div draggable='false' className='quadroJogos dez losango'><span className='imgJogos L2'></span></div>
                        <div draggable='false' className='quadroJogos onze losango'><span className='imgJogos L3'></span></div>
                        <div draggable='false' className='quadroJogos doze losango'><span className='imgJogos L4'></span></div>
                        <div className='losBrilhante'></div><div className='bolinhaBrilhante'></div>
                    </div>
                </div>
            <Footer/>
            </section>
        </div>
    );
}