import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

const TransacaoItemList = ({ descricao, valor, data, hora, categoria, tipo, moeda, cotacao }) => {
  const { width, height } = useWindowDimensions();  

  const isPortrait = height > width;

  return (
    <View style={styles.item}>
      <Text style={styles.descricao}>{descricao}</Text>
      <Text style={styles.valor}>
        Valor: {valor !== undefined ? valor.toFixed(2) : 'Valor indisponível'} BRL
      </Text>
      <Text style={styles.data}>Data: {data}</Text>

      { !isPortrait && (
        <>
          <Text style={styles.hora}>Hora: {hora}</Text>
          <Text style={styles.categoria}>Categoria: {categoria}</Text>
          <Text style={styles.tipo}>Tipo: {tipo}</Text>
          <Text style={styles.moeda}>Moeda original: {moeda}</Text>
        </>
      )}

      <Text style={styles.cotacao}>
        Cotação utilizada: {cotacao !== undefined ? cotacao.toFixed(4) : 'Cotação indisponível'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  descricao: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 16,
    color: 'green',
  },
  data: {
    fontSize: 14,
    color: '#555',
  },
  hora: {
    fontSize: 14,
    color: '#555',
  },
  categoria: {
    fontSize: 14,
    color: '#555',
  },
  tipo: {
    fontSize: 14,
    color: '#555',
  },
  moeda: {
    fontSize: 14,
    color: '#555',
  },
  cotacao: {
    fontSize: 14,
    color: 'blue',
  },
});

export default TransacaoItemList;
