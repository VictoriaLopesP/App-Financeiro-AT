import axios from 'axios';

const API_URL = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/';

export const fetchCotacaoMoeda = async (moeda, dataCotacao) => {
  try {
    const response = await axios.get(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${moeda}'&@dataCotacao='${dataCotacao}'&$top=1&$format=json`
    );
    if (response.data.value && response.data.value.length > 0) {
      return response.data.value[0].cotacaoVenda;  
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar cotação:', error);
    return null;
  }
};

export const fetchTransacoes = async () => {
  const transacoes = [
    {
      id: 1,
      descricao: 'Almoço',
      valor: 20.0,
      data: '2024-12-10',
      hora: '12:30',
      categoria: 'Alimentação',
      tipo: 'Despesa',
      moeda: 'USD', 
    },
    {
      id: 2,
      descricao: 'Compras',
      valor: 50.0,
      data: '2024-12-11',
      hora: '15:00',
      categoria: 'Vestuário',
      tipo: 'Despesa',
      moeda: 'EUR',
    },
  ];

  return transacoes;
};

export const getTransacoesComCotacao = async (transacoes, dataCotacao) => {
  const transacoesComCotacao = [];

  for (const transacao of transacoes) {
    const cotacao = await fetchCotacaoMoeda(transacao.moeda, dataCotacao);

    if (cotacao !== null) {
      const valorConvertido = transacao.valor * cotacao; 
      transacoesComCotacao.push({
        ...transacao,
        valorConvertido,  
        cotacao,  
      });
    } else {
      console.error(`Cotação não encontrada para a moeda ${transacao.moeda} na data ${dataCotacao}`);
      transacoesComCotacao.push({
        ...transacao,
        valorConvertido: 'N/A', 
        cotacao: 'N/A',
      });
    }
  }

  return transacoesComCotacao;
};
