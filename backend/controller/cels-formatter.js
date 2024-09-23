function converterStringParaValorMonetario(msg) {
    // R$[]3.000,00 => []3.000,00 => 3.000,00 => 3000,00 => 3000.00 (formato aceito pelo banco de dados)     
    const valor_formatado = parseFloat(msg.replace(/\D/g, "")); 

    return (valor_formatado / 100);
}

export {converterStringParaValorMonetario};