import React from 'react';
import { SlDiamond } from 'react-icons/sl'; // Importe o ícone que você deseja usar

const AtivoComponent = ({ ativo, valorColecao, nomeAtivo }) => (
  <div>
    <SlDiamond /> {ativo}: ${valorColecao[nomeAtivo]}
  </div>
);

export default AtivoComponent;